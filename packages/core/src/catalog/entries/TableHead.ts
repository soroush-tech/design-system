import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const tableHeadCatalog = defineCatalogEntry({
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
