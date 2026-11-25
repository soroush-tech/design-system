import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsdown'

// One build entry per published export of package.json, so the list of entry points is kept once:
// `./Button` is `src/Button/index.ts`, built to `dist/Button.*`, and `.` is `index`. The source-only
// `./utils/test/*` helpers of the stories are not published, so they are not built.
const { exports, publishConfig } = JSON.parse(
  readFileSync(fileURLToPath(new URL('package.json', import.meta.url)), 'utf8')
) as { exports: Record<string, string>; publishConfig: { exports: Record<string, unknown> } }

export default defineConfig({
  entry: Object.fromEntries(
    Object.entries(exports)
      .filter(([subpath]) => subpath in publishConfig.exports)
      .map(([subpath, file]) => [subpath === '.' ? 'index' : subpath.slice(2), file])
  ),
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
})
