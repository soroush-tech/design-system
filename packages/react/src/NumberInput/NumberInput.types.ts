import type { InputVariantKey, ThemePalette, ThemeSizes } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `NumberInput` - its button labels give it a language. */
export interface NumberInputOwnerState {
  variant?: InputVariantKey
  size?: keyof ThemeSizes
  color?: keyof ThemePalette
  spinButtons?: 'stacked' | 'sides' | 'none'
  step?: number
  smallStep?: number
  largeStep?: number
  shouldSnapOnStep?: boolean
  shouldScrubOnWheel?: boolean
  incrementLabel?: string
  decrementLabel?: string
}

/** The slots of NumberInput a theme can style with `styleOverrides`. */
export type NumberInputSlot =
  | 'root'
  | 'input'
  | 'content'
  | 'spinButtons'
  | 'increment'
  | 'decrement'

/** What `theme.components.NumberInput` takes. */
export type NumberInputThemeConfig = ComponentConfig<NumberInputOwnerState, NumberInputSlot>
