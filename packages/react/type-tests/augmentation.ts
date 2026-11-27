// Type-level test: consumer-style theme augmentation against the PUBLISHED d.ts.
// Runs via `pnpm test:types` (builds dist first, then typechecks this isolated
// program). Guards two things: the `declare module '@gild-ui/core/theme'`
// block survives tsdown's d.ts chunking, and consumer augmentations widen the
// scale unions that component props derive from.
import type { ComponentConfig, LayoutProviderProps, ThemeComponents } from '@gild-ui/react'
import type { Theme, PaletteEntry, SizeEntry, ThemeOverride } from '@gild-ui/core/theme'
import { baseTheme, createTheme } from '@gild-ui/core/theme'
import type { ButtonColor, ButtonVariant } from '@gild-ui/react/Button'
import type { CheckboxSize } from '@gild-ui/react/Checkbox'
import type { GridProps } from '@gild-ui/react/Grid'
import type { ViewBackgroundToken, ViewProps } from '@gild-ui/react/View'

declare module '@gild-ui/core/theme' {
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

declare module '@gild-ui/react' {
  interface ThemeComponents {
    MyWidget?: ComponentConfig<{ mood?: 'calm' | 'loud' }, 'root' | 'handle'>
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
}
export const augmentedTheme: Theme = createTheme(baseTheme, override)

// Per-component customization, built-in and consumer-registered components, checked against the
// generated `ThemeComponents` - its keys are the component names, and `ownerState` is typed.
export const looks = {
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
} satisfies ThemeComponents

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

// A page layout takes the theme's own breakpoint names - augmented ones included - and only
// the layout: there is no theme to replace.
export const pageLayout: LayoutProviderProps['layout'] = {
  ultra: { content: { maxWidth: '2000px' } },
}
// @ts-expect-error -- `xl` was removed, so a page layout has no entry for it
export const removedPageLayout: LayoutProviderProps['layout'] = { xl: { content: { columns: 16 } } }
// @ts-expect-error -- LayoutProvider changes the layout only; it takes no theme
export const pageTheme: LayoutProviderProps = { layout: {}, theme: baseTheme, children: null }

// On a View, `layout` is the frame alone: margin and max width, no columns.
export const frameLayout: ViewProps['layout'] = { maxWidth: '1280px', ultra: { margin: 4 } }
// @ts-expect-error -- columns belong to Grid, not to a frame
export const frameColumns: ViewProps['layout'] = { columns: 4 }
