import { defineCatalogEntry } from '../defineCatalogEntry'

export const paginationVariantValues = ['text', 'outlined'] as const
export const paginationShapeValues = ['circular', 'rounded'] as const

const variantLabels: Record<string, string> = {
  text: 'Text',
  outlined: 'Outlined',
}

export const paginationCatalog = defineCatalogEntry({
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
