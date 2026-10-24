import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { styled, createShouldForwardProp, get, type Theme } from '@soroush.tech/design-system'
import { alpha } from '@soroush.tech/design-system/utils'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { ComponentIllustration } from 'src/common/ComponentCard/ComponentIllustration'
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
  borderRadius: '1.75rem',
  backgroundColor: tone(theme, 0.1),
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

// The radius of the tab bar and of each tab in it: half a tab's height, so the ends are round.
const TAB_RADIUS = '1.625rem'

// The tabs are one gray container, as M3's: no padding, the tabs filling it end to end, an
// inactive tab just the gray of the bar and the chosen one in the tone. The bar stays at the top
// of the window as the page scrolls under it; below the wide layout the top bar is there, so it
// sits under that. In its place on the page it spans the content; stuck, it shrinks to the size
// of its tabs - `interpolate-size` lets the width animate between the two, and a browser without
// it simply changes.
const TabBar = styled('nav', {
  shouldForwardProp: createShouldForwardProp(['isStuck']),
})<{ isStuck: boolean }>(({ theme, isStuck }) => ({
  position: 'sticky',
  top: '3.5rem',
  zIndex: 3,
  display: 'flex',
  flexWrap: 'wrap',
  width: isStuck ? 'fit-content' : '100%',
  maxWidth: '100%',
  marginBottom: theme.space[3],
  borderRadius: TAB_RADIUS,
  backgroundColor: get(theme, 'background.secondary'),
  'interpolate-size': 'allow-keywords',
  transition: 'width 280ms cubic-bezier(0.2, 0, 0, 1)',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  [theme.breakpoints.up('lg')]: { top: 0 },
}))

// The router reads `keep-scroll-position` off a link; the prop filter would drop it as unknown.
const forwardTabProp = createShouldForwardProp(['isActive'])

const TabLink = styled('a', {
  shouldForwardProp: (prop: string) => prop === 'keep-scroll-position' || forwardTabProp(prop),
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '3.25rem',
  padding: `0 ${theme.space[3]}`,
  borderRadius: TAB_RADIUS,
  color: get(theme, 'text.initial'),
  fontWeight: isActive ? 600 : 400,
  textDecoration: 'none',
  // An inactive tab shows the bar's own gray; hovered, a wash of the tone over it.
  backgroundColor: isActive ? tone(theme, 0.4) : 'transparent',
  '&:hover': { backgroundColor: isActive ? tone(theme, 0.4) : tone(theme, 0.16) },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: -2,
  },
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
  const bar = useRef<HTMLElement>(null)
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
          </Flex>
          <Tile>
            <ComponentIllustration name={item.name} />
          </Tile>
        </Hero>
      </View>
      {active && (
        <TabBar ref={bar} isStuck={isStuck} aria-label={`${item.name} pages`}>
          {tabs.map((tab) => (
            <TabLink
              key={tab.id}
              href={sectionPath('design-system', tab.path)}
              isActive={tab.id === active}
              aria-current={tab.id === active ? 'page' : undefined}
              // The page the tab opens is scrolled by this component, not sent to the top first.
              keep-scroll-position="true"
              onClick={(event) => {
                if (isPlainClick(event)) isSwitchingTab = true
              }}
            >
              {tab.label}
            </TabLink>
          ))}
        </TabBar>
      )}
    </>
  )
}
