import type { ElementType, ReactNode } from 'react'
import type { PaperElevation } from '../Paper/Paper'
import type { CSSObject as EmotionCSSObject } from '@emotion/react'
import { alpha, generateBoxShadow } from '../utils'
import { spacing } from './utils/spacing'
import { withBreakpointHelpers, type BreakpointHelpers } from './breakpoints'

/** Design-system's own style-object shape - Emotion stays an internal implementation detail. */
export type CSSObject = EmotionCSSObject

// ---------------------------------------------------------------------------
// Theme type layer - this package OWNS `Theme` and every scale interface below
// (Emotion is not the augmentation surface; it is only the CSS-in-JS engine
// used internally). Consumers extend every scale by declaration merging
// against THIS module:
//
//   declare module '@soroush.tech/design-system/theme' {
//     interface ThemePalette { brand: PaletteEntry }   // new palette color
//     interface ThemeBackground { tertiary: string }   // new background token
//     interface Theme { elevations: Record<string, string> }  // whole new scale
//   }
//
// Every component prop union derives via `keyof Theme['scale']`, so augmented
// keys propagate to component props automatically.
// ---------------------------------------------------------------------------

/**
 * Re-opens a named scale interface as an anonymous mapped type. Named
 * interfaces have no implicit index signature, which styled-system's
 * Record-based `Theme` constraint requires - the mapped copy restores it
 * while keeping the literal keys (and any consumer-augmented keys).
 */
export type OpenScale<T> = { [K in keyof T]: T[K] }

/** One semantic color of `theme.palette`. */
export interface PaletteEntry {
  main: string
  light: string
  dark: string
  contrastText: string
}
export interface ThemePalette {
  default: PaletteEntry
  primary: PaletteEntry
  secondary: PaletteEntry
  success: PaletteEntry
  error: PaletteEntry
  info: PaletteEntry
  warning: PaletteEntry
}
export interface ThemeText {
  inherit: string
  initial: string
  primary: string
  secondary: string
  disabled: string
  error: string
  success: string
  info: string
  warning: string
}
export interface ThemeBackground {
  backdrop: string
  /** App bar / sticky header surface. Light in light theme; `backdrop` stays dark for scrims. */
  appBar: string
  glass: string
  modal: string
  default: string
  primary: string
  secondary?: string
  paper: string
  terminal: string
  grid: string
  transparent: string
  /** The thumb of a drawn scrollbar (`ScrollArea`). */
  scrollbar: string
  /** The track of a drawn scrollbar, while it is hovered or dragged. */
  scrollbarTrack: string
}
export interface ThemeBorder {
  default?: string
  light?: string
  primary: string
  dark?: string
}
export interface ThemeFonts {
  body: string
  heading: string
  mono: string
}
/** Skeleton placeholder tokens. `highlight` is the wave-animation shimmer band. */
export interface ThemeSkeleton {
  highlight: string
}
/** Switch control tokens. The thumb stays light in both modes so it reads on any track. */
export interface ThemeSwitch {
  /** Thumb fill. Its elevation shadow composites from `theme.shadow.color`. */
  thumb: string
}
/**
 * Shadow tokens - the single base color every shadow composites from
 * (the `theme.shadows` elevation array and component shadows alike).
 */
