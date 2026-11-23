import { defineCatalogEntry } from '../defineCatalogEntry'
import { transitionOptions, transitionExampleChild } from './transition'

export const slideDirectionValues = ['up', 'down', 'left', 'right'] as const

export const slideCatalog = defineCatalogEntry({
  summary: 'Slides one child in from an edge of the window and back out.',
  isPlaceable: true,
  example: { component: 'Slide', props: { isShown: true }, children: [transitionExampleChild] },
  variants: [],
  options: {
    ...transitionOptions,
    direction: { values: slideDirectionValues, default: 'down' },
  },
  content: { children: 'child' },
})
