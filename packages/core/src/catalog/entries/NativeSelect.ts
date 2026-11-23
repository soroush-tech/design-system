import { defineCatalogEntry } from '../defineCatalogEntry'

export const nativeSelectVariantValues = ['default', 'outlined', 'text', 'underline'] as const

const variantLabels: Record<string, string> = {
  default: 'Filled',
  outlined: 'Outlined',
  text: 'Text',
  underline: 'Underline',
}

const platforms = [
  { label: 'Web', value: 'web' },
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
]

export const nativeSelectCatalog = defineCatalogEntry({
  summary:
    'The platform select picker, its choices given as an `options` list of labels and values.',
  isPlaceable: true,
  example: {
    component: 'NativeSelect',
    props: { options: platforms, placeholder: 'Pick a platform', variant: 'outlined' },
    children: [],
  },
  variants: nativeSelectVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: {
      component: 'NativeSelect',
      props: { options: platforms, placeholder: 'Pick a platform', variant },
      children: [],
    },
  })),
  options: {
    variant: { values: nativeSelectVariantValues, default: 'default' },
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text', default: 'primary' },
    bg: { scale: 'background', default: 'terminal' },
    size: { scale: 'sizes', default: 'md' },
    borderRadius: { scale: 'radii' },
    disabled: { values: [true, false], default: false },
    error: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
  },
  content: { placeholder: 'text' },
  twoWay: { prop: 'value', event: 'onChange', read: 'argument' },
  preview: { width: 220 },
})
