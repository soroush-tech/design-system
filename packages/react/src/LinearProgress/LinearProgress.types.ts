import type { ComponentConfig } from '../theme/themes'

/** The resolved props LinearProgress's styled elements receive - what `ownerState` exposes. */
export type LinearProgressOwnerState = Record<string, unknown>

/** The slots of LinearProgress a theme can style with `styleOverrides`. */
export type LinearProgressSlot =
  | 'root'
  | 'track'
  | 'dash'
  | 'bar'
  | 'traveler'
  | 'segment'
  | 'secondaryBar'

/** What `theme.components.LinearProgress` takes. */
export type LinearProgressThemeConfig = ComponentConfig<
  LinearProgressOwnerState,
  LinearProgressSlot
>
