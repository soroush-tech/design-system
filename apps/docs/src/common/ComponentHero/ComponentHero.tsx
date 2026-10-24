import { useEffect, useRef, type MouseEvent } from 'react'
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

// The tabs stay at the top of the window as the page scrolls under them. Below the wide layout
// the top bar is there, so they sit under it; a ground of the page's own keeps the page from
// showing through the gaps between the pills.
const TabBar = styled('nav')(({ theme }) => ({
  position: 'sticky',
  top: '3.5rem',
  zIndex: 3,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.space[1],
  padding: `${theme.space[1.5]} 0`,
  marginBottom: theme.space[3],
  backgroundColor: get(theme, 'background.default'),
  [theme.breakpoints.up('lg')]: { top: 0 },
}))

// The router reads `keep-scroll-position` off a link; the prop filter would drop it as unknown.
const forwardTabProp = createShouldForwardProp(['isActive'])

const TabLink = styled('a', {
  shouldForwardProp: (prop: string) => prop === 'keep-scroll-position' || forwardTabProp(prop),
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  flex: '1 1 8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '3.25rem',
  padding: `0 ${theme.space[3]}`,
  borderRadius: '1.625rem',
  color: get(theme, 'text.initial'),
  fontWeight: isActive ? 600 : 400,
  textDecoration: 'none',
  backgroundColor: isActive ? tone(theme, 0.3) : tone(theme, 0.1),
  '&:hover': { backgroundColor: isActive ? tone(theme, 0.3) : tone(theme, 0.18) },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: 2,
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
      <View as="header" ref={header} mb={active ? 0 : 4}>
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
        <TabBar ref={bar} aria-label={`${item.name} pages`}>
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