export interface ThemeShadow {
  /** Opaque base color of all shadows. */
  color: string
  /** Alpha applied per elevation step in the default `theme.shadows` array. */
  opacity: number
}
/** Stacking order for layered UI - ascending: appBar < drawer < modal. */
export interface ThemeZOrder {
  appBar: number
  drawer: number
  modal: number
  snackbar: number
  tooltip: number
}
/** The durations of `theme.transitions.duration`, in milliseconds. */
export interface ThemeTransitionDuration {
  short: number
  standard: number
  long: number
}
/** The easings of `theme.transitions.easing` - CSS timing functions. */
export interface ThemeTransitionEasing {
  standard: string
  enter: string
  exit: string
}
/** How long and how smoothly things move - read by `Collapse`, `Fade`, `Grow`, `Slide` and `Zoom`. */
export interface ThemeTransitions {
  duration: OpenScale<ThemeTransitionDuration>
  easing: OpenScale<ThemeTransitionEasing>
}
export interface ThemeRadii {
  sq: string
  sm: string
  md: string
  lg: string
}
export interface ThemeBorderWidths {
  none: string
  thin: string
  base: string
  thick: string
}
export interface ThemeAvatarSizes {
  sm: string
  md: string
  lg: string
  xl: string
}
export interface ThemeFontWeights {
  thin: number
  extraLight: number
  light: number
  normal: number
  medium: number
  semiBold: number
  bold: number
  extraBold: number
  black: number
}
export interface ThemeLineHeights {
  none: number
  tight: number
  snug: number
  base: number
  relaxed: number
  loose: number
}
export interface ThemeLetterSpacings {
  tighter: string
  tight: string
  normal: string
  wide: string
  wider: string
  widest: string
}
export interface ThemeSpace {
  auto: string
  0: number | string
  0.125: number | string
  0.25: number | string
  0.5: number | string
  0.75: number | string
  1: number | string
  1.25: number | string
  1.5: number | string
  1.75: number | string
  2: number | string
  3: number | string
  4: number | string
  5: number | string
  6: number | string
  7: number | string
  8: number | string
  9: number | string
  10: number | string
}
/** One padding/font preset of `theme.sizes`. */
export interface SizeEntry {
  paddingTop: Exclude<keyof ThemeSpace, 'auto'>
  paddingBottom: Exclude<keyof ThemeSpace, 'auto'>
  paddingLeft: Exclude<keyof ThemeSpace, 'auto'>
  paddingRight: Exclude<keyof ThemeSpace, 'auto'>
  /** Index into `theme.fontSizes`. */
  fontSize: number
}
export interface ThemeSizes {
  sm: SizeEntry
  md: SizeEntry
  lg: SizeEntry
}
/**
 * Square glyph dimension per density key - Icon token sizes and the
 * Checkbox/Radio glyphs. Mapped over `ThemeSizes` so augmenting a size key
 * forces the matching icon size to be supplied.
 */
export type ThemeIconSizes = { [K in keyof ThemeSizes]: string }
/** The default breakpoint names - Material 3's window classes. */
export interface DefaultBreakpoints {
  /** compact: 0-599px - the base, applies everywhere until `sm` overrides it. */
  xs: true
  /** medium: 600-839px. */
  sm: true
  /** expanded: 840-1199px. */
  md: true
  /** large: 1200-1599px. */
  lg: true
  /** extra-large: 1600px and up. */
  xl: true
}
/**
 * Add, rename or remove breakpoints by augmenting this interface: `true` adds a name, `false`
 * removes a default one.
 *
 *   declare module '@soroush.tech/design-system/theme' {
 *     interface BreakpointOverrides { mobile: true; tablet: true; xs: false; sm: false }
 *   }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- an augmentation point
export interface BreakpointOverrides {}
// The default names an app removed by setting them to `false` in BreakpointOverrides.
type RemovedBreakpoints = keyof {
  [K in keyof BreakpointOverrides as BreakpointOverrides[K] extends false ? K : never]: true
}
/** The theme's breakpoint names: the defaults, plus every override set to `true`, minus every one set to `false`. */
// Every default and every override, written without a union so an un-augmented (empty)
// overrides interface adds no `never` to one. The overridden defaults are omitted first: an
// override such as `xl: false` against the default `xl: true` would reduce a plain
// intersection to `never`.
export type BreakpointKey = Exclude<
  keyof (Omit<DefaultBreakpoints, keyof BreakpointOverrides> & BreakpointOverrides),
  RemovedBreakpoints
>

/**
 * `theme.breakpoints`: where each window class starts, ascending, in declared order. A key holds
 * from its value until the next key, so `xs: '0px'` applies everywhere until `sm` overrides it;
 * media queries are min-width, which is why the theme writes the start of each range. Responsive
 * props map onto the keys by name, or by position for an array. A value is a CSS length; a
 * media condition or a full `@media` rule is passed through, without the range helpers.
 * `createTheme` appends a breakpoint you add after the existing ones, so it must be larger.
 */
