import type { ComponentConfig } from '../../theme/themes'

/** The defaults a theme may set for every `AccordionGroup`. */
export interface AccordionGroupOwnerState {
  isExclusive?: boolean
  variant?: 'separated' | 'attached'
}

/** The slots of AccordionGroup a theme can style with `styleOverrides`. */
export type AccordionGroupSlot = 'root'

/** What `theme.components.AccordionGroup` takes. */
export type AccordionGroupThemeConfig = ComponentConfig<
  AccordionGroupOwnerState,
  AccordionGroupSlot
>
