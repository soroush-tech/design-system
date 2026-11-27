import { configure } from '@umber-style/react'
import { baseTheme } from '@gild-ui/core/theme'
import styleCache from '../engine/styleCache'

let isConfigured = false

/**
 * Sets the engine up for this package, once, before its first `styled` call. It is a function the
 * importing module calls, not a module that configures on import: the package is marked free of
 * side effects, so a bundler drops an import that is there only for its effect.
 *
 * `cache` is the library's own, so the engine and the `CacheProvider` an app renders over
 * `styleCache` write to one cache, which holds the style options (the style memo, the colour fallbacks) and the page's nonce.
 *
 * `modes` makes a token a real value, not a CSS variable, where its value is a CSS-wide keyword:
 * `text.inherit` is `inherit`, and as a variable it would take the value of the same variable on
 * the parent, which is nothing.
 *
 * `rawKeys` are the theme keys a style function reads as real values, not as CSS variables: the
 * ones that hold names, steps of another scale, or numbers used in JavaScript.
 *
 * `theme` is the library's own, so a server component renders with the built-in theme in an app
 * that registers none; `registerBaseTheme` replaces it.
 */
export function configureEngine(): void {
  if (isConfigured) return
  isConfigured = true
  configure({
    cache: styleCache,
    theme: baseTheme as never,
    modes: { 'text.inherit': 'raw' },
    rawKeys: [
      'breakpoints',
      'components',
      'defaults',
      'transitions',
      'sizes',
      'typography',
      'layout',
    ],
  })
}
