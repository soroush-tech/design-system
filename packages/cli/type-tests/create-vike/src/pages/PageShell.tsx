import { StrictMode } from 'react'
import { CacheProvider, styleCache } from '@soroush.tech/design-system/engine'
import type { PageContext } from 'vike/types'
import { PageContextProvider } from './usePageContext'

/**
 * The page inside its +Layout, the same on the server and in the browser. The Emotion cache is the
 * design system's, so the server can find the styles the page used, and every component of the
 * page can read its pageContext.
 */
export function PageShell({ pageContext }: { readonly pageContext: PageContext }) {
  const { Page, config } = pageContext
  const { Layout } = config
  return (
    <StrictMode>
      <CacheProvider value={styleCache}>
        <PageContextProvider pageContext={pageContext}>
          {Layout ? (
            <Layout>
              <Page />
            </Layout>
          ) : (
            <Page />
          )}
        </PageContextProvider>
      </CacheProvider>
    </StrictMode>
  )
}
