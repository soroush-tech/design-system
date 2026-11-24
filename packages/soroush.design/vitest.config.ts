import { defineConfig } from 'vitest/config'

// src/ holds only generated one-line re-exports, so a test that imports every entry point is
// what runs them; libraries.ts says what is generated, and the generator is
// @soroush.design/umbrella-gen.
// scripts/gen.ts only calls its run().
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    globalSetup: ['./test/build.ts'],
    include: ['{src,scripts,test}/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts', 'scripts/**/*.ts', 'libraries.ts'],
      exclude: ['**/*.test.ts', 'scripts/gen.ts'],
      thresholds: { 100: true },
    },
  },
})
