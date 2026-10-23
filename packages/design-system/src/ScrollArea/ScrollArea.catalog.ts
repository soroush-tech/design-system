import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { ScrollAreaProps } from './ScrollArea'

export const scrollAreaAxesValues = ['y', 'x', 'both'] satisfies NonNullable<
  ScrollAreaProps['axes']
>[]

export const scrollAreaCatalog = defineCatalogEntry<ScrollAreaProps>()({
  summary:
    'A scrolling area whose scrollbars are drawn over its content, and show while it is hovered.',
  isPlaceable: true,
  example: {
    component: 'ScrollArea',
    props: { maxHeight: 120, 'aria-label': 'Notes', tabIndex: 0 },
    children: [
      'A long list of notes, taller than the area that holds it, so the thumb shows on hover.',
    ],
  },
  variants: [],
  options: {
    axes: { values: scrollAreaAxesValues, default: 'y' },
    maxHeight: { values: [120, 240] },
  },
  content: { children: 'children' },
})
