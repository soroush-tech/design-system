import type { ComponentConfig } from '../theme/themes'

/** The resolved props FocusTrap's styled elements receive - what `ownerState` exposes. */
export type FocusTrapOwnerState = Record<string, unknown>

/** The slots of FocusTrap a theme can style with `styleOverrides`. */
export type FocusTrapSlot = 'root'

/** What `theme.components.FocusTrap` takes. */
export type FocusTrapThemeConfig = ComponentConfig<FocusTrapOwnerState, FocusTrapSlot>
