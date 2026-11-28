import { defineCatalogEntry } from '../defineCatalogEntry'

export const drawerToggleActionValues = ['toggle', 'show', 'hide'] as const

const variantValues = ['contained', 'outlined', 'text'] as const

export const drawerToggleCatalog = defineCatalogEntry({
  summary: 'The button that opens, closes or toggles the `Drawer` whose `id` it names in `drawer`.',
  isPlaceable: false,
  example: {
    component: 'DrawerToggle',
    props: { drawer: 'drawer', action: 'toggle' },
    children: ['Open drawer'],
  },
  variants: [],
  options: {
    action: { values: drawerToggleActionValues, default: 'toggle' },
    variant: { values: variantValues, default: 'contained' },
    color: { scale: 'palette', default: 'primary' },
    size: { scale: 'sizes', default: 'md' },
    disabled: { values: [true, false], default: false },
  },
  content: {
    children: 'children',
    startIcon: 'child',
    endIcon: 'child',
    loadingIndicator: 'child',
  },
  domEvents: ['onClick'],
})
