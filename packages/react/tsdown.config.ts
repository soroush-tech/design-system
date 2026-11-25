import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsdown'

// One build entry per published export of package.json, so the list of entry points is kept once:
// `./Button` is `src/Button/index.ts`, built to `dist/Button.*`, and `.` is `index`. The source-only
// `./utils/test/*` helpers of the stories are not published, so they are not built.
const { exports, publishConfig } = JSON.parse(
  readFileSync(fileURLToPath(new URL('package.json', import.meta.url)), 'utf8')
) as { exports: Record<string, string>; publishConfig: { exports: Record<string, unknown> } }

// A `'use client'` directive of a module that is not an entry is dropped by the bundler, and an
// app's bundler needs it on the first line of the file that holds the code. A chunk made of a module
// that has the directive gets it back, and so does the entry file of a folder that holds such a
// module (an entry that only re-exports a shared chunk): a file is client code or it is not, and
// the source keeps the fact in one place, the first line of a module.
const clientModules = new Set<string>()
const posix = (id: string) => id.replaceAll('\\', '/')
const hasClientModule = (folder: string) => [...clientModules].some((id) => id.startsWith(folder))
const keepUseClient = {
  name: 'keep-use-client',
  transform: {
    filter: { code: /^\s*(?:\/\*[\s\S]*?\*\/\s*)?['"]use client['"]/ },
    handler(_code: string, id: string) {
      clientModules.add(posix(id))
      return null
    },
  },
  renderChunk(
    code: string,
    chunk: { moduleIds: string[]; facadeModuleId: string | null; name: string }
  ) {
    const index = chunk.facadeModuleId && posix(chunk.facadeModuleId)
    const isClient =
      chunk.moduleIds.some((id) => clientModules.has(posix(id))) ||
      (chunk.name !== 'index' &&
        index?.endsWith('/index.ts') === true &&
        hasClientModule(index.slice(0, index.lastIndexOf('/') + 1)))
    return isClient && !code.startsWith('"use client"') ? `"use client";\n${code}` : null
  },
}

export default defineConfig({
  entry: Object.fromEntries(
    Object.entries(exports)
      .filter(([subpath]) => subpath in publishConfig.exports)
      .map(([subpath, file]) => [subpath === '.' ? 'index' : subpath.slice(2), file])
  ),
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  plugins: [keepUseClient],
  // The plugin above keeps the directives, so the bundler's warning about them says nothing new.
  inputOptions: {
    onLog(level, log, defaultHandler) {
      if (log.code !== 'MODULE_LEVEL_DIRECTIVE') defaultHandler(level, log)
    },
  },
})
