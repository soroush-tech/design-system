import { defineConfig } from 'tsdown'

// Two builds: the programmatic API ships dual ESM/CJS, while the stdio bin is ESM-only
// because its top-level await has no CJS equivalent. `bin` in package.json points at
// dist/bin.mjs, so no CJS copy is needed. The Worker entry is bundled by wrangler
// instead, and the pipeline never ships - it runs at build time only.
export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
  },
  {
    entry: { bin: 'src/bin.ts' },
    format: ['esm'],
    dts: false,
    clean: false,
  },
])
