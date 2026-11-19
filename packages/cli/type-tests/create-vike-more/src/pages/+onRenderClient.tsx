import { createRoot, hydrateRoot, type Root } from 'react-dom/client'
import type { OnRenderClientAsync } from 'vike/types'
import { startMocks } from '../mocks/start'
import { PageShell } from './PageShell'

let root: Root | undefined
const mocks = startMocks()

/** Takes over the page the server drew, then draws each page the app moves to. */
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
