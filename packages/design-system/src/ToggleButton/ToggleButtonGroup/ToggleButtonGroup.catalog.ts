import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { ButtonColor } from '../../Button'
import type { ButtonGroupOrientation } from '../../ButtonGroup'
import type { ToggleButtonGroupProps } from './ToggleButtonGroup'

export const toggleButtonGroupOrientationValues = [
  'horizontal',
  'vertical',
] satisfies ButtonGroupOrientation[]

const colorLabels: Record<ButtonColor, string> = {
  default: 'Default',
  primary: 'Primary',
  secondary: 'Secondary',
  success: 'Success',
  error: 'Error',
  info: 'Info',
  warning: 'Warning',
}

const colors = Object.keys(colorLabels) as ButtonColor[]

const platforms = [
  node('ToggleButton', { value: 'web' }, ['Web']),
  node('ToggleButton', { value: 'android' }, ['Android']),
  node('ToggleButton', { value: 'ios' }, ['iOS']),
]

const props = { isExclusive: true, value: 'web', 'aria-label': 'Platform' }

export const toggleButtonGroupCatalog = defineCatalogEntry<ToggleButtonGroupProps>()({
  summary:
    'A joined row of `ToggleButton`s where one (`isExclusive`) or several values can be selected.',
  isPlaceable: true,
  example: {
    component: 'ToggleButtonGroup',
    props: { ...props, color: 'primary' },
    children: platforms,
  },
  variants: colors.map((color) => ({
    name: color,
    label: colorLabels[color],
    example: { component: 'ToggleButtonGroup', props: { ...props, color }, children: platforms },
  })),
  options: {
    isExclusive: { values: [true, false], default: false },
    color: { scale: 'palette', default: 'default' },
    size: { scale: 'sizes', default: 'md' },
    orientation: { values: toggleButtonGroupOrientationValues, default: 'horizontal' },
    borderRadius: { scale: 'radii', default: 'md' },
    disabled: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
  },
  content: { children: 'children' },
  twoWay: { prop: 'value', event: 'onChange', read: 'argument' },
})
