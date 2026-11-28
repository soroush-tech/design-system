import { defineCatalogEntry } from '../defineCatalogEntry'

export const formLabelCatalog = defineCatalogEntry({
  summary: "A field's label, linked to its control - and marked required - through `FormControl`.",
  isPlaceable: false,
  example: { component: 'FormLabel', props: {}, children: ['Email'] },
  variants: [],
  options: {
    required: { values: [true, false], default: false },
    color: { scale: 'text' },
  },
  content: { children: 'children' },
})
