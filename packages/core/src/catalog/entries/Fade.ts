import { defineCatalogEntry } from '../defineCatalogEntry'
import { transitionOptions, transitionExampleChild } from './transition'

export const fadeCatalog = defineCatalogEntry({
  summary: 'Fades one child in and out by its opacity.',
  isPlaceable: true,
  example: { component: 'Fade', props: { isShown: true }, children: [transitionExampleChild] },
  variants: [],
  options: {
    ...transitionOptions,
  },
  content: { children: 'child' },
})
