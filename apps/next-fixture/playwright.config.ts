import { defineConfig, devices } from '@playwright/test'
import * as process from 'node:process'

// Its own port, away from the docs app's (9998) and the dev server's (4211).
const port = 4311

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',
  use: { baseURL: `http://localhost:${port}`, trace: 'on-first-retry', headless: true },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // The production build is what ships: test that, with the server the app would run.
    command: 'pnpm build && pnpm start',
    port,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
})
