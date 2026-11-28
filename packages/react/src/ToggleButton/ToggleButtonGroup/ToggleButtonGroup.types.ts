import type { ComponentConfig } from '../../theme/themes'

/** The resolved props ToggleButtonGroup's styled elements receive - what `ownerState` exposes. */
export type ToggleButtonGroupOwnerState = Record<string, unknown>

/** The slots of ToggleButtonGroup a theme can style with `styleOverrides`. */
export type ToggleButtonGroupSlot = 'root'

/** What `theme.components.ToggleButtonGroup` takes. */
export type ToggleButtonGroupThemeConfig = ComponentConfig<
  ToggleButtonGroupOwnerState,
  ToggleButtonGroupSlot
>
