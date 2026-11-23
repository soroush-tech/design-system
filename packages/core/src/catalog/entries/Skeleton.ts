import { defineCatalogEntry } from '../defineCatalogEntry'

export const skeletonVariantValues = ['text', 'circular', 'rectangular'] as const
export const skeletonAnimationValues = ['pulse', 'wave', false] as const

const variantLabels: Record<string, string> = {
  text: 'Text',
  circular: 'Circular',
  rectangular: 'Rectangular',
}

// Each shape's size in its picture - a text line takes its height from the font.
const shapes: Record<string, { width: number; height?: number }> = {
  text: { width: 240 },
  circular: { width: 64, height: 64 },
  rectangular: { width: 240, height: 64 },
}

export const skeletonCatalog = defineCatalogEntry({
  summary: 'A placeholder shape shown while content loads - a text line, a circle or a block.',
  isPlaceable: true,
  example: {
    component: 'Skeleton',
    props: { variant: 'text', animation: 'pulse', width: 240 },
    children: [],
  },
  variants: skeletonVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'Skeleton', props: { variant, ...shapes[variant] }, children: [] },
  })),
  options: {
    variant: { values: skeletonVariantValues, default: 'text' },
    animation: { values: skeletonAnimationValues, default: 'pulse' },
    borderRadius: { scale: 'radii' },
  },
  content: { children: 'children' },
  preview: { width: 280, height: 80 },
})