export type ThemeBreakpoints = { [K in BreakpointKey]: string }
/** A `theme.space` key - layout margins and gutters step on the spacing scale. */
export type LayoutSpace = Exclude<keyof ThemeSpace, 'auto'>
/** A `theme.space` key or a CSS length (a 280px panel is a size, not a spacing step). */
export type LayoutLength = LayoutSpace | string
/** Bar heights at the top and bottom of the page; `0` removes an inherited bar. */
export interface LayoutBars {
  top?: LayoutLength
  bottom?: LayoutLength
}
/** A side panel: a track (`inline`), over the content (`overlay`), its rail (`collapsed`) or absent (`hidden`). */
export interface LayoutPanel {
  mode: 'inline' | 'overlay' | 'collapsed' | 'hidden'
  /** Open width. */
  width: LayoutLength
  /** Collapsed width. */
  railWidth: LayoutLength
}
/** Side panels by logical side - `start` and `end` flip in RTL. */
export interface LayoutPanels {
  start?: LayoutPanel
  end?: LayoutPanel
}
/** The content columns, measured in the space the bars and inline panels leave. */
export interface LayoutContent {
  columns: number
  /** Inline padding of the content. */
  margin: LayoutSpace
  /** Gap between columns. */
  gutter: LayoutSpace
  /** `fluid` spans the space; `fixed` is a container centred at `maxWidth`. */
  mode: 'fluid' | 'fixed'
  maxWidth?: LayoutLength
}
/** The page layout at one breakpoint. */
export interface LayoutEntry {
  bars: LayoutBars
  panels: LayoutPanels
  content: LayoutContent
}
/**
 * `theme.layout`: layout tokens per breakpoint, merged mobile-first in breakpoint order. The
 * first breakpoint's entry (`xs`) is complete; every later one lists only what changes. A panel
 * first declared at a later breakpoint needs its `mode`, `width` and `railWidth` there. These
 * are tokens: apps (and the studio) read them; nothing in the design system lays a page out.
 */
export type ThemeLayout = {
  [K in BreakpointKey]?: {
    bars?: LayoutBars
    panels?: { [P in keyof LayoutPanels]?: Partial<LayoutPanel> }
    content?: Partial<LayoutContent>
  }
}
/** Style of one typography variant. */
export interface TypographyVariantStyle {
  element: ElementType
  fontSize?: number
  fontWeight?: string
  letterSpacing?: string
  textTransform?: CSSObject['textTransform']
}
export interface ThemeTypographyVariants {
  h1: TypographyVariantStyle
  h2: TypographyVariantStyle
  h3: TypographyVariantStyle
  h4: TypographyVariantStyle
  h5: TypographyVariantStyle
  h6: TypographyVariantStyle
  subtitle1: TypographyVariantStyle
  subtitle2: TypographyVariantStyle
  body1: TypographyVariantStyle
  body2: TypographyVariantStyle
  caption: TypographyVariantStyle
  overline: TypographyVariantStyle
  button: TypographyVariantStyle
  inherit: TypographyVariantStyle
}
/**
 * Optional theme-driven component defaults. Components carry their own
 * literal fallbacks (`size = 'md'`, `variant = 'outside'`, ...) and resolve
 * them through `themeDefault(theme, key, fallback)` - set any key here (or
 * via `ThemeProvider`'s `defaults` prop) to override that fallback globally,
 * e.g. when your theme uses entirely different size or palette keys.
 */
