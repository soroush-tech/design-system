import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { TabPanelProps } from './TabPanel'

export const tabPanelCatalog = defineCatalogEntry<TabPanelProps>()({
  summary: 'The content a tab shows - inside a `TabContext`, shown while its tab is selected.',
  // It needs a TabContext around it.
  isPlaceable: false,
  example: {
    component: 'TabPanel',
    props: { value: 'layers' },
    children: [node('Typography', {}, ['Layers of the page.'])],
  },
  variants: [],
  options: {
    shouldKeepMounted: { values: [true, false], default: false },
    bg: { scale: 'background' },
    borderRadius: { scale: 'radii' },
  },
  content: { children: 'children' },
})
