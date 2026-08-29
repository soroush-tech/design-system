// Vendored from the soroush.tech monorepo's private sitemap plugin, pointed at this
// site's domain. Emits sitemap.xml from Vike's prerendered output after the bundle
// closes, skipping any page whose robots meta contains noindex - which also keeps every
// versioned snapshot page out (their default robots is noindex).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve, sep } from 'node:path'
import type { Plugin } from 'vite'

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://docs.soroush.tech'

const meta = (html: string, name: string): string | undefined => {
  // Match name= or property= regardless of attribute order around content=.
  const pattern = new RegExp(
    `<meta[^>]*(?:name|property)="${name}"[^>]*content="([^"]*)"|<meta[^>]*content="([^"]*)"[^>]*(?:name|property)="${name}"`,
    'i'
  )
  const match = pattern.exec(html)
  return match ? (match[1] ?? match[2]) : undefined
}

// `about/index.html` -> `/about/`, `index.html` -> `/`.
const toPath = (relative: string): string =>
  `/${relative
    .split(sep)
    .join('/')
    .replace(/index\.html$/, '')}`

const generate = (clientDir: string): number => {
  const entries = readdirSync(clientDir, { recursive: true })
    .map(String)
    .filter((entry) => entry.endsWith('.html'))
    .map((relative) => ({ relative, html: readFileSync(resolve(clientDir, relative), 'utf8') }))
    .filter(({ html }) => !meta(html, 'robots')?.includes('noindex'))
    .map(({ relative }) => ({ loc: SITE_URL + toPath(relative) }))
    .sort((a, b) => a.loc.localeCompare(b.loc))

  if (!entries.length) return 0

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(({ loc }) => `  <url><loc>${loc}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')

  writeFileSync(resolve(clientDir, 'sitemap.xml'), xml)
  return entries.length
}

export interface SitemapOptions {
  /** Emit the sitemap only when `true`; snapshot builds pass `false`. Default: `true`. */
  enable?: boolean
}

export default function sitemap({ enable = true }: SitemapOptions = {}): Plugin {
  if (!enable) return { name: 'docs-sitemap' }

  let clientDir = ''
  return {
    name: 'docs-sitemap',
    apply: 'build',
    configResolved({ root }) {
      clientDir = resolve(root, 'build/client')
    },
    closeBundle: {
      order: 'post',
      handler() {
        const count = generate(clientDir)
        if (count) console.log(`sitemap: wrote ${count} URLs to build/client/sitemap.xml`)
      },
    },
  }
}
