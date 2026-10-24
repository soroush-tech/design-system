import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { styled, get } from '@soroush.tech/design-system'
import { alpha } from '@soroush.tech/design-system/utils'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Modal } from '@soroush.tech/design-system/Modal'
import { Paper } from '@soroush.tech/design-system/Paper'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { RailGlyph } from 'src/common/NavRail/RailGlyph'
import { searchEntriesFor, sectionFor, type SearchEntry } from 'src/common/nav'
import { usePageContext } from 'src/hooks/usePageContext'
import { filterEntries } from './filterEntries'
import { importantLinksFor } from './importantLinks'
import { readRecentSearches, saveRecentSearch } from './recentSearches'

// The search, as M3's: a page of its own - a wide pill to type in, then what to look at before a
// word is typed (the searches just made, the pages that matter most) and what matches after it.

const Pill = styled('label')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1.5],
  flex: '1 1 auto',
  minHeight: '3.5rem',
  padding: `0 ${theme.space[3]}`,
  borderRadius: '1.75rem',
  border: `1px solid ${get(theme, 'border.default')}`,
  backgroundColor: get(theme, 'background.primary'),
  color: get(theme, 'text.initial'),
  '&:focus-within': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: 2,
  },
}))

const Field = styled('input')(({ theme }) => ({
  flex: '1 1 auto',
  minWidth: 0,
  border: 0,
  outline: 0,
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
  fontSize: `${theme.fontSizes[2]}px`,
}))

const IconButton = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.5rem',
  height: '3.5rem',
  flexShrink: 0,
  border: 0,
  borderRadius: '50%',
  background: 'transparent',
  color: get(theme, 'text.initial'),
  cursor: 'pointer',
  '&:hover': { backgroundColor: alpha(get(theme, 'palette.primary.main'), 0.14) },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: 2,
  },
}))

const Row = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[2],
  width: '100%',
  padding: `${theme.space[1.5]} ${theme.space[2]}`,
  borderRadius: '1.5rem',
  border: 0,
  background: 'transparent',
  color: get(theme, 'text.initial'),
  font: 'inherit',
  textAlign: 'start',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover, &:focus-visible': { backgroundColor: alpha(get(theme, 'palette.primary.main'), 0.14) },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: -2,
  },
}))

// Up and Down walk the field and the rows as one list.
const walkRows = (event: KeyboardEvent<HTMLElement>) => {
  const step = { ArrowDown: 1, ArrowUp: -1 }[event.key as 'ArrowDown' | 'ArrowUp']
  if (step === undefined) return
  const stops = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('input, [data-row]'))
  const at = stops.indexOf(document.activeElement as HTMLElement)
  stops[Math.min(Math.max(at + step, 0), stops.length - 1)]?.focus()
  event.preventDefault()
}

/** A page of the docs as a row: its name, and the group it sits in. */
function PageRow({ entry, onFollow }: Readonly<{ entry: SearchEntry; onFollow: () => void }>) {
  return (
    <Row href={entry.href} data-row onClick={onFollow}>
      <RailGlyph name="article" size={20} />
      <Typography variant="body1" as="span" style={{ flex: '1 1 auto' }}>
        {entry.label}
      </Typography>
      <Typography variant="caption" color="secondary" as="span">
        {entry.group}
      </Typography>
    </Row>
  )
}

/** A heading over a list of rows. */
function Block({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <View as="section" mt={4}>
      <Typography variant="subtitle2" as="h2" m={0} mb={1} px={2}>
        {title}
      </Typography>
      <View as="ul" m={0} p={0} style={{ listStyle: 'none' }}>
        {children}
      </View>
    </View>
  )
}

export interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

/** The search page: open over the docs, closed by its button, Escape or a followed link. */
export function SearchDialog({ isOpen, onClose }: Readonly<SearchDialogProps>) {
  const { urlPathname } = usePageContext()
  const section = sectionFor(urlPathname || '/')
  const entries = useMemo(() => searchEntriesFor(section), [section])
  const important = useMemo(() => importantLinksFor(section), [section])
  const [query, setQuery] = useState('')
  // What was searched before - read when the page opens, so there is a browser to ask.
  const recent = useMemo(() => (isOpen ? readRecentSearches() : []), [isOpen])
  const results = filterEntries(entries, query)
  const list = useRef<HTMLDivElement>(null)
  const isSearching = query.trim() !== ''

  // Every way out starts the next visit from a blank field.
  const close = () => {
    setQuery('')
    onClose()
  }
  const follow = () => {
    saveRecentSearch(query)
    close()
  }

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Paper
        role="dialog"
        aria-modal="true"
        aria-label="Search the documentation"
        borderRadius="sq"
        width="100vw"
        height="100dvh"
        overflow="auto"
        onKeyDown={walkRows}
      >
        <View width="100%" maxWidth="60rem" mx="auto" px={3} py={3}>
          <Flex flexDirection="row" alignItems="center" gap={1}>
            <Pill>
              <RailGlyph name="search" size={22} />
              <Field
                type="search"
                autoFocus
                placeholder="Search"
                aria-label="Search the documentation"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter')
                    list.current?.querySelector<HTMLElement>('[data-row]')?.click()
                }}
              />
            </Pill>
            <IconButton type="button" aria-label="Close search" onClick={close}>
              <RailGlyph name="close" />
            </IconButton>
          </Flex>

          <View ref={list}>
            {isSearching ? (
              <Block title="Results">
                {results.map((entry) => (
                  <View as="li" key={entry.href}>
                    <PageRow entry={entry} onFollow={follow} />
                  </View>
                ))}
              </Block>
            ) : (
              <>
                {recent.length > 0 && (
                  <Block title="Recent searches">
                    {recent.map((word) => (
                      <View as="li" key={word}>
                        <Row as="button" type="button" data-row onClick={() => setQuery(word)}>
                          <RailGlyph name="history" size={20} />
                          <Typography variant="body1" as="span">
                            {word}
                          </Typography>
                        </Row>
                      </View>
                    ))}
                  </Block>
                )}
                <Block title="Most important links">
                  {important.map((entry) => (
                    <View as="li" key={entry.href}>
                      <PageRow entry={entry} onFollow={close} />
                    </View>
                  ))}
                </Block>
              </>
            )}
            {isSearching && results.length === 0 && (
              <Typography variant="body2" color="secondary" p={2}>
                Nothing matches &quot;{query.trim()}&quot;.
              </Typography>
            )}
          </View>
        </View>
      </Paper>
    </Modal>
  )
}
