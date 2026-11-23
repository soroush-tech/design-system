import { defineCatalogEntry } from '../defineCatalogEntry'

export const backdropCatalog = defineCatalogEntry({
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
