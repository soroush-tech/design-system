/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

// The tests render components in jsdom, through the app's own Vite settings, as Astro builds them.
export default getViteConfig({
  // @if msw
  // The mock API answers the tests' requests, from Node, as it answers the app's in the browser.
  test: { environment: 'jsdom', setupFiles: ['./src/mocks/setupTests.ts'] },
  // @else
  test: { environment: 'jsdom' },
  // @endif
})
