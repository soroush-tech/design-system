import { defineCatalogEntry } from '../defineCatalogEntry'

const colorLabels: Record<string, string> = {
  default: 'Default',
  primary: 'Primary',
  secondary: 'Secondary',
  success: 'Success',
  error: 'Error',
  info: 'Info',
  warning: 'Warning',
}

const colors = Object.keys(colorLabels)

export const radioCatalog = defineCatalogEntry({
  summary: 'One choice of a set - radios that share a `name` allow only one to be selected.',
  isPlaceable: true,
  example: { component: 'Radio', props: { name: 'option', value: 'a' }, children: ['Option A'] },
  variants: colors.map((color) => ({
    name: color,
    label: colorLabels[color],
    example: {
      component: 'Radio',
      props: { name: 'option', value: 'a', color, checked: true },
      children: ['Option A'],
    },
  })),
  options: {
    color: { scale: 'palette', default: 'default' },
    size: { scale: 'sizes', default: 'md' },
    disabled: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
  },
  content: { children: 'children', icon: 'child', checkedIcon: 'child' },
  twoWay: { prop: 'checked', event: 'onChange', read: 'target.checked' },
})
