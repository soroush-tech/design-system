import type { ComponentConfig } from '../../theme/themes'

/** The resolved props TableBody's styled elements receive - what `ownerState` exposes. */
export type TableBodyOwnerState = Record<string, unknown>

/** The slots of TableBody a theme can style with `styleOverrides`. */
export type TableBodySlot = 'root'

/** What `theme.components.TableBody` takes. */
export type TableBodyThemeConfig = ComponentConfig<TableBodyOwnerState, TableBodySlot>
