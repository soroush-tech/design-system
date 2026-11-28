import type { ComponentConfig } from '../../theme/themes'

/** The resolved props SidebarItem's styled elements receive - what `ownerState` exposes. */
export type SidebarItemOwnerState = Record<string, unknown>

/** The slots of SidebarItem a theme can style with `styleOverrides`. */
export type SidebarItemSlot = 'root' | 'pill'

/** What `theme.components.SidebarItem` takes. */
export type SidebarItemThemeConfig = ComponentConfig<SidebarItemOwnerState, SidebarItemSlot>
