import { defineCatalogEntry } from '../defineCatalogEntry'
import { transitionOptions, transitionExampleChild } from './transition'

export const growCatalog = defineCatalogEntry({
  summary: 'Grows one child in from a little smaller, fading as it does, and shrinks it out.',
  isPlaceable: true,
  example: { component: 'Grow', props: { isShown: true }, children: [transitionExampleChild] },
  variants: [],
  options: {
    ...transitionOptions,
  },
  content: { children: 'child' },
})
