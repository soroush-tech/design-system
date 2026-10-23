import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { FabMenuItemProps } from './FabMenuItem'

export const fabMenuItemCatalog = defineCatalogEntry<FabMenuItemProps>()({
  summary: 'One action of a FabMenu: an extended fab with an icon and a label.',
  isPlaceable: false,
  example: { component: 'FabMenuItem', props: {}, children: ['Document'] },
  variants: [],
  options: {
    color: { scale: 'palette', default: 'secondary' },
    disabled: { values: [true, false], default: false },
  },
  content: { children: 'text', icon: 'child' },
})
