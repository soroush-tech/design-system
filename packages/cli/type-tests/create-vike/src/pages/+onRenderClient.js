import { createRoot, hydrateRoot } from 'react-dom/client'
import { PageShell } from './PageShell'
let root
/** Takes over the page the server drew, then draws each page the app moves to. */
export const onRenderClient = (pageContext) => {
  const page = <PageShell pageContext={pageContext} />
  const container = document.getElementById('root')
  if (pageContext.isHydration) {
    root = hydrateRoot(container, page)
  } else {
    root ??= createRoot(container)
    root.render(page)
  }
}
