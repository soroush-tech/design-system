import type { ReactNode } from 'react'
import type { PaperElevation } from '../Paper/Paper'
import type { CSSObject as EngineCSSObject } from '@umber-style/react'
import { baseTheme as coreBaseTheme } from '@soroush.design/core/theme'
import type {
  ButtonVariants,
  DeepPartial,
  InputVariantKey,
  OpenScale,
  Theme as CoreTheme,
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

// The theme itself - the token scales, `createTheme`, `baseTheme` - is `@soroush.design/core`'s,
// and every platform reads the same one. It is re-exported here, so an app imports it from this
// entry, and augments it from this entry: `declare module '@soroush.design/react/theme' {
// interface ThemePalette { brand: PaletteEntry } }` merges into the core's interface.
export * from '@soroush.design/core/theme'

/** Design-system's own style-object shape - the engine stays an internal implementation detail. */
export type CSSObject = EngineCSSObject

// ---------------------------------------------------------------------------
// What names this platform stays here: `Theme` adds `theme.components` to the core's, and the
// typing of every component's slots, owner state and variants - they name React's components.
// Every component prop union derives via `keyof Theme['scale']`, so keys an app adds to a scale
// propagate to component props automatically.
// ---------------------------------------------------------------------------

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

/** The resolved props Button's styled roots receive - what `ownerState` exposes. */
export interface ButtonOwnerState {
  variant?: keyof ButtonVariants
  color?: keyof ThemePalette
  size?: keyof ThemeSizes
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
    'root' | 'input' | 'content' | 'spinButtons' | 'increment' | 'decrement'
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
  NavGroup?: ComponentConfig<Record<string, unknown>, 'root' | 'label' | 'list'>
  NavLink?: ComponentConfig<Record<string, unknown>, 'root' | 'label' | 'note'>
  NavTree?: ComponentConfig<Record<string, unknown>, 'root'>
  Sidebar?: ComponentConfig<Record<string, unknown>, 'root' | 'rail' | 'panel'>
  SidebarItem?: ComponentConfig<Record<string, unknown>, 'root' | 'pill'>
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
/** The core's theme, with the typing of `theme.components` that names this library's components. */
export interface Theme extends CoreTheme {
  /** Optional per-component customization - see `ThemeComponents`. */
  components?: OpenScale<ThemeComponents>
}

/** Sparse theme patch accepted by `createTheme` and `ThemeProvider`'s `themes` prop. */
export type ThemeOverride = DeepPartial<Theme>

/**
 * The core's base theme, typed as this library's `Theme` - the same object. `createTheme(baseTheme, ...)`
 * then accepts and returns `theme.components` too.
 */
export const baseTheme: Theme = coreBaseTheme
