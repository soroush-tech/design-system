import { styled, get } from '@soroush.tech/design-system'
import { Flex } from '@soroush.tech/design-system/Flex'
import type { IconName } from '@soroush.tech/design-system/Icon'
import { Sidebar, SidebarItem } from '@soroush.tech/design-system/Sidebar'
import { isVersioned, sectionFor, railItemFor, type RailIcon } from 'src/common/nav'
import { useSearch } from 'src/common/Search/SearchContext'
import { VersionMenu } from 'src/common/VersionMenu/VersionMenu'
import { usePageContext } from 'src/hooks/usePageContext'
import { useThemeMode } from 'src/theme/useThemeMode'

const normalize = (path: string): string => (path.endsWith('/') ? path : `${path}/`)

// The design system's icon for each glyph of the rail.
const ICONS: Record<RailIcon, IconName> = {
  home: 'home',
  dots: 'grid_view',
  add_circle: 'add_circle',
  package: 'inventory_2',
  palette: 'palette',
  article: 'article',
  book: 'menu_book',
}

// The icons and names of the rail are the page's text color, as before; the pill alone is the
// primary's - the rail's items would otherwise take its text.primary, and the current one its main.
const Rail = styled(Sidebar)(({ theme }) => ({
  "&& a, && [role='button']:not([aria-haspopup])": { color: get(theme, 'text.initial') },
}))

/** The navigation rail: search, the parts of the docs as icons with names, the color mode. */
export function NavRail() {
  const { urlPathname } = usePageContext()
  const current = normalize(urlPathname || '/')
  const section = sectionFor(current)
  const active = current === '/' ? section.rail[0] : railItemFor(section, current)
  const { open } = useSearch()
  const { isDark, toggleTheme } = useThemeMode()
  return (
    <Rail
      aria-label="Primary"
      layout="stacked"
      position="sticky"
      top={0}
      // Above the sidebar beside it: the version menu opens from the rail over its column.
      zIndex={2}
      alignSelf="flex-start"
      height="100dvh"
      overflowY="auto"
      py={3}
      gap={1}
    >
      <SidebarItem icon="search" label="Search" aria-pressed={undefined} onSelect={open} />
      {isVersioned(section.pkg) && <VersionMenu pkg={section.pkg} pathname={current} />}
      <Flex flexDirection="column" alignItems="center" width="100%" mt={2} gap={0.5}>
        {section.rail.map((item) => {
          const isActive = active.id === item.id
          return (
            <SidebarItem
              key={item.id}
              icon={ICONS[item.icon]}
              label={item.label}
              href={item.href}
              isSelected={isActive}
              aria-current={isActive ? 'page' : undefined}
              aria-pressed={undefined}
            />
          )
        })}
      </Flex>
      <Flex flex="1 1 auto" />
      <SidebarItem
        icon={isDark ? 'light_mode' : 'dark_mode'}
        label="Color scheme"
        aria-label="Toggle color scheme"
        aria-pressed={undefined}
        onSelect={toggleTheme}
      />
    </Rail>
  )
}
