import type { ComponentConfig } from '../../theme/themes'

/** The defaults a theme may set for every `AccordionSummary`. */
export interface AccordionSummaryOwnerState {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}

/** The slots of AccordionSummary a theme can style with `styleOverrides`. */
export type AccordionSummarySlot = 'root' | 'button' | 'content' | 'icon'

/** What `theme.components.AccordionSummary` takes. */
export type AccordionSummaryThemeConfig = ComponentConfig<
  AccordionSummaryOwnerState,
  AccordionSummarySlot
>
