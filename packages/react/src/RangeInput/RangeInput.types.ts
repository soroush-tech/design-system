import type { ThemePalette, ThemeSizes } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `RangeInput`. */
export interface RangeInputOwnerState {
  size?: keyof ThemeSizes
  color?: keyof ThemePalette
  orientation?: 'horizontal' | 'vertical'
  track?: 'normal' | false | 'inverted'
  step?: number | null
  shiftStep?: number
  valueLabel?: 'auto' | 'on' | 'off'
  shouldSwapThumbs?: boolean
}

/** The slots of RangeInput a theme can style with `styleOverrides`. */
export type RangeInputSlot =
  | 'root'
  | 'rail'
  | 'track'
  | 'thumb'
  | 'mark'
  | 'markLabel'
  | 'valueLabel'
  | 'input'

/** What `theme.components.RangeInput` takes. */
export type RangeInputThemeConfig = ComponentConfig<RangeInputOwnerState, RangeInputSlot>
