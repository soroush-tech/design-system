import { describe, it, expect, afterEach, vi } from 'vitest'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { canonicalize, compareSemver, SITE_URL } from '../../../scripts/canonicalize-docs-dist.mjs'

// The script runs on the docs-dist branch, outside the app: its tests build a small tree of that
// shape in a temporary folder.
const SCRIPT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../../scripts/canonicalize-docs-dist.mjs'
)
const roots = []
afterEach(() => {
  while (roots.length) rmSync(roots.pop(), { recursive: true, force: true })
})

// A page the way the app writes its head: canonical, og:url and robots, each marked `data-mh`.
const page = (path, { robots = 'index,follow', canonical = `${SITE_URL}/${path}` } = {}) =>
  `<!doctype html><html><head><title>t</title>` +
  (canonical ? `<link rel="canonical" href="${canonical}" data-mh />` : '') +
  `<meta property="og:url" content="${SITE_URL}/${path}" data-mh />` +
  `<meta name="robots" content="${robots}" data-mh /></head><body>${path}</body></html>`

// An archived page as its snapshot build wrote it: the canonical is a path without its section and
// version, and the page is noindex.
const archived = (section, version, path) =>
  page(`${section}/${version}/${path}`, {
    robots: 'noindex,follow',
    canonical: `${SITE_URL}/${path}`,
  })

const tree = (files) => {
  const dist = mkdtempSync(join(tmpdir(), 'docs-dist-'))
  roots.push(dist)
  for (const [path, body] of Object.entries(files)) {
    mkdirSync(dirname(join(dist, path)), { recursive: true })
    writeFileSync(join(dist, path), body)
  }
  return dist
}
const read = (dist, path) => readFileSync(join(dist, path), 'utf8')
const has = (dist, path) => existsSync(join(dist, path))
const robotsOf = (html) => html.match(/<meta name="robots" content="([^"]*)"/)?.[1]
const canonicalOf = (html) => html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
const ogUrlOf = (html) => html.match(/<meta property="og:url" content="([^"]*)"/)?.[1]

// A live site with one section and two archived versions of it.
const site = (extra = {}) =>
  tree({
    'index.html': page(''),
    '404.html': page('404', { robots: 'noindex,follow' }),
    'versions.json': '{}',
    'design-system/index.html': page('design-system/'),
    'design-system/components/button/index.html': page('design-system/components/button/'),
    'design-system/2.0.0/index.html': archived('design-system', '2.0.0', ''),
    'design-system/2.0.0/components/button/index.html': archived(
      'design-system',
      '2.0.0',
      'components/button/'
    ),
    'design-system/2.0.0/components/foo/index.html': archived(
      'design-system',
      '2.0.0',
      'components/foo/'
    ),
    'design-system/2.0.0/index.pageContext.json': '{"a":1}',
    'design-system/1.3.3/components/foo/index.html': archived(
      'design-system',
      '1.3.3',
      'components/foo/'
    ),
    'design-system/1.3.3/components/bar/index.html': archived(
      'design-system',
      '1.3.3',
      'components/bar/'
    ),
    ...extra,
  })

describe('an archived page the live docs have', () => {
  it('has the live page as its canonical and og:url, and is noindex', () => {
    const dist = site()
    canonicalize(dist)
    const html = read(dist, 'design-system/2.0.0/components/button/index.html')
    expect(canonicalOf(html)).toBe(`${SITE_URL}/design-system/components/button/`)
    expect(ogUrlOf(html)).toBe(`${SITE_URL}/design-system/components/button/`)
    expect(robotsOf(html)).toBe('noindex,follow')
  })

  it('maps the root of a version to the root of the section', () => {
    const dist = site()
    canonicalize(dist)
    const html = read(dist, 'design-system/2.0.0/index.html')
    expect(canonicalOf(html)).toBe(`${SITE_URL}/design-system/`)
    expect(robotsOf(html)).toBe('noindex,follow')
  })
})

