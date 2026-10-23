import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { AccordionActionsProps } from './AccordionActions'

export const accordionActionsCatalog = defineCatalogEntry<AccordionActionsProps>()({
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
