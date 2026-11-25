import type { ComponentConfig } from '../../theme/themes'

/** The resolved props TablePagination's styled elements receive - what `ownerState` exposes. */
export type TablePaginationOwnerState = Record<string, unknown>

/** The slots of TablePagination a theme can style with `styleOverrides`. */
export type TablePaginationSlot = 'root'

/** What `theme.components.TablePagination` takes. */
export type TablePaginationThemeConfig = ComponentConfig<
  TablePaginationOwnerState,
  TablePaginationSlot
>
