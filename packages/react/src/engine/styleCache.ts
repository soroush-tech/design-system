import { createCache } from '@umber-style/cache'

export { createCache }

/**
 * The library's own cache, and the one the engine writes to: `configureEngine` gives it to the
 * engine, so a `CacheProvider` over it, the extraction with `createInstance(styleCache)` and the
 * engine's own styles share one cache, and a page holds each rule once.
 *
 * `hasStyleMemo` and `hasColorFallbacks` are the engine's too, and are given here: an engine given a cache
 * with other style options than its own writes through a second view of the cache, which does not know
 * the rules the page's server style elements already hold, so the browser would write each of them
 * again. A style that is a function of props comes back with the same contents on every render, and
 * the memo skips compiling it again; no style needs value repair, so it is left off, and the
 * memo can run. `alpha()` is written as `color-mix()` alone, with no solid fallback before it: a
 * browser without `color-mix()` drops the tint, where a fallback would paint it opaque.
 *
 * `nonce` is the page's own, read from its scripts so the style element passes a style policy that
 * allows style elements by nonce. It is the `nonce` property, never the attribute, which the
 * browser hides once the page has loaded. An empty string means no nonce.
 */
export default createCache({
  key: 'soroush',
  hasStyleMemo: true,
  hasColorFallbacks: false,
  nonce:
    typeof document === 'undefined'
      ? undefined
      : document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce || undefined,
})
