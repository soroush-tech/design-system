import type { ComponentConfig } from '../theme/themes'

/** The resolved props FormLabel's styled elements receive - what `ownerState` exposes. */
export type FormLabelOwnerState = Record<string, unknown>

/** The slots of FormLabel a theme can style with `styleOverrides`. */
export type FormLabelSlot = 'root'

/** What `theme.components.FormLabel` takes. */
export type FormLabelThemeConfig = ComponentConfig<FormLabelOwnerState, FormLabelSlot>
