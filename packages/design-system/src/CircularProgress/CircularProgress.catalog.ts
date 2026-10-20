import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type {
  CircularProgressEasing,
  CircularProgressProps,
  CircularProgressVariant,
} from './CircularProgress'

export const circularProgressVariantValues = [
  'indeterminate',
  'determinate',
] satisfies CircularProgressVariant[]
export const circularProgressEasingValues = [
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
] satisfies CircularProgressEasing[]

const variantLabels: Record<CircularProgressVariant, string> = {
  indeterminate: 'Indeterminate',
  determinate: 'Determinate',
}

const variantProps: Record<
  CircularProgressVariant,
  { variant: CircularProgressVariant; value?: number }
> = {
  indeterminate: { variant: 'indeterminate' },
  determinate: { variant: 'determinate', value: 70 },
}

export const circularProgressCatalog = defineCatalogEntry<CircularProgressProps>()({
  summary: 'A circular loading indicator - a looping spinner, or an arc that shows a `value`.',
  isPlaceable: true,
  example: {
    component: 'CircularProgress',
    props: { variant: 'indeterminate', color: 'primary', size: 40 },
    children: [],
  },
  variants: circularProgressVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: {
      component: 'CircularProgress',
      props: { ...variantProps[variant], color: 'primary', size: 40 },
      children: [],
    },
  })),
  options: {
    variant: { values: circularProgressVariantValues, default: 'indeterminate' },
    color: { scale: 'palette', default: 'primary' },
    size: { default: 40 },
    thickness: { default: 3.6 },
    min: { default: 0 },
    max: { default: 100 },
    disableShrink: { values: [true, false], default: false },
    spinning: { values: [true, false], default: false },
    easing: { values: circularProgressEasingValues, default: 'linear' },
    showTrack: { values: [true, false], default: false },
  },
  content: {},
})
