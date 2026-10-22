import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { FabProps } from './Fab'

export const fabVariantValues = ['circular', 'extended'] satisfies NonNullable<
  FabProps['variant']
>[]

export const fabCatalog = defineCatalogEntry<FabProps>()({
  summary: 'A floating action button: the one main action of a page, circular or extended.',
  isPlaceable: true,
  example: {
    component: 'Fab',
    props: { 'aria-label': 'Add' },
    children: [node('Icon', { name: 'add' })],
  },
  variants: [
    {
      name: 'extended',
      label: 'Extended',
      example: {
        component: 'Fab',
        props: { variant: 'extended' },
        children: ['Create'],
      },
    },
  ],
  options: {
    variant: { values: fabVariantValues, default: 'circular' },
    color: { scale: 'palette', default: 'primary' },
    size: { scale: 'sizes', default: 'md' },
    disabled: { values: [true, false], default: false },
  },
  content: { children: 'children', startIcon: 'child' },
})
