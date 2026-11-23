import createStyleServer from '@umber-style/server/create-instance'
import { renderToString } from 'react-dom/server'
import { styleCache } from '@soroush.design/react-components/engine'
import { dangerouslySkipEscape, escapeInject } from 'vike/server'
import type { OnRenderHtmlSync } from 'vike/types'
import { PageShell } from './PageShell'

/**
 * Renders the page to HTML - on the server, on each request - with the styles it uses in the
 * head, so it is drawn styled before any script runs.
 */
export const onRenderHtml: OnRenderHtmlSync = (pageContext) => {
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createStyleServer(styleCache)
  const html = renderToString(<PageShell pageContext={pageContext} />)
  const styles = constructStyleTagsFromChunks(extractCriticalToChunks(html))
  return escapeInject`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>__TITLE__</title>
    ${dangerouslySkipEscape(styles)}
  </head>
  <body>
    <div id="root">${dangerouslySkipEscape(html)}</div>
  </body>
</html>`
}
