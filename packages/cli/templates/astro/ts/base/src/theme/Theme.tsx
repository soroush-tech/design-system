import type { ReactNode } from 'react'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
// @if !ssg
import { useScheme } from './scheme'
// @endif
import themes from './themes'

/**
 * The theme of an island. Astro renders each island as a React root of its own, so each page's
 * component renders inside Theme; the header's Providers draw the base styles, once a page.
 */
export function Theme({ children }: { readonly children: ReactNode }) {
  // @if ssg
  return <ThemeProvider theme={themes.__SCHEME__}>{children}</ThemeProvider>
  // @else
  return <ThemeProvider theme={themes[useScheme()]}>{children}</ThemeProvider>
  // @endif
}
