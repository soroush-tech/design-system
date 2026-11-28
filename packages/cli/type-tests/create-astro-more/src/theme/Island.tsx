import type { ComponentType, ReactNode } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from '@gild-ui/react'
import { store } from '../state/store'
import { useScheme } from './scheme'
import themes from './themes'

/**
 * What every island renders inside: its theme and the Redux store. Astro renders each island as a
 * React root of its own, so each one renders inside Island, and they share one store; the
 * header's Providers draw the base styles.
 */
function Island({ children }: { readonly children: ReactNode }) {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={themes[useScheme()]}>{children}</ThemeProvider>
    </StoreProvider>
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
