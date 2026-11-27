import type { ThemeColor, ThemeSize } from '@gild-ui/core/theme'
import type { ComponentConfig } from '../../theme/themes'

/** The defaults a theme may set for every `FabMenu`. */
export interface FabMenuOwnerState {
  direction?: 'up' | 'down' | 'left' | 'right'
  align?: 'start' | 'end'
  color?: ThemeColor
  size?: ThemeSize
}

/** The slots of FabMenu a theme can style with `styleOverrides`. */
export type FabMenuSlot = 'root' | 'list'

/** What `theme.components.FabMenu` takes. */
export type FabMenuThemeConfig = ComponentConfig<FabMenuOwnerState, FabMenuSlot>
