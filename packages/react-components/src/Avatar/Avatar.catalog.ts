import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { AvatarProps, AvatarVariant } from './Avatar'

export const avatarVariantValues = ['circular', 'rounded', 'square'] satisfies AvatarVariant[]

const variantLabels: Record<AvatarVariant, string> = {
  circular: 'Circular',
  rounded: 'Rounded',
  square: 'Square',
}

const initials = { size: 'md', bg: 'secondary' } as const

export const avatarCatalog = defineCatalogEntry<AvatarProps>()({
  summary: 'A person or entity shown as an image, or as initials when there is no image.',
  isPlaceable: true,
  example: {
    component: 'Avatar',
    props: { ...initials, variant: 'circular' },
    children: ['MS'],
  },
  variants: avatarVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'Avatar', props: { ...initials, variant }, children: ['MS'] },
  })),
  options: {
    variant: { values: avatarVariantValues, default: 'circular' },
    size: { scale: 'avatar', default: 'md' },
    bg: { scale: 'background' },
    ring: { values: [true, false], default: false },
    ringColor: { scale: 'border', default: 'primary' },
    ringWidth: { scale: 'borderWidths', default: 'thin' },
  },
  content: { children: 'children' },
})
