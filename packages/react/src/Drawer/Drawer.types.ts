import type { ComponentConfig } from '../theme/themes'

/** The resolved props Drawer's styled elements receive - what `ownerState` exposes. */
export type DrawerOwnerState = Record<string, unknown>

/** The slots of Drawer a theme can style with `styleOverrides`. */
export type DrawerSlot = 'root'

/** What `theme.components.Drawer` takes. */
export type DrawerThemeConfig = ComponentConfig<DrawerOwnerState, DrawerSlot>