export interface ThemeDefaults {
  /** Density token for sized components. Fallback: `'md'`. */
  size?: keyof ThemeSizes
  /** Compact density for dense secondary UI (table pagination actions). Fallback: `'sm'`. */
  compactSize?: keyof ThemeSizes
  /** Accent palette color (buttons, links, progress, pagination...). Fallback: `'primary'`. */
  color?: keyof ThemePalette
  /** Neutral palette color for toggle controls (checkbox, radio, switch...). Fallback: `'default'`. */
  neutralColor?: keyof ThemePalette
  /** Body text color. Fallback: `'initial'`. */
  textColor?: keyof ThemeText
  /** Accent text color (icons, input labels). Fallback: `'primary'`. */
  accentTextColor?: keyof ThemeText
  /** General control background (switch track). Fallback: `'default'`. */
  bg?: keyof ThemeBackground
  /** Elevated surface background (paper, cards). Fallback: `'paper'`. */
  surfaceBg?: keyof ThemeBackground
  /** Input surface background (selects, text inputs). Fallback: `'terminal'`. */
  inputBg?: keyof ThemeBackground
  /** Corner radius for grouped controls. Fallback: `'md'`. */
  borderRadius?: keyof ThemeRadii
  /** Corner radius for surfaces. Fallback: `'sq'`. */
  surfaceRadius?: keyof ThemeRadii
  /** Avatar size step. Fallback: `'md'`. */
  avatarSize?: keyof ThemeAvatarSizes
  /** Icon glyph size step. Fallback: `'lg'`. */
  iconSize?: keyof ThemeIconSizes
  /** Least width of an input that does not fill its row (text, number, select, autocomplete) - a CSS length. Fallback: `'12rem'`. */
  inputMinWidth?: string
  /** Border/ring color. Fallback: `'primary'`. */
  borderColor?: keyof ThemeBorder
  /** Border/ring width. Fallback: `'thin'`. */
  borderWidth?: keyof ThemeBorderWidths
  /** Button visual variant. Fallback: `'contained'`. */
  buttonVariant?: keyof ButtonVariants
  /** Switch thumb/track layout. Fallback: `'outside'`. */
  switchVariant?: 'outside' | 'inside'
  /** Input frame style (TextInput, Select, NativeSelect). Fallback: `'default'`. */
  inputVariant?: 'default' | 'outlined' | 'text' | 'underline'
  /** Avatar shape. Fallback: `'circular'`. */
  avatarVariant?: 'circular' | 'rounded' | 'square'
  /** Link underline behavior. Fallback: `'always'`. */
  linkUnderline?: 'always' | 'hover' | 'none'
  /** Card surface treatment. Fallback: `'paper'`. */
  cardVariant?: 'paper' | 'bracketBox' | 'interactive'
  /** Pagination item visual variant. Fallback: `'text'`. */
  paginationVariant?: 'text' | 'outlined'
  /** Pagination item shape. Fallback: `'circular'`. */
  paginationShape?: 'circular' | 'rounded'
}
/**
 * A style contributed from `theme.components` - a plain CSS object, or a
 * callback receiving the theme and the styled root's resolved props
 * (`ownerState`) for conditional styling.
 */
export type ComponentStyle<OwnerState> =
  | CSSObject
  | ((args: { theme: Theme; ownerState: OwnerState }) => CSSObject)

/** One theme-contributed variant: applied when every key in `props` matches the render props. */
export interface ComponentVariant<OwnerState> {
  props: Partial<OwnerState>
  style: ComponentStyle<OwnerState>
}

/** Per-component customization: default prop values, per-slot CSS, extra variants. */
export interface ComponentConfig<
  OwnerState = Record<string, unknown>,
  Slot extends string = 'root',
> {
  /** Default prop values - explicit props and group context always win. */
  defaultProps?: Partial<OwnerState>
  /** Per-slot CSS merged after the component's own styles (theme wins). */
  styleOverrides?: Partial<Record<Slot, ComponentStyle<OwnerState>>>
  /** Extra variants matched by props. Replaced wholesale by `createTheme`, never merged. */
  variants?: ReadonlyArray<ComponentVariant<OwnerState>>
}

/** Button's variant values - augment to register new ones (then style them via `variants`). */
export interface ButtonVariants {
  contained: true
  outlined: true
  text: true
}

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
  variant?: 'default' | 'outlined' | 'text' | 'underline'
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
  variant?: 'default' | 'outlined' | 'text' | 'underline'
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
  shape?: 'square' | 'rounded' | 'pill'
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
  shape?: 'square' | 'rounded' | 'pill'
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

/** The resolved props Button's styled roots receive - what `ownerState` exposes. */
export interface ButtonOwnerState {
  variant?: keyof ButtonVariants
  color?: keyof ThemePalette
  size?: keyof ThemeSizes
  shape?: 'square' | 'rounded' | 'pill'
  fullWidth?: boolean
  disabled?: boolean
}

/** Tabs' look values - augment to register new ones (then style them via `variants`). */
export interface TabsVariants {
  underline: true
  boxed: true
  enclosed: true
}

