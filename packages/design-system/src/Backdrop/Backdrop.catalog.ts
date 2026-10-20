import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { BackdropProps } from './Backdrop'

export const backdropCatalog = defineCatalogEntry<BackdropProps>()({
  summary: 'The dimmed full-viewport scrim a modal draws behind its content.',
  isPlaceable: false,
  example: { component: 'Backdrop', props: {}, children: [] },
  variants: [],
  options: {
    bg: { scale: 'background', default: 'backdrop' },
  },
  content: {},
  preview: { width: 320, height: 200 },
})
