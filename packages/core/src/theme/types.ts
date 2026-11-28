// ---------------------------------------------------------------------------
// The platform-neutral theme types. The core OWNS `Theme` and every scale interface below:
// each is an open interface, and an app extends it by declaration merging against this
// module - or against the platform library that re-exports it, which reaches the same
// interface:
//
//   declare module '@gild-ui/core/theme' {
//     interface ThemePalette { brand: PaletteEntry }   // new palette color
//     interface ThemeBackground { tertiary: string }   // new background token
//     interface Theme { elevations: Record<string, string> }  // whole new scale
//   }
//
// A platform composes its own `Theme` on top of this one - `interface Theme extends
// CoreTheme { components?: ... }` - and holds what names its framework: the typing of
// `theme.components`, and any field typed by a framework's own types.
// ---------------------------------------------------------------------------

import type { BreakpointHelpers } from '../breakpoints'

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
 *   declare module '@gild-ui/core/theme' {
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
/** The values of the CSS `text-transform` property. */
export type TextTransform =
  | 'none'
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | 'full-width'
  | 'full-size-kana'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'revert-layer'
  | 'unset'
/** Style of one typography variant. */
export interface TypographyVariantStyle {
  /** The tag name the variant renders as - `'h1'`, `'span'`. */
  element: string
  fontSize?: number
  fontWeight?: string
  letterSpacing?: string
  textTransform?: TextTransform
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
  inputVariant?: InputVariantKey
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

/** The frames a form input is drawn in. */
export type InputVariantKey = 'default' | 'outlined' | 'text' | 'underline'

/** Button's variant values - augment to register new ones (then style them via `variants`). */
export interface ButtonVariants {
  contained: true
  outlined: true
  text: true
}

export interface Theme {
  name: string
  /** Optional overrides for component default token/variant keys - see `ThemeDefaults`. */
  defaults?: OpenScale<ThemeDefaults>
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

/** The semantic color keys of `theme.palette`. */
export type PaletteColor = keyof ThemePalette

/** The variant keys of `theme.typography`. */
export type TypographyVariant = keyof ThemeTypographyVariants
