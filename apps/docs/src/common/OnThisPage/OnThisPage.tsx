import { useSyncExternalStore } from 'react'
import { styled, get } from '@soroush.tech/design-system'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'

interface Heading {
  id: string
  text: string
}

const TocLink = styled('a')(({ theme }) => ({
  display: 'block',
  padding: `${theme.space[0.5]} 0`,
  color: get(theme, 'text.secondary'),
  textDecoration: 'none',
  '&:hover': { color: get(theme, 'text.initial') },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: 2,
  },
}))

// The page is the store: its `h2` headings that have an id. A snapshot is their ids and texts as
// one string, so React compares it by value; the page changing - a route, a demo mounting late -
// is read through a MutationObserver.
const readHeadings = (): string =>
  JSON.stringify(
    Array.from(document.querySelectorAll<HTMLElement>('main h2[id]')).map((heading) => ({
      id: heading.id,
      text: heading.textContent,
    }))
  )

const subscribe = (onChange: () => void): (() => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.body, { childList: true, subtree: true })
  return () => observer.disconnect()
}

/**
 * The sections of the page, as links to them - read from the page's own `h2` headings that have
 * an id, so a page of any source (a README, an MDX file) has one. Nothing on the server: the
 * headings are read from the page once it is on screen.
 */
export function OnThisPage() {
  const snapshot = useSyncExternalStore(subscribe, readHeadings, () => '[]')
  const headings: Heading[] = JSON.parse(snapshot)
  if (headings.length < 2) return null
  return (
    <View as="nav" aria-label="On this page">
      <Typography variant="caption" color="secondary" fontWeight="bold" gutterBottom>
        On this page
      </Typography>
      <View as="ul" m={0} p={0} style={{ listStyle: 'none' }}>
        {headings.map((heading) => (
          <View as="li" key={heading.id}>
            <TocLink href={`#${heading.id}`}>{heading.text}</TocLink>
          </View>
        ))}
      </View>
    </View>
  )
}
