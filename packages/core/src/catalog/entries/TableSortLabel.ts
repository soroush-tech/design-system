import { defineCatalogEntry } from '../defineCatalogEntry'

export const tableSortLabelDirectionValues = ['asc', 'desc'] as const

export const tableSortLabelCatalog = defineCatalogEntry({
  summary:
    'A sortable column title for a header `TableCell` - a button with an arrow showing the sort direction.',
  isPlaceable: false,
  example: {
    component: 'TableSortLabel',
    props: { isActive: true, direction: 'asc' },
    children: ['Name'],
  },
  variants: [],
  options: {
    isActive: { values: [true, false], default: false },
    direction: { values: tableSortLabelDirectionValues, default: 'asc' },
    shouldHideSortIcon: { values: [true, false], default: true },
  },
  content: { children: 'children' },
  domEvents: ['onClick'],
})
