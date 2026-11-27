import type { ThemeColor, ThemeSize, VariantOf, ButtonVariants } from '@gild-ui/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The corner shapes of a control or a surface. */
type ShapeKey = 'square' | 'rounded' | 'pill'

/** The resolved props Button's styled roots receive - what `ownerState` exposes. */
export interface ButtonOwnerState {
  variant?: ButtonVariant
  color?: ThemeColor
  size?: ThemeSize
  shape?: ShapeKey
  fullWidth?: boolean
  disabled?: boolean
}

/** Button's looks: the built-in ones, those added through `ButtonVariants`, and those a registered theme defines. */
export type ButtonVariant = keyof ButtonVariants | VariantOf<'Button'>

/** The slots of Button a theme can style with `styleOverrides`. */
export type ButtonSlot = 'root' | 'label' | 'icon' | 'loader'

/** What `theme.components.Button` takes. */
export type ButtonThemeConfig = ComponentConfig<ButtonOwnerState, ButtonSlot>
