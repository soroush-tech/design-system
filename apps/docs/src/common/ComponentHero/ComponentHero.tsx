import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { styled, createShouldForwardProp, get, type Theme } from '@soroush.tech/design-system'
import { alpha } from '@soroush.tech/design-system/utils'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Tab, Tabs } from '@soroush.tech/design-system/Tabs'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { ComponentIllustration } from 'src/common/ComponentCard/ComponentIllustration'
import { CONTENT_MAX_WIDTH, PANEL_RADIUS } from 'src/common/layoutSizes'
import { RailGlyph } from 'src/common/NavRail/RailGlyph'
import { sourceUrlOf } from 'src/common/packages'
import type { ComponentNavItem } from 'src/common/nav'
import { sectionPath } from 'src/common/sectionPath'

/** The pages of a component: what it is and does, its props, how it serves everyone. */
export type ComponentTab = 'overview' | 'specs' | 'accessibility'

const tone = (theme: Theme, strength: number) => alpha(get(theme, 'palette.primary.main'), strength)

const Hero = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.space[3],
  padding: theme.space[4],
  borderRadius: PANEL_RADIUS,
  backgroundColor: tone(theme, 0.1),
}))

// A link out of the docs, as a pill - the source of the component, as M3's Resources.
const ResourceLink = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.space[1],
  padding: `${theme.space[1]} ${theme.space[2]}`,
  borderRadius: '1rem',
  color: get(theme, 'text.initial'),
  textDecoration: 'none',
  backgroundColor: tone(theme, 0.2),
  '&:hover': { backgroundColor: tone(theme, 0.32) },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: 2,
  },
}))

const Tile = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1 1 16rem',
  maxWidth: '24rem',
  height: '12rem',
  borderRadius: '1.25rem',
  backgroundColor: get(theme, 'background.secondary'),
}))

// The tabs stay at the top of the window as the page scrolls under them; below the wide layout the
// top bar is there, so they sit under that. In its place on the page the bar spans the head, which
// is wider than the content; stuck, it shrinks to the size of the content grid - the width
// animates between the two.
const TabBar = styled('div', {
  shouldForwardProp: createShouldForwardProp(['isStuck']),
})<{ isStuck: boolean }>(({ theme, isStuck }) => ({
  position: 'sticky',
  top: '3.5rem',
  zIndex: 3,
  width: isStuck ? `min(100%, ${CONTENT_MAX_WIDTH})` : '100%',
  marginInline: 'auto',
  marginBottom: theme.space[3],
  transition: 'width 280ms cubic-bezier(0.2, 0, 0, 1)',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  [theme.breakpoints.up('lg')]: { top: 0 },
}))

// A tab was just chosen: the page that replaces this one scrolls to the tabs, so what the tab
// shows starts right under them - whether the reader was down the page or at its head.
let isSwitchingTab = false

const isPlainClick = (event: MouseEvent): boolean =>
  event.button === 0 && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey

export interface ComponentHeroProps {
  item: ComponentNavItem
  /** The line under the name - what the component is. */
  lead: string
  /** The tab of the page; none for a page that has no tabs of its own, a family member's. */
  active?: ComponentTab
  /** Whether the component has accessibility notes to show on a tab. */
  hasAccessibility: boolean
}

/**
 * The head of a component's pages: its name and what it is, its drawing, and its tabs - which
 * stay at the top of the window, and bring the page they open to their own place.
 */
export function ComponentHero({
  item,
  lead,
  active,
  hasAccessibility,
}: Readonly<ComponentHeroProps>) {
  const header = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [isStuck, setIsStuck] = useState(false)

  // The bar is stuck once it has reached the place it sticks at - read as the page scrolls.
  useEffect(() => {
    const element = bar.current
    if (!element) return undefined
    const update = () =>
      setIsStuck(
        element.getBoundingClientRect().top <= Number.parseFloat(getComputedStyle(element).top)
      )
    const frame = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
    }
  }, [active])

  // The router reads `keep-scroll-position` off a link: the page a tab opens is scrolled by this
  // component, not sent to the top first.
  useEffect(() => {
    bar.current?.querySelectorAll('a').forEach((link) => {
      link.setAttribute('keep-scroll-position', 'true')
    })
  }, [active])

  useEffect(() => {
    if (!isSwitchingTab) return
    isSwitchingTab = false
    if (!header.current || !bar.current) return
    // Where the tabs sit in the page when they are not stuck, less where they stick.
    const place = header.current.getBoundingClientRect().bottom + window.scrollY
    window.scrollTo({ top: place - Number.parseFloat(getComputedStyle(bar.current).top) })
  }, [])

  const tabs = [
    { id: 'overview', label: 'Overview', path: `/components/${item.slug}/` },
    { id: 'specs', label: 'Specs', path: `/api/${item.slug}/` },
    ...(hasAccessibility
      ? [
          {
            id: 'accessibility',
            label: 'Accessibility',
            path: `/components/${item.slug}/accessibility/`,
          },
        ]
      : []),
  ] as const
  return (
    <>
      {/* The room under the hero is the header's own, so the header ends where the tabs begin. */}
      <View as="header" ref={header} pb={active ? 1.5 : 0} mb={active ? 0 : 4}>
        <Hero>
          <Flex flexDirection="column" gap={1.5} flex="1 1 18rem" minWidth={0}>
            <Typography variant="h1" as="h1">
              {item.name}
            </Typography>
            {lead && (
              <Typography variant="body1" color="secondary">
                {lead}
              </Typography>
            )}
            <Flex flexDirection="row" flexWrap="wrap" gap={1} mt={1}>
              <ResourceLink href={sourceUrlOf(item)} target="_blank" rel="noopener noreferrer">
                <RailGlyph name="code" size={18} />
                Source
              </ResourceLink>
            </Flex>
          </Flex>
          <Tile>
            <ComponentIllustration name={item.name} />
          </Tile>
        </Hero>
      </View>
      {active && (
        <TabBar ref={bar} isStuck={isStuck} data-stuck={isStuck ? '' : undefined}>
          <Tabs
            as="nav"
            variant="tonal"
            size="lg"
            fullWidth
            value={active}
            aria-label={`${item.name} pages`}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                label={tab.label}
                href={sectionPath('design-system', tab.path)}
                onClick={(event) => {
                  if (isPlainClick(event)) isSwitchingTab = true
                }}
              />
            ))}
          </Tabs>
        </TabBar>
      )}
    </>
  )
}
