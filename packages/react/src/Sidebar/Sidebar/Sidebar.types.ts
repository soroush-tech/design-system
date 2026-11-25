import type { ComponentConfig } from '../../theme/themes'

/** The resolved props Sidebar's styled elements receive - what `ownerState` exposes. */
export type SidebarOwnerState = Record<string, unknown>

/** The slots of Sidebar a theme can style with `styleOverrides`. */
export type SidebarSlot = 'root' | 'rail' | 'panel'

/** What `theme.components.Sidebar` takes. */
export type SidebarThemeConfig = ComponentConfig<SidebarOwnerState, SidebarSlot>
