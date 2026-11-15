import react from '@vitejs/plugin-react'
import { msw } from 'msw/vite'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [react(), vike(), msw({ mode: 'worker-only' })],
})
