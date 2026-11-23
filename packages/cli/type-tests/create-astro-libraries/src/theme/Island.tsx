import { useState, type ComponentType, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@soroush.design/react-components/theme'
import { getQueryClient } from '../data/queryClient'
import { useScheme } from './scheme'
import themes from './themes'

/**
 * What every island renders inside: its theme and the query client. Astro renders each island as
 * a React root of its own, so each one renders inside Island, and in the browser they share one
 * client; the header's Providers draw the base styles.
 */
function Island({ children }: { readonly children: ReactNode }) {
  const [queryClient] = useState(getQueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themes[useScheme()]}>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}

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
