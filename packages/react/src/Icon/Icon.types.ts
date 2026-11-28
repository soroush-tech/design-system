import type { ComponentConfig } from '../theme/themes'

/** The resolved props Icon's styled elements receive - what `ownerState` exposes. */
export type IconOwnerState = Record<string, unknown>

/** The slots of Icon a theme can style with `styleOverrides`. */
export type IconSlot = 'root'

/** What `theme.components.Icon` takes. */
export type IconThemeConfig = ComponentConfig<IconOwnerState, IconSlot>
