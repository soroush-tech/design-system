// Settles, on the docs-dist tree, what search engines are told about the archived versions.
//
//   node scripts/canonicalize-docs-dist.mjs <distDir>
//
// A snapshot is frozen when its release is cut and cannot know what later releases add or drop,
// so this runs wherever the tree changes (compose-docs-dist.mjs calls it after a live compose and
// after a snapshot install) and looks at the live pages as they are now. For every archived page
// <pkg>/<version>/<path>, the live page is <pkg>/<path>:
//
//   the live page exists    -> canonical (and og:url) to it, `noindex,follow`
//   it does not             -> no canonical, its own og:url, `index,follow`, and a stub at the
//                              live URL that sends visitors to the newest version having the page
//
// A stub is a placeholder, not a copy: GitHub Pages cannot answer 301, so the old URL answers with a
// page that redirects at once and names the archived page as its canonical. Stubs are marked
// `data-stub`, are rebuilt on every run, and are not live pages: nothing looks for a live
// equivalent among them. The run ends by checking the whole tree, and throws on a canonical or a
// stub that points at a page that is not there, or a live page that is `noindex`.
//
// No dependencies: the snapshot job runs it from a checkout that installed none.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const SITE_URL = 'https://docs.soroush.tech'
const SEMVER = /^\d+\.\d+\.\d+$/
const STUB_MARK = 'data-stub'

export const compareSemver = (a, b) => {
  const [aParts, bParts] = [a.split('.').map(Number), b.split('.').map(Number)]
  for (let index = 0; index < 3; index += 1) {
    if (aParts[index] !== bParts[index]) return aParts[index] - bParts[index]
  }
  return 0
}

/** The files under a directory, as `/`-separated paths from it; `isSkipped` names directories to leave. */
const walk = (root, isSkipped = () => false, base = '') => {
  const files = []
  for (const entry of readdirSync(join(root, base), { withFileTypes: true })) {
    const path = base ? `${base}/${entry.name}` : entry.name
    if (!entry.isDirectory()) files.push(path)
    else if (!isSkipped(path)) files.push(...walk(root, isSkipped, path))
  }
  return files
}

const isPage = (file) => file === 'index.html' || file.endsWith('/index.html')
// `components/button/index.html` is the page `components/button/`; `index.html` is the root, ``.
const pageDir = (file) => file.slice(0, file.length - 'index.html'.length)
const urlOf = (path) => `${SITE_URL}/${path}`
const fileOf = (distDir, url) => {
  const path = url.slice(SITE_URL.length + 1)
  return join(distDir, path, 'index.html')
}

// The packages with archived versions, and those versions, the newest first.
const packagesOf = (distDir) =>
  readdirSync(distDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== '.git')
    .map((entry) => ({
      name: entry.name,
      versions: readdirSync(join(distDir, entry.name), { withFileTypes: true })
        .filter((child) => child.isDirectory() && SEMVER.test(child.name))
        .map((child) => child.name)
        .sort((a, b) => compareSemver(b, a)),
    }))
    .filter((pkg) => pkg.versions.length > 0)

const CANONICAL = /<link rel="canonical"[^>]*>/
const ROBOTS = /<meta name="robots"[^>]*>/
const OG_URL = /<meta property="og:url"[^>]*>/

// Puts a tag in the head: in place of the one that is there, or before the head's end.
const setTag = (html, pattern, tag) =>
  pattern.test(html)
    ? html.replace(pattern, () => tag)
    : html.replace('</head>', () => `${tag}</head>`)
const setCanonical = (html, url) =>
  setTag(html, CANONICAL, `<link rel="canonical" href="${url}" data-mh />`)
const dropCanonical = (html) => html.replace(CANONICAL, '')
const setMeta = (html, pattern, attr, name, value) =>
  setTag(html, pattern, `<meta ${attr}="${name}" content="${value}" data-mh />`)
const setOgUrl = (html, url) => setMeta(html, OG_URL, 'property', 'og:url', url)
const setRobots = (html, value) => setMeta(html, ROBOTS, 'name', 'robots', value)

const stubOf = (target) => `<!doctype html>
<html lang="en" ${STUB_MARK}>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Moved - SOROUSH.DESIGN</title>
<meta name="robots" content="noindex,follow" />
<link rel="canonical" href="${urlOf(target)}" />
<meta http-equiv="refresh" content="0; url=/${target}" />
</head>
<body>
<p>This page is in an older version: <a href="/${target}">${urlOf(target)}</a></p>
</body>
</html>
`

