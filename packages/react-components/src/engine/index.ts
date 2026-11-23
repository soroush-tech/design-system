// Raw engine escape hatches - most apps only need `Global` + `globalStyles` to render
// their own global styles. `CacheProvider` + `styleCache` are SSR-only, for critical-CSS
// extraction (e.g. a server-side style extractor); `createCache` makes a cache of an app's own, so an
// app never installs an engine package itself.
export { default as createCache } from '@umber-style/cache'
export { Global, CacheProvider } from '../theme/engine'
export { default as styleCache } from './styleCache'
export { globalStyles } from './globalStyles'
