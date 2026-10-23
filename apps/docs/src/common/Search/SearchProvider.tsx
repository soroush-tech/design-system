import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Modal } from '@soroush.tech/design-system/Modal'
import { Paper } from '@soroush.tech/design-system/Paper'
import { TextInput } from '@soroush.tech/design-system/TextInput'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { searchEntriesFor, sectionFor } from 'src/common/nav'
import { usePageContext } from 'src/hooks/usePageContext'
import { filterEntries } from './filterEntries'
import { SearchContext } from './SearchContext'

// Up and Down walk the input and the results as one list; Enter follows the first result.
const walkResults = (event: KeyboardEvent<HTMLElement>) => {
  const step = { ArrowDown: 1, ArrowUp: -1 }[event.key as 'ArrowDown' | 'ArrowUp']
  if (step === undefined) return
  const stops = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('input, a'))
  const at = stops.indexOf(document.activeElement as HTMLElement)
  stops[Math.min(Math.max(at + step, 0), stops.length - 1)]?.focus()
  event.preventDefault()
}

function SearchDialog({ isOpen, onClose }: Readonly<{ isOpen: boolean; onClose: () => void }>) {
  const { urlPathname } = usePageContext()
  const section = sectionFor(urlPathname || '/')
  const entries = useMemo(() => searchEntriesFor(section), [section])
  const [query, setQuery] = useState('')
  const results = filterEntries(entries, query)
  const list = useRef<HTMLDivElement>(null)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Paper
        role="dialog"
        aria-modal="true"
        aria-label="Search the documentation"
        p={2}
        width="min(640px, 92vw)"
        borderRadius="lg"
        onKeyDown={walkResults}
      >
        <TextInput
          fullWidth
          autoFocus
          type="search"
          placeholder="Search the documentation"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          inputProps={{
            'aria-label': 'Search the documentation',
            onKeyDown: (event) => {
              if (event.key === 'Enter') list.current?.querySelector('a')?.click()
            },
          }}
        />
        <View
          as="ul"
          ref={list}
          m={0}
          mt={1}
          p={0}
          maxHeight="50dvh"
          overflow="auto"
          style={{ listStyle: 'none' }}
        >
          {results.map((entry) => (
            <View as="li" key={entry.href}>
              <Link href={entry.href} onClick={onClose} style={{ textDecoration: 'none' }}>
                <Flex flexDirection="row" justifyContent="space-between" gap={2} p={1.5}>
                  <Typography variant="body1">{entry.label}</Typography>
                  <Typography variant="caption" color="secondary">
                    {entry.group}
                  </Typography>
                </Flex>
              </Link>
            </View>
          ))}
        </View>
        {query.trim() !== '' && results.length === 0 && (
          <Typography variant="body2" color="secondary" p={2}>
            Nothing matches &quot;{query.trim()}&quot;.
          </Typography>
        )}
      </Paper>
    </Modal>
  )
}

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
