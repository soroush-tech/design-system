// Composes the docs-dist tree cd-docs.yml deploys: the live site at the root, frozen
// section snapshots at <pkg>/<version>/, and versions.json driving the switcher.
//
//   node scripts/compose-docs-dist.mjs live <buildDir> <distDir>
//     Replaces the live tree (everything except snapshot dirs and versions.json).
//   node scripts/compose-docs-dist.mjs snapshot <pkg> <version> <buildDir> <distDir>
//     Installs <buildDir> as <distDir>/<pkg>/<version>/ and records it in versions.json.
//   node scripts/compose-docs-dist.mjs has <pkg> <version> <distDir>
//     Exits 0 when versions.json already lists the version (the idempotence check).
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'

const SEMVER = /^\d+\.\d+\.\d+$/

const readManifest = (distDir) => {
  const path = join(distDir, 'versions.json')
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {}
}

const writeManifest = (distDir, manifest) => {
  writeFileSync(join(distDir, 'versions.json'), `${JSON.stringify(manifest, null, 2)}\n`)
}

const compareSemver = (a, b) => {
  const [aParts, bParts] = [a.split('.').map(Number), b.split('.').map(Number)]
  for (let index = 0; index < 3; index += 1) {
    if (aParts[index] !== bParts[index]) return aParts[index] - bParts[index]
  }
  return 0
}

/** Removes the live tree from distDir, keeping snapshot dirs and versions.json. */
const clearLive = (distDir) => {
  for (const entry of readdirSync(distDir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'versions.json') continue
    const path = join(distDir, entry.name)
    if (!entry.isDirectory()) {
      rmSync(path)
      continue
    }
    // Inside a package dir, spare its semver snapshot subdirs; delete the rest.
    for (const child of readdirSync(path, { withFileTypes: true })) {
      if (child.isDirectory() && SEMVER.test(child.name)) continue
      rmSync(join(path, child.name), { recursive: true })
    }
    if (readdirSync(path).length === 0) rmSync(path, { recursive: true })
  }
}

const [mode, ...args] = process.argv.slice(2)

if (mode === 'live') {
  const [buildDir, distDir] = args
  mkdirSync(distDir, { recursive: true })
  clearLive(distDir)
  cpSync(buildDir, distDir, { recursive: true })
  console.log(`composed live tree from ${buildDir} into ${distDir}`)
} else if (mode === 'snapshot') {
  const [pkg, version, buildDir, distDir] = args
  if (!SEMVER.test(version)) throw new Error(`not a version: ${version}`)
  const target = join(distDir, pkg, version)
  rmSync(target, { recursive: true, force: true })
  mkdirSync(target, { recursive: true })
  cpSync(buildDir, target, { recursive: true })
  const manifest = readManifest(distDir)
  const versions = new Set(manifest[pkg] ?? [])
  versions.add(version)
  manifest[pkg] = [...versions].sort((a, b) => compareSemver(b, a))
  writeManifest(distDir, manifest)
  console.log(`installed snapshot ${pkg}@${version}`)
} else if (mode === 'has') {
  const [pkg, version, distDir] = args
  const listed = (readManifest(distDir)[pkg] ?? []).includes(version)
  console.log(listed ? `${pkg}@${version} already archived` : `${pkg}@${version} not archived`)
  process.exit(listed ? 0 : 1)
} else {
  throw new Error(`unknown mode: ${mode}`)
}
