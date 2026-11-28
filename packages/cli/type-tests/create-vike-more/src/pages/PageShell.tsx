import { StrictMode } from 'react'
import { CacheProvider, styleCache } from '@gild-ui/react/engine'
import { Provider as StoreProvider } from 'react-redux'
import type { PageContext } from 'vike/types'
import { store } from '../state/store'
import { PageContextProvider } from './usePageContext'

/**
 * The page inside its +Layout. The style cache is Gild UI's, so the styles the page
 * uses are found where it is drawn, and every component of the page can read its pageContext.
 */
export function PageShell({ pageContext }: { readonly pageContext: PageContext }) {
  const { Page, config } = pageContext
  const { Layout } = config
  return (
    <StrictMode>
      <CacheProvider value={styleCache}>
        <StoreProvider store={store}>
          <PageContextProvider pageContext={pageContext}>
            {Layout ? (
              <Layout>
                <Page />
              </Layout>
            ) : (
              <Page />
            )}
          </PageContextProvider>
        </StoreProvider>
      </CacheProvider>
    </StrictMode>
  )
}
