import type { ComponentConfig } from '../theme/themes'

/** The resolved props Modal's styled elements receive - what `ownerState` exposes. */
export type ModalOwnerState = Record<string, unknown>

/** The slots of Modal a theme can style with `styleOverrides`. */
export type ModalSlot = 'root'

/** What `theme.components.Modal` takes. */
export type ModalThemeConfig = ComponentConfig<ModalOwnerState, ModalSlot>
