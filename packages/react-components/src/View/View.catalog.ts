import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { ViewProps } from './View'

export const viewCatalog = defineCatalogEntry<ViewProps>()({
  summary:
    'The base box - a div styled through theme tokens for space, color, borders and position.',
  isPlaceable: true,
  example: { component: 'View', props: {}, children: ['View content'] },
  variants: [],
  options: {
    bg: { scale: 'background' },
    borderColor: { scale: 'border' },
    borderWidth: { scale: 'borderWidths' },
    borderRadius: { scale: 'radii' },
  },
  content: { children: 'children' },
})
