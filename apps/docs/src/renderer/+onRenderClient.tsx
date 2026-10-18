import { createRoot, hydrateRoot, type Root } from 'react-dom/client'
import type { OnRenderClientSync } from 'vike/types'
import { Bootstrap } from 'src/common/Bootstrap'
import { applyHead } from './buildHead'

let root: Root
export const onRenderClient: OnRenderClientSync = (pageContext): ReturnType<OnRenderClientSync> => {
  const page = <Bootstrap pageContext={pageContext} />
  const container = document.getElementById('root')!
  if (pageContext.isHydration) {
    root = hydrateRoot(container, page)
  } else {
    if (!root) {
      root = createRoot(container)
    }
    root.render(page)
    // SSR sets the head tags on first paint; sync them on client-side navigation.
    applyHead(pageContext)
  }
}
