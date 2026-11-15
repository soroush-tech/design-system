/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

// The tests render components in jsdom, through the app's own Vite settings, as Astro builds them.
export default getViteConfig({
  test: { environment: 'jsdom' },
})
