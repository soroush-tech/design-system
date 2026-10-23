import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { ChipProps, ChipVariant } from './Chip'

export const chipVariantValues = ['contained', 'outlined', 'text'] satisfies ChipVariant[]

const variantLabels = { contained: 'Filled', outlined: 'Outlined', text: 'Text' } as const

export const chipCatalog = defineCatalogEntry<ChipProps>()({
  summary: 'A compact tag: a label, an icon or an avatar, and optionally a click and a delete.',
  isPlaceable: true,
  example: { component: 'Chip', props: { label: 'Tag' }, children: [] },
  variants: chipVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'Chip', props: { label: 'Tag', variant }, children: [] },
  })),
  options: {
    variant: { values: chipVariantValues, default: 'contained' },
    color: { scale: 'palette', default: 'default' },
    size: { scale: 'sizes', default: 'md' },
    shape: { values: ['square', 'rounded', 'pill'], default: 'pill' },
    borderRadius: { scale: 'radii' },
    disabled: { values: [true, false], default: false },
  },
  content: { label: 'text', icon: 'child', avatar: 'child' },
})