describe('an archived page the live docs do not have', () => {
  it('has no canonical, its own og:url, and is index', () => {
    const dist = site()
    canonicalize(dist)
    const html = read(dist, 'design-system/1.3.3/components/bar/index.html')
    expect(canonicalOf(html)).toBeUndefined()
    expect(ogUrlOf(html)).toBe(`${SITE_URL}/design-system/1.3.3/components/bar/`)
    expect(robotsOf(html)).toBe('index,follow')
  })

  it('has a stub at its live URL, to the newest version that has it', () => {
    const dist = site()
    const summary = canonicalize(dist)
    const stub = read(dist, 'design-system/components/foo/index.html')
    expect(stub).toContain('data-stub')
    expect(robotsOf(stub)).toBe('noindex,follow')
    expect(canonicalOf(stub)).toBe(`${SITE_URL}/design-system/2.0.0/components/foo/`)
    expect(stub).toContain(
      '<meta http-equiv="refresh" content="0; url=/design-system/2.0.0/components/foo/" />'
    )
    expect(stub).toContain('<a href="/design-system/2.0.0/components/foo/">')
    // The page only the older version has goes to that one.
    expect(read(dist, 'design-system/components/bar/index.html')).toContain(
      'url=/design-system/1.3.3/components/bar/'
    )
    expect(summary).toEqual({ canonical: 2, own: 3, stubs: 2 })
  })

  it('has a stub for a section that has no root page of its own', () => {
    const dist = tree({
      'design-system/1.0.0/index.html': archived('design-system', '1.0.0', ''),
    })
    canonicalize(dist)
    expect(read(dist, 'design-system/index.html')).toContain('url=/design-system/1.0.0/')
  })
})

describe('the tree as the live docs change', () => {
  it('drops the stub, and canonicalizes the archived pages, when a page comes back', () => {
    const dist = site()
    canonicalize(dist)
    expect(has(dist, 'design-system/components/foo/index.html')).toBe(true)
    // A later release has `foo` again: its real page is where the stub was.
    writeFileSync(
      join(dist, 'design-system/components/foo/index.html'),
      page('design-system/components/foo/')
    )
    canonicalize(dist)
    const html = read(dist, 'design-system/2.0.0/components/foo/index.html')
    expect(canonicalOf(html)).toBe(`${SITE_URL}/design-system/components/foo/`)
    expect(robotsOf(html)).toBe('noindex,follow')
    expect(read(dist, 'design-system/components/foo/index.html')).not.toContain('data-stub')
  })

  it('removes a stub whose page is gone from every version, and its folders', () => {
    const dist = site()
    canonicalize(dist)
    rmSync(join(dist, 'design-system/1.3.3/components/bar'), { recursive: true })
    canonicalize(dist)
    expect(has(dist, 'design-system/components/bar')).toBe(false)
    // Folders with other pages in them stay.
    expect(has(dist, 'design-system/components/button/index.html')).toBe(true)
  })

  it('takes a canonical back from an archived page when its live page goes', () => {
    const dist = site()
    canonicalize(dist)
    rmSync(join(dist, 'design-system/components/button'), { recursive: true })
    canonicalize(dist)
    const html = read(dist, 'design-system/2.0.0/components/button/index.html')
    expect(canonicalOf(html)).toBeUndefined()
    expect(robotsOf(html)).toBe('index,follow')
    expect(read(dist, 'design-system/components/button/index.html')).toContain('data-stub')
  })

  it('changes nothing when it is run again', () => {
    const dist = site()
    canonicalize(dist)
    const once = ['design-system/2.0.0/index.html', 'design-system/components/foo/index.html'].map(
      (path) => read(dist, path)
    )
    expect(canonicalize(dist)).toEqual({ canonical: 2, own: 3, stubs: 2 })
    expect(
      ['design-system/2.0.0/index.html', 'design-system/components/foo/index.html'].map((path) =>
        read(dist, path)
      )
    ).toEqual(once)
  })

  it('does not count a stub as a live page', () => {
    const dist = site()
    canonicalize(dist)
    // `foo` has only its stub live, so the archived pages still have no live equivalent.
    expect(canonicalOf(read(dist, 'design-system/2.0.0/components/foo/index.html'))).toBeUndefined()
    expect(robotsOf(read(dist, 'design-system/2.0.0/components/foo/index.html'))).toBe(
      'index,follow'
    )
  })
})

