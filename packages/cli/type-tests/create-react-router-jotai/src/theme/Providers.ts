// Set up by @soroush.tech/design-system init. The app's root renders inside Providers.
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { Global, globalStyles } from '@soroush.tech/design-system/engine'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import themes from './themes'

/** Gives every component its theme, and draws the page's base styles. */
export function Providers({
  children,
  scheme = 'light',
}: {
  readonly children?: ReactNode
  /** The theme to draw with, by its name in themes. */
  readonly scheme?: keyof typeof themes
}) {
  return createElement(
    ThemeProvider,
    { theme: themes[scheme] },
    createElement(Global, { styles: globalStyles }),
    children
  )
}
