// @if ssr
import node from '@astrojs/node'
// @endif
import react from '@astrojs/react'
// @if msw
import { msw } from 'msw/vite'
// @endif
import { defineConfig } from 'astro/config'

// The settings of the app: https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // @if ssr
  // SSR: every page is rendered on the server, on each request, by the Node server the build
  // writes: npm start.
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  // @endif
  integrations: [react()],
  // @if msw
  // msw's plugin serves the mock API's worker, in development and in the build.
  vite: { plugins: [msw({ mode: 'worker-only' })] },
  // @endif
})
