import { styled, createShouldForwardProp, get, type Theme } from '@soroush.tech/design-system'
import { alpha } from '@soroush.tech/design-system/utils'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { RailGlyph } from 'src/common/NavRail/RailGlyph'
import { railItemFor, sectionFor, type NavGroup } from 'src/common/nav'
import { usePageContext } from 'src/hooks/usePageContext'

const normalize = (path: string): string => (path.endsWith('/') ? path : `${path}/`)

const tone = (theme: Theme, strength: number) => alpha(get(theme, 'palette.primary.main'), strength)

// A page of the sidebar: a rounded row, the current one filled with the primary's tone.
const TreeLink = styled('a', {
  shouldForwardProp: createShouldForwardProp(['isCurrent']),
})<{ isCurrent: boolean }>(({ theme, isCurrent }) => ({
  display: 'block',
  padding: `${theme.space[1]} ${theme.space[2]}`,
  borderRadius: '1.5rem',
  color: get(theme, 'text.initial'),
  textDecoration: 'none',
  fontWeight: isCurrent ? 600 : 400,
  backgroundColor: isCurrent ? tone(theme, 0.28) : 'transparent',
  '&:hover': { backgroundColor: isCurrent ? tone(theme, 0.28) : tone(theme, 0.1) },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: -2,
  },
}))

const GroupSummary = styled('summary')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.space[1]} ${theme.space[2]}`,
  borderRadius: '1.5rem',
  cursor: 'pointer',
  listStyle: 'none',
  color: get(theme, 'text.initial'),
  '&::-webkit-details-marker': { display: 'none' },
  '&:hover': { backgroundColor: tone(theme, 0.1) },
  'details[open] > &::after': { transform: 'rotate(-135deg) translate(-2px, -2px)' },
  '&::after': {
    content: '""',
    width: '0.5rem',
    height: '0.5rem',
    borderRight: '2px solid currentColor',
    borderBottom: '2px solid currentColor',
    transform: 'rotate(45deg) translate(-2px, -2px)',
    marginRight: theme.space[0.5],
  },
}))

const Group = styled('details')({})

const PACKAGES = [
  { pkg: 'design-system', label: 'Design System', href: '/design-system/' },
  { pkg: 'markdown', label: 'Markdown', href: '/markdown/' },
  { pkg: 'styled-system', label: 'Styled System', href: '/styled-system/' },
] as const

function GroupList({ group, current }: Readonly<{ group: NavGroup; current: string }>) {
  const list = (
    <View as="ul" m={0} p={0} style={{ listStyle: 'none' }}>
      {group.items.map((item) => {
        const isCurrent = current === item.href
        return (
          <View as="li" key={item.href} py={0.25}>
            <TreeLink
              href={item.href}
              isCurrent={isCurrent}
              aria-current={isCurrent ? 'page' : undefined}
              {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <Flex flexDirection="row" alignItems="center" gap={1}>
                <span style={{ flex: '1 1 auto' }}>{item.label}</span>
                {item.note && (
                  <Typography variant="caption" color="secondary" as="span">
                    {item.note}
                  </Typography>
                )}
                {item.isExternal && <RailGlyph name="open_in_new" size={14} />}
              </Flex>
            </TreeLink>
          </View>
        )
      })}
    </View>
  )
  if (!group.isCollapsible) {
    return (
      <View mb={2}>
        <Typography variant="subtitle2" px={2} py={1}>
          {group.label}
        </Typography>
        {list}
      </View>
    )
  }
  const holdsCurrent = group.items.some((item) => item.href === current)
  return (
    <Group open={holdsCurrent}>
      <GroupSummary>
        <Typography variant="subtitle2" as="span">
          {group.label}
        </Typography>
      </GroupSummary>
      {list}
    </Group>
  )
}

/** The sidebar of the part of the docs the page belongs to - the tree the rail's item opens. */
export function DocsNav() {
  const { urlPathname } = usePageContext()
  const current = normalize(urlPathname || '/')
  const section = sectionFor(current)
  const active = railItemFor(section, current)
  return (
    <View as="nav" aria-label={section.label}>
      <Flex flexDirection="row" flexWrap="wrap" gap={1} mb={2}>
        {PACKAGES.map(({ pkg, label, href }) => (
          <TreeLink
            key={pkg}
            href={href}
            isCurrent={pkg === section.pkg}
            aria-current={pkg === section.pkg ? 'true' : undefined}
            style={{ padding: '0.25rem 0.75rem', fontSize: '0.8125rem' }}
          >
            {label}
          </TreeLink>
        ))}
      </Flex>
      {active.groups.map((group) => (
        <GroupList key={group.label} group={group} current={current} />
      ))}
    </View>
  )
}
