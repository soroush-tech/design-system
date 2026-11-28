import { defineCatalogEntry } from '../defineCatalogEntry'

export const accordionSummaryHeadingLevelValues = [1, 2, 3, 4, 5, 6] as const

export const accordionSummaryCatalog = defineCatalogEntry({
  summary: 'The header of an accordion: a button in a heading that opens and closes it.',
  // It needs an Accordion around it.
  isPlaceable: false,
  example: { component: 'AccordionSummary', props: {}, children: ['Title'] },
  variants: [],
  options: { headingLevel: { values: accordionSummaryHeadingLevelValues, default: 3 } },
  content: { children: 'children', expandIcon: 'child' },
})
