import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { PaginationProps, PaginationShape, PaginationVariant } from './Pagination'

export const paginationVariantValues = ['text', 'outlined'] satisfies PaginationVariant[]
export const paginationShapeValues = ['circular', 'rounded'] satisfies PaginationShape[]

const variantLabels: Record<PaginationVariant, string> = {
  text: 'Text',
  outlined: 'Outlined',
}

export const paginationCatalog = defineCatalogEntry<PaginationProps>()({
  summary: 'Page numbers with previous and next controls, for moving through paged content.',
  isPlaceable: true,
  example: { component: 'Pagination', props: { count: 10 }, children: [] },
  variants: paginationVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'Pagination', props: { count: 10, variant }, children: [] },
  })),
  options: {
    variant: { values: paginationVariantValues, default: 'text' },
    shape: { values: paginationShapeValues, default: 'circular' },
    color: { scale: 'palette', default: 'primary' },
    size: { scale: 'sizes', default: 'md' },
    disabled: { values: [true, false], default: false },
    shouldShowFirstButton: { values: [true, false], default: false },
    shouldShowLastButton: { values: [true, false], default: false },
    shouldHidePrevButton: { values: [true, false], default: false },
    shouldHideNextButton: { values: [true, false], default: false },
  },
  content: { getItemAriaLabel: 'none' },
  twoWay: { prop: 'page', event: 'onChange', read: 'argument' },
})
