import type { ComponentConfig } from '../theme/themes'

/** The resolved props View's styled elements receive - what `ownerState` exposes. */
export type ViewOwnerState = Record<string, unknown>

/** The slots of View a theme can style with `styleOverrides`. */
export type ViewSlot = 'root'

/** What `theme.components.View` takes. */
export type ViewThemeConfig = ComponentConfig<ViewOwnerState, ViewSlot>
