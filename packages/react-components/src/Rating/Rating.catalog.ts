import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { RatingProps } from './Rating'

export const ratingPrecisionValues = [1, 0.5] satisfies number[]

const sizes = { sm: 'Small', md: 'Medium', lg: 'Large' } as const

export const ratingCatalog = defineCatalogEntry<RatingProps>()({
  summary: 'A row of icons the user sets as a rating, or a read-only display of one.',
  isPlaceable: true,
  example: {
    component: 'Rating',
    props: { defaultValue: 3, 'aria-label': 'Rating', emptyLabelText: 'No rating' },
    children: [],
  },
  variants: (Object.keys(sizes) as (keyof typeof sizes)[]).map((size) => ({
    name: size,
    label: sizes[size],
    example: {
      component: 'Rating',
      props: { defaultValue: 3, size, 'aria-label': 'Rating' },
      children: [],
    },
  })),
  options: {
    max: { values: [3, 5, 10], default: 5 },
    precision: { values: ratingPrecisionValues, default: 1 },
    highlightSelectedOnly: { values: [true, false], default: false },
    readOnly: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
    error: { values: [true, false], default: false },
    size: { scale: 'sizes', default: 'md' },
    color: { scale: 'palette', default: 'warning' },
  },
  content: { icon: 'child', emptyIcon: 'child' },
  twoWay: { prop: 'value', event: 'onChange', read: 'argument' },
  domEvents: ['onChangeActive'],
})