/** The resolved props Tabs' styled elements receive - what `ownerState` exposes. */
export interface TabsOwnerState {
  variant?: keyof TabsVariants
  color?: keyof ThemePalette
  size?: keyof ThemeSizes
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

/**
 * Per-component theme customization, keyed by component name. Augment this
 * interface to register additional components (including your own, when their
 * styled roots are created with this package's `styled(tag, { name })`).
 */
export interface ThemeComponents {
  AppBar?: ComponentConfig
  Avatar?: ComponentConfig<Record<string, unknown>, 'root' | 'img'>
  Backdrop?: ComponentConfig
  Breadcrumbs?: ComponentConfig<
    BreadcrumbsOwnerState,
    'root' | 'list' | 'item' | 'separator' | 'collapsed' | 'collapsedIcon'
  >
  Button?: ComponentConfig<ButtonOwnerState, 'root' | 'label' | 'icon' | 'loader'>
  ButtonGroup?: ComponentConfig
  Card?: ComponentConfig<CardOwnerState, 'root' | 'title' | 'caption' | 'icon'>
  Checkbox?: ComponentConfig<Record<string, unknown>, 'root' | 'input' | 'icon' | 'label'>
  CircularProgress?: ComponentConfig<Record<string, unknown>, 'root' | 'track' | 'circle'>
  ContextMenu?: ComponentConfig<ContextMenuOwnerState, 'root' | 'paper'>
  Drawer?: ComponentConfig
  Flex?: ComponentConfig
  FocusTrap?: ComponentConfig
  Form?: ComponentConfig
  FormControl?: ComponentConfig
  FormHelperText?: ComponentConfig
  FormLabel?: ComponentConfig
  Grid?: ComponentConfig
  Icon?: ComponentConfig
  Image?: ComponentConfig
  LinearProgress?: ComponentConfig<
    Record<string, unknown>,
    'root' | 'track' | 'dash' | 'bar' | 'traveler' | 'segment' | 'secondaryBar'
  >
  Link?: ComponentConfig
  Menu?: ComponentConfig<MenuOwnerState, 'root' | 'paper'>
  MenuDivider?: ComponentConfig
  MenuItem?: ComponentConfig<
    MenuItemOwnerState,
    | 'root'
    | 'check'
    | 'startIcon'
    | 'label'
    | 'shortcut'
    | 'submenuIcon'
    | 'entry'
    | 'secondaryAction'
  >
  MenuList?: ComponentConfig<MenuListOwnerState>
  Modal?: ComponentConfig
  NativeSelect?: ComponentConfig<Record<string, unknown>, 'root' | 'select' | 'icon'>
  Pagination?: ComponentConfig<Record<string, unknown>, 'root' | 'list'>
  PaginationItem?: ComponentConfig<Record<string, unknown>, 'root' | 'ellipsis'>
  Paper?: ComponentConfig
  Popover?: ComponentConfig<Record<string, unknown>, 'root' | 'positioner'>
  Pressable?: ComponentConfig<PressableOwnerState>
  Quote?: ComponentConfig
  Radio?: ComponentConfig<Record<string, unknown>, 'root' | 'input' | 'icon' | 'label'>
  RangeInput?: ComponentConfig<
    RangeInputOwnerState,
    'root' | 'rail' | 'track' | 'thumb' | 'mark' | 'markLabel' | 'valueLabel' | 'input'
  >
  Tooltip?: ComponentConfig<TooltipOwnerState, 'root' | 'arrow'>
  Snackbar?: ComponentConfig<SnackbarOwnerState, 'root' | 'content' | 'message' | 'action'>
  Fab?: ComponentConfig<FabOwnerState, 'root' | 'label' | 'labelText'>
  FabMenu?: ComponentConfig<FabMenuOwnerState, 'root' | 'list'>
  Alert?: ComponentConfig<AlertOwnerState, 'root' | 'icon' | 'message' | 'action' | 'closeButton'>
  AlertTitle?: ComponentConfig
  Badge?: ComponentConfig<BadgeOwnerState, 'root' | 'badge' | 'label'>
  Chip?: ComponentConfig<
    ChipOwnerState,
    'root' | 'body' | 'label' | 'icon' | 'avatar' | 'deleteIcon'
  >
  Accordion?: ComponentConfig<AccordionOwnerState, 'root' | 'region'>
  AccordionSummary?: ComponentConfig<
    AccordionSummaryOwnerState,
    'root' | 'button' | 'content' | 'icon'
  >
  AccordionDetails?: ComponentConfig
  AccordionActions?: ComponentConfig
  AccordionGroup?: ComponentConfig<AccordionGroupOwnerState>
  Collapse?: ComponentConfig<CollapseOwnerState, 'root' | 'wrapper' | 'inner'>
  TransferList?: ComponentConfig<
    TransferListOwnerState,
    'root' | 'list' | 'header' | 'title' | 'count' | 'items' | 'item' | 'controls' | 'icon'
  >
  Autocomplete?: ComponentConfig<
    AutocompleteOwnerState,
    | 'root'
    | 'tags'
    | 'input'
    | 'clearIndicator'
    | 'popupIndicator'
    | 'popup'
    | 'listbox'
    | 'group'
    | 'groupLabel'
    | 'groupItems'
    | 'option'
    | 'status'
  >
  NumberInput?: ComponentConfig<
    NumberInputOwnerState,
    'root' | 'input' | 'spinButtons' | 'increment' | 'decrement'
  >
  Rating?: ComponentConfig<
    RatingOwnerState,
    'root' | 'item' | 'icon' | 'decimal' | 'input' | 'text' | 'emptyLabel'
  >
  ScrollArea?: ComponentConfig<ScrollAreaOwnerState, 'root' | 'viewport' | 'track' | 'thumb'>
  Select?: ComponentConfig<
    Record<string, unknown>,
    'root' | 'value' | 'valueArea' | 'valueGhost' | 'listbox'
  >
  Sidebar?: ComponentConfig<Record<string, unknown>, 'root' | 'rail' | 'panel'>
  SidebarItem?: ComponentConfig
  Skeleton?: ComponentConfig<Record<string, unknown>, 'root' | 'content'>
  Switch?: ComponentConfig<Record<string, unknown>, 'root' | 'input' | 'track' | 'thumb' | 'label'>
  Tab?: ComponentConfig<TabOwnerState, 'root' | 'label' | 'icon' | 'secondaryAction' | 'close'>
  Table?: ComponentConfig
  TableBody?: ComponentConfig
  TableCell?: ComponentConfig
  TableContainer?: ComponentConfig
  TableFooter?: ComponentConfig
  TableHead?: ComponentConfig
  TablePagination?: ComponentConfig
  TablePaginationActions?: ComponentConfig
  TableRow?: ComponentConfig
  TableSortLabel?: ComponentConfig<Record<string, unknown>, 'root' | 'icon'>
  TabPanel?: ComponentConfig<TabPanelOwnerState>
  TabScrollButton?: ComponentConfig<TabScrollButtonOwnerState>
  Tabs?: ComponentConfig<
    TabsOwnerState,
    | 'root'
    | 'list'
    | 'indicator'
    | 'startContent'
    | 'endContent'
    | 'scrollButton'
    | 'overflowButton'
    | 'overflowClose'
  >
  TextInput?: ComponentConfig<Record<string, unknown>, 'root' | 'input'>
  ToggleButton?: ComponentConfig
  ToggleButtonGroup?: ComponentConfig
  Typography?: ComponentConfig
  View?: ComponentConfig
}

export interface Theme {
  name: string
  /** Optional overrides for component default token/variant keys - see `ThemeDefaults`. */
  defaults?: OpenScale<ThemeDefaults>
  /** Optional per-component customization - see `ThemeComponents`. */
  components?: OpenScale<ThemeComponents>
  space: OpenScale<ThemeSpace>
  breakpoints: OpenScale<ThemeBreakpoints & BreakpointHelpers>
  layout: ThemeLayout
  border: OpenScale<ThemeBorder>
  text: OpenScale<ThemeText>
  background: OpenScale<ThemeBackground>
  typography: OpenScale<ThemeTypographyVariants>
  fonts: OpenScale<ThemeFonts>
  lineHeights: OpenScale<ThemeLineHeights>
  letterSpacings: OpenScale<ThemeLetterSpacings>
  fontSizes: number[]
  radii: OpenScale<ThemeRadii>
  borderWidths: OpenScale<ThemeBorderWidths>
  avatar: OpenScale<ThemeAvatarSizes>
  icon: ThemeIconSizes
  skeleton: OpenScale<ThemeSkeleton>
  switch: OpenScale<ThemeSwitch>
  shadow: OpenScale<ThemeShadow>
  sizes: { [K in keyof ThemeSizes]: OpenScale<ThemeSizes[K]> }
  colorScheme: 'light' | 'dark'
  blur: string
  logoFilter: string
  /** mix-blend-mode for the AboutHero portrait - screen on dark, multiply on light. */
  portraitBlend: string
  /** opacity for the AboutHero portrait. */
  portraitOpacity: number
  shadows: string[]
  fontWeights: OpenScale<ThemeFontWeights>
  palette: OpenScale<ThemePalette>
  zOrder: OpenScale<ThemeZOrder>
  transitions: ThemeTransitions
}

export { createTheme, type ThemeOverride, type DeepPartial } from './utils/createTheme'

/** The semantic color keys of `theme.palette`. */
export type PaletteColor = keyof ThemePalette

/** The variant keys of `theme.typography`. */
export type TypographyVariant = keyof ThemeTypographyVariants

// One base color for every shadow - the elevation array and component shadows
// (e.g. the Switch thumb) all composite from `shadow.color`.
const shadow = { color: '#000000', opacity: 0.4 }

const shadows = Array.from({ length: 25 }, (_, elevation) =>
  generateBoxShadow(elevation, alpha(shadow.color, shadow.opacity))
)
export const radii = {
  sq: '0',
  sm: '4px',
  md: '8px',
  lg: '16px',
}

export const borderWidths = {
  none: '0',
  thin: '1px',
  base: '2px',
  thick: '4px',
}

// Stacking order for layered UI. Ascending so overlays sit above the sticky header.
export const zOrder = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
}

