import type { ComponentConfig } from '../theme/themes'

/** The resolved props AppBar's styled elements receive - what `ownerState` exposes. */
export type AppBarOwnerState = Record<string, unknown>

/** The slots of AppBar a theme can style with `styleOverrides`. */
export type AppBarSlot = 'root'

/** What `theme.components.AppBar` takes. */
export type AppBarThemeConfig = ComponentConfig<AppBarOwnerState, AppBarSlot>
