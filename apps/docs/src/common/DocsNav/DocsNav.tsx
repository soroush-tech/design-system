import { MenuItem } from '@soroush.tech/design-system/MenuItem'
import { NavGroup, NavLink, NavTree } from '@soroush.tech/design-system/NavTree'
import { Select } from '@soroush.tech/design-system/Select'
import { View } from '@soroush.tech/design-system/View'
import { railItemFor, sectionFor, type NavGroup as DocsNavGroup } from 'src/common/nav'
import { usePageContext } from 'src/hooks/usePageContext'

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
      <View mb={2}>
        <Select
          aria-label="Package"
          fullWidth
          borderRadius="lg"
          value={PACKAGES.find(({ pkg }) => pkg === section.pkg)?.href}
          onChange={(href) => window.location.assign(String(href))}
        >
          {PACKAGES.map(({ pkg, label, href }) => (
            <MenuItem key={pkg} value={href}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </View>
      <NavTree>
        {active.groups.map((group) => (
          <DocsGroup key={group.label} group={group} current={current} />
        ))}
      </NavTree>
    </View>
  )
}
