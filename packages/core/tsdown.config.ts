import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { catalog: 'src/catalog/index.ts', 'catalog/entries': 'src/catalog/entries/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
})
