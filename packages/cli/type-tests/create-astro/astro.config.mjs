import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

// The settings of the app: https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  integrations: [react()],
})
