import type { ComponentConfig } from '../theme/themes'

/** The resolved props CircularProgress's styled elements receive - what `ownerState` exposes. */
export type CircularProgressOwnerState = Record<string, unknown>

/** The slots of CircularProgress a theme can style with `styleOverrides`. */
export type CircularProgressSlot = 'root' | 'track' | 'circle'

/** What `theme.components.CircularProgress` takes. */
export type CircularProgressThemeConfig = ComponentConfig<
  CircularProgressOwnerState,
  CircularProgressSlot
>
