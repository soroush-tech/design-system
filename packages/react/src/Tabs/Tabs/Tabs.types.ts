import type { ThemeColor, ThemeSize, VariantOf, ThemeBackground } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../../theme/themes'

/** The resolved props Tabs' styled elements receive - what `ownerState` exposes. */
export interface TabsOwnerState {
  variant?: TabsVariant
  color?: ThemeColor
  size?: ThemeSize
  orientation?: 'horizontal' | 'vertical'
  fullWidth?: boolean
  hasDivider?: boolean
  selectedBg?: keyof ThemeBackground
}

/** Tabs' look values - augment to register new ones (then style them via `variants`). */
interface TabsVariants {
  underline: true
  boxed: true
  enclosed: true
  tonal: true
}

/** Tabs' looks: the built-in ones, those added through `TabsVariants`, and those a registered theme defines. */
export type TabsVariant = keyof TabsVariants | VariantOf<'Tabs'>

/** The slots of Tabs a theme can style with `styleOverrides`. */
export type TabsSlot =
  | 'root'
  | 'list'
  | 'indicator'
  | 'startContent'
  | 'endContent'
  | 'scrollButton'
  | 'overflowButton'
  | 'overflowClose'

/** What `theme.components.Tabs` takes. */
export type TabsThemeConfig = ComponentConfig<TabsOwnerState, TabsSlot>
