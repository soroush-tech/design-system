import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { NumberInputProps, NumberInputSpinButtons, NumberInputVariant } from './NumberInput'

export const numberInputSpinButtonsValues = [
  'stacked',
  'sides',
  'none',
] satisfies NumberInputSpinButtons[]
export const numberInputVariantValues = [
  'default',
  'outlined',
  'underline',
  'text',
] satisfies NumberInputVariant[]

const spinLabels = { stacked: 'Stacked', sides: 'Either side', none: 'No buttons' } as const

const example = {
  defaultValue: 5,
  min: 0,
  max: 10,
  incrementLabel: 'Increase',
  decrementLabel: 'Decrease',
  'aria-label': 'Quantity',
} as const

export const numberInputCatalog = defineCatalogEntry<NumberInputProps>()({
  summary:
    'A field for a number, read in its locale and clamped to a range, stepped by keys or buttons.',
  isPlaceable: true,
  example: {
    component: 'NumberInput',
    props: { ...example, variant: 'outlined' },
    children: [],
  },
  variants: numberInputSpinButtonsValues.map((spinButtons) => ({
    name: spinButtons,
    label: spinLabels[spinButtons],
    example: {
      component: 'NumberInput',
      props: { ...example, variant: 'outlined', spinButtons },
      children: [],
    },
  })),
  options: {
    min: { values: [0, 1, -10] },
    max: { values: [10, 100] },
    step: { values: [1, 0.5, 5], default: 1 },
    spinButtons: { values: numberInputSpinButtonsValues, default: 'stacked' },
    variant: { values: numberInputVariantValues, default: 'default' },
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
