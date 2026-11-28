import type { ThemeBackground, ThemeRadii, ThemeText, ThemeZOrder } from '@gild-ui/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `Tooltip`. */
export interface TooltipOwnerState {
  borderRadius?: keyof ThemeRadii
  bg?: keyof ThemeBackground
  textColor?: keyof ThemeText
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'auto'
    | 'auto-start'
    | 'auto-end'
  hasArrow?: boolean
  enterDelay?: number
  leaveDelay?: number
  enterTouchDelay?: number
  leaveTouchDelay?: number
  shouldDescribeChild?: boolean
  isDescriptionPersistent?: boolean
  isInteractive?: boolean
  shouldWrapDisabledChild?: boolean
  /**
   * Theme only. With a value above 0, every tooltip under the theme shares one delay window, as in a
   * `TooltipGroup` of that duration: no enter delay while another is open or within this many
   * milliseconds of the last close. A `TooltipGroup` around a tooltip wins.
   */
  skipDelayDuration?: number
  shouldOpenOnHover?: boolean
  shouldOpenOnFocus?: boolean
  shouldOpenOnTouch?: boolean
  layer?: keyof ThemeZOrder
}

/** The slots of Tooltip a theme can style with `styleOverrides`. */
export type TooltipSlot = 'root' | 'arrow'

/** What `theme.components.Tooltip` takes. */
export type TooltipThemeConfig = ComponentConfig<TooltipOwnerState, TooltipSlot>
