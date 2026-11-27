import type { ThemeBackground, ThemeRadii, ThemeText, ThemeZOrder } from '@gild-ui/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The corner shapes of a control or a surface. */
type ShapeKey = 'square' | 'rounded' | 'pill'

/** The defaults a theme may set for every `Snackbar`. */
export interface SnackbarOwnerState {
  anchorOrigin?: {
    vertical: 'top' | 'bottom'
    horizontal: 'start' | 'center' | 'end'
  }
  autoHideDuration?: number
  resumeHideDuration?: number
  layer?: keyof ThemeZOrder
  shape?: ShapeKey
  borderRadius?: keyof ThemeRadii
  bg?: keyof ThemeBackground
  textColor?: keyof ThemeText
}

/** The slots of Snackbar a theme can style with `styleOverrides`. */
export type SnackbarSlot = 'root' | 'content' | 'message' | 'action'

/** What `theme.components.Snackbar` takes. */
export type SnackbarThemeConfig = ComponentConfig<SnackbarOwnerState, SnackbarSlot>
