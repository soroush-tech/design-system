import { withBreakpointHelpers } from '../breakpoints'
import { alpha } from '../utils/alpha'
import { generateBoxShadow } from '../utils/generateBoxShadow'
import { spacing } from './spacing'
import type {
  Theme,
  ThemeBreakpoints,
  ThemeIconSizes,
  ThemeLayout,
  ThemeSizes,
  ThemeSpace,
  ThemeTypographyVariants,
} from './types'

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
