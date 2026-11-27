import { defineConfig } from 'tsdown'

// Node only, ESM only: the bin has a top-level await, and the entry is imported by the design
// system's own bin, which is ESM too. The bin reads two fields of Gild UI's package.json
// at build time; the bundler keeps only those.
export default defineConfig({
  entry: { index: 'src/index.ts', bin: 'src/bin.ts' },
  format: ['esm'],
  platform: 'node',
  // The migration step reads source with @babel/parser, a development dependency inlined here, so the
  // command line installs nothing: listing it says the inlining is on purpose.
  deps: { onlyBundle: ['@babel/parser'] },
  dts: true,
  clean: true,
})
