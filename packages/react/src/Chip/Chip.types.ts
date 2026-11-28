import type { ThemeRadii, ThemeColor, ThemeSize } from '@gild-ui/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The corner shapes of a control or a surface. */
type ShapeKey = 'square' | 'rounded' | 'pill'

/** The defaults a theme may set for every `Chip` - its `deleteLabel` gives it a language. */
export interface ChipOwnerState {
  variant?: 'contained' | 'outlined' | 'text'
  color?: ThemeColor
  size?: ThemeSize
  shape?: ShapeKey
  borderRadius?: keyof ThemeRadii
  deleteLabel?: string
}

/** The slots of Chip a theme can style with `styleOverrides`. */
export type ChipSlot = 'root' | 'body' | 'label' | 'icon' | 'avatar' | 'deleteIcon'

/** What `theme.components.Chip` takes. */
export type ChipThemeConfig = ComponentConfig<ChipOwnerState, ChipSlot>
