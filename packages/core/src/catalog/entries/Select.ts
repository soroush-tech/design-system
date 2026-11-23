import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const selectVariantValues = ['default', 'outlined', 'text', 'underline'] as const

const variantLabels: Record<string, string> = {
  default: 'Filled',
  outlined: 'Outlined',
  text: 'Text',
  underline: 'Underline',
}

const platforms = [
  node('MenuItem', { value: 'web' }, ['Web']),
  node('MenuItem', { value: 'android' }, ['Android']),
  node('MenuItem', { value: 'ios' }, ['iOS']),
]

export const selectCatalog = defineCatalogEntry({
  summary:
    'The select to use - a custom listbox of `MenuItem` options, or `native` for the platform picker.',
  isPlaceable: true,
  example: {
    component: 'Select',
    props: { placeholder: 'Pick a platform', variant: 'outlined' },
    children: platforms,
  },
  variants: selectVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: {
      component: 'Select',
      props: { placeholder: 'Pick a platform', variant },
      children: platforms,
    },
  })),
  options: {
    variant: { values: selectVariantValues, default: 'default' },
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text' },
    bg: { scale: 'background' },
    size: { scale: 'sizes', default: 'md' },
    borderRadius: { scale: 'radii' },
    native: { values: [true, false], default: false },
    multiple: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    error: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
  },
  content: { children: 'children', placeholder: 'text', renderValue: 'none' },
  twoWay: { prop: 'value', event: 'onChange', read: 'argument' },
  preview: { width: 220 },
})
