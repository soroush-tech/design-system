import type { ThemeTransitionEasing } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `Collapse`. */
export interface CollapseOwnerState {
  orientation?: 'vertical' | 'horizontal'
  collapsedSize?: string | number
  timeout?: number | { enter: number; exit: number }
  easing?: keyof ThemeTransitionEasing
  shouldAppear?: boolean
}

/** The slots of Collapse a theme can style with `styleOverrides`. */
export type CollapseSlot = 'root' | 'wrapper' | 'inner'

/** What `theme.components.Collapse` takes. */
export type CollapseThemeConfig = ComponentConfig<CollapseOwnerState, CollapseSlot>
