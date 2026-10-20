import { createContext, useContext } from 'react'
import { useTheme, type Theme } from '../theme'
import type { PaperElevation } from '../Paper'
import type { MenuAlign } from './utils/getMenuOrigins'

/** How a menu's lists are placed and drawn - a submenu opens the way its menu does. */
export interface MenuContextValue {
  align: MenuAlign
  /** The least room to the window's edge, in pixels. */
  margin: number
  elevation: PaperElevation
  layer: keyof Theme['zOrder']
}

/** Set by a `Menu`. */
export const MenuContext = createContext<MenuContextValue | null>(null)

/** The surrounding menu's settings - or, for a `MenuList` on its own, `Menu`'s defaults. */
export function useMenuContext(): MenuContextValue {
  const theme = useTheme()
  const menu = useContext(MenuContext)
  return (
    menu ?? {
      align: 'start',
      margin: Number.parseFloat(String(theme.space[2])),
      elevation: 8,
      layer: 'modal',
    }
  )
}
