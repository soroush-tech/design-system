import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `ScrollArea`. */
export interface ScrollAreaOwnerState {
  axes?: 'x' | 'y' | 'both'
}

/** The slots of ScrollArea a theme can style with `styleOverrides`. */
export type ScrollAreaSlot = 'root' | 'viewport' | 'track' | 'thumb'

/** What `theme.components.ScrollArea` takes. */
export type ScrollAreaThemeConfig = ComponentConfig<ScrollAreaOwnerState, ScrollAreaSlot>
