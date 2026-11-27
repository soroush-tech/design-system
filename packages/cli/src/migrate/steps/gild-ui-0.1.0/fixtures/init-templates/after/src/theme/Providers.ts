// Set up by @soroush.tech/design-system init. The app's root renders inside Providers.
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { Global } from '@gild-ui/react/Global'
import { globalStyles } from '@gild-ui/react/engine'
import { ThemeProvider } from '@gild-ui/react/ThemeProvider'
import themes from './themes.ts'

/** Gives every component its theme, and draws the page's base styles. */
export function Providers({ children }: { readonly children?: ReactNode }) {
  return createElement(
    ThemeProvider,
    { theme: themes.light },
    createElement(Global, { styles: globalStyles }),
    children
  )
}
