import { defineCatalogEntry } from '../defineCatalogEntry'

// Not placed by hand: its rows are data JSON can't hold - labels are nodes, rows take handlers.
export const menuItemsCatalog = defineCatalogEntry({
  summary: "A `MenuList`'s rows from data - rows, dividers and submenus as entries.",
  isPlaceable: false,
  example: { component: 'MenuItems', props: {}, children: [] },
  variants: [],
  options: {},
  content: {},
})
