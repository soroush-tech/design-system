import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const toggleButtonGroupOrientationValues = ['horizontal', 'vertical'] as const

const colorLabels = {
  default: 'Default',
  primary: 'Primary',
  secondary: 'Secondary',
  success: 'Success',
  error: 'Error',
  info: 'Info',
  warning: 'Warning',
}

const colors = Object.keys(colorLabels) as (keyof typeof colorLabels)[]

const platforms = [
  node('ToggleButton', { value: 'web' }, ['Web']),
  node('ToggleButton', { value: 'android' }, ['Android']),
  node('ToggleButton', { value: 'ios' }, ['iOS']),
]

const props = { isExclusive: true, value: 'web', 'aria-label': 'Platform' }

export const toggleButtonGroupCatalog = defineCatalogEntry({
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
