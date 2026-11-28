import { defineCatalogEntry } from '../defineCatalogEntry'

export const paginationItemTypeValues = [
  'page',
  'first',
  'previous',
  'next',
  'last',
  'start-ellipsis',
  'end-ellipsis',
] as const

export const paginationItemVariantValues = ['text', 'outlined'] as const
export const paginationItemShapeValues = ['circular', 'rounded'] as const

export const paginationItemCatalog = defineCatalogEntry({
  summary:
    'One item of a `Pagination` - a page number, a previous/next/first/last control or an ellipsis.',
  isPlaceable: false,
  example: { component: 'PaginationItem', props: { type: 'page', page: 1 }, children: [] },
  variants: [],
  options: {
    type: { values: paginationItemTypeValues, default: 'page' },
    isSelected: { values: [true, false], default: false },
    variant: { values: paginationItemVariantValues, default: 'text' },
    shape: { values: paginationItemShapeValues, default: 'circular' },
    color: { scale: 'palette', default: 'primary' },
    size: { scale: 'sizes', default: 'md' },
    disabled: { values: [true, false], default: false },
  },
  content: { page: 'text' },
  domEvents: ['onClick'],
})
