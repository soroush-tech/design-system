import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { TableContainerProps } from './TableContainer'

export const tableContainerCatalog = defineCatalogEntry<TableContainerProps>()({
  summary:
    'A scroll wrapper for a `Table` - a wide table scrolls sideways inside it, and a bounded height lets `hasStickyHeader` stick.',
  isPlaceable: false,
  example: {
    component: 'TableContainer',
    props: {},
    children: [
      node('Table', {}, [
        node('TableHead', {}, [
          node('TableRow', {}, [
            node('TableCell', {}, ['Service']),
            node('TableCell', {}, ['Region']),
            node('TableCell', { align: 'right' }, ['Latency (ms)']),
          ]),
        ]),
        node('TableBody', {}, [
          node('TableRow', {}, [
            node('TableCell', {}, ['web']),
            node('TableCell', {}, ['fra1']),
            node('TableCell', { align: 'right' }, ['42']),
          ]),
          node('TableRow', {}, [
            node('TableCell', {}, ['api']),
            node('TableCell', {}, ['fra1']),
            node('TableCell', { align: 'right' }, ['87']),
          ]),
        ]),
      ]),
    ],
  },
  variants: [],
  options: {
    bg: { scale: 'background' },
    borderColor: { scale: 'border' },
    borderWidth: { scale: 'borderWidths' },
    borderRadius: { scale: 'radii' },
  },
  content: { children: 'children' },
  preview: { width: 360 },
})
