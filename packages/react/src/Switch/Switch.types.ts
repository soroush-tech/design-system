import type { ComponentConfig } from '../theme/themes'

/** The resolved props Switch's styled elements receive - what `ownerState` exposes. */
export type SwitchOwnerState = Record<string, unknown>

/** The slots of Switch a theme can style with `styleOverrides`. */
export type SwitchSlot = 'root' | 'input' | 'track' | 'thumb' | 'label'

/** What `theme.components.Switch` takes. */
export type SwitchThemeConfig = ComponentConfig<SwitchOwnerState, SwitchSlot>
