// Writes the `_redirects` file of the build: Cloudflare Pages tells paths apart by case, so a
// component's page is `/react/Button/` and `/react/button/` goes there. The rules come from the
// same list of pages the sitemap and the route checks read.
//
// A post-build script, like emitLlms.ts: it reads the registry out of @gild-ui/docs-content,
// whose exports are TypeScript source. Run under tsx.
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { docsPages, renderRedirects } from '@gild-ui/docs-content'
import { loadReadme } from '@gild-ui/docs-content/node'
import { splitAccessibility } from '../src/common/readmeText'

// Versioned section snapshots serve one section from the domain root and are noindex by design.
if (process.env.DOCS_SECTION) {
  console.log('redirects: skipped (section snapshot build)')
} else {
  const pages = docsPages((item) => splitAccessibility(loadReadme(item)).accessibility !== '')
  const clientDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'build', 'client')
  const redirects = renderRedirects(pages)
  writeFileSync(resolve(clientDir, '_redirects'), redirects)
  console.log(
    `redirects: wrote ${redirects.trim().split('\n').length} rules to build/client/_redirects`
  )
}
