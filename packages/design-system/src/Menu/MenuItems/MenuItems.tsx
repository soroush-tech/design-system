import type { KeyboardEvent, MouseEvent, ReactNode } from 'react'
import { MenuDivider } from '../MenuDivider'
import type { MenuItemValue } from '../MenuListContext'
import { MenuItem, type MenuItemRole } from '../../MenuItem'

/** A menu row as data - what a `MenuItem` takes, with its label as `label`. */
export interface MenuItemRowData {
  value?: MenuItemValue
  label: ReactNode
  role?: MenuItemRole
  selected?: boolean
  disabled?: boolean
  startIcon?: ReactNode
  shortcut?: ReactNode
  note?: string
  onClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void
  /** The rows of this row's submenu; `null` or `[]` is an empty one. */
  submenu?: MenuItemData[] | null
  emptyLabel?: ReactNode
}

/** A divider between groups of rows. */
export interface MenuDividerData {
  type: 'divider'
}

export type MenuItemData = MenuItemRowData | MenuDividerData

export interface MenuItemsProps {
  items: readonly MenuItemData[]
}

const isDivider = (item: MenuItemData): item is MenuDividerData =>
  'type' in item && item.type === 'divider'

/**
 * @description Menu rows from data: each entry a `MenuItem` (its label as `label`, its
 * submenu as more entries) or `{ type: 'divider' }`. It renders the same rows JSX children
 * would, so the two behave alike - inside a `MenuList`, a `Menu` or a `ContextMenu`.
 */
export function MenuItems({ items }: Readonly<MenuItemsProps>) {
  return items.map((item, index) => {
    if (isDivider(item)) return <MenuDivider key={`divider-${index}`} />
    const { label, submenu, ...row } = item
    // An empty submenu stays empty (`null`), so the row shows its `emptyLabel`.
    const submenuRows = submenu?.length ? <MenuItems items={submenu} /> : null
    return (
      <MenuItem
        key={item.value ?? `row-${index}`}
        {...row}
        submenu={submenu === undefined ? undefined : submenuRows}
      >
        {label}
      </MenuItem>
    )
  })
}
