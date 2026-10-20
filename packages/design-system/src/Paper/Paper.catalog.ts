import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { PaperProps } from './Paper'

export const paperCatalog = defineCatalogEntry<PaperProps>()({
  summary: 'A plain raised surface with a theme shadow, background and radius.',
  isPlaceable: true,
  example: {
    component: 'Paper',
    props: { elevation: 1, p: 3 as const, width: '320px' },
    children: ['A surface with default elevation, background, and border radius.'],
  },
  variants: [],
  options: {
    elevation: { values: [0, 1, 2, 4, 8, 16, 24], default: 1 },
    bg: { scale: 'background', default: 'paper' },
    borderRadius: { scale: 'radii', default: 'sq' },
    borderColor: { scale: 'border' },
    borderWidth: { scale: 'borderWidths' },
    p: { scale: 'space', default: 2 },
  },
  content: { children: 'children' },
})
