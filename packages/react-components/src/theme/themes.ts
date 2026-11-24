import type { ReactNode } from 'react'
import type { ThemeColor, ThemeSize, VariantOf } from '@soroush.design/core/theme'
import type { PaperElevation } from '../Paper/Paper'
import type {
  ButtonVariants,
  InputVariantKey,
  ThemeBackground,
  ThemeFonts,
  ThemePalette,
  ThemeRadii,
  ThemeSizes,
  ThemeSpace,
  ThemeText,
  ThemeTransitionEasing,
  ThemeTypographyVariants,
  ThemeZOrder,
} from '@soroush.design/core/theme'

// The typing of every component's owner state and variants stays here, as it names this library's
// components; `/theme` exports it. The theme, its types and `ComponentConfig` are
// `@soroush.design/react-theme`'s. Each component's folder adds its slots to the theme's open
// `ThemeComponents` in its own `index.ts`, so an app that imports a component sees
// `theme.components.<Component>` typed. Every prop union derives via `keyof Theme['scale']`, so keys
// an app adds to a scale propagate to component props automatically.

/** The defaults a theme may set for every `RangeInput`. */
export interface RangeInputOwnerState {
  size?: keyof ThemeSizes
  color?: keyof ThemePalette
  orientation?: 'horizontal' | 'vertical'
  track?: 'normal' | false | 'inverted'
  step?: number | null
  shiftStep?: number
  valueLabel?: 'auto' | 'on' | 'off'
  shouldSwapThumbs?: boolean
}

/** The defaults a theme may set for every `NumberInput` - its button labels give it a language. */
export interface NumberInputOwnerState {
  variant?: InputVariantKey
  size?: keyof ThemeSizes
  color?: keyof ThemePalette
  spinButtons?: 'stacked' | 'sides' | 'none'
  step?: number
  smallStep?: number
  largeStep?: number
  shouldSnapOnStep?: boolean
  shouldScrubOnWheel?: boolean
  incrementLabel?: string
  decrementLabel?: string
}

/** The defaults a theme may set for every `Rating`. */
export interface RatingOwnerState {
  max?: number
  precision?: number
  highlightSelectedOnly?: boolean
  size?: keyof ThemeSizes
  color?: keyof ThemePalette
}

/** The defaults a theme may set for every `Autocomplete` - its labels give it a language. */
export interface AutocompleteOwnerState {
  borderRadius?: keyof ThemeRadii
  bg?: keyof ThemeBackground
  textColor?: keyof ThemeText
  variant?: InputVariantKey
  size?: keyof ThemeSizes
  color?: keyof ThemePalette
  shouldAllowFreeText?: boolean
  layer?: keyof ThemeZOrder
  clearLabel?: string
  openLabel?: string
  closeLabel?: string
  loadingText?: string
  noOptionsText?: string
}

/** The defaults a theme may set for every `ScrollArea`. */
export interface ScrollAreaOwnerState {
  axes?: 'x' | 'y' | 'both'
}

/** The corner shapes of a control or a surface. */
type ShapeKey = 'square' | 'rounded' | 'pill'

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

/** The defaults a theme may set for every `Snackbar`. */
export interface SnackbarOwnerState {
  anchorOrigin?: {
    vertical: 'top' | 'bottom'
    horizontal: 'start' | 'center' | 'end'
  }
  autoHideDuration?: number
  resumeHideDuration?: number
  layer?: keyof ThemeZOrder
  shape?: ShapeKey
  borderRadius?: keyof ThemeRadii
  bg?: keyof ThemeBackground
  textColor?: keyof ThemeText
}

/** The defaults a theme may set for every `Fab`. */
export interface FabOwnerState {
  variant?: 'circular' | 'extended'
  color?: keyof ThemePalette
  size?: keyof ThemeSizes
}

/** The defaults a theme may set for every `FabMenu`. */
export interface FabMenuOwnerState {
  direction?: 'up' | 'down' | 'left' | 'right'
  align?: 'start' | 'end'
  color?: keyof ThemePalette
  size?: keyof ThemeSizes
}

/** The defaults a theme may set for every `Alert` - its `closeLabel` gives it a language. */
export interface AlertOwnerState {
  severity?: 'success' | 'info' | 'warning' | 'error'
  variant?: 'standard' | 'contained' | 'outlined'
  closeLabel?: string
  role?: 'alert' | 'status'
  borderRadius?: keyof ThemeRadii
}

/** The defaults a theme may set for every `Badge`. */
export interface BadgeOwnerState {
  max?: number
  variant?: 'standard' | 'dot'
  color?: keyof ThemePalette
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'start' | 'end' }
  overlap?: 'rectangular' | 'circular'
}

/** The defaults a theme may set for every `Chip` - its `deleteLabel` gives it a language. */
export interface ChipOwnerState {
  variant?: 'contained' | 'outlined' | 'text'
  color?: keyof ThemePalette
  size?: keyof ThemeSizes
  shape?: ShapeKey
  borderRadius?: keyof ThemeRadii
  deleteLabel?: string
}

/** The defaults a theme may set for every `Accordion`. */
export interface AccordionOwnerState {
  hasGutters?: boolean
  borderRadius?: keyof ThemeRadii
  bg?: keyof ThemeBackground
  textColor?: keyof ThemeText
}

/** The defaults a theme may set for every `AccordionSummary`. */
export interface AccordionSummaryOwnerState {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}

/** The defaults a theme may set for every `AccordionGroup`. */
export interface AccordionGroupOwnerState {
  isExclusive?: boolean
  variant?: 'separated' | 'attached'
}

