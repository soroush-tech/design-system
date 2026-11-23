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

export const checkboxCatalog = defineCatalogEntry({
  summary: 'A box that is checked or not, with an optional label and an indeterminate state.',
  isPlaceable: true,
  example: { component: 'Checkbox', props: {}, children: ['Accept terms and conditions'] },
  variants: colors.map((color) => ({
    name: color,
    label: colorLabels[color],
    example: {
      component: 'Checkbox',
      props: { color, checked: true },
      children: ['Accept terms and conditions'],
    },
  })),
  options: {
    color: { scale: 'palette', default: 'default' },
    size: { scale: 'sizes', default: 'md' },
    indeterminate: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
  },
  content: { children: 'children', icon: 'child', checkedIcon: 'child' },
  twoWay: { prop: 'checked', event: 'onChange', read: 'target.checked' },
})
