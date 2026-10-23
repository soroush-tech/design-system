import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { AccordionGroupProps } from './AccordionGroup'

export const accordionGroupCatalog = defineCatalogEntry<AccordionGroupProps>()({
  summary: 'A column of accordions that move by the keys, and may keep one open at a time.',
  isPlaceable: true,
  example: {
    component: 'AccordionGroup',
    props: {},
    children: [
      node('Accordion', {}, [
        node('AccordionSummary', {}, ['First']),
        node('AccordionDetails', {}, ['The first content.']),
      ]),
      node('Accordion', {}, [
        node('AccordionSummary', {}, ['Second']),
        node('AccordionDetails', {}, ['The second content.']),
      ]),
    ],
  },
  variants: [],
  options: {
    isExclusive: { values: [true, false], default: false },
    isAttached: { values: [true, false], default: false },
  },
  content: { children: 'children' },
})
