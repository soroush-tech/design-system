import type { ComponentConfig } from '../theme/themes'

/** The resolved props Checkbox's styled elements receive - what `ownerState` exposes. */
export type CheckboxOwnerState = Record<string, unknown>

/** The slots of Checkbox a theme can style with `styleOverrides`. */
export type CheckboxSlot = 'root' | 'input' | 'icon' | 'label'

/** What `theme.components.Checkbox` takes. */
export type CheckboxThemeConfig = ComponentConfig<CheckboxOwnerState, CheckboxSlot>
