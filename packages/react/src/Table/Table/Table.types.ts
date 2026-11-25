import type { ComponentConfig } from '../../theme/themes'

/** The resolved props Table's styled elements receive - what `ownerState` exposes. */
export type TableOwnerState = Record<string, unknown>

/** The slots of Table a theme can style with `styleOverrides`. */
export type TableSlot = 'root'

/** What `theme.components.Table` takes. */
export type TableThemeConfig = ComponentConfig<TableOwnerState, TableSlot>
