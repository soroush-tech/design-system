import react from '@vitejs/plugin-react'
// @if msw
import { msw } from 'msw/vite'
// @endif
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  // @if msw
  plugins: [react(), vike(), msw({ mode: 'worker-only' })],
  // @else
  plugins: [react(), vike()],
  // @endif
})