/** The defaults a theme may set for every `Collapse`. */
export interface CollapseOwnerState {
  orientation?: 'vertical' | 'horizontal'
  collapsedSize?: string | number
  timeout?: number | { enter: number; exit: number }
  easing?: keyof ThemeTransitionEasing
  shouldAppear?: boolean
}

/** The defaults a theme may set for every `TransferList` - its button labels give it a language. */
export interface TransferListOwnerState {
  size?: keyof ThemeSizes
  color?: keyof ThemePalette
  shouldShowMoveAll?: boolean
  hasSelectAll?: boolean
  moveAllRightLabel?: string
  moveRightLabel?: string
  moveLeftLabel?: string
  moveAllLeftLabel?: string
}

/** The defaults a theme may set for every `Breadcrumbs` - its `expandLabel` gives a trail its language. */
export interface BreadcrumbsOwnerState {
  separator?: ReactNode
  maxItems?: number
  itemsBeforeCollapse?: number
  itemsAfterCollapse?: number
  expandLabel?: string
  color?: keyof ThemeText
}

/** Button's looks: the built-in ones, those added through `ButtonVariants`, and those a registered theme defines. */
export type ButtonLook = keyof ButtonVariants | VariantOf<'Button'>

/** The resolved props Button's styled roots receive - what `ownerState` exposes. */
export interface ButtonOwnerState {
  variant?: ButtonLook
  color?: ThemeColor
  size?: ThemeSize
  shape?: ShapeKey
  fullWidth?: boolean
  disabled?: boolean
}

/** Tabs' look values - augment to register new ones (then style them via `variants`). */
export interface TabsVariants {
  underline: true
  boxed: true
  enclosed: true
  tonal: true
}

/** Tabs' looks: the built-in ones, those added through `TabsVariants`, and those a registered theme defines. */
export type TabsLook = keyof TabsVariants | VariantOf<'Tabs'>

/** The resolved props Tabs' styled elements receive - what `ownerState` exposes. */
export interface TabsOwnerState {
  variant?: TabsLook
  color?: ThemeColor
  size?: ThemeSize
  orientation?: 'horizontal' | 'vertical'
  fullWidth?: boolean
  hasDivider?: boolean
  selectedBg?: keyof ThemeBackground
}

/** The defaults a theme may set for every `Menu`. */
export interface MenuOwnerState {
  align?: 'start' | 'end'
  borderRadius?: keyof ThemeRadii
  marginThreshold?: keyof ThemeSpace
  elevation?: PaperElevation
  layer?: keyof ThemeZOrder
  color?: keyof ThemePalette
  textColor?: keyof ThemeText
  size?: keyof ThemeSizes
  dense?: boolean
}

/** The defaults a theme may set for every `ContextMenu` - a `Menu`'s, placed at the pointer. */
export type ContextMenuOwnerState = Omit<MenuOwnerState, 'align'>

/** The defaults a theme may set for every `MenuList` - and so for its rows. */
export interface MenuListOwnerState {
  color?: keyof ThemePalette
  textColor?: keyof ThemeText
  size?: keyof ThemeSizes
  dense?: boolean
  shouldWrap?: boolean
}

/** The defaults a theme may set for every `MenuItem` - a list's own values win. */
export interface MenuItemOwnerState {
  color?: keyof ThemePalette
  textColor?: keyof ThemeText
  size?: keyof ThemeSizes
  dense?: boolean
}

/** The defaults a theme may set for every `Tab`. */
export interface TabOwnerState {
  isWrapped?: boolean
  bg?: keyof ThemeBackground
  borderRadius?: keyof ThemeRadii
  color?: keyof ThemePalette
  textColor?: keyof ThemeText
  size?: keyof ThemeSizes
  selectedBg?: keyof ThemeBackground
}

/** The defaults a theme may set for every `TabScrollButton`. */
export interface TabScrollButtonOwnerState {
  color?: keyof ThemePalette
  textColor?: keyof ThemeText
}

/** The defaults a theme may set for every `TabPanel`. */
export interface TabPanelOwnerState {
  shouldKeepMounted?: boolean
}

/** Token-typed Typography props a theme may set for Card's title/caption slots. */
export interface CardSlotTypographyProps {
  variant?: keyof ThemeTypographyVariants
  color?: keyof ThemeText
  fontFamily?: keyof ThemeFonts
  mb?: keyof ThemeSpace
}

/** Token-typed Icon props a theme may set for Card's icon slot. */
export interface CardSlotIconProps {
  color?: keyof ThemeText
  size?: string | number
}

/** Card's resolved props / theme-settable defaults. */
export interface CardOwnerState {
  variant?: 'paper' | 'bracketBox' | 'interactive'
  /** Merged under any per-instance `titleProps` (instance wins). */
  titleProps?: CardSlotTypographyProps
  /** Merged under any per-instance `captionProps` (instance wins). */
  captionProps?: CardSlotTypographyProps
  /** Merged under any per-instance `iconProps` (instance wins). */
  iconProps?: CardSlotIconProps
}

/**
 * Pressable's resolved props / theme-settable defaults. Only the three keys it
 * actually resolves through `useDefaultProps` - the disabled state reaches the
 * styled root as `isDisabled` and is never read from here, so exposing it would
 * promise theme authors an override that does nothing.
 */
export interface PressableOwnerState {
  feedback?: 'none' | 'opacity' | 'highlight'
  color?: keyof ThemePalette
  /** Opacity held content fades to under `feedback: 'opacity'`. */
  activeOpacity?: number
}
