import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { FabMenuProps } from './FabMenu'

export const fabMenuDirectionValues = ['up', 'down', 'left', 'right'] satisfies NonNullable<
  FabMenuProps['direction']
>[]
export const fabMenuAlignValues = ['end', 'start'] satisfies NonNullable<FabMenuProps['align']>[]

export const fabMenuCatalog = defineCatalogEntry<FabMenuProps>()({
  summary: 'A fab that opens a stack of actions - extended pills - from the corner of a page.',
  isPlaceable: true,
  example: {
    component: 'FabMenu',
    props: { 'aria-label': 'Create' },
    children: [
      node('FabMenuItem', {}, [node('Icon', { name: 'add' }), 'Document']),
      node('FabMenuItem', {}, ['Folder']),
    ],
  },
  variants: [],
  options: {
    direction: { values: fabMenuDirectionValues, default: 'up' },
    align: { values: fabMenuAlignValues, default: 'end' },
    color: { scale: 'palette', default: 'primary' },
    size: { scale: 'sizes', default: 'md' },
    isOpen: { values: [true, false], default: false },
  },
  content: { children: 'children' },
})
