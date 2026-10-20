import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { TablePaginationActionsProps } from './TablePaginationActions'

export const tablePaginationActionsCatalog = defineCatalogEntry<TablePaginationActionsProps>()({
  summary:
    'The first, previous, next and last page buttons inside `TablePagination`, disabled at the bounds of `count`.',
  isPlaceable: false,
  example: {
    component: 'TablePaginationActions',
    props: { count: 100, page: 2, rowsPerPage: 10 },
    children: [],
  },
  variants: [],
  options: {
    size: { scale: 'sizes', default: 'sm' },
    disabled: { values: [true, false], default: false },
    shouldShowFirstButton: { values: [true, false], default: false },
    shouldShowLastButton: { values: [true, false], default: false },
  },
  content: {},
  twoWay: { prop: 'page', event: 'onPageChange', read: 'argument' },
})
