import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { CardProps, CardVariant } from './Card'

export const cardVariantValues = ['paper', 'bracketBox', 'interactive'] satisfies CardVariant[]

const variantLabels: Record<CardVariant, string> = {
  paper: 'Paper',
  bracketBox: 'Bracket box',
  interactive: 'Interactive',
}

const content = {
  title: 'Component',
  caption: 'A flexible card surface with paper and bracketBox variants.',
  p: 3 as const,
}

export const cardCatalog = defineCatalogEntry<CardProps>()({
  summary: 'A surface with an optional icon, title and caption over its own content.',
  isPlaceable: true,
  example: { component: 'Card', props: content, children: [] },
  variants: cardVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'Card', props: { ...content, variant }, children: [] },
  })),
  options: {
    variant: { values: cardVariantValues, default: 'paper' },
    elevation: { values: [0, 1, 2, 4, 8, 16, 24], default: 1 },
  },
  content: { children: 'children', title: 'text', caption: 'text' },
  preview: { width: 280 },
})
