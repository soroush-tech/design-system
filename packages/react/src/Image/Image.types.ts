import type { ComponentConfig } from '../theme/themes'

/** The resolved props Image's styled elements receive - what `ownerState` exposes. */
export type ImageOwnerState = Record<string, unknown>

/** The slots of Image a theme can style with `styleOverrides`. */
export type ImageSlot = 'root'

/** What `theme.components.Image` takes. */
export type ImageThemeConfig = ComponentConfig<ImageOwnerState, ImageSlot>
