import type { ThemeColor, ThemeSize } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `Rating`. */
export interface RatingOwnerState {
  max?: number
  precision?: number
  highlightSelectedOnly?: boolean
  size?: ThemeSize
  color?: ThemeColor
}

/** The slots of Rating a theme can style with `styleOverrides`. */
export type RatingSlot = 'root' | 'item' | 'icon' | 'decimal' | 'input' | 'text' | 'emptyLabel'

/** What `theme.components.Rating` takes. */
export type RatingThemeConfig = ComponentConfig<RatingOwnerState, RatingSlot>