// Leaving is quicker than entering, and both ease out of the way: the user is waiting on neither.
export const transitions = {
  duration: { short: 150, standard: 250, long: 375 },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    enter: 'cubic-bezier(0, 0, 0.2, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
  },
}

export const fontSizes = [12, 14, 16, 20, 24, 32, 48]

export const lineHeights = {
  none: 1,
  tight: 1.2,
  snug: 1.35,
  base: 1.5,
  relaxed: 1.625,
  loose: 2,
}

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.05em',
  wider: '0.1em',
  widest: '0.2em',
}

export const fonts = {
  // 'X Variable' is the @fontsource-variable family name - the consumer's global styles load
  // the font files; the plain name is a fallback for local installs, then the generic family.
  body: "'Space Grotesk Variable', 'Space Grotesk', sans-serif",
  heading: "'Space Grotesk Variable', 'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono Variable', 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
}

export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
}
export const avatar = {
  sm: spacing(4),
  md: spacing(5),
  lg: spacing(6),
  xl: spacing(7),
}
// 16/20/24px at the default 16px root.
export const icon: ThemeIconSizes = {
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
}
export const sizes: ThemeSizes = {
  sm: { paddingTop: 0.5, paddingBottom: 0.5, paddingLeft: 1.5, paddingRight: 1.5, fontSize: 0 },
  md: { paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2, fontSize: 1 },
  lg: { paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 3, paddingRight: 3, fontSize: 1 },
}
export const space: ThemeSpace = {
  0: 0,
  // Below 4px, lines are border widths (theme.borderWidths); use 0.125 and 0.25 only for a gap
  // that should be a hairline - a 1px or 2px gap the background shows through.
  0.125: spacing(0.125),
  0.25: spacing(0.25),
  0.5: spacing(0.5),
  0.75: spacing(0.75),
  1: spacing(1),
  1.25: spacing(1.25),
  1.5: spacing(1.5),
  1.75: spacing(1.75),
  2: spacing(2),
  3: spacing(3),
  4: spacing(4),
  5: spacing(5),
  6: spacing(6),
  7: spacing(7),
  8: spacing(8),
  9: spacing(9),
  10: spacing(10),
  auto: 'auto',
}

