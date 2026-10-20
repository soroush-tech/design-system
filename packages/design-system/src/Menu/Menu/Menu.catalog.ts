import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { MenuProps } from './Menu'
import type { MenuAlign } from '../utils/getMenuOrigins'

export const menuAlignValues = ['start', 'end'] satisfies MenuAlign[]

export const menuCatalog = defineCatalogEntry<MenuProps>()({
  summary: 'A trigger and the `MenuList` of commands it opens - not modal, placed by the trigger.',
  // Its trigger is an element, which an example's JSON props can't hold.
  isPlaceable: false,
  example: {
    component: 'Menu',
    props: {},
    children: [
      node('MenuItem', { value: 'new' }, ['New branch...']),
      node('MenuItem', { value: 'checkout', disabled: true, note: 'Coming later' }, [
        'Checkout tag or revision...',
      ]),
      node('MenuDivider'),
      node('MenuItem', { value: 'rename' }, ['Rename...']),
      node('MenuItem', { value: 'delete' }, ['Delete']),
    ],
  },
  variants: [],
  options: {
    align: { values: menuAlignValues, default: 'start' },
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text' },
    size: { scale: 'sizes', default: 'md' },
    dense: { values: [true, false], default: false },
    elevation: { values: [0, 1, 2, 4, 8, 16, 24], default: 8 },
    layer: { scale: 'zOrder' },
    marginThreshold: { scale: 'space' },
    defaultOpen: { values: [true, false], default: false },
  },
  content: { children: 'children', trigger: 'child', emptyLabel: 'text', items: 'none' },
  domEvents: ['onSelect', 'onClose'],
})
