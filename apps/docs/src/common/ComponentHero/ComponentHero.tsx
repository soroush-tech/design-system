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

const TabLink = styled('a', {
  shouldForwardProp: createShouldForwardProp(['isActive']),
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

export interface ComponentHeroProps {
  item: ComponentNavItem
  /** The line under the name - what the component is. */
  lead: string
  /** The tab of the page; none for a page that has no tabs of its own, a family member's. */
  active?: ComponentTab
  /** Whether the component has accessibility notes to show on a tab. */
  hasAccessibility: boolean
}

/** The head of a component's pages: its name and what it is, its drawing, and its tabs. */
export function ComponentHero({
  item,
  lead,
  active,
  hasAccessibility,
}: Readonly<ComponentHeroProps>) {
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
    <View as="header" mb={4}>
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
      {active && (
        <Flex
          as="nav"
          aria-label={`${item.name} pages`}
          flexDirection="row"
          flexWrap="wrap"
          gap={1}
          mt={1.5}
        >
          {tabs.map((tab) => (
            <TabLink
              key={tab.id}
              href={sectionPath('design-system', tab.path)}
              isActive={tab.id === active}
              aria-current={tab.id === active ? 'page' : undefined}
            >
              {tab.label}
            </TabLink>
          ))}
        </Flex>
      )}
    </View>
  )
}
