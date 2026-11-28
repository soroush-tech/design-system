import type { ComponentConfig } from '../theme/themes'

/** The resolved props Grid's styled elements receive - what `ownerState` exposes. */
export type GridOwnerState = Record<string, unknown>

/** The slots of Grid a theme can style with `styleOverrides`. */
export type GridSlot = 'root'

/** What `theme.components.Grid` takes. */
export type GridThemeConfig = ComponentConfig<GridOwnerState, GridSlot>
