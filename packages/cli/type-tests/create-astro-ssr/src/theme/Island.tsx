import type { ComponentType, ReactNode } from 'react'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import { useScheme } from './scheme'
import themes from './themes'

/**
 * What every island renders inside: its theme. Astro renders each island as a React root of its
 * own, so each one renders inside Island; the header's Providers draw the base styles, once a page.
 */
function Island({ children }: { readonly children: ReactNode }) {
  return <ThemeProvider theme={themes[useScheme()]}>{children}</ThemeProvider>
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
