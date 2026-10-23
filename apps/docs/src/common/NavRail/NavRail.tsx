import { styled, createShouldForwardProp, get, type Theme } from '@soroush.tech/design-system'
import { alpha } from '@soroush.tech/design-system/utils'
import { Flex } from '@soroush.tech/design-system/Flex'
import { sectionFor, railItemFor, type RailItem } from 'src/common/nav'
import { useSearch } from 'src/common/Search/SearchContext'
import { VersionMenu } from 'src/common/VersionMenu/VersionMenu'
import { usePageContext } from 'src/hooks/usePageContext'
import { useThemeMode } from 'src/theme/useThemeMode'
import { RailGlyph, type GlyphName } from './RailGlyph'

const normalize = (path: string): string => (path.endsWith('/') ? path : `${path}/`)

// The rail's tone: the primary at a low strength, on its own ground - the pill that marks where
// you are, the wash under a hovered item.
const tone = (theme: Theme, strength: number) => alpha(get(theme, 'palette.primary.main'), strength)

const RailRoot = styled('nav')(({ theme }) => ({
  position: 'sticky',
  // Above the sidebar beside it: the version menu opens from the rail over the sidebar's column.
  zIndex: 2,
  top: 0,
  alignSelf: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.space[1],
  width: '5.5rem',
  flexShrink: 0,
  height: '100dvh',
  overflowY: 'auto',
  padding: `${theme.space[3]} 0`,
  color: get(theme, 'text.initial'),
}))

const Pill = styled('span', {
  shouldForwardProp: createShouldForwardProp(['isActive']),
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.5rem',
  height: '2rem',
  borderRadius: '1rem',
  transition: 'background-color 150ms',
  backgroundColor: isActive ? tone(theme, 0.28) : 'transparent',
}))

const RailLink = styled('a')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.space[0.5],
  width: '100%',
  padding: `${theme.space[1]} 0`,
  color: 'inherit',
  textDecoration: 'none',
  fontSize: `${theme.fontSizes[0]}px`,
  textAlign: 'center',
  '&:hover [data-pill]:not([data-active])': { backgroundColor: tone(theme, 0.12) },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: -2,
  },
}))

const RailButton = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.5rem',
  height: '3.5rem',
  border: 0,
  borderRadius: '1rem',
  color: 'inherit',
  cursor: 'pointer',
  backgroundColor: tone(theme, 0.22),
  '&:hover': { backgroundColor: tone(theme, 0.32) },
  '&:focus-visible': {
    outline: `2px solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: 2,
  },
}))

const RoundButton = styled(RailButton)(
  { borderRadius: '50%', backgroundColor: 'transparent' },
  ({ theme }) => ({
    border: `1px solid ${get(theme, 'border.default')}`,
  })
)

/** The items of the rail, as links - one `<a>` each, the current one marked. */
export function RailLinks({ item }: Readonly<{ item: RailItem }>) {
  const { urlPathname } = usePageContext()
  const current = normalize(urlPathname || '/')
  const section = sectionFor(current)
  const active = current === '/' ? section.rail[0] : railItemFor(section, current)
  const isActive = active.id === item.id
  return (
    <RailLink href={item.href} aria-current={isActive ? 'page' : undefined}>
      <Pill isActive={isActive} data-pill data-active={isActive ? '' : undefined}>
        <RailGlyph name={item.icon as GlyphName} />
      </Pill>
      {item.label}
    </RailLink>
  )
}

/** The navigation rail: search, the parts of the docs as icons with names, the color mode. */
export function NavRail() {
  const { urlPathname } = usePageContext()
  const current = normalize(urlPathname || '/')
  const section = sectionFor(current)
  const { open } = useSearch()
  const { isDark, toggleTheme } = useThemeMode()
  return (
    <RailRoot aria-label="Primary">
      <RailButton type="button" onClick={open} aria-label="Search">
        <RailGlyph name="search" />
      </RailButton>
      <VersionMenu pkg={section.pkg} pathname={current} />
      <Flex flexDirection="column" alignItems="center" width="100%" mt={2} gap={0.5}>
        {section.rail.map((item) => (
          <RailLinks key={item.id} item={item} />
        ))}
      </Flex>
      <Flex flex="1 1 auto" />
      <RoundButton type="button" onClick={toggleTheme} aria-label="Toggle color scheme">
        <RailGlyph name={isDark ? 'light_mode' : 'dark_mode'} />
      </RoundButton>
    </RailRoot>
  )
}
