import type { ComponentConfig } from '../theme/themes'

/** The resolved props FormHelperText's styled elements receive - what `ownerState` exposes. */
export type FormHelperTextOwnerState = Record<string, unknown>

/** The slots of FormHelperText a theme can style with `styleOverrides`. */
export type FormHelperTextSlot = 'root'

/** What `theme.components.FormHelperText` takes. */
export type FormHelperTextThemeConfig = ComponentConfig<
  FormHelperTextOwnerState,
  FormHelperTextSlot
>
