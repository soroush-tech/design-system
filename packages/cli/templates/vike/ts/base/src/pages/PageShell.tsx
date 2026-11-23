import { StrictMode } from 'react'
import { CacheProvider, styleCache } from '@soroush.design/react/engine'
// @if redux-toolkit
import { Provider as StoreProvider } from 'react-redux'
// @endif
import type { PageContext } from 'vike/types'
// @if redux-toolkit
import { store } from '../state/store'
// @endif
import { PageContextProvider } from './usePageContext'

/**
 * The page inside its +Layout. The style cache is the design system's, so the styles the page
 * uses are found where it is drawn, and every component of the page can read its pageContext.
 */
export function PageShell({ pageContext }: { readonly pageContext: PageContext }) {
  const { Page, config } = pageContext
  const { Layout } = config
  return (
    <StrictMode>
      <CacheProvider value={styleCache}>
        {/* @if redux-toolkit */}
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
        {/* @else */}
        <PageContextProvider pageContext={pageContext}>
          {Layout ? (
            <Layout>
              <Page />
            </Layout>
          ) : (
            <Page />
          )}
        </PageContextProvider>
        {/* @endif */}
      </CacheProvider>
    </StrictMode>
  )
}
