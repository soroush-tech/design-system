import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { BadgeProps } from './Badge'

export const badgeVariantValues = ['standard', 'dot'] satisfies NonNullable<BadgeProps['variant']>[]
export const badgeOverlapValues = ['rectangular', 'circular'] satisfies NonNullable<
  BadgeProps['overlap']
>[]

export const badgeCatalog = defineCatalogEntry<BadgeProps>()({
  summary: 'A count or a dot anchored over another element.',
  isPlaceable: true,
  example: {
    component: 'Badge',
    props: { badgeContent: 4 },
    children: [node('Icon', { name: 'star' })],
  },
  variants: [
    {
      name: 'dot',
      label: 'Dot',
      example: {
        component: 'Badge',
        props: { variant: 'dot' },
        children: [node('Icon', { name: 'star' })],
      },
    },
  ],
  options: {
    max: { values: [9, 99, 999], default: 99 },
    variant: { values: badgeVariantValues, default: 'standard' },
    color: { scale: 'palette', default: 'error' },
    isHidden: { values: [true, false], default: false },
    shouldShowZero: { values: [true, false], default: false },
    overlap: { values: badgeOverlapValues, default: 'rectangular' },
  },
  content: { children: 'children', badgeContent: 'text' },
})
