import type {
  ThemeBackground,
  ThemePalette,
  ThemeRadii,
  ThemeSizes,
  ThemeText,
} from '@soroush.design/core/theme'
import type { ComponentConfig } from '../../theme/themes'

/** The defaults a theme may set for every `Tab`. */
export interface TabOwnerState {
  isWrapped?: boolean
  bg?: keyof ThemeBackground
  borderRadius?: keyof ThemeRadii
  color?: keyof ThemePalette
  textColor?: keyof ThemeText
  size?: keyof ThemeSizes
  selectedBg?: keyof ThemeBackground
}

/** The slots of Tab a theme can style with `styleOverrides`. */
export type TabSlot = 'root' | 'label' | 'icon' | 'secondaryAction' | 'close'

/** What `theme.components.Tab` takes. */
export type TabThemeConfig = ComponentConfig<TabOwnerState, TabSlot>
