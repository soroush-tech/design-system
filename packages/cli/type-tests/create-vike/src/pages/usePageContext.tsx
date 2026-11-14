import { createContext, useContext, type ReactNode } from 'react'
import type { PageContext } from 'vike/types'

const Context = createContext<PageContext | undefined>(undefined)

/** Gives every component of the page its pageContext: https://vike.dev/pageContext */
export function PageContextProvider({
  pageContext,
  children,
}: {
  readonly pageContext: PageContext
  readonly children: ReactNode
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

/** The pageContext of the page on screen: its URL, its route's parameters, its data. */
export function usePageContext() {
  const pageContext = useContext(Context)
  if (!pageContext) throw new Error('usePageContext runs only inside a page.')
  return pageContext
}

/** What the page's +data returned: https://vike.dev/data */
export function useData<Data>() {
  return usePageContext().data as Data
}
