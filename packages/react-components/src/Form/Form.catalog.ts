import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { FormProps } from './Form'

const nameField = node('FormControl', {}, [
  node('Flex', { flexDirection: 'column', gap: 1, alignItems: 'flex-start' }, [
    node('FormLabel', {}, ['Name']),
    node('TextInput', { variant: 'outlined', placeholder: 'John Smith' }),
  ]),
])

export const formCatalog = defineCatalogEntry<FormProps>()({
  summary: 'A `<form>` that gives every field inside it a default size, color and state.',
  isPlaceable: false,
  example: {
    component: 'Form',
    props: { fullWidth: true },
    children: [
      node('Flex', { flexDirection: 'column', gap: 4, alignItems: 'flex-start' }, [
        nameField,
        node('Button', { type: 'submit' }, ['Submit']),
      ]),
    ],
  },
  variants: [],
  options: {
    size: { scale: 'sizes', default: 'md' },
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text' },
    disabled: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
    noValidate: { values: [true, false], default: false },
  },
  content: { children: 'children' },
  domEvents: ['onSubmit'],
  preview: { width: 360 },
})
