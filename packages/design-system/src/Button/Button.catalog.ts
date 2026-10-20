import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { ButtonLoadingPosition, ButtonProps, ButtonShape, ButtonVariant } from './Button'

export const buttonVariantValues = ['contained', 'outlined', 'text'] satisfies ButtonVariant[]
export const buttonShapeValues = ['square', 'rounded', 'pill'] satisfies ButtonShape[]
export const buttonLoadingPositionValues = [
  'start',
  'end',
  'center',
] satisfies ButtonLoadingPosition[]

const variantLabels: Record<ButtonVariant, string> = {
  contained: 'Contained',
  outlined: 'Outlined',
  text: 'Text',
}

export const buttonCatalog = defineCatalogEntry<ButtonProps>()({
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
