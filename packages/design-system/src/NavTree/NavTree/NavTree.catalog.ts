import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { NavTreeProps } from './NavTree'

export const navTreeCatalog = defineCatalogEntry<NavTreeProps>()({
  summary: 'A tree of links to the pages of a site - groups of links, and links of its own.',
  isPlaceable: true,
  example: {
    component: 'NavTree',
    props: {},
    children: [
      node('NavGroup', { label: 'Components' }, [
        node('NavLink', { href: '/components/button/', isCurrent: true }, ['Button']),
        node('NavLink', { href: '/components/tabs/' }, ['Tabs']),
      ]),
      node('NavGroup', { label: 'Guides', isCollapsible: true, isOpen: true }, [
        node('NavLink', { href: '/guides/theming/' }, ['Theming']),
      ]),
    ],
  },
  variants: [],
  options: {
    color: { scale: 'palette', default: 'primary' },
  },
  content: { children: 'children' },
})
