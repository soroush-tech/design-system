import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// The tests render components in jsdom, with no router: a page is a component like any other.
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom' },
})
