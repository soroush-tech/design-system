import type { ComponentConfig } from '../../theme/themes'

/** The resolved props TableHead's styled elements receive - what `ownerState` exposes. */
export type TableHeadOwnerState = Record<string, unknown>

/** The slots of TableHead a theme can style with `styleOverrides`. */
export type TableHeadSlot = 'root'

/** What `theme.components.TableHead` takes. */
export type TableHeadThemeConfig = ComponentConfig<TableHeadOwnerState, TableHeadSlot>
