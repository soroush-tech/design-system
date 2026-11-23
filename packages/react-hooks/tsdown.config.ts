import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsdown'

// One build entry per export of package.json, so the list of hooks is kept once: `./useDebounce`
// is `src/useDebounce.ts`, built to `dist/useDebounce.*`, and `.` is `index`.
const { exports } = JSON.parse(
  readFileSync(fileURLToPath(new URL('package.json', import.meta.url)), 'utf8')
) as {
  exports: Record<string, string>
}

export default defineConfig({
  entry: Object.fromEntries(
    Object.entries(exports).map(([subpath, file]) => [
      subpath === '.' ? 'index' : subpath.slice(2),
      file,
    ])
  ),
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
})
