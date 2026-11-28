import type { ComponentConfig } from '../../theme/themes'

/** The resolved props TableSortLabel's styled elements receive - what `ownerState` exposes. */
export type TableSortLabelOwnerState = Record<string, unknown>

/** The slots of TableSortLabel a theme can style with `styleOverrides`. */
export type TableSortLabelSlot = 'root' | 'icon'

/** What `theme.components.TableSortLabel` takes. */
export type TableSortLabelThemeConfig = ComponentConfig<
  TableSortLabelOwnerState,
  TableSortLabelSlot
>
