# The server entry

`@gild-ui/react/server` collects the styles a server render used, so the HTML can carry them in its head: a Vike, Astro or other server-rendered or prerendered app, with no server components. It is for server code only: it loads `@umber-style/server`, which the package depends on, and the published package closes it to a browser build, so a client bundle that imports it fails at build time.

```ts
import { styleServer } from '@gild-ui/react/server'
```

## `styleServer`

The extraction of the library's own cache ([`styleCache`](./engine.md)). It reads the cache and changes nothing, so one instance serves every request, also at the same time.

| Function                               | Gives                                                                                         |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `extractCriticalToChunks(html)`        | The CSS the page needs, in chunks: the global rules, then the rules of the classes in `html`. |
| `constructStyleTagsFromChunks(chunks)` | The `<style data-umber>` elements of the chunks, as text, with the nonce of the cache if any. |
| `extractCritical(html)`                | The same CSS in one piece, with the ids it covers.                                            |
| `renderStylesToString(html)`           | `html` with the style elements put first: after its `<head>` when it has one.                 |

Render the page under `<CacheProvider value={styleCache}>` first, then extract:

```tsx
import { renderToString } from 'react-dom/server'
import { CacheProvider, styleCache } from '@gild-ui/react/engine'
import { styleServer } from '@gild-ui/react/server'

const html = renderToString(
  <CacheProvider value={styleCache}>
    <App />
  </CacheProvider>
)
const styles = styleServer.constructStyleTagsFromChunks(styleServer.extractCriticalToChunks(html))
// put `styles` in the head of the page, and `html` in its body
```

An app on the Next.js App Router does not use this: it collects its styles with [`StyleRegistry`](./next.md).
