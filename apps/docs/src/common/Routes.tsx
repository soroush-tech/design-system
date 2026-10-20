import type { PageContext as PageContextVike } from 'vike/types'
import { PageContext } from 'src/common/PageContext'
import { useScrollToHash } from 'src/hooks/useScrollToHash'

export function Routes({ pageContext }: Readonly<{ pageContext: PageContextVike }>) {
  const { Page, urlOriginal } = pageContext
  useScrollToHash(urlOriginal)
  return <PageContext.Provider value={pageContext}>{Page && <Page />}</PageContext.Provider>
}
