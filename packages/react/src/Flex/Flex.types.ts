import type { ComponentConfig } from '../theme/themes'

/** The resolved props Flex's styled elements receive - what `ownerState` exposes. */
export type FlexOwnerState = Record<string, unknown>

/** The slots of Flex a theme can style with `styleOverrides`. */
export type FlexSlot = 'root'

/** What `theme.components.Flex` takes. */
export type FlexThemeConfig = ComponentConfig<FlexOwnerState, FlexSlot>
