import type { ThemeRadii } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../../theme/themes'

/** The defaults a theme may set for every `Alert` - its `closeLabel` gives it a language. */
export interface AlertOwnerState {
  severity?: 'success' | 'info' | 'warning' | 'error'
  variant?: 'standard' | 'contained' | 'outlined'
  closeLabel?: string
  role?: 'alert' | 'status'
  borderRadius?: keyof ThemeRadii
}

/** The slots of Alert a theme can style with `styleOverrides`. */
export type AlertSlot = 'root' | 'icon' | 'message' | 'action' | 'closeButton'

/** What `theme.components.Alert` takes. */
export type AlertThemeConfig = ComponentConfig<AlertOwnerState, AlertSlot>