describe('what it leaves alone', () => {
  it('touches no live page, file that is not a page, or asset', () => {
    const dist = site({
      'design-system/assets/app.js': 'x',
      'design-system/2.0.0/assets/app.js': 'y',
    })
    const before = ['index.html', '404.html', 'versions.json', 'design-system/index.html'].map(
      (path) => read(dist, path)
    )
    canonicalize(dist)
    expect(
      ['index.html', '404.html', 'versions.json', 'design-system/index.html'].map((path) =>
        read(dist, path)
      )
    ).toEqual(before)
    expect(read(dist, 'design-system/2.0.0/index.pageContext.json')).toBe('{"a":1}')
    expect(read(dist, 'design-system/2.0.0/assets/app.js')).toBe('y')
  })

  it('does nothing to a tree with no archived versions', () => {
    const dist = tree({
      'index.html': page(''),
      'design-system/index.html': page('design-system/'),
    })
    expect(canonicalize(dist)).toEqual({ canonical: 0, own: 0, stubs: 0 })
  })

  it('handles each section on its own', () => {
    const dist = tree({
      'mcp/index.html': page('mcp/'),
      'mcp/0.1.2/index.html': archived('mcp', '0.1.2', ''),
      'mcp/0.1.2/gone/index.html': archived('mcp', '0.1.2', 'gone/'),
      'ui-spec/index.html': page('ui-spec/'),
      'ui-spec/0.1.1/gone/index.html': archived('ui-spec', '0.1.1', 'gone/'),
    })
    canonicalize(dist)
    expect(read(dist, 'mcp/gone/index.html')).toContain('url=/mcp/0.1.2/gone/')
    expect(read(dist, 'ui-spec/gone/index.html')).toContain('url=/ui-spec/0.1.1/gone/')
  })

  it('adds the head tags an archived page lacks', () => {
    const dist = tree({
      'design-system/index.html': page('design-system/'),
      'design-system/2.0.0/index.html': '<html><head><title>t</title></head><body></body></html>',
      'design-system/2.0.0/a/index.html': '<html><head></head><body></body></html>',
    })
    canonicalize(dist)
    const html = read(dist, 'design-system/2.0.0/index.html')
    expect(canonicalOf(html)).toBe(`${SITE_URL}/design-system/`)
    expect(ogUrlOf(html)).toBe(`${SITE_URL}/design-system/`)
    expect(robotsOf(html)).toBe('noindex,follow')
    expect(robotsOf(read(dist, 'design-system/2.0.0/a/index.html'))).toBe('index,follow')
  })
})

describe('the check at the end', () => {
  it('throws for a canonical that is not a page', () => {
    const dist = site({
      'design-system/broken/index.html': page('design-system/broken/', {
        canonical: `${SITE_URL}/design-system/nowhere/`,
      }),
    })
    expect(() => canonicalize(dist)).toThrow(
      /broken\/index.html: canonical .*nowhere\/ is not a page/
    )
  })

  it('throws for a live page that is noindex', () => {
    const dist = site({
      'design-system/hidden/index.html': page('design-system/hidden/', {
        robots: 'noindex,follow',
      }),
    })
    expect(() => canonicalize(dist)).toThrow(/hidden\/index.html: a live page is noindex/)
  })

  it('throws for a stub that leads nowhere', () => {
    const dist = site({
      'other/lost/index.html':
        '<html data-stub><head><meta http-equiv="refresh" content="0; url=/design-system/9.9.9/lost/" /></head></html>',
    })
    expect(() => canonicalize(dist)).toThrow(
      /lost\/index.html: stub leads to \/design-system\/9.9.9\/lost\//
    )
  })

  it('throws for a stub with no target at all', () => {
    const dist = site({ 'other/lost/index.html': '<html data-stub><head></head></html>' })
    expect(() => canonicalize(dist)).toThrow(/lost\/index.html: stub leads to/)
  })
})

describe('compareSemver', () => {
  it('orders versions as numbers, not as text', () => {
    expect(['1.10.0', '1.9.0', '1.9.1'].sort(compareSemver)).toEqual(['1.9.0', '1.9.1', '1.10.0'])
    expect(compareSemver('2.0.0', '2.0.0')).toBe(0)
  })
})

describe('from the command line', () => {
  it('canonicalizes the tree it is given and says what it did', async () => {
    const dist = site()
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const argv = process.argv
    process.argv = [argv[0], SCRIPT, dist]
    try {
      await import(`${pathToFileURL(SCRIPT).href}?cli`)
    } finally {
      process.argv = argv
    }
    expect(log).toHaveBeenCalledWith(
      'canonicalize: 2 archived pages point at the live page, 3 are their own, 2 stubs'
    )
    expect(has(dist, 'design-system/components/foo/index.html')).toBe(true)
    log.mockRestore()
  })
})
