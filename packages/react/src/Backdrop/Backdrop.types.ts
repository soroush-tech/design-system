import type { ComponentConfig } from '../theme/themes'

/** The resolved props Backdrop's styled elements receive - what `ownerState` exposes. */
export type BackdropOwnerState = Record<string, unknown>

/** The slots of Backdrop a theme can style with `styleOverrides`. */
export type BackdropSlot = 'root'

/** What `theme.components.Backdrop` takes. */
export type BackdropThemeConfig = ComponentConfig<BackdropOwnerState, BackdropSlot>
