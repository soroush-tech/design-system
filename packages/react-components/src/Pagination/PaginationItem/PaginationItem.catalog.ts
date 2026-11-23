import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { PaginationItemType } from '../hooks/usePagination'
import type {
  PaginationItemProps,
  PaginationItemShape,
  PaginationItemVariant,
} from './PaginationItem'

export const paginationItemTypeValues = [
  'page',
  'first',
  'previous',
  'next',
  'last',
  'start-ellipsis',
  'end-ellipsis',
] satisfies PaginationItemType[]

export const paginationItemVariantValues = ['text', 'outlined'] satisfies PaginationItemVariant[]
export const paginationItemShapeValues = ['circular', 'rounded'] satisfies PaginationItemShape[]

export const paginationItemCatalog = defineCatalogEntry<PaginationItemProps>()({
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
