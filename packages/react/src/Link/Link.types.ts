import type { ComponentConfig } from '../theme/themes'

/** The resolved props Link's styled elements receive - what `ownerState` exposes. */
export type LinkOwnerState = Record<string, unknown>

/** The slots of Link a theme can style with `styleOverrides`. */
export type LinkSlot = 'root'

/** What `theme.components.Link` takes. */
export type LinkThemeConfig = ComponentConfig<LinkOwnerState, LinkSlot>
