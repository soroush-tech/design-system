import react from '@astrojs/react'
import { msw } from 'msw/vite'
import { defineConfig } from 'astro/config'

// The settings of the app: https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  integrations: [react()],
  // msw's plugin serves the mock API's worker, in development and in the build.
  vite: { plugins: [msw({ mode: 'worker-only' })] },
})
