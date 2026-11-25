import type { ComponentConfig } from '../../theme/themes'

/** The resolved props ToggleButton's styled elements receive - what `ownerState` exposes. */
export type ToggleButtonOwnerState = Record<string, unknown>

/** The slots of ToggleButton a theme can style with `styleOverrides`. */
export type ToggleButtonSlot = 'root'

/** What `theme.components.ToggleButton` takes. */
export type ToggleButtonThemeConfig = ComponentConfig<ToggleButtonOwnerState, ToggleButtonSlot>
