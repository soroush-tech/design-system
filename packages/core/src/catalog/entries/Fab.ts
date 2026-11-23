import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const fabVariantValues = ['circular', 'extended'] as const

export const fabCatalog = defineCatalogEntry({
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
    isCollapsed: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
  },
  content: { children: 'children', startIcon: 'child' },
})
