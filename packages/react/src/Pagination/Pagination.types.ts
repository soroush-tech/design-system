import type { ComponentConfig } from '../theme/themes'

/** The resolved props Pagination's styled elements receive - what `ownerState` exposes. */
export type PaginationOwnerState = Record<string, unknown>

/** The slots of Pagination a theme can style with `styleOverrides`. */
export type PaginationSlot = 'root' | 'list'

/** What `theme.components.Pagination` takes. */
export type PaginationThemeConfig = ComponentConfig<PaginationOwnerState, PaginationSlot>
