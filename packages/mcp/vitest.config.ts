import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // The content bundle is a build artifact, so regenerate it before the suite runs -
    // a bare `pnpm test` (the pre-commit hook) must work from a clean checkout.
    globalSetup: ['./src/test/generateContent.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/generated/**', 'src/test/**', 'src/**/*.test.ts'],
      thresholds: { 100: true },
    },
  },
})
