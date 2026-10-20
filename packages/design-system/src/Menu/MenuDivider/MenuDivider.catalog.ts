import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { MenuDividerProps } from './MenuDivider'

export const menuDividerCatalog = defineCatalogEntry<MenuDividerProps>()({
  summary: 'A line between groups of rows in a `MenuList`.',
  isPlaceable: false,
  example: { component: 'MenuDivider', props: {}, children: [] },
  variants: [],
  options: {},
  content: {},
})
