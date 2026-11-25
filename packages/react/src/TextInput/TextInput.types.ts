import type { ComponentConfig } from '../theme/themes'

/** The resolved props TextInput's styled elements receive - what `ownerState` exposes. */
export type TextInputOwnerState = Record<string, unknown>

/** The slots of TextInput a theme can style with `styleOverrides`. */
export type TextInputSlot = 'root' | 'input'

/** What `theme.components.TextInput` takes. */
export type TextInputThemeConfig = ComponentConfig<TextInputOwnerState, TextInputSlot>
