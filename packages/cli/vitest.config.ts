import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // type-tests/ holds the apps the commands write - one of them with a test of its own, which
    // that app runs, not this package.
    exclude: [...configDefaults.exclude, 'type-tests/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts'],
      thresholds: { 100: true },
    },
  },
})
