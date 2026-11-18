import react from '@vitejs/plugin-react'
import { msw } from 'msw/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), msw({ mode: 'worker-only' })],
})
