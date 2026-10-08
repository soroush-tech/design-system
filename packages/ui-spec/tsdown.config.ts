import { defineConfig } from 'tsdown'

// The vendored A2UI schemas and the behavior schema are imported as JSON, so the bundler
// inlines them: `dist` carries no path back into `vendor/`.
export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
})
