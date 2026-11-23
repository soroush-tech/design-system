import { defineCatalogEntry } from '../defineCatalogEntry'

export const accordionDetailsCatalog = defineCatalogEntry({
  summary: 'What an accordion opens: the padded body of its region.',
  // It needs an Accordion around it.
  isPlaceable: false,
  example: {
    component: 'AccordionDetails',
    props: {},
    children: ['Content that opens and closes.'],
  },
  variants: [],
  options: {},
  content: { children: 'children' },
})
