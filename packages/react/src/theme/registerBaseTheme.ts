import { getEngine } from '@umber-style/react'
import { configureEngine } from '../style/engine'
import type { Theme } from './themes'

/**
 * Gives the engine the app's base theme, once, at module level. A server component has no provider
 * above it to read: `useTheme()` and the styles of every static component read this theme there,
 * with `components` and `defaults` as real values and the tokens as CSS variables. A client
 * component without a provider above it reads it too.
 *
 * Call it from the module that defines the app's themes, which the root layout (a server component)
 * and the client bundle both import, with the theme the app starts in: the tokens are variables,
 * so the page's theme (light or dark) decides their values, but `components` and `defaults` come
 * from this theme.
 */
export function registerBaseTheme(theme: Theme): void {
  configureEngine()
  getEngine().setTheme(theme as never)
}
