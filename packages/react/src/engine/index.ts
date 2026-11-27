// Raw engine escape hatches - most apps only need `Global` + `globalStyles` to render
// their own global styles. `CacheProvider` + `styleCache` are for server rendering: the one cache the
// engine and the components write to, and the one the extraction of `@gild-ui/react/server` reads.
// `setNonceSource` gives a strict style policy its per-request nonce. There is no `createCache`: a
// second cache would write each rule twice.
export { setNonceSource } from '@umber-style/react'
export { CacheProvider } from '../theme/engine.client'
export { default as styleCache } from './styleCache'
export { globalStyles } from './globalStyles'
