import { createRoot, hydrateRoot, type Root } from 'react-dom/client'
import type { OnRenderClientSync } from 'vike/types'
import { PageShell } from './PageShell'

let root: Root | undefined

/** Takes over the page the server drew, then draws each page the app moves to. */
export const onRenderClient: OnRenderClientSync = (pageContext) => {
  const page = <PageShell pageContext={pageContext} />
  const container = document.getElementById('root')!
  if (pageContext.isHydration) {
    root = hydrateRoot(container, page)
  } else {
    root ??= createRoot(container)
    root.render(page)
  }
}
