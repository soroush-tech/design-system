// Set up by @soroush.tech/design-system init. The app's root renders inside Providers.
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { Global, globalStyles } from '@soroush.tech/design-system/engine'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
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
