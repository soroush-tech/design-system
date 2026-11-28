import type { ComponentConfig } from '../../theme/themes'

/** The resolved props TablePaginationActions's styled elements receive - what `ownerState` exposes. */
export type TablePaginationActionsOwnerState = Record<string, unknown>

/** The slots of TablePaginationActions a theme can style with `styleOverrides`. */
export type TablePaginationActionsSlot = 'root'

/** What `theme.components.TablePaginationActions` takes. */
export type TablePaginationActionsThemeConfig = ComponentConfig<
  TablePaginationActionsOwnerState,
  TablePaginationActionsSlot
>
