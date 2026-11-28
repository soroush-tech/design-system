import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    catalog: 'src/catalog/index.ts',
    'catalog/entries': 'src/catalog/entries/index.ts',
    theme: 'src/theme/index.ts',
    breakpoints: 'src/breakpoints/index.ts',
    utils: 'src/utils/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
})
