import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { styled, get } from '@soroush.tech/design-system'
import { alpha } from '@soroush.tech/design-system/utils'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'

interface Heading {
  id: string
  text: string
}

interface Outline {
  /** The name of the page - its `h1`; the first entry, which takes the reader back to the top. */
  title: string | null
  headings: Heading[]
}

/** The id of the title entry: the page's head, before any section. */
const TOP = ''

/** A section is the current one once its heading has reached this far down the window. */
const READ_LINE = 120

const TocLink = styled('a')(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: '0.5rem 1rem',
  borderRadius: '1.125rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: get(theme, 'text.secondary'),
  textDecoration: 'none',
  transition: 'color 200ms',
  '&:hover, &[data-active]': { color: get(theme, 'text.initial') },
  '&[data-active]': { fontWeight: 500 },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: -2,
  },
}))

// The name of the page, large over the sections: a link to the head of the page.
const TocTitle = styled('a')(({ theme }) => ({
  display: 'block',
  padding: '0.25rem 1rem 0.75rem',
  color: get(theme, 'text.initial'),
  fontSize: '1.5rem',
  fontWeight: 500,
  lineHeight: 1.2,
  textDecoration: 'none',
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: -2,
  },
}))

// The tinted ground of the current entry: one element that slides to it as the page scrolls, so
// the reader sees where the page has gone. It sits under the links, which are positioned above it.
const Marker = styled('span')(({ theme }) => ({
  position: 'absolute',
  insetInline: 0,
  top: 0,
  height: 0,
  borderRadius: '1rem',
  backgroundColor: alpha(get(theme, 'palette.primary.main'), 0.22),
  opacity: 0,
  pointerEvents: 'none',
  transition: 'transform 280ms cubic-bezier(0.2, 0, 0, 1), height 280ms, opacity 160ms',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}))

// The page is the store: its `h1`, and its `h2` headings that have an id. A snapshot is them as
// one string, so React compares it by value; the page changing - a route, a demo mounting late -
// is read through a MutationObserver.
const readOutline = (): string =>
  JSON.stringify({
    title: document.querySelector('main h1')?.textContent ?? null,
    headings: Array.from(document.querySelectorAll<HTMLElement>('main h2[id]')).map((heading) => ({
      id: heading.id,
      text: heading.textContent,
    })),
  } satisfies Outline)

const subscribe = (onChange: () => void): (() => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.body, { childList: true, subtree: true })
  return () => observer.disconnect()
}

/** The section the window is at: the last heading above the read line, or the page's head. */
const readCurrent = (ids: string[]): string => {
  const isAtEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (isAtEnd && window.scrollY > 0) return ids.at(-1)!
  let current = TOP
  for (const id of ids) {
    if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= READ_LINE) {
      current = id
    }
  }
  return current
}

const useCurrent = (ids: string[], key: string): string => {
  const [current, setCurrent] = useState(TOP)
  useEffect(() => {
    const update = () => setCurrent(readCurrent(ids))
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
    // The ids are what the key says they are.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return current
}

/**
 * The page's name and its sections, as links to them - read from the page's own `h1` and `h2`
 * headings that have an id, so a page of any source (a README, an MDX file) has one. The section
 * the reader is at has a tinted ground, which slides to the next as the page scrolls. Nothing on
 * the server: the headings are read from the page once it is on screen.
 */
export function OnThisPage() {
  const snapshot = useSyncExternalStore(
    subscribe,
    readOutline,
    () => '{"title":null,"headings":[]}'
  )
  const { title, headings }: Outline = JSON.parse(snapshot)
  const current = useCurrent(
    headings.map(({ id }) => id),
    snapshot
  )
  const list = useRef<HTMLDivElement>(null)
  const marker = useRef<HTMLSpanElement>(null)

  // The marker is moved to the current entry, measured after layout.
  useLayoutEffect(() => {
    const entry = list.current?.querySelector<HTMLElement>('a[data-active]')
    if (!marker.current) return
    // At the head of the page no section is current: the ground is put away.
    if (!entry) {
      marker.current.style.opacity = '0'
      return
    }
    marker.current.style.transform = `translateY(${entry.offsetTop}px)`
    marker.current.style.height = `${entry.offsetHeight}px`
    marker.current.style.opacity = '1'
  }, [current, snapshot])

  if (headings.length < 2) return null
  return (
    <View as="nav" aria-label="On this page">
      <Typography variant="caption" color="secondary" fontWeight="medium" px={2} gutterBottom>
        On this page
      </Typography>
      {title && <TocTitle href="#">{title}</TocTitle>}
      <View as="ul" ref={list} m={0} p={0} position="relative" style={{ listStyle: 'none' }}>
        <Marker ref={marker} aria-hidden />
        {headings.map((heading) => (
          <View as="li" key={heading.id}>
            <TocLink
              href={`#${heading.id}`}
              data-active={heading.id === current ? '' : undefined}
              aria-current={heading.id === current ? 'location' : undefined}
            >
              {heading.text}
            </TocLink>
          </View>
        ))}
      </View>
    </View>
  )
}
