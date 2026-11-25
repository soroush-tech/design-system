import type { ComponentConfig } from '../../theme/themes'

/** The resolved props AccordionActions's styled elements receive - what `ownerState` exposes. */
export type AccordionActionsOwnerState = Record<string, unknown>

/** The slots of AccordionActions a theme can style with `styleOverrides`. */
export type AccordionActionsSlot = 'root'

/** What `theme.components.AccordionActions` takes. */
export type AccordionActionsThemeConfig = ComponentConfig<
  AccordionActionsOwnerState,
  AccordionActionsSlot
>
