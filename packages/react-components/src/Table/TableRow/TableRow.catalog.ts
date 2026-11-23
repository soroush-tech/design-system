import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { TableRowProps } from './TableRow'

export const tableRowCatalog = defineCatalogEntry<TableRowProps>()({
  summary:
    'One row of a `Table` section - its `TableCell`s, optionally shaded on hover or when selected.',
  isPlaceable: false,
  example: {
    component: 'TableRow',
    props: { isHoverable: true },
    children: [
      node('TableCell', {}, ['web']),
      node('TableCell', {}, ['fra1']),
      node('TableCell', { align: 'right' }, ['42']),
    ],
  },
  variants: [],
  options: {
    color: { scale: 'palette', default: 'primary' },
    bg: { scale: 'background' },
    borderColor: { scale: 'border' },
    isHoverable: { values: [true, false], default: false },
    isSelected: { values: [true, false], default: false },
  },
  content: { children: 'children' },
  domEvents: ['onClick'],
})
