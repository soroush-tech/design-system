import type { ThemePalette, ThemeText } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../../theme/themes'

/** The defaults a theme may set for every `TabScrollButton`. */
export interface TabScrollButtonOwnerState {
  color?: keyof ThemePalette
  textColor?: keyof ThemeText
}

/** The slots of TabScrollButton a theme can style with `styleOverrides`. */
export type TabScrollButtonSlot = 'root'

/** What `theme.components.TabScrollButton` takes. */
export type TabScrollButtonThemeConfig = ComponentConfig<
  TabScrollButtonOwnerState,
  TabScrollButtonSlot
>
