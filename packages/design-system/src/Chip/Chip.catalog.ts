import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { ChipProps, ChipVariant } from './Chip'

export const chipVariantValues = ['contained', 'outlined'] satisfies ChipVariant[]

export const chipCatalog = defineCatalogEntry<ChipProps>()({
  summary: 'A compact tag: a label, an icon or an avatar, and optionally a click and a delete.',
  isPlaceable: true,
  example: { component: 'Chip', props: { label: 'Tag' }, children: [] },
  variants: chipVariantValues.map((variant) => ({
    name: variant,
    label: variant === 'contained' ? 'Filled' : 'Outlined',
    example: { component: 'Chip', props: { label: 'Tag', variant }, children: [] },
  })),
  options: {
    variant: { values: chipVariantValues, default: 'contained' },
    color: { scale: 'palette', default: 'default' },
    size: { scale: 'sizes', default: 'md' },
    disabled: { values: [true, false], default: false },
  },
  content: { label: 'text', icon: 'child', avatar: 'child' },
})
