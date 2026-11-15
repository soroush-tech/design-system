import { createRoot } from 'react-dom/client'
import { PageShell } from './PageShell'
let root
/** Draws the page in the browser, and each page the app moves to. */
export const onRenderClient = (pageContext) => {
  root ??= createRoot(document.getElementById('root'))
  root.render(<PageShell pageContext={pageContext} />)
}
