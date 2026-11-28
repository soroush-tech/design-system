import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const accordionActionsCatalog = defineCatalogEntry({
  summary: "The foot of an accordion's region: its buttons, at the end of a row.",
  // It needs an Accordion around it.
  isPlaceable: false,
  example: {
    component: 'AccordionActions',
    props: {},
    children: [node('Button', { variant: 'text' }, ['Save'])],
  },
  variants: [],
  options: {},
  content: { children: 'children' },
})
