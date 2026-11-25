import type { ComponentConfig } from '../theme/themes'

/** The resolved props Paper's styled elements receive - what `ownerState` exposes. */
export type PaperOwnerState = Record<string, unknown>

/** The slots of Paper a theme can style with `styleOverrides`. */
export type PaperSlot = 'root'

/** What `theme.components.Paper` takes. */
export type PaperThemeConfig = ComponentConfig<PaperOwnerState, PaperSlot>
