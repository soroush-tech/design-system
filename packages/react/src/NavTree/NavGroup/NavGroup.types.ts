import type { ComponentConfig } from '../../theme/themes'

/** The resolved props NavGroup's styled elements receive - what `ownerState` exposes. */
export type NavGroupOwnerState = Record<string, unknown>

/** The slots of NavGroup a theme can style with `styleOverrides`. */
export type NavGroupSlot = 'root' | 'label' | 'list'

/** What `theme.components.NavGroup` takes. */
export type NavGroupThemeConfig = ComponentConfig<NavGroupOwnerState, NavGroupSlot>
