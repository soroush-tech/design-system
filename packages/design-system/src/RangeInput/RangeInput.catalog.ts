import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { RangeInputProps, RangeInputTrack, RangeInputValueLabel } from './RangeInput'

export const rangeInputTrackValues = ['normal', 'inverted'] satisfies RangeInputTrack[]
export const rangeInputValueLabelValues = ['off', 'auto', 'on'] satisfies RangeInputValueLabel[]
export const rangeInputOrientationValues = ['horizontal', 'vertical'] satisfies NonNullable<
  RangeInputProps['orientation']
>[]

// A catalog example is JSON, whose arrays are not readonly: the value, at its mutable type.
type RangeInputCatalogProps = Omit<RangeInputProps, 'value' | 'defaultValue'> & {
  value?: number | number[]
  defaultValue?: number | number[]
}

// What each picture sets - one table, so each example's props stay as written.
const variantProps = {
  single: { defaultValue: 40, 'aria-label': 'Value' },
  range: { defaultValue: [20, 70] },
  marks: { defaultValue: 30, step: 10, marks: true, 'aria-label': 'Value' },
}
const variantLabels = { single: 'One thumb', range: 'A range', marks: 'With marks' }

export const rangeInputCatalog = defineCatalogEntry<RangeInputCatalogProps>()({
  summary: 'A slider: one value on a range, or two or more thumbs for a range of values.',
  isPlaceable: true,
  example: {
    component: 'RangeInput',
    props: { defaultValue: 40, 'aria-label': 'Value' },
    children: [],
  },
  variants: (Object.keys(variantProps) as (keyof typeof variantProps)[]).map((name) => ({
    name,
    label: variantLabels[name],
    example: { component: 'RangeInput', props: variantProps[name], children: [] },
  })),
  options: {
    min: { values: [0, 10, -50] },
    max: { values: [10, 100, 1000] },
    step: { values: [1, 5, 10, 0.1], default: 1 },
    shiftStep: { values: [10, 20], default: 10 },
    marks: { values: [true, false], default: false },
    orientation: { values: rangeInputOrientationValues, default: 'horizontal' },
    track: { values: rangeInputTrackValues, default: 'normal' },
    valueLabel: { values: rangeInputValueLabelValues, default: 'off' },
    shouldSwapThumbs: { values: [true, false], default: true },
    size: { scale: 'sizes', default: 'md' },
    color: { scale: 'palette', default: 'primary' },
    error: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
  },
  content: {},
  twoWay: { prop: 'value', event: 'onChange', read: 'argument' },
  domEvents: ['onChangeCommitted'],
})
