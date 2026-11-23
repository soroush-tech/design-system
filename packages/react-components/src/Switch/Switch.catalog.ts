import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { SwitchEdge, SwitchProps, SwitchVariant } from './Switch'

export const switchVariantValues = ['outside', 'inside'] satisfies SwitchVariant[]
export const switchEdgeValues = ['start', 'end', false] satisfies SwitchEdge[]

const variantLabels: Record<SwitchVariant, string> = {
  outside: 'Outside thumb',
  inside: 'Inside thumb',
}

export const switchCatalog = defineCatalogEntry<SwitchProps>()({
  summary: 'An on/off toggle with an optional label, its thumb over or inside the track.',
  isPlaceable: true,
  example: { component: 'Switch', props: {}, children: ['Enable dark mode'] },
  variants: switchVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'Switch', props: { variant }, children: ['Enable dark mode'] },
  })),
  options: {
    variant: { values: switchVariantValues, default: 'outside' },
    color: { scale: 'palette', default: 'default' },
    bg: { scale: 'background', default: 'default' },
    size: { scale: 'sizes', default: 'md' },
    marked: { values: [true, false], default: false },
    edge: { values: switchEdgeValues, default: false },
    disabled: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
  },
  content: { children: 'children', icon: 'child', checkedIcon: 'child' },
  twoWay: { prop: 'checked', event: 'onChange', read: 'target.checked' },
})
