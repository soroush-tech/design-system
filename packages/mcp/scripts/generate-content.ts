// Writes the content bundle the server ships. Run by `pnpm gen`, and by the vitest
// global setup so a bare `pnpm test` works from a clean checkout.
//
//   pnpm gen                    write src/generated/content.ts
//   pnpm gen -- --plugin        also refresh the Claude Code plugin's references
//   pnpm gen -- --plugin --check  fail if those committed references have drifted
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { emitContent } from '../src/pipeline/emit'
import { syncPluginReferences } from '../src/pipeline/plugin'

const here = dirname(fileURLToPath(import.meta.url))
const check = process.argv.includes('--check')
const plugin = process.argv.includes('--plugin')

const content = await emitContent(join(here, '..', 'src', 'generated', 'content.ts'))

console.log(
  `content: ${content.components.length} components, ${content.docs.length} docs, ${content.tokens.length} token scales`
)

if (plugin) {
  const { stale } = syncPluginReferences(content, check)
  if (!check) {
    console.log(stale.length ? `plugin: synced ${stale.join(', ')}` : 'plugin: already up to date')
  } else if (stale.length) {
    console.error(
      `Plugin references are stale (${stale.join(', ')}). Run \`pnpm --filter @soroush.tech/mcp gen -- --plugin\` and commit.`
    )
    process.exit(1)
  } else {
    console.log('plugin: references are up to date.')
  }
}
