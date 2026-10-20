import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { TableHeadProps } from './TableHead'

export const tableHeadCatalog = defineCatalogEntry<TableHeadProps>()({
  summary:
    'The header section of a `Table` - its column-title row, with cells rendered as `<th scope="col">`.',
  isPlaceable: false,
  example: {
    component: 'TableHead',
    props: {},
    children: [
      node('TableRow', {}, [
        node('TableCell', {}, ['Service']),
        node('TableCell', {}, ['Region']),
        node('TableCell', { align: 'right' }, ['Latency (ms)']),
      ]),
    ],
  },
  variants: [],
  options: {
    color: { scale: 'text' },
    bg: { scale: 'background' },
    borderColor: { scale: 'border' },
  },
  content: { children: 'children' },
})
