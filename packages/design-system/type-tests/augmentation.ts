// Type-level test: consumer-style theme augmentation against the PUBLISHED d.ts.
// Runs via `pnpm test:types` (builds dist first, then typechecks this isolated
// program). Guards two things: the `declare module '@soroush.tech/design-system/theme'`
// block survives tsdown's d.ts chunking, and consumer augmentations widen the
// scale unions that component props derive from.
import type {
  ComponentConfig,
  Theme,
  PaletteEntry,
  SizeEntry,
  ThemeOverride,
} from '@soroush.tech/design-system/theme'
import { baseTheme, createTheme } from '@soroush.tech/design-system/theme'
import type { ButtonColor, ButtonVariant } from '@soroush.tech/design-system/Button'
import type { CheckboxSize } from '@soroush.tech/design-system/Checkbox'
import type { GridProps } from '@soroush.tech/design-system/Grid'
import type { ViewBackgroundToken, ViewProps } from '@soroush.tech/design-system/View'

declare module '@soroush.tech/design-system/theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
  interface ThemeBackground {
    tertiary: string
  }
  interface ThemeSizes {
    xl: SizeEntry
  }
  interface Theme {
    elevations: Record<'low' | 'mid' | 'high', string>
  }
  // New Button variant value + a consumer component registered for theme customization.
  interface ButtonVariants {
    dashed: true
  }
  interface ThemeComponents {
    MyWidget?: ComponentConfig<{ mood?: 'calm' | 'loud' }, 'root' | 'handle'>
  }
  // Breakpoints renamed by the app: `ultra` added (createTheme appends it after `xl`), `xs`
  // kept, `xl` removed - and a new layout field.
  interface BreakpointOverrides {
    ultra: true
    xl: false
  }
  interface LayoutContent {
    align?: 'start' | 'center'
  }
}

// Component prop unions widen to the augmented keys...
export const brandColor: ButtonColor = 'brand'
export const xlSize: CheckboxSize = 'xl'
export const tertiaryBg: ViewBackgroundToken = 'tertiary'
export const elevationKey: keyof Theme['elevations'] = 'mid'

// ...while unknown keys still error.
// @ts-expect-error -- 'bogus' is not a palette color
export const bogusColor: ButtonColor = 'bogus'
// @ts-expect-error -- 'xxl' is not a theme size
export const bogusSize: CheckboxSize = 'xxl'

// Registered Button variant values widen the union; unknown values still error.
export const dashedVariant: ButtonVariant = 'dashed'
// @ts-expect-error -- 'wiggly' was never registered in ButtonVariants
export const bogusVariant: ButtonVariant = 'wiggly'

// Sparse overrides accept augmented keys, and createTheme yields the augmented Theme.
export const override: ThemeOverride = {
  palette: { brand: { main: '#00ff88', light: '#66ffb2', dark: '#00b25f', contrastText: '#000' } },
  background: { tertiary: '#101418' },
  // The augmented breakpoint gets a layout entry of its own.
  breakpoints: { ultra: '2560px' },
  layout: { ultra: { content: { columns: 24, align: 'center' } } },
  elevations: { low: '0 1px 2px', mid: '0 2px 6px', high: '0 6px 18px' },
  // theme.defaults accepts augmented keys - components then default to them.
  defaults: { size: 'xl', color: 'brand', bg: 'tertiary' },
  // Per-component customization: built-in and consumer-registered components.
  components: {
    Button: {
      defaultProps: { size: 'xl', variant: 'dashed' },
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderRadius: theme.radii.lg,
          opacity: ownerState.disabled ? 0.4 : 1,
        }),
      },
      variants: [{ props: { variant: 'dashed' }, style: { borderStyle: 'dashed' } }],
    },
    MyWidget: {
      defaultProps: { mood: 'calm' },
      styleOverrides: { handle: { cursor: 'grab' } },
    },
  },
}
export const augmentedTheme: Theme = createTheme(baseTheme, override)

// Responsive values take the theme's breakpoint names and their cq keys - not helper names,
// not removed breakpoints.
export const responsivePadding: ViewProps['p'] = { xs: 1, ultra: 3, cqUltra: 2 }
// @ts-expect-error -- `up` is a helper on the scale, not a breakpoint
export const helperAsBreakpoint: ViewProps['p'] = { up: 2 }
// @ts-expect-error -- `xl` was removed by BreakpointOverrides
export const removedBreakpoint: ViewProps['p'] = { xl: 2 }
// The helpers follow the theme's names.
export const ultraQuery: string = baseTheme.breakpoints.up('ultra')

// Layout entries exist only for declared breakpoints; margins and gutters are space keys.
// @ts-expect-error -- 'huge' is not a breakpoint
export const bogusLayout: ThemeOverride = { layout: { huge: { content: { columns: 2 } } } }
// @ts-expect-error -- a gutter is a theme.space key, not a length
export const bogusGutter: ThemeOverride = { layout: { md: { content: { gutter: '20px' } } } }
// @ts-expect-error -- `xl` was removed, so it has no layout entry
export const removedLayout: ThemeOverride = { layout: { xl: { content: { columns: 16 } } } }

// The `layout` prop mixes fields for every breakpoint with entries for declared breakpoints.
export const mixedLayout: GridProps['layout'] = { margin: 4, ultra: { columns: 24 } }
// @ts-expect-error -- `xl` was removed, so the layout prop has no entry for it
export const removedGridLayout: GridProps['layout'] = { margin: 4, xl: { columns: 16 } }
// @ts-expect-error -- the gutter is the grid's own `gap`, not a `layout` field
export const layoutGutter: GridProps['layout'] = { gutter: 4 }
// ...and `gap` takes the augmented breakpoints like any responsive prop.
export const gridGap: GridProps = { layout: true, gap: { xs: 2, ultra: 6 } }

// On a View, `layout` is the frame alone: margin and max width, no columns.
export const frameLayout: ViewProps['layout'] = { maxWidth: '1280px', ultra: { margin: 4 } }
// @ts-expect-error -- columns belong to Grid, not to a frame
export const frameColumns: ViewProps['layout'] = { columns: 4 }
