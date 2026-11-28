import type { ThemeText, ThemeColor, ThemeSize } from '@gild-ui/core/theme'
import type { ComponentConfig } from '../../theme/themes'

/** The defaults a theme may set for every `MenuList` - and so for its rows. */
export interface MenuListOwnerState {
  color?: ThemeColor
  textColor?: keyof ThemeText
  size?: ThemeSize
  dense?: boolean
  shouldWrap?: boolean
}

/** The slots of MenuList a theme can style with `styleOverrides`. */
export type MenuListSlot = 'root'

/** What `theme.components.MenuList` takes. */
export type MenuListThemeConfig = ComponentConfig<MenuListOwnerState, MenuListSlot>
