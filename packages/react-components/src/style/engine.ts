import { configure } from '@umber-style/react'

let isConfigured = false

/**
 * Sets the engine up for this package, once, before its first `styled` call. It is a function the
 * importing module calls, not a module that configures on import: the package is marked free of
 * side effects, so a bundler drops an import that is there only for its effect.
 *
 * `nonce` is the page's own, read from its scripts so the engine's style element passes a style
 * policy that allows style elements by nonce. It is the `nonce` property, never the attribute,
 * which the browser hides once the page has loaded. An empty string means no nonce.
 *
 * `rawKeys` are the theme keys a style function reads as real values, not as CSS variables: the
 * ones that hold names, steps of another scale, or numbers used in JavaScript.
 */
export function configureEngine(): void {
  if (isConfigured) return
  isConfigured = true
  const nonce =
    typeof document === 'undefined'
      ? undefined
      : document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce || undefined
  configure({
    prefix: 'soroush',
    hasValueRepair: true,
    nonce,
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
