import { styled } from '@soroush.tech/design-system'
import { Button } from '@soroush.tech/design-system/Button'
import { Icon } from '@soroush.tech/design-system/Icon'
import { Menu } from '@soroush.tech/design-system/Menu'
import { MenuItem } from '@soroush.tech/design-system/MenuItem'
import { NavGroup, NavLink, NavTree } from '@soroush.tech/design-system/NavTree'
import { View } from '@soroush.tech/design-system/View'
import { railItemFor, sectionFor, type NavGroup as DocsNavGroup } from 'src/common/nav'
import { usePageContext } from 'src/hooks/usePageContext'

// The menu puts its trigger in an inline box; the picker fills the panel.
const Picker = styled('div')(({ theme }) => ({
  marginBottom: theme.space[2],
  '& > div': { display: 'flex', width: '100%' },
}))

const normalize = (path: string): string => (path.endsWith('/') ? path : `${path}/`)

const PACKAGES = [
  { pkg: 'design-system', label: 'Design System', href: '/design-system/' },
  { pkg: 'markdown', label: 'Markdown', href: '/markdown/' },
  { pkg: 'styled-system', label: 'Styled System', href: '/styled-system/' },
] as const

function DocsGroup({ group, current }: Readonly<{ group: DocsNavGroup; current: string }>) {
  return (
    <NavGroup
      label={group.label}
      isCollapsible={group.isCollapsible}
      isOpen={group.items.some((item) => item.href === current)}
    >
      {group.items.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          isCurrent={current === item.href}
          isExternal={item.isExternal}
          note={item.note}
        >
          {item.label}
        </NavLink>
      ))}
    </NavGroup>
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
      <Picker>
        <Menu
          aria-label="Package"
          onSelect={(href) => window.location.assign(String(href))}
          trigger={
            <Button
              variant="outlined"
              shape="pill"
              fullWidth
              endIcon={<Icon name="expand_more" />}
              style={{ textTransform: 'none', justifyContent: 'space-between' }}
            >
              {PACKAGES.find(({ pkg }) => pkg === section.pkg)?.label}
            </Button>
          }
        >
          {PACKAGES.map(({ pkg, label, href }) => (
            <MenuItem key={pkg} value={href} role="menuitemradio" selected={pkg === section.pkg}>
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Picker>
      <NavTree>
        {active.groups.map((group) => (
          <DocsGroup key={group.label} group={group} current={current} />
        ))}
      </NavTree>
    </View>
  )
}
