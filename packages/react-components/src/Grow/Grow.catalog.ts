import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import { transitionOptions, transitionExampleChild } from '../utils/transitionCatalog'
import type { GrowProps } from './Grow'

export const growCatalog = defineCatalogEntry<GrowProps>()({
  summary: 'Grows one child in from a little smaller, fading as it does, and shrinks it out.',
  isPlaceable: true,
  example: { component: 'Grow', props: { isShown: true }, children: [transitionExampleChild] },
  variants: [],
  options: {
    ...transitionOptions,
  },
  content: { children: 'child' },
})
