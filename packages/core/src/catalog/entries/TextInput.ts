import { defineCatalogEntry } from '../defineCatalogEntry'

export const textInputVariantValues = ['default', 'outlined', 'text', 'underline'] as const

const variantLabels: Record<string, string> = {
  default: 'Filled',
  outlined: 'Outlined',
  text: 'Text',
  underline: 'Underline',
}

export const textInputCatalog = defineCatalogEntry({
  summary: 'A text field - one line, or a `multiline` textarea that can grow with its content.',
  isPlaceable: true,
  example: { component: 'TextInput', props: { placeholder: 'Enter a value...' }, children: [] },
  variants: textInputVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: {
      component: 'TextInput',
      props: { placeholder: 'Enter a value...', variant },
      children: [],
    },
  })),
  options: {
    variant: { values: textInputVariantValues, default: 'default' },
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text', default: 'primary' },
    size: { scale: 'sizes', default: 'md' },
    borderRadius: { scale: 'radii' },
    disabled: { values: [true, false], default: false },
    error: { values: [true, false], default: false },
    readOnly: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
    multiline: { values: [true, false], default: false },
    resize: { values: [true, false], default: false },
  },
  content: { placeholder: 'text' },
  twoWay: { prop: 'value', event: 'onChange', read: 'target.value' },
})
