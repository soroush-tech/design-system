import type { ComponentConfig } from '../../theme/themes'

/** The resolved props TableCell's styled elements receive - what `ownerState` exposes. */
export type TableCellOwnerState = Record<string, unknown>

/** The slots of TableCell a theme can style with `styleOverrides`. */
export type TableCellSlot = 'root'

/** What `theme.components.TableCell` takes. */
export type TableCellThemeConfig = ComponentConfig<TableCellOwnerState, TableCellSlot>
