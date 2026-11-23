import { defineCatalogEntry } from '../defineCatalogEntry'

export const tableControlCatalog = defineCatalogEntry({
  summary:
    'Renders the visible rows of a dataset inside `TableBody` - sorted by `useTableSort` and sliced by `useTablePagination`, through a row render function.',
  isPlaceable: false,
  example: { component: 'TableControl', props: {}, children: [] },
  variants: [],
  options: {},
  content: { children: 'none' },
})
