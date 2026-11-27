import type { ThemeBackground, ThemeRadii, ThemeText } from '@gild-ui/core/theme'
import type { ComponentConfig } from '../../theme/themes'

/** The defaults a theme may set for every `Accordion`. */
export interface AccordionOwnerState {
  hasGutters?: boolean
  borderRadius?: keyof ThemeRadii
  bg?: keyof ThemeBackground
  textColor?: keyof ThemeText
}

/** The slots of Accordion a theme can style with `styleOverrides`. */
export type AccordionSlot = 'root' | 'region'

/** What `theme.components.Accordion` takes. */
export type AccordionThemeConfig = ComponentConfig<AccordionOwnerState, AccordionSlot>
