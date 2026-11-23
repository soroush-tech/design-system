import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { TabListProps } from './TabList'

export const tabListCatalog = defineCatalogEntry<TabListProps>()({
  summary:
    "The `Tabs` of a `TabContext` - it shows the context's value and links each tab to its panel.",
  // It needs a TabContext around it.
  isPlaceable: false,
  example: {
    component: 'TabList',
    props: { 'aria-label': 'Left panel' },
    children: [
      node('Tab', { value: 'layers', label: 'Layers' }),
      node('Tab', { value: 'assets', label: 'Assets' }),
    ],
  },
  variants: [],
  options: {},
  content: { children: 'children', startContent: 'children', endContent: 'children' },
  domEvents: ['onChange', 'onTabClose'],
})
