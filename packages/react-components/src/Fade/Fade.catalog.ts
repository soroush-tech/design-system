import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import { transitionOptions, transitionExampleChild } from '../utils/transitionCatalog'
import type { FadeProps } from './Fade'

export const fadeCatalog = defineCatalogEntry<FadeProps>()({
  summary: 'Fades one child in and out by its opacity.',
  isPlaceable: true,
  example: { component: 'Fade', props: { isShown: true }, children: [transitionExampleChild] },
  variants: [],
  options: {
    ...transitionOptions,
  },
  content: { children: 'child' },
})
