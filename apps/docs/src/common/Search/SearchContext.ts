import { createContext, useContext } from 'react'

export interface SearchContextValue {
  open: () => void
}

export const SearchContext = createContext<SearchContextValue | null>(null)

/** Opens the search dialog - from the rail's button, the top bar's, or Ctrl/Cmd + K. */
export function useSearch(): SearchContextValue {
  const search = useContext(SearchContext)
  if (!search) throw new Error('useSearch must be used within SearchProvider')
  return search
}
