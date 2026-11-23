import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import { transitionOptions, transitionExampleChild } from '../utils/transitionCatalog'
import type { ZoomProps } from './Zoom'

export const zoomCatalog = defineCatalogEntry<ZoomProps>()({
  summary: 'Zooms one child in from nothing and out to nothing.',
  isPlaceable: true,
  example: { component: 'Zoom', props: { isShown: true }, children: [transitionExampleChild] },
  variants: [],
  options: {
    ...transitionOptions,
  },
  content: { children: 'child' },
})
