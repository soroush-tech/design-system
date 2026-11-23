import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { MenuListProps } from './MenuList'

export const menuListCatalog = defineCatalogEntry<MenuListProps>()({
  summary: 'A `role="menu"` list of `MenuItem` commands that owns the keyboard.',
  isPlaceable: true,
  example: {
    component: 'MenuList',
    props: { 'aria-label': 'Branch' },
    children: [
      node('MenuItem', { value: 'new' }, ['New branch...']),
      node('MenuItem', { value: 'checkout', disabled: true, note: 'Coming later' }, [
        'Checkout tag or revision...',
      ]),
      node('MenuDivider'),
      node('MenuItem', { value: 'rename' }, ['Rename...']),
      node('MenuItem', { value: 'delete' }, ['Delete']),
    ],
  },
  variants: [],
  options: {
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text' },
    size: { scale: 'sizes', default: 'md' },
    dense: { values: [true, false], default: false },
    shouldWrap: { values: [true, false], default: true },
    shouldAutoFocus: { values: [true, false], default: false },
  },
  content: { children: 'children' },
  domEvents: ['onSelect'],
  preview: { width: 220 },
})
