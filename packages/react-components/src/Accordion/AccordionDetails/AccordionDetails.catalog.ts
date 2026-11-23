import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { AccordionDetailsProps } from './AccordionDetails'

export const accordionDetailsCatalog = defineCatalogEntry<AccordionDetailsProps>()({
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
