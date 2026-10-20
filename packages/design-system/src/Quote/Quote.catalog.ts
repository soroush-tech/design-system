import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { QuoteProps } from './Quote'

export const quoteCatalog = defineCatalogEntry<QuoteProps>()({
  summary: 'A block set off by a primary left border, for quotes and terminal readouts.',
  isPlaceable: true,
  example: {
    component: 'Quote',
    props: { bg: 'terminal', p: 3 as const },
    children: [
      node('Typography', { variant: 'body1', color: 'secondary', m: 0 }, [
        'A View with a 2px primary left border - for terminal readouts and markdown blockquotes.',
      ]),
    ],
  },
  variants: [],
  options: {
    bg: { scale: 'background' },
    borderRadius: { scale: 'radii' },
  },
  content: { children: 'children' },
  preview: { width: 360 },
})
