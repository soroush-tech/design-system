import type { ComponentConfig } from '../../theme/themes'

/** The resolved props TableRow's styled elements receive - what `ownerState` exposes. */
export type TableRowOwnerState = Record<string, unknown>

/** The slots of TableRow a theme can style with `styleOverrides`. */
export type TableRowSlot = 'root'

/** What `theme.components.TableRow` takes. */
export type TableRowThemeConfig = ComponentConfig<TableRowOwnerState, TableRowSlot>
