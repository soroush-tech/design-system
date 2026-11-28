import type { ComponentConfig } from '../theme/themes'

/** The resolved props Avatar's styled elements receive - what `ownerState` exposes. */
export type AvatarOwnerState = Record<string, unknown>

/** The slots of Avatar a theme can style with `styleOverrides`. */
export type AvatarSlot = 'root' | 'img'

/** What `theme.components.Avatar` takes. */
export type AvatarThemeConfig = ComponentConfig<AvatarOwnerState, AvatarSlot>
