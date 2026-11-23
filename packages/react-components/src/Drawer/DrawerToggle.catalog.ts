import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { ButtonVariant } from '../Button'
import type { DrawerToggleProps } from './DrawerToggle'

export const drawerToggleActionValues = ['toggle', 'show', 'hide'] satisfies NonNullable<
  DrawerToggleProps['action']
>[]

const variantValues = ['contained', 'outlined', 'text'] satisfies ButtonVariant[]

export const drawerToggleCatalog = defineCatalogEntry<DrawerToggleProps>()({
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
