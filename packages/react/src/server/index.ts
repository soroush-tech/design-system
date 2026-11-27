// Server only: collects the styles a server render used. It reads the one cache of the package, so a
// page holds each rule once; `@umber-style/server` is loaded by this entry alone, and the published
// map keeps it out of a browser build (the `browser` condition resolves to nothing).
import { createInstance } from '@umber-style/server/create-instance'
import styleCache from '../engine/styleCache'

/**
 * The server functions of the package's own cache: `extractCriticalToChunks(html)`,
 * `constructStyleTagsFromChunks(chunks)`, `extractCritical(html)` and `renderStylesToString(html)`.
 * Render the page under `<CacheProvider value={styleCache}>` first. The extraction only reads the
 * cache, so one instance serves every request, also at the same time.
 */
export const styleServer = createInstance(styleCache)
