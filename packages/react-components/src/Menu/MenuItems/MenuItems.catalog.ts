import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { MenuItemsProps } from './MenuItems'

// Not placed by hand: its rows are data JSON can't hold - labels are nodes, rows take handlers.
export const menuItemsCatalog = defineCatalogEntry<MenuItemsProps>()({
  summary: "A `MenuList`'s rows from data - rows, dividers and submenus as entries.",
  isPlaceable: false,
  example: { component: 'MenuItems', props: {}, children: [] },
  variants: [],
  options: {},
  content: {},
})
