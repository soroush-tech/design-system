import type { ComponentConfig } from '../../theme/themes'

/** The resolved props PaginationItem's styled elements receive - what `ownerState` exposes. */
export type PaginationItemOwnerState = Record<string, unknown>

/** The slots of PaginationItem a theme can style with `styleOverrides`. */
export type PaginationItemSlot = 'root' | 'ellipsis'

/** What `theme.components.PaginationItem` takes. */
export type PaginationItemThemeConfig = ComponentConfig<
  PaginationItemOwnerState,
  PaginationItemSlot
>
