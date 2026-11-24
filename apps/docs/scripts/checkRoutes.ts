// Checks the built site against the list of pages the docs say it has, and fails the build on any
// difference. It reads the output on disk by exact name: a host that tells paths apart by case
// (Cloudflare Pages) finds only what is there, spelled the way the path is, which a
// case-insensitive disk (Windows, macOS) would forgive.
//
// A post-build script, like emitLlms.ts: it reads the registry out of @soroush.design/docs-content,
// whose exports are TypeScript source. Run under tsx.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { REDIRECT_LIMIT, docsPages } from '@soroush.design/docs-content'
import { loadReadme } from '@soroush.design/docs-content/node'
import { splitAccessibility } from '../src/common/readmeText'

const ORIGIN = process.env.VITE_SITE_URL ?? 'https://docs.soroush.design'

// Versioned section snapshots are noindex builds of one section: no list of pages to hold them to.
if (process.env.DOCS_SECTION) {
  console.log('routes: skipped (section snapshot build)')
} else {
  const out = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'build', 'client')
  const pages = docsPages((item) => splitAccessibility(loadReadme(item)).accessibility !== '')
  const paths = pages.map(({ path }) => path).sort()
  const problems: string[] = []

  const htmlFiles = (dir = ''): string[] =>
    readdirSync(join(out, dir), { withFileTypes: true }).flatMap((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) return entry.name === 'assets' ? [] : htmlFiles(path)
      return entry.name.endsWith('.html') ? [path.replaceAll('\\', '/')] : []
    })

  // `readdir` reports the case on disk, so this is true only for the exact spelling.
  const existsExactly = (path: string): boolean => {
    let dir = out
    for (const segment of path.split('/').filter(Boolean)) {
      if (!readdirSync(dir).includes(segment)) return false
      dir = join(dir, segment)
    }
    return existsSync(path.endsWith('/') ? join(dir, 'index.html') : dir)
  }

  const same = (label: string, found: string[]) => {
    for (const path of paths) if (!found.includes(path)) problems.push(`${label} lacks ${path}`)
    for (const path of found) if (!paths.includes(path)) problems.push(`${label} has ${path}`)
  }

  // The prerendered pages, and the sitemap, are the list.
  same(
    'the build',
    htmlFiles()
      .filter((file) => file !== '404.html')
      .map((file) => `/${file.replace(/index\.html$/, '')}`)
  )
  const sitemap = readFileSync(join(out, 'sitemap.xml'), 'utf8')
  same(
    'sitemap.xml',
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc.replace(ORIGIN, ''))
  )

  // Every link of a page, to a page of the site, is to one that is there - and not to the former
  // site's `/design-system/` paths.
  for (const file of htmlFiles()) {
    const html = readFileSync(join(out, file), 'utf8')
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      const target = href.replace(ORIGIN, '').split('#')[0].split('?')[0]
      const isPage = target.startsWith('/') && !target.startsWith('//')
      // A file of the site (an icon, a script) is not a page, and the 404 page names itself.
      if (!isPage || /\.\w+$/.test(target) || target.startsWith('/assets/')) continue
      if (file === '404.html' && target === '/404/') continue
      if (target.startsWith('/design-system/') || !existsExactly(target)) {
        problems.push(`${file} links to ${href}, which is not a page`)
      }
    }
  }

  // The redirects lead to pages, and stay within what the host takes.
  const rules = readFileSync(join(out, '_redirects'), 'utf8').trim().split('\n')
  if (rules.length > REDIRECT_LIMIT) problems.push(`_redirects has ${rules.length} rules`)
  for (const rule of rules) {
    const target = rule.split(' ')[1]
    if (!existsExactly(target)) problems.push(`_redirects: ${rule} leads to no page`)
  }

  if (problems.length) {
    throw new Error(`The built routes are not the docs' routes:\n- ${problems.join('\n- ')}`)
  }
  console.log(`routes: ${paths.length} pages, ${rules.length} redirects, no broken link`)
}
