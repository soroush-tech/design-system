'use client'

import type { ReactNode } from 'react'
// The client bundle registers the app's base theme here, before any client component below renders:
// `components` holds functions, which cannot cross from the server, so the browser (and the
// server render of client components) take them from this module.
import './theme'

export function Providers({ children }: { children: ReactNode }) {
  return children
}
