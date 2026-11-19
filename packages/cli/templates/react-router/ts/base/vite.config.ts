import react from '@vitejs/plugin-react'
// @if msw
import { msw } from 'msw/vite'
// @endif
import { defineConfig } from 'vite'

export default defineConfig({
  // @if msw
  plugins: [react(), msw({ mode: 'worker-only' })],
  // @else
  plugins: [react()],
  // @endif
})
