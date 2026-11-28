import type { ComponentConfig } from '../theme/themes'

/** The resolved props Quote's styled elements receive - what `ownerState` exposes. */
export type QuoteOwnerState = Record<string, unknown>

/** The slots of Quote a theme can style with `styleOverrides`. */
export type QuoteSlot = 'root'

/** What `theme.components.Quote` takes. */
export type QuoteThemeConfig = ComponentConfig<QuoteOwnerState, QuoteSlot>