// A stub is rebuilt each run, so a page that came back in a later release is its real page again.
const removeStubs = (distDir, pkg) => {
  const root = join(distDir, pkg.name)
  const files = walk(root, (path) => SEMVER.test(path.split('/')[0]))
  for (const file of files.filter(isPage)) {
    if (!readFileSync(join(root, file), 'utf8').includes(STUB_MARK)) continue
    rmSync(join(root, file))
    // Its folders go too, where nothing else is in them.
    for (let dir = dirname(file); dir !== '.'; dir = dirname(dir)) {
      if (readdirSync(join(root, dir)).length > 0) break
      rmSync(join(root, dir), { recursive: true })
    }
  }
}

const isStub = (html) => html.includes(STUB_MARK)
const noindexed = (html) => /<meta name="robots" content="[^"]*noindex/.test(html)

// What the tree must not hold: a canonical or a stub that leads nowhere, a live page search
// engines are told to skip (the 404 page is a file of its own, not a page here).
const verify = (distDir, packages) => {
  const archivedRoots = new Set(
    packages.flatMap((pkg) => pkg.versions.map((v) => `${pkg.name}/${v}`))
  )
  const problems = []
  const files = walk(distDir, (path) => path === '.git').filter(isPage)
  for (const file of files) {
    const html = readFileSync(join(distDir, file), 'utf8')
    const [pkg, version] = file.split('/')
    const isArchived = archivedRoots.has(`${pkg}/${version}`)
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
    if (canonical && !existsSync(fileOf(distDir, canonical))) {
      problems.push(`${file}: canonical ${canonical} is not a page`)
    }
    if (isStub(html)) {
      const target = html.match(/http-equiv="refresh" content="0; url=([^"]*)"/)?.[1] ?? ''
      if (!target || !existsSync(join(distDir, target, 'index.html'))) {
        problems.push(`${file}: stub leads to ${target}, which is not a page`)
      }
    } else if (!isArchived && noindexed(html)) {
      problems.push(`${file}: a live page is noindex`)
    }
  }
  if (problems.length > 0) throw new Error(`docs-dist is not consistent:\n${problems.join('\n')}`)
}

/** Rewrites the archived pages' heads and the stubs of the tree at `distDir`; returns what it did. */
export const canonicalize = (distDir) => {
  const packages = packagesOf(distDir)
  const summary = { canonical: 0, own: 0, stubs: 0 }
  for (const pkg of packages) {
    removeStubs(distDir, pkg)
    const root = join(distDir, pkg.name)
    const live = new Set(
      walk(root, (path) => SEMVER.test(path.split('/')[0]))
        .filter(isPage)
        .map(pageDir)
    )
    // The archived pages that have no live page, and the versions that have each, newest first.
    const missing = new Map()
    for (const version of pkg.versions) {
      const versionRoot = join(root, version)
      for (const file of walk(versionRoot).filter(isPage)) {
        const dir = pageDir(file)
        let html = readFileSync(join(versionRoot, file), 'utf8')
        if (live.has(dir)) {
          const url = urlOf(`${pkg.name}/${dir}`)
          html = setRobots(setOgUrl(setCanonical(html, url), url), 'noindex,follow')
          summary.canonical += 1
        } else {
          html = setRobots(
            setOgUrl(dropCanonical(html), urlOf(`${pkg.name}/${version}/${dir}`)),
            'index,follow'
          )
          missing.set(dir, [...(missing.get(dir) ?? []), version])
          summary.own += 1
        }
        writeFileSync(join(versionRoot, file), html)
      }
    }
    for (const [dir, versions] of missing) {
      const stub = join(root, dir, 'index.html')
      mkdirSync(dirname(stub), { recursive: true })
      writeFileSync(stub, stubOf(`${pkg.name}/${versions[0]}/${dir}`))
      summary.stubs += 1
    }
  }
  verify(distDir, packages)
  return summary
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [distDir] = process.argv.slice(2)
  const { canonical, own, stubs } = canonicalize(distDir)
  console.log(
    `canonicalize: ${canonical} archived pages point at the live page, ${own} are their own, ${stubs} stubs`
  )
}
