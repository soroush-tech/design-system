// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Stub `*.svg` imports so component tests don't need the real asset transforms.
const svgMock = {
  name: 'svg-mock',
  enforce: 'pre' as const,
  resolveId(id: string) {
    if (/\.svg(\?|$)/.test(id)) return '\0virtual:svg-mock'
  },
  load(id: string) {
    if (id === '\0virtual:svg-mock') return 'export default "/mock.svg"'
  },
}

export default defineConfig({
  plugins: [svgMock],
  resolve: {
    alias: [
      { find: 'src', replacement: resolve(__dirname, './src') },
      { find: 'content', replacement: resolve(__dirname, './content') },
      { find: 'packages', replacement: resolve(__dirname, '../../packages') },
      // Mirrors the vite config: demoed stories get the inert `fn` stub here too.
      {
        find: 'storybook/test',
        replacement: resolve(__dirname, './src/demos/storybookTestStub.ts'),
      },
    ],
  },
  test: {
    globals: true,
    name: 'unit',
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['**/*.{test,spec}.@(js|jsx|ts|tsx)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/public/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.d.ts',
        '**/*.config.{ts,js}',
        'src/assets/**/*',
        'build/**/*',
        'dist/**/*',
        'public/**/*',
        '**/*.e2e.{ts,tsx}',
        'src/test/e2e/**',
        // Pages and demos are e2e-covered; prerender + Playwright gate them.
        'src/pages/**',
        'src/demos/**',
      ],
      thresholds: {
        100: true,
      },
    },
  },
})
