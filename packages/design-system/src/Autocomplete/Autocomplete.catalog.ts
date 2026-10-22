import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { AutocompleteProps, AutocompleteVariant } from './Autocomplete'

export const autocompleteVariantValues = [
  'default',
  'outlined',
  'underline',
  'text',
] satisfies AutocompleteVariant[]

export const autocompleteCatalog = defineCatalogEntry<
  Omit<AutocompleteProps, 'options'> & { options: string[] }
>()({
  summary:
    'A field whose text finds an option in a list - one choice, several as chips, or free text.',
  isPlaceable: true,
  example: {
    component: 'Autocomplete',
    props: {
      options: ['Berlin', 'Lisbon', 'Oslo', 'Rome'],
      variant: 'outlined',
      'aria-label': 'City',
      noOptionsText: 'No city matches',
    },
    children: [],
  },
  variants: [],
  options: {
    multiple: { values: [true, false], default: false },
    shouldAllowFreeText: { values: [true, false], default: false },
    isLoading: { values: [true, false], default: false },
    variant: { values: autocompleteVariantValues, default: 'default' },
    size: { scale: 'sizes', default: 'md' },
    color: { scale: 'palette', default: 'primary' },
    error: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
    layer: { scale: 'zOrder', default: 'modal' },
  },
  content: {},
})
