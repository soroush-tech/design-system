import type { ComponentConfig } from '../theme/themes'

/** The resolved props Form's styled elements receive - what `ownerState` exposes. */
export type FormOwnerState = Record<string, unknown>

/** The slots of Form a theme can style with `styleOverrides`. */
export type FormSlot = 'root'

/** What `theme.components.Form` takes. */
export type FormThemeConfig = ComponentConfig<FormOwnerState, FormSlot>
