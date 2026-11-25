import type { ThemeColor } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `Badge`. */
export interface BadgeOwnerState {
  max?: number
  variant?: 'standard' | 'dot'
  color?: ThemeColor
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'start' | 'end' }
  overlap?: 'rectangular' | 'circular'
}

/** The slots of Badge a theme can style with `styleOverrides`. */
export type BadgeSlot = 'root' | 'badge' | 'label'

/** What `theme.components.Badge` takes. */
export type BadgeThemeConfig = ComponentConfig<BadgeOwnerState, BadgeSlot>
