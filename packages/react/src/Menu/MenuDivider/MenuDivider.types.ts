import type { ComponentConfig } from '../../theme/themes'

/** The resolved props MenuDivider's styled elements receive - what `ownerState` exposes. */
export type MenuDividerOwnerState = Record<string, unknown>

/** The slots of MenuDivider a theme can style with `styleOverrides`. */
export type MenuDividerSlot = 'root'

/** What `theme.components.MenuDivider` takes. */
export type MenuDividerThemeConfig = ComponentConfig<MenuDividerOwnerState, MenuDividerSlot>
