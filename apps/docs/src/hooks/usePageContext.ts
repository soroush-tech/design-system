import { useContext } from 'react'
import type { PageContext as VikePageContext } from 'vike/types'
import { PageContext } from 'src/common/PageContext'

/** The current Vike page context - available under Routes' provider. */
export function usePageContext(): VikePageContext {
  const pageContext = useContext(PageContext)
  if (!pageContext) throw new Error('usePageContext must be used within PageContext.Provider')
  return pageContext
}
