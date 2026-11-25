import type { ComponentConfig } from '../theme/themes'

/** The resolved props NativeSelect's styled elements receive - what `ownerState` exposes. */
export type NativeSelectOwnerState = Record<string, unknown>

/** The slots of NativeSelect a theme can style with `styleOverrides`. */
export type NativeSelectSlot = 'root' | 'select' | 'icon'

/** What `theme.components.NativeSelect` takes. */
export type NativeSelectThemeConfig = ComponentConfig<NativeSelectOwnerState, NativeSelectSlot>
