import { defineCatalogEntry } from '../defineCatalogEntry'

export const buttonVariantValues = ['contained', 'outlined', 'text'] as const
export const buttonShapeValues = ['square', 'rounded', 'pill'] as const
export const buttonLoadingPositionValues = ['start', 'end', 'center'] as const

const variantLabels: Record<string, string> = {
  contained: 'Contained',
  outlined: 'Outlined',
  text: 'Text',
}

export const buttonCatalog = defineCatalogEntry({
  summary: 'An action - filled, stroked or plain, in any palette color, or a link with `href`.',
  isPlaceable: true,
  example: { component: 'Button', props: { variant: 'contained' }, children: ['Button'] },
  variants: buttonVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'Button', props: { variant }, children: ['Button'] },
  })),
  options: {
    variant: { values: buttonVariantValues, default: 'contained' },
    color: { scale: 'palette', default: 'primary' },
    size: { scale: 'sizes', default: 'md' },
    shape: { values: buttonShapeValues, default: 'square' },
    fullWidth: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    loading: { values: [true, false], default: false },
    loadingPosition: { values: buttonLoadingPositionValues, default: 'center' },
  },
  content: {
    children: 'children',
    startIcon: 'child',
    endIcon: 'child',
    loadingIndicator: 'child',
  },
  domEvents: ['onClick'],
})
