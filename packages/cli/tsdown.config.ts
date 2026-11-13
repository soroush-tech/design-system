import { defineConfig } from 'tsdown'

// Node only, ESM only: the bin has a top-level await, and the entry is imported by the design
// system's own bin, which is ESM too. The bin reads two fields of the design system's package.json
// at build time; the bundler keeps only those.
export default defineConfig({
  entry: { index: 'src/index.ts', bin: 'src/bin.ts' },
  format: ['esm'],
  platform: 'node',
  dts: true,
  clean: true,
})
