import { createContext, useContext, type SyntheticEvent } from 'react'
import type { Theme } from '../theme'

export type MenuItemValue = string | number

export interface MenuListContextValue {
  /** Fired when a row is chosen, with its `value` when it has one. */
  onActivate: (value: MenuItemValue | undefined, event: SyntheticEvent) => void
  color?: keyof Theme['palette']
  textColor?: keyof Theme['text']
  size?: keyof Theme['sizes']
  dense?: boolean
}

/**
 * Present inside a `MenuList`. A `MenuItem` that finds it renders as a menu row
 * (`menuitem`); without it, the row is `Select`'s `option`.
 */
export const MenuListContext = createContext<MenuListContextValue | null>(null)

export const useMenuListContext = (): MenuListContextValue | null => useContext(MenuListContext)
