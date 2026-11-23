import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { NavLinkProps } from './NavLink'

export const navLinkCatalog = defineCatalogEntry<NavLinkProps>()({
  summary: 'A link to a page of a site, a row of a `NavTree` - filled when it is the current page.',
  isPlaceable: false,
  example: { component: 'NavLink', props: { href: '/components/button/' }, children: ['Button'] },
  variants: [],
  options: {
    color: { scale: 'palette' },
    isCurrent: { values: [true, false], default: false },
    isExternal: { values: [true, false], default: false },
  },
  content: { children: 'children', href: 'text', note: 'text' },
})
