import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { NumberFieldProps, NumberFieldSpinButtons, NumberFieldVariant } from './NumberField'

export const numberFieldSpinButtonsValues = [
  'stacked',
  'sides',
  'none',
] satisfies NumberFieldSpinButtons[]
export const numberFieldVariantValues = [
  'default',
  'outlined',
  'underline',
  'text',
] satisfies NumberFieldVariant[]

const spinLabels = { stacked: 'Stacked', sides: 'Either side', none: 'No buttons' } as const

const example = {
  defaultValue: 5,
  min: 0,
  max: 10,
  incrementLabel: 'Increase',
  decrementLabel: 'Decrease',
  'aria-label': 'Quantity',
} as const

export const numberFieldCatalog = defineCatalogEntry<NumberFieldProps>()({
  summary:
    'A field for a number, read in its locale and clamped to a range, stepped by keys or buttons.',
  isPlaceable: true,
  example: {
    component: 'NumberField',
    props: { ...example, variant: 'outlined' },
    children: [],
  },
  variants: numberFieldSpinButtonsValues.map((spinButtons) => ({
    name: spinButtons,
    label: spinLabels[spinButtons],
    example: {
      component: 'NumberField',
      props: { ...example, variant: 'outlined', spinButtons },
      children: [],
    },
  })),
  options: {
    min: { values: [0, 1, -10] },
    max: { values: [10, 100] },
    step: { values: [1, 0.5, 5], default: 1 },
    spinButtons: { values: numberFieldSpinButtonsValues, default: 'stacked' },
    variant: { values: numberFieldVariantValues, default: 'default' },
    size: { scale: 'sizes', default: 'md' },
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text', default: 'primary' },
    shouldSnapOnStep: { values: [true, false], default: false },
    shouldScrubOnWheel: { values: [true, false], default: false },
    error: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    readOnly: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
  },
  content: {},
  twoWay: { prop: 'value', event: 'onChange', read: 'argument' },
  domEvents: ['onChangeCommitted'],
})
