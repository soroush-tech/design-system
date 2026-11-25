import type { ComponentConfig } from '../theme/themes'

/** The resolved props Typography's styled elements receive - what `ownerState` exposes. */
export type TypographyOwnerState = Record<string, unknown>

/** The slots of Typography a theme can style with `styleOverrides`. */
export type TypographySlot = 'root'

/** What `theme.components.Typography` takes. */
export type TypographyThemeConfig = ComponentConfig<TypographyOwnerState, TypographySlot>
