import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const tableFooterCatalog = defineCatalogEntry({
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
