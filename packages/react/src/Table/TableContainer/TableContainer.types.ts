import type { ComponentConfig } from '../../theme/themes'

/** The resolved props TableContainer's styled elements receive - what `ownerState` exposes. */
export type TableContainerOwnerState = Record<string, unknown>

/** The slots of TableContainer a theme can style with `styleOverrides`. */
export type TableContainerSlot = 'root'

/** What `theme.components.TableContainer` takes. */
export type TableContainerThemeConfig = ComponentConfig<
  TableContainerOwnerState,
  TableContainerSlot
>
