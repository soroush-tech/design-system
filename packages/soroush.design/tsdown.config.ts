import { globSync } from 'node:fs'
import { defineConfig } from 'tsdown'

// Every file under src/ is one generated entry point (see @soroush.design/umbrella-gen), so the build
// reads the folder instead of keeping a second list. There is no root entry. The platform behind
// each entry stays an import: this package bundles none of it.
const entries = globSync('src/**/*.ts').map((file) => file.replaceAll('\\', '/'))

export default defineConfig({
  entry: Object.fromEntries(
    entries.map((file) => [file.slice('src/'.length, -'.ts'.length), file])
  ),
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
})
