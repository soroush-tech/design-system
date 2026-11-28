import type { ComponentConfig } from '../theme/themes'

/** The resolved props Popover's styled elements receive - what `ownerState` exposes. */
export type PopoverOwnerState = Record<string, unknown>

/** The slots of Popover a theme can style with `styleOverrides`. */
export type PopoverSlot = 'root' | 'positioner'

/** What `theme.components.Popover` takes. */
export type PopoverThemeConfig = ComponentConfig<PopoverOwnerState, PopoverSlot>
