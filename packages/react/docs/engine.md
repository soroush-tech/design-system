# The engine entry

`@soroush.design/react/engine` holds the primitives of the styling engine that an app uses to style the page itself. Most apps need only `Global` and `globalStyles`; the cache pair is for server rendering.

```ts
import { Global } from '@soroush.design/react'
import { globalStyles, CacheProvider, styleCache, createCache } from '@soroush.design/react/engine'
```

## `Global` and `globalStyles`

`Global` applies app-wide CSS and is typed against this package's `Theme`. Render it inside `ThemeProvider`, so what it reads resolves against the active theme.

`globalStyles(theme)` is the base reset the library owns: box-sizing, margin and table resets, and theme-driven body colors. Compose it into your own styles; the font family, webfont loading and everything else app-specific stay yours.

```tsx
import { ThemeProvider } from '@soroush.design/react'
import { Global } from '@soroush.design/react'
import { globalStyles } from '@soroush.design/react/engine'

;<ThemeProvider theme={theme}>
  <Global styles={globalStyles} />
  <App />
</ThemeProvider>
```

## `CacheProvider`, `styleCache` and `createCache`

For server rendering and critical-CSS extraction. `styleCache` is the library's own cache; `CacheProvider` makes a cache the one the components write to; `createCache` makes a cache of an app's own, so an app never installs an engine package itself. The one package an app adds for extraction is `@umber-style/server`. Render the page under `<CacheProvider value={styleCache}>` and extract with `createInstance(styleCache)`. `styleCache` is also the cache the library's own engine writes to, so the provider, the extraction and the engine's styles share one cache: a page holds each rule once and a development message is logged once. Without the provider, extraction finds nothing and every styled element sends its own `<style>` element instead. A cache from `createCache` is a cache of the app's own: the components of this package write to `styleCache`, or to the cache a `CacheProvider` gives them.

An app that does not render on the server does not use these.
