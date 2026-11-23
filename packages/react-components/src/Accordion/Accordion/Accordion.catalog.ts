import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { AccordionProps } from './Accordion'

export const accordionCatalog = defineCatalogEntry<AccordionProps>()({
  summary: 'A heading that opens and closes a region of content.',
  isPlaceable: true,
  example: {
    component: 'Accordion',
    props: {},
    children: [
      node('AccordionSummary', {}, ['Title']),
      node('AccordionDetails', {}, ['Content that opens and closes.']),
    ],
  },
  variants: [],
  options: {
    defaultExpanded: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    hasGutters: { values: [true, false], default: true },
    borderRadius: { scale: 'radii' },
    bg: { scale: 'background', default: 'paper' },
    textColor: { scale: 'text', default: 'initial' },
  },
  content: { children: 'children' },
  twoWay: { prop: 'isExpanded', event: 'onChange', read: 'argument' },
})
