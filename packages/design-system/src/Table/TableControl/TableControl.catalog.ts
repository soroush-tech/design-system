import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { TableControlProps } from './TableControl'

export const tableControlCatalog = defineCatalogEntry<TableControlProps<unknown>>()({
  summary:
    'Renders the visible rows of a dataset inside `TableBody` - sorted by `useTableSort` and sliced by `useTablePagination`, through a row render function.',
  isPlaceable: false,
  example: { component: 'TableControl', props: {}, children: [] },
  variants: [],
  options: {},
  content: { children: 'none' },
})
