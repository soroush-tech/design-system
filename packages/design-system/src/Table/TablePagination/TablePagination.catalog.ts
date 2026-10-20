import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { TableCellPadding } from '../TableContext'
import type { TablePaginationProps } from './TablePagination'

// The same list as Table's `tableCellPaddingValues` - a catalog file imports no other at runtime.
const cellPaddingValues = ['normal', 'none'] satisfies TableCellPadding[]

export const tablePaginationCatalog = defineCatalogEntry<TablePaginationProps>()({
  summary:
    'A pagination cell for `TableFooter > TableRow` - a rows-per-page picker, the shown range and previous/next buttons for a controlled page.',
  isPlaceable: false,
  example: {
    component: 'TablePagination',
    props: { count: 100, page: 2, rowsPerPage: 10 },
    children: [],
  },
  variants: [],
  options: {
    disabled: { values: [true, false], default: false },
    shouldShowFirstButton: { values: [true, false], default: false },
    shouldShowLastButton: { values: [true, false], default: false },
    size: { scale: 'sizes' },
    cellPadding: { values: cellPaddingValues },
    color: { scale: 'text' },
    bg: { scale: 'background' },
  },
  content: { rowsPerPageLabel: 'text', displayedRowsLabel: 'none' },
  twoWay: { prop: 'page', event: 'onPageChange', read: 'argument' },
  preview: { width: 480 },
})
