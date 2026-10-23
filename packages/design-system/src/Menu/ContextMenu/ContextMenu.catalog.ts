import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { ContextMenuProps } from './ContextMenu'

export const contextMenuCatalog = defineCatalogEntry<ContextMenuProps>()({
  summary: 'A `MenuList` opened by a right-click over its `target`, at the pointer.',
  // Its target is an element, which an example's JSON props can't hold.
  isPlaceable: false,
  example: {
    component: 'ContextMenu',
    props: { 'aria-label': 'Canvas' },
    children: [
      node('MenuItem', { value: 'cut', shortcut: 'Control+X' }, ['Cut']),
      node('MenuItem', { value: 'copy', shortcut: 'Control+C' }, ['Copy']),
      node(
        'MenuItem',
        { value: 'paste', shortcut: 'Control+V', disabled: true, note: 'The clipboard is empty' },
        ['Paste']
      ),
    ],
  },
  variants: [],
  options: {
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text' },
    size: { scale: 'sizes', default: 'md' },
    dense: { values: [true, false], default: false },
    elevation: { values: [0, 1, 2, 4, 8, 16, 24], default: 8 },
    borderRadius: { scale: 'radii' },
    layer: { scale: 'zOrder' },
    marginThreshold: { scale: 'space' },
  },
  content: { children: 'children', target: 'child', emptyLabel: 'text', items: 'none' },
  domEvents: ['onSelect', 'onClose'],
})
