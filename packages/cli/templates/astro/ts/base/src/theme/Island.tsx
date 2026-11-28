// @if tanstack-query
import { useState, type ComponentType, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
// @else
import type { ComponentType, ReactNode } from 'react'
// @endif
// @if redux-toolkit
import { Provider as StoreProvider } from 'react-redux'
// @endif
import { ThemeProvider } from '@gild-ui/react'
// @if tanstack-query
import { getQueryClient } from '../data/queryClient'
// @endif
// @if redux-toolkit
import { store } from '../state/store'
// @endif
// @if !ssg
import { useScheme } from './scheme'
// @endif
import themes from './themes'

/**
// @if tanstack-query && redux-toolkit
 * What every island renders inside: its theme, the query client and the Redux store. Astro
 * renders each island as a React root of its own, so each one renders inside Island, and in the
 * browser they share one client and one store; the header's Providers draw the base styles.
// @elif tanstack-query
 * What every island renders inside: its theme and the query client. Astro renders each island as
 * a React root of its own, so each one renders inside Island, and in the browser they share one
 * client; the header's Providers draw the base styles.
// @elif redux-toolkit
 * What every island renders inside: its theme and the Redux store. Astro renders each island as a
 * React root of its own, so each one renders inside Island, and they share one store; the
 * header's Providers draw the base styles.
// @else
 * What every island renders inside: its theme. Astro renders each island as a React root of its
 * own, so each one renders inside Island; the header's Providers draw the base styles, once a page.
// @endif
 */
// @if ssg
function Island({ children }: { readonly children: ReactNode }) {
  return <ThemeProvider theme={themes.__SCHEME__}>{children}</ThemeProvider>
}
// @elif tanstack-query && redux-toolkit
function Island({ children }: { readonly children: ReactNode }) {
  const [queryClient] = useState(getQueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <ThemeProvider theme={themes[useScheme()]}>{children}</ThemeProvider>
      </StoreProvider>
    </QueryClientProvider>
  )
}
// @elif tanstack-query
function Island({ children }: { readonly children: ReactNode }) {
  const [queryClient] = useState(getQueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themes[useScheme()]}>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}
// @elif redux-toolkit
function Island({ children }: { readonly children: ReactNode }) {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={themes[useScheme()]}>{children}</ThemeProvider>
    </StoreProvider>
  )
}
// @else
function Island({ children }: { readonly children: ReactNode }) {
  return <ThemeProvider theme={themes[useScheme()]}>{children}</ThemeProvider>
}
// @endif

/**
 * `Component` as an island: rendered inside Island, so its hooks find what Island provides. Every
 * island of the app is exported this way.
 */
export function withIsland<Props extends object>(Component: ComponentType<Props>) {
  return function InIsland(props: Props) {
    return (
      <Island>
        <Component {...props} />
      </Island>
    )
  }
}
