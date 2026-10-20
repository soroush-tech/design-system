import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { NativeSelectOption, NativeSelectProps, NativeSelectVariant } from './NativeSelect'

export const nativeSelectVariantValues = [
  'default',
  'outlined',
  'text',
  'underline',
] satisfies NativeSelectVariant[]

const variantLabels: Record<NativeSelectVariant, string> = {
  default: 'Filled',
  outlined: 'Outlined',
  text: 'Text',
  underline: 'Underline',
}

// `NativeSelectOption` is an interface, which has no index signature, so the catalog's JSON
// check reads `options` as never; the same shape as a mapped type passes it.
type NativeSelectCatalogProps = Omit<NativeSelectProps, 'options'> & {
  options: Pick<NativeSelectOption, keyof NativeSelectOption>[]
}

const platforms = [
  { label: 'Web', value: 'web' },
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
]

export const nativeSelectCatalog = defineCatalogEntry<NativeSelectCatalogProps>()({
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
