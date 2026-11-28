import type { ComponentConfig } from '../../theme/themes'

/** The resolved props NavTree's styled elements receive - what `ownerState` exposes. */
export type NavTreeOwnerState = Record<string, unknown>

/** The slots of NavTree a theme can style with `styleOverrides`. */
export type NavTreeSlot = 'root'

/** What `theme.components.NavTree` takes. */
export type NavTreeThemeConfig = ComponentConfig<NavTreeOwnerState, NavTreeSlot>
