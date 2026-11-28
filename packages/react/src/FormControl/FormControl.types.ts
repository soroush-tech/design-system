import type { ComponentConfig } from '../theme/themes'

/** The resolved props FormControl's styled elements receive - what `ownerState` exposes. */
export type FormControlOwnerState = Record<string, unknown>

/** The slots of FormControl a theme can style with `styleOverrides`. */
export type FormControlSlot = 'root'

/** What `theme.components.FormControl` takes. */
export type FormControlThemeConfig = ComponentConfig<FormControlOwnerState, FormControlSlot>