// Material 3's window classes, in px: each value is where its range starts.
export const breakpoints = withBreakpointHelpers<ThemeBreakpoints>({
  xs: '0px',
  sm: '600px',
  md: '840px',
  lg: '1200px',
  xl: '1600px',
})

// Mobile-first: `xs` is complete, each later class lists only what changes.
export const layout: ThemeLayout = {
  xs: {
    bars: { top: 8 },
    panels: {
      start: { mode: 'hidden', width: '280px', railWidth: 9 },
      end: { mode: 'hidden', width: '360px', railWidth: 9 },
    },
    content: { columns: 4, margin: 2, gutter: 2, mode: 'fluid' },
  },
  sm: {
    panels: { start: { mode: 'collapsed' } },
    content: { columns: 8, margin: 4 },
  },
  md: {
    panels: { end: { mode: 'overlay' } },
    content: { columns: 12, margin: 3, gutter: 3 },
  },
  lg: {
    panels: { end: { width: '412px' } },
    content: { mode: 'fixed', maxWidth: '1200px' },
  },
  xl: {
    panels: { start: { mode: 'inline' }, end: { mode: 'inline' } },
    content: { maxWidth: '1600px' },
  },
}

export const typography: ThemeTypographyVariants = {
  h1: { element: 'h1', fontSize: 6, fontWeight: 'bold' },
  h2: { element: 'h2', fontSize: 5, fontWeight: 'bold' },
  h3: { element: 'h3', fontSize: 4, fontWeight: 'bold' },
  h4: { element: 'h4', fontSize: 3, fontWeight: 'bold' },
  h5: { element: 'h5', fontSize: 2, fontWeight: 'bold' },
  h6: { element: 'h6', fontSize: 1, fontWeight: 'semiBold' },
  subtitle1: { element: 'h6', fontSize: 2, fontWeight: 'medium' },
  subtitle2: { element: 'h6', fontSize: 1, fontWeight: 'medium' },
  body1: { element: 'p', fontSize: 2, fontWeight: 'normal' },
  body2: { element: 'p', fontSize: 1, fontWeight: 'normal' },
  caption: { element: 'span', fontSize: 0, fontWeight: 'normal' },
  overline: {
    element: 'span',
    fontSize: 0,
    fontWeight: 'medium',
    textTransform: 'uppercase',
    letterSpacing: 'wider',
  },
  button: {
    element: 'span',
    fontSize: 1,
    fontWeight: 'medium',
    textTransform: 'uppercase',
    letterSpacing: 'wide',
  },
  inherit: {
    element: 'span',
  },
}

