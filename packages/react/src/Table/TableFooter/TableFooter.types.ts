import type { ComponentConfig } from '../../theme/themes'

/** The resolved props TableFooter's styled elements receive - what `ownerState` exposes. */
export type TableFooterOwnerState = Record<string, unknown>

/** The slots of TableFooter a theme can style with `styleOverrides`. */
export type TableFooterSlot = 'root'

/** What `theme.components.TableFooter` takes. */
export type TableFooterThemeConfig = ComponentConfig<TableFooterOwnerState, TableFooterSlot>
