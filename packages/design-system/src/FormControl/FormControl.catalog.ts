import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { FormControlProps } from './FormControl'

export const formControlCatalog = defineCatalogEntry<FormControlProps>()({
  summary: 'One form field - a label, a control and helper text, wired together by a shared id.',
  isPlaceable: true,
  example: {
    component: 'FormControl',
    props: { required: true, fullWidth: true },
    children: [
      node('Flex', { flexDirection: 'column', gap: 1, alignItems: 'flex-start' }, [
        node('FormLabel', {}, ['Email']),
        node('TextInput', { variant: 'outlined', placeholder: 'me@example.com' }),
        node('FormHelperText', {}, ["We'll never share it."]),
      ]),
    ],
  },
  variants: [],
  options: {
    error: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    required: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
    size: { scale: 'sizes', default: 'md' },
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text' },
  },
  content: { children: 'children' },
  preview: { width: 320 },
})
