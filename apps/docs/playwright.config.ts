import { defineConfig, devices } from '@playwright/test'
import * as process from 'node:process'

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.e2e.ts',
  tsconfig: './tsconfig.app.json',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:9998',
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Always test the prerendered production output - the docs site ships static.
    command: 'pnpm build && pnpm preview:e2e',
    port: 9998,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
