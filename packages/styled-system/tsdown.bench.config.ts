import { defineConfig } from 'tsdown'

// The bench loads a build in plain Node, where the workspace's core is TypeScript source: this
// build inlines it. It exists for the bench alone and is never published.
export default defineConfig({
  entry: { color: 'src/color/index.ts' },
  format: ['esm', 'cjs'],
  outDir: 'bench/dist',
  noExternal: [/^@soroush\.design\/core\//],
  clean: true,
})
