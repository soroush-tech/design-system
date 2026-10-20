import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { TabContextProps } from './TabContext'

export const tabContextCatalog = defineCatalogEntry<TabContextProps>()({
  summary:
    'Holds the selected value for a `TabList` and the `TabPanel`s beside it, wherever they sit.',
  isPlaceable: false,
  example: {
    component: 'TabContext',
    props: { defaultValue: 'layers' },
    children: [
      node('TabList', { 'aria-label': 'Left panel' }, [
        node('Tab', { value: 'layers', label: 'Layers' }),
        node('Tab', { value: 'assets', label: 'Assets' }),
      ]),
      node('TabPanel', { value: 'layers', p: 2 }, [
        node('Typography', {}, ['Layers of the page.']),
      ]),
      node('TabPanel', { value: 'assets', p: 2 }, [node('Typography', {}, ["The page's assets."])]),
    ],
  },
  variants: [],
  options: {},
  content: { children: 'children' },
  twoWay: { prop: 'value', event: 'onChange', read: 'argument' },
})
