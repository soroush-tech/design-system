import { createRoot, type Root } from 'react-dom/client'
// @if msw
import type { OnRenderClientAsync } from 'vike/types'
import { startMocks } from '../mocks/start'
// @else
import type { OnRenderClientSync } from 'vike/types'
// @endif
import { PageShell } from './PageShell'

let root: Root | undefined
// @if msw
const mocks = startMocks()
// @endif

/** Draws the page in the browser, and each page the app moves to. */
// @if msw
export const onRenderClient: OnRenderClientAsync = async (pageContext) => {
  await mocks
  root ??= createRoot(document.getElementById('root')!)
  root.render(<PageShell pageContext={pageContext} />)
}
// @else
export const onRenderClient: OnRenderClientSync = (pageContext) => {
  root ??= createRoot(document.getElementById('root')!)
  root.render(<PageShell pageContext={pageContext} />)
}
// @endif
