import { createContext, useContext } from 'react'
const Context = createContext(undefined)
/** Gives every component of the page its pageContext: https://vike.dev/pageContext */
export function PageContextProvider({ pageContext, children }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}
/** The pageContext of the page on screen: its URL, its route's parameters, its data. */
export function usePageContext() {
  const pageContext = useContext(Context)
  if (!pageContext) throw new Error('usePageContext runs only inside a page.')
  return pageContext
}
/** What the page's +data returned: https://vike.dev/data */
export function useData() {
  return usePageContext().data
}
