import type { ComponentConfig } from '../theme/themes'

/** The resolved props Select's styled elements receive - what `ownerState` exposes. */
export type SelectOwnerState = Record<string, unknown>

/** The slots of Select a theme can style with `styleOverrides`. */
export type SelectSlot = 'root' | 'value' | 'valueArea' | 'valueGhost' | 'listbox'

/** What `theme.components.Select` takes. */
export type SelectThemeConfig = ComponentConfig<SelectOwnerState, SelectSlot>
