import { createCache } from '@umber-style/cache'

export { createCache }

/**
 * The library's own cache, and the one the engine writes to: `configureEngine` gives it to the
 * engine, so a `CacheProvider` over it, the extraction with `createInstance(styleCache)` and the
 * engine's own styles share one cache, and a page holds each rule once.
 *
 * `hasValueRepair` is the engine's too, and is given here: an engine given a cache with other style
 * options than its own writes through a second view of the cache, which does not know the rules the
 * page's server style elements already hold, so the browser would write each of them again.
 *
 * `nonce` is the page's own, read from its scripts so the style element passes a style policy that
 * allows style elements by nonce. It is the `nonce` property, never the attribute, which the
 * browser hides once the page has loaded. An empty string means no nonce.
 */
export default createCache({
  key: 'soroush',
  hasValueRepair: true,
  nonce:
    typeof document === 'undefined'
      ? undefined
      : document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce || undefined,
})
