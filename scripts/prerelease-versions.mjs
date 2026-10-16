// Turns the packages of one cd-packages run into the versions it publishes, in the CI checkout only
// (nothing is committed). Prints `PKGS=<dirs>` for $GITHUB_ENV, dependencies first.
//
//   node scripts/prerelease-versions.mjs <alpha|rc|stable> [--skip-released] <dir>...
//
// A package.json holds the target version (`2.0.0`); this script never asks anyone to edit it.
// - stable: versions stay as they are; only the order changes, and every workspace dependency
//   outside the run must already have its version on npm.
// - alpha / rc: each package becomes `<target>-<channel>.N`, N one above the highest already on
//   npm for that target and channel (0 when there is none). A target that is already released
//   fails the run, or is dropped with --skip-released (the `all` dispatch).
// - A workspace dependency outside the run is pointed at its newest `<target>-<channel>.N` on npm,
//   so `workspace:^` publishes a range that resolves; with none there, the run stops: publish the
//   dependency first. A dependency whose target is already released keeps it.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'

const CHANNELS = ['alpha', 'rc', 'stable']
const REGISTRY = 'https://registry.npmjs.org'
const args = process.argv.slice(2)
const channel = args.shift()
const skipReleased = args[0] === '--skip-released' && Boolean(args.shift())

const fail = (message) => {
  console.error(`::error::${message}`)
  process.exit(1)
}

if (!CHANNELS.includes(channel))
  fail(`Unknown channel "${channel}" - expected ${CHANNELS.join(', ')}`)

const packageFile = (dir) => `packages/${dir}/package.json`
const workspace = readdirSync('packages', { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(packageFile(entry.name)))
  .map(({ name: dir }) => ({ dir, pkg: JSON.parse(readFileSync(packageFile(dir), 'utf8')) }))
const byName = new Map(workspace.map((entry) => [entry.pkg.name, entry]))
const byDir = new Map(workspace.map((entry) => [entry.dir, entry]))

// Published dependencies only - devDependencies never reach a consumer's install.
const workspaceDeps = ({ pkg }) =>
  Object.entries({ ...pkg.dependencies, ...pkg.peerDependencies })
    .filter(([, spec]) => spec.startsWith('workspace:'))
    .map(([name]) => byName.get(name))
    .filter(Boolean)

// Every version of a package on npm; [] before its first publish. Read from the registry, as
// check-release-notes does, so no `npm` binary is looked up on PATH.
const publishedVersions = async (name) => {
  const response = await fetch(`${REGISTRY}/${name}`, { signal: AbortSignal.timeout(15_000) })
  if (response.status === 404) return []
  if (!response.ok) fail(`The npm registry answered ${response.status} for ${name}`)
  return Object.keys((await response.json()).versions ?? {})
}

// The N of every `<target>-<channel>.N` on npm.
const prereleaseNumbers = (versions, target) => {
  const prefix = `${target}-${channel}.`
  return versions
    .filter((version) => version.startsWith(prefix))
    .map((version) => Number(version.slice(prefix.length)))
    .filter(Number.isInteger)
}

const setVersion = (entry, version) => {
  console.error(`${entry.pkg.name}: ${entry.pkg.version} -> ${version}`)
  entry.pkg.version = version
  writeFileSync(packageFile(entry.dir), `${JSON.stringify(entry.pkg, null, 2)}\n`)
}

let run = args.map((dir) => byDir.get(dir) ?? fail(`Unknown package: ${dir}`))

if (channel !== 'stable') {
  const unreleased = []
  for (const entry of run) {
    const { pkg } = entry
    if (pkg.version.includes('-')) {
      fail(`${pkg.name}: package.json must hold the target version, not ${pkg.version}`)
    }
    if (!(await publishedVersions(pkg.name)).includes(pkg.version)) unreleased.push(entry)
    else if (skipReleased)
      console.error(`${pkg.name}@${pkg.version} is already released - skipped.`)
    else fail(`${pkg.name}@${pkg.version} is already released - bump the version first.`)
  }
  run = unreleased
}

// Dependencies first, so a dependent never points at a version not yet on npm.
const ordered = []
const visit = (entry) => {
  if (ordered.includes(entry)) return
  workspaceDeps(entry)
    .filter((dep) => run.includes(dep))
    .forEach(visit)
  ordered.push(entry)
}
run.forEach(visit)

if (channel !== 'stable') {
  for (const entry of ordered) {
    const target = entry.pkg.version
    const numbers = prereleaseNumbers(await publishedVersions(entry.pkg.name), target)
    setVersion(entry, `${target}-${channel}.${numbers.length ? Math.max(...numbers) + 1 : 0}`)
  }

  const pointed = new Set()
  for (const dep of ordered.flatMap(workspaceDeps)) {
    if (run.includes(dep) || pointed.has(dep) || dep.pkg.private) continue
    pointed.add(dep)
    const target = dep.pkg.version
    const versions = await publishedVersions(dep.pkg.name)
    if (versions.includes(target)) continue
    const numbers = prereleaseNumbers(versions, target)
    if (numbers.length === 0) {
      fail(`${dep.pkg.name}@${target} has no ${channel} on npm yet - publish ${dep.dir} first.`)
    }
    setVersion(dep, `${target}-${channel}.${Math.max(...numbers)}`)
  }
}

// A stable run publishes `^<target>` for each workspace dependency, so that target must
// already be on npm - or be published earlier in this run.
if (channel === 'stable') {
  for (const dep of new Set(ordered.flatMap(workspaceDeps))) {
    if (run.includes(dep) || dep.pkg.private) continue
    if (!(await publishedVersions(dep.pkg.name)).includes(dep.pkg.version)) {
      fail(`${dep.pkg.name}@${dep.pkg.version} is not on npm yet - publish ${dep.dir} first.`)
    }
  }
}

console.log(`PKGS=${ordered.map(({ dir }) => dir).join(' ')}`)
