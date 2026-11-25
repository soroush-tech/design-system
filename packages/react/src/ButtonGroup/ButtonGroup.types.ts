import type { ComponentConfig } from '../theme/themes'

/** The resolved props ButtonGroup's styled elements receive - what `ownerState` exposes. */
export type ButtonGroupOwnerState = Record<string, unknown>

/** The slots of ButtonGroup a theme can style with `styleOverrides`. */
export type ButtonGroupSlot = 'root'

/** What `theme.components.ButtonGroup` takes. */
export type ButtonGroupThemeConfig = ComponentConfig<ButtonGroupOwnerState, ButtonGroupSlot>
