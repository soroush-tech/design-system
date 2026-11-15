import { escapeInject } from 'vike/server'
/** The page's HTML shell, from the build: the browser renders the page in #root. */
export const onRenderHtml = () => {
  return escapeInject`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
}
