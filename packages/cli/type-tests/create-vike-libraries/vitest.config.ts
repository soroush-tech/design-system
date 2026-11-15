import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// The tests render components in jsdom, with no Vike: a page is a component like any other.
export default defineConfig({
  plugins: [react()],
  // The mock API answers the tests' requests, from Node, as it answers the app's in the browser.
  test: { environment: 'jsdom', setupFiles: ['./src/mocks/setupTests.ts'] },
})
