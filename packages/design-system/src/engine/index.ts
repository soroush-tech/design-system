// Raw engine escape hatches - most apps only need `Global` + `globalStyles` to render
// their own global styles. `CacheProvider` + `styleCache` are SSR-only, for critical-CSS
// extraction (e.g. `@emotion/server`); `createCache` makes a cache of an app's own, so an
// app never installs an Emotion package itself.
export { default as createCache } from '@emotion/cache'
export { Global, CacheProvider } from '../theme/emotion'
export { default as styleCache } from './styleCache'
export { globalStyles } from './globalStyles'
