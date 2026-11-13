import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'tsdown'

// One entry per directory that exposes an index.ts - including nested component
// folders (Table/TableCell, Markdown/Editor, ...) - so the `"./*"` publishConfig
// wildcard resolves every subpath the monorepo's source wildcard already serves.
// `utils/test` story helpers and `__mocks__` have no index.ts and are never built.
const collectFolderEntries = (dir: string): [string, string][] =>
  readdirSync(join('src', dir), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const subpath = dir ? `${dir}/${entry.name}` : entry.name
      const hasIndex = readdirSync(join('src', subpath)).includes('index.ts')
      return [
        ...(hasIndex ? [[subpath, `src/${subpath}/index.ts`] as [string, string]] : []),
        ...collectFolderEntries(subpath),
      ]
    })

// Two builds: the browser entries ship dual ESM/CJS, while the `init` command line is one
// ESM-only Node file, as packages/mcp builds its bin. `src/cli` has no index.ts, so the first
// build never picks it up as an entry.
export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      ...Object.fromEntries(collectFolderEntries('')),
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
  },
  {
    entry: { bin: 'src/cli/bin.ts' },
    format: ['esm'],
    platform: 'node',
    dts: false,
    clean: false,
  },
])
