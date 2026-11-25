import type { ComponentConfig } from '../../theme/themes'

/** The resolved props AccordionDetails's styled elements receive - what `ownerState` exposes. */
export type AccordionDetailsOwnerState = Record<string, unknown>

/** The slots of AccordionDetails a theme can style with `styleOverrides`. */
export type AccordionDetailsSlot = 'root'

/** What `theme.components.AccordionDetails` takes. */
export type AccordionDetailsThemeConfig = ComponentConfig<
  AccordionDetailsOwnerState,
  AccordionDetailsSlot
>
