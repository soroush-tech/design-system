import { createRoot, hydrateRoot } from 'react-dom/client'
import { startMocks } from '../mocks/start'
import { PageShell } from './PageShell'
let root
const mocks = startMocks()
/** Takes over the page the server drew, then draws each page the app moves to. */
export const onRenderClient = async (pageContext) => {
  await mocks
  const page = <PageShell pageContext={pageContext} />
  const container = document.getElementById('root')
  if (pageContext.isHydration) {
    root = hydrateRoot(container, page)
  } else {
    root ??= createRoot(container)
    root.render(page)
  }
}
