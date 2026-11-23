import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { MenuItemProps, MenuItemRole } from './MenuItem'

export const menuItemRoleValues = [
  'menuitem',
  'menuitemradio',
  'menuitemcheckbox',
] satisfies MenuItemRole[]

export const menuItemCatalog = defineCatalogEntry<MenuItemProps>()({
  summary:
    "One row - an option of a `Select`'s list, or a command of a `MenuList` with an icon, a shortcut and a submenu.",
  isPlaceable: false,
  example: { component: 'MenuItem', props: { value: 'web' }, children: ['Web'] },
  variants: [],
  options: {
    role: { values: menuItemRoleValues, default: 'menuitem' },
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text' },
    size: { scale: 'sizes', default: 'md' },
    disabled: { values: [true, false], default: false },
    selected: { values: [true, false], default: false },
    highlighted: { values: [true, false], default: false },
    multiple: { values: [true, false], default: false },
    dense: { values: [true, false], default: false },
    disableGutters: { values: [true, false], default: false },
    divider: { values: [true, false], default: false },
  },
  content: {
    children: 'children',
    startIcon: 'child',
    shortcut: 'text',
    note: 'text',
    submenu: 'children',
  },
  domEvents: ['onClick'],
})
