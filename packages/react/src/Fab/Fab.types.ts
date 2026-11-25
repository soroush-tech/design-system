import type { ThemeColor, ThemeSize } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `Fab`. */
export interface FabOwnerState {
  variant?: 'circular' | 'extended'
  color?: ThemeColor
  size?: ThemeSize
}

/** The slots of Fab a theme can style with `styleOverrides`. */
export type FabSlot = 'root' | 'label' | 'labelText'

/** What `theme.components.Fab` takes. */
export type FabThemeConfig = ComponentConfig<FabOwnerState, FabSlot>
