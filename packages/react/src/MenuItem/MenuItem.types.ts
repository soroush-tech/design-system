import type { ThemeText, ThemeColor, ThemeSize } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `MenuItem` - a list's own values win. */
export interface MenuItemOwnerState {
  color?: ThemeColor
  textColor?: keyof ThemeText
  size?: ThemeSize
  dense?: boolean
}

/** The slots of MenuItem a theme can style with `styleOverrides`. */
export type MenuItemSlot =
  | 'root'
  | 'check'
  | 'startIcon'
  | 'label'
  | 'shortcut'
  | 'submenuIcon'
  | 'entry'
  | 'secondaryAction'

/** What `theme.components.MenuItem` takes. */
export type MenuItemThemeConfig = ComponentConfig<MenuItemOwnerState, MenuItemSlot>
