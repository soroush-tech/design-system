// @if !ssg
import { createRoot, hydrateRoot, type Root } from 'react-dom/client'
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

/** Takes over the page the server drew, then draws each page the app moves to. */
// @if msw
export const onRenderClient: OnRenderClientAsync = async (pageContext) => {
  await mocks
  const page = <PageShell pageContext={pageContext} />
  const container = document.getElementById('root')!
  if (pageContext.isHydration) {
    root = hydrateRoot(container, page)
  } else {
    root ??= createRoot(container)
    root.render(page)
  }
}
// @else
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
// @endif
// @endif
