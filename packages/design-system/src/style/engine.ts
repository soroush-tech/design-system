import { configure } from '@umber-style/react'

let isConfigured = false

/**
 * Sets the engine up for this package, once, before its first `styled` call. It is a function the
 * importing module calls, not a module that configures on import: the package is marked free of
 * side effects, so a bundler drops an import that is there only for its effect.
 *
 * `rawKeys` are the theme keys a style function reads as real values, not as CSS variables: the
 * ones that hold names, steps of another scale, or numbers used in JavaScript.
 */
export function configureEngine(): void {
  if (isConfigured) return
  isConfigured = true
  configure({
    prefix: 'soroush',
    hasValueRepair: true,
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
