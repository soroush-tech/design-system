import { createRoot, type Root } from 'react-dom/client'
import type { OnRenderClientSync } from 'vike/types'
import { PageShell } from './PageShell'

let root: Root | undefined

/** Draws the page in the browser, and each page the app moves to. */
export const onRenderClient: OnRenderClientSync = (pageContext) => {
  root ??= createRoot(document.getElementById('root')!)
  root.render(<PageShell pageContext={pageContext} />)
}
