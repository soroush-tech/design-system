import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { TableFooterProps } from './TableFooter'

export const tableFooterCatalog = defineCatalogEntry<TableFooterProps>()({
  summary: 'The footer section of a `Table` - totals or a `TablePagination` row below the body.',
  isPlaceable: false,
  example: {
    component: 'TableFooter',
    props: {},
    children: [
      node('TableRow', {}, [
        node('TableCell', { colSpan: 2 }, ['Total services']),
        node('TableCell', { align: 'right' }, ['3']),
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
