# The engine entry

`@gild-ui/react/engine` holds the primitives of the styling engine that an app uses to style the page itself. Most apps need only `Global` and `globalStyles`; the cache provider and the nonce source are for server rendering.

```ts
import { Global } from '@gild-ui/react'
import { globalStyles, CacheProvider, styleCache, setNonceSource } from '@gild-ui/react/engine'
```

An app never imports the engine itself: what it needs from it is exported here and from the other entries of this package, and there is one cache.

## `Global` and `globalStyles`

`Global` applies app-wide CSS and is typed against this package's `Theme`. Render it inside `ThemeProvider`, so what it reads resolves against the active theme.

`globalStyles(theme)` is the base reset the library owns: box-sizing, margin and table resets, and theme-driven body colors. Compose it into your own styles; the font family, webfont loading and everything else app-specific stay yours.

```tsx
import { ThemeProvider } from '@gild-ui/react'
import { Global } from '@gild-ui/react'
import { globalStyles } from '@gild-ui/react/engine'

;<ThemeProvider theme={theme}>
  <Global styles={globalStyles} />
  <App />
</ThemeProvider>
```

## `CacheProvider` and `styleCache`

For server rendering and critical-CSS extraction. `styleCache` is the library's one cache, and the one its own engine writes to; `CacheProvider` makes a cache the one the components write to. Render the page under `<CacheProvider value={styleCache}>` and extract the styles it used with `styleServer` from [`@gild-ui/react/server`](./server.md). The provider, the extraction and the engine's styles share one cache, so a page holds each rule once and a development message is logged once. Without the provider, extraction finds nothing and every styled element sends its own `<style>` element instead.

There is no way to make a second cache: a second cache would write each rule twice. An app that does not render on the server does not use these.

## `setNonceSource`

For a strict style policy (`style-src 'nonce-...'` with no `'unsafe-inline'`) on a server that makes a nonce for each request. `setNonceSource(read)` tells the engine where the nonce of the current request is: `read` returns the nonce, or a promise of it, or `undefined`. Call it once, at module level, before the first render.

```ts
import { setNonceSource } from '@gild-ui/react/engine'
import { headers } from 'next/headers'

setNonceSource(async () => (await headers()).get('x-nonce') ?? undefined)
```

The App Router recipe, with the middleware that makes the nonce, is in the setup guide of the package (`docs/consumer/setup.md`): it pairs this with `StyleRegistry` from [`@gild-ui/react/next`](./next.md).