/**
 * The package's complete default theme (dark-schemed). Raw hex only - palettes
 * belong to the consumer, who builds brand themes with `createTheme(baseTheme, ...)`.
 */
export const baseTheme: Theme = {
  name: 'base',
  // The thumb stays light on any track color.
  switch: { thumb: '#FFFFFF' },
  radii,
  borderWidths,
  fontSizes,
  lineHeights,
  typography,
  letterSpacings,
  fontWeights,
  fonts,
  avatar,
  icon,
  sizes,
  space,
  breakpoints,
  layout,
  zOrder,
  transitions,
  blur: '12px',
  colorScheme: 'dark',
  palette: {
    default: {
      main: '#262626',
      light: '#363636',
      dark: '#0E0E0E',
      contrastText: '#F2F3F4',
    },
    primary: {
      main: '#00FC40',
      light: '#9CFF93',
      dark: '#006413',
      contrastText: '#000000',
    },
    secondary: {
      main: '#b3eeb1',
      light: '#d4f9d2',
      dark: '#5acc57',
      contrastText: '#000000',
    },
    success: {
      main: '#009928',
      light: '#00FC40',
      dark: '#006413',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF3B30',
      light: '#FF9590',
      dark: '#E0251A',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#00B8D9',
      light: '#33D9FF',
      dark: '#0099CC',
      contrastText: '#000000',
    },
    warning: {
      main: '#FFD930',
      light: '#FFF0A0',
      dark: '#CCA800',
      contrastText: '#000000',
    },
  },
  background: {
    backdrop: '#000000B3',
    appBar: '#000000B3',
    glass: '#0000004D',
    modal: '#131313',
    default: '#262626',
    primary: '#0E0E0E',
    secondary: '#1A1A1A',
    paper: '#131313',
    terminal: '#000000',
    grid: alpha('#00FC40', 0.06),
    transparent: '#00000000',
    scrollbar: '#B3B3B380',
    scrollbarTrack: '#38383880',
  },
  text: {
    inherit: 'inherit',
    initial: '#FFFFFF',
    primary: '#00FC40',
    secondary: '#9C9C9C',
    disabled: '#363636',
    error: '#D70015',
    success: '#009928',
    info: '#00B8D9',
    warning: '#8C6D00',
  },
  border: {
    default: '#262626',
    light: alpha('#E8FFE5', 0.1),
    primary: '#00FC40',
    dark: '#006413',
  },
  skeleton: {
    highlight: alpha('#363636', 0.65),
  },
  logoFilter: 'brightness(0) invert(1)',
  portraitBlend: 'screen',
  portraitOpacity: 0.8,
  shadow,
  shadows,
}

/**
 * The query helpers for `baseTheme`'s breakpoints, as plain functions. A theme with its own
 * breakpoints has the same helpers on `theme.breakpoints`.
 */
export const { up, down, only, between, not, containerQueries } = breakpoints
