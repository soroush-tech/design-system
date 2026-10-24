import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { SearchDialog } from './SearchDialog'
import { SearchContext } from './SearchContext'

/** Holds the search dialog once for the page, and lets any button open it. */
export function SearchProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false)
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), [])

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </SearchContext.Provider>
  )
}
