import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // The JavaScript templates are made from the TypeScript ones, not kept: made here first.
    globalSetup: ['./scripts/gen-templates.setup.mjs'],
    // type-tests/ holds the apps the commands write, and templates/ the files they are written
    // from - with a test of the app's own, which that app runs, not this package.
    exclude: [...configDefaults.exclude, 'type-tests/**', 'templates/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts'],
      thresholds: { 100: true },
    },
  },
})
