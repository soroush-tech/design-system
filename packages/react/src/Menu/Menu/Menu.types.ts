import type {
  ThemePalette,
  ThemeRadii,
  ThemeSizes,
  ThemeSpace,
  ThemeText,
  ThemeZOrder,
} from '@soroush.design/core/theme'
import type { ComponentConfig } from '../../theme/themes'
import type { PaperElevation } from '../../Paper/Paper'

/** The defaults a theme may set for every `Menu`. */
export interface MenuOwnerState {
  align?: 'start' | 'end'
  borderRadius?: keyof ThemeRadii
  marginThreshold?: keyof ThemeSpace
  elevation?: PaperElevation
  layer?: keyof ThemeZOrder
  color?: keyof ThemePalette
  textColor?: keyof ThemeText
  size?: keyof ThemeSizes
  dense?: boolean
}

/** The slots of Menu a theme can style with `styleOverrides`. */
export type MenuSlot = 'root' | 'paper'

/** What `theme.components.Menu` takes. */
export type MenuThemeConfig = ComponentConfig<MenuOwnerState, MenuSlot>
