import type { ComponentConfig } from '../../theme/themes'

/** The resolved props AlertTitle's styled elements receive - what `ownerState` exposes. */
export type AlertTitleOwnerState = Record<string, unknown>

/** The slots of AlertTitle a theme can style with `styleOverrides`. */
export type AlertTitleSlot = 'root'

/** What `theme.components.AlertTitle` takes. */
export type AlertTitleThemeConfig = ComponentConfig<AlertTitleOwnerState, AlertTitleSlot>
