import { configure } from '@umber-style/react'

let isConfigured = false

/**
 * Sets the engine up for this package, once, before its first `styled` call. It is a function the
 * importing module calls, not a module that configures on import: the package is marked free of
 * side effects, so a bundler drops an import that is there only for its effect.
 *
 * `rawKeys` are the theme keys a style function reads as real values, not as CSS variables: the
 * ones that hold names, steps of another scale, or numbers used in JavaScript.
 *
 * Rules are inserted directly, in development as in production, because writing them as text makes
 * the document parse the whole sheet again on every rule (seconds in a test run, and noticeable in
 * a browser once an app has a few thousand rules). The rules are still read through the style
 * sheet's rule list.
 */
export function configureEngine(): void {
  if (isConfigured) return
  isConfigured = true
  configure({
    prefix: 'soroush',
    hasValueRepair: true,
    hasRuleText: false,
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
