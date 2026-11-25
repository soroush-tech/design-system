'use client'

import type { ReactNode } from 'react'
// The browser's bundle, and the server render of client components, register the app's base theme
// here, before any client component below renders. `components` holds functions, which cannot
// cross from the server to the browser, so the client side takes them from this module.
import '@/theme'

export default function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
