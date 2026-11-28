import { defineCatalogEntry } from '../defineCatalogEntry'
import { transitionOptions, transitionExampleChild } from './transition'

export const zoomCatalog = defineCatalogEntry({
  summary: 'Zooms one child in from nothing and out to nothing.',
  isPlaceable: true,
  example: { component: 'Zoom', props: { isShown: true }, children: [transitionExampleChild] },
  variants: [],
  options: {
    ...transitionOptions,
  },
  content: { children: 'child' },
})
