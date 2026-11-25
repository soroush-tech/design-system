import type { ComponentConfig } from '../theme/themes'

/** The resolved props Radio's styled elements receive - what `ownerState` exposes. */
export type RadioOwnerState = Record<string, unknown>

/** The slots of Radio a theme can style with `styleOverrides`. */
export type RadioSlot = 'root' | 'input' | 'icon' | 'label'

/** What `theme.components.Radio` takes. */
export type RadioThemeConfig = ComponentConfig<RadioOwnerState, RadioSlot>
