import type { ComponentConfig } from '../../theme/themes'

/** The resolved props NavLink's styled elements receive - what `ownerState` exposes. */
export type NavLinkOwnerState = Record<string, unknown>

/** The slots of NavLink a theme can style with `styleOverrides`. */
export type NavLinkSlot = 'root' | 'label' | 'note'

/** What `theme.components.NavLink` takes. */
export type NavLinkThemeConfig = ComponentConfig<NavLinkOwnerState, NavLinkSlot>
