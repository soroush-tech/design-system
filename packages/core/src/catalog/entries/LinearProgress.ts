import { defineCatalogEntry } from '../defineCatalogEntry'

export const linearProgressVariantValues = ['indeterminate', 'determinate', 'query'] as const
export const linearProgressEasingValues = [
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
] as const

const variantLabels: Record<string, string> = {
  indeterminate: 'Indeterminate',
  determinate: 'Determinate',
  query: 'Query',
}

const variantProps = {
  indeterminate: { variant: 'indeterminate' },
  determinate: { variant: 'determinate', value: 70 },
  query: { variant: 'query' },
} as const

export const linearProgressCatalog = defineCatalogEntry({
  summary: 'A horizontal loading bar - looping, driven by a `value`, or with a buffer behind it.',
  isPlaceable: true,
  example: {
    component: 'LinearProgress',
    props: { variant: 'indeterminate', color: 'primary' },
    children: [],
  },
  variants: linearProgressVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: {
      component: 'LinearProgress',
      props: { ...variantProps[variant], color: 'primary' as const },
      children: [],
    },
  })),
  options: {
    variant: { values: linearProgressVariantValues, default: 'indeterminate' },
    color: { scale: 'palette', default: 'primary' },
    thickness: { default: 4 },
    buffer: { values: [true, false], default: false },
    min: { default: 0 },
    max: { default: 100 },
    spinning: { values: [true, false], default: false },
    easing: { values: linearProgressEasingValues, default: 'linear' },
    showTrack: { values: [true, false], default: true },
    round: { values: [true, false], default: false },
  },
  content: {},
  preview: { width: 240 },
})
