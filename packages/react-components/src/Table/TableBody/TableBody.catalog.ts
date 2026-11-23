import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { TableBodyProps } from './TableBody'

export const tableBodyCatalog = defineCatalogEntry<TableBodyProps>()({
  summary: 'The body section of a `Table` - its data rows, with cells rendered as `<td>`.',
  isPlaceable: false,
  example: {
    component: 'TableBody',
    props: {},
    children: [
      node('TableRow', { isHoverable: true }, [
        node('TableCell', {}, ['web']),
        node('TableCell', {}, ['fra1']),
        node('TableCell', { align: 'right' }, ['42']),
      ]),
      node('TableRow', { isHoverable: true }, [
        node('TableCell', {}, ['api']),
        node('TableCell', {}, ['fra1']),
        node('TableCell', { align: 'right' }, ['87']),
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
