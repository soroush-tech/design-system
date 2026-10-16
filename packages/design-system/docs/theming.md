# Theming

The theme belongs to you - the package ships defaults, every part is replaceable, and the type system widens with your extensions. This guide covers the full ladder, from using the built-ins to owning every token.

## The ladder

1. **Use the default** - `<ThemeProvider>` with no props renders the built-in `baseTheme` (dark-schemed).
2. **Override values** - build your theme with `createTheme(base, overrides)` and pass it via `theme`.
3. **Repoint component defaults** - `theme.defaults` / the provider's `defaults` prop change what components fall back to.
4. **Extend the type system** - declaration merging adds palette colors, scale keys, and whole scales.
5. **Customize single components** - `theme.components` (see [customization.md](./customization.md)).

---

## One theme, yours

`ThemeProvider` provides exactly one theme. The package ships a single complete default - `baseTheme` - and you derive every mode from it; switching (dark/light, or ten brand modes) is your state:

```tsx
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import { baseTheme, createTheme } from '@soroush.tech/design-system/theme'

const dark = createTheme(baseTheme, { name: 'dark' /* your palettes */ })
const light = createTheme(baseTheme, { name: 'light', colorScheme: 'light' /* your palettes */ })

const [isDark, setIsDark] = useState(true)
<ThemeProvider theme={isDark ? dark : light}>{app}</ThemeProvider>
```

## Building themes with `createTheme`

`createTheme(base, overrides)` deep-merges sparse patches onto a base theme:

```ts
import { baseTheme, createTheme } from '@soroush.tech/design-system/theme'

export const brandDark = createTheme(baseTheme, {
  palette: { primary: { main: '#00ff88' } }, // sibling fields (light/dark/contrastText) survive
  radii: { md: '10px' },
  shadows: ['none'], // arrays replace wholesale, never merge
})
```

Merge rules: plain objects recurse; arrays (`shadows`, `fontSizes`) and functions replace wholesale; `undefined` values are ignored - keys are added or replaced, never removed. Neither argument is mutated.

## Component defaults (`theme.defaults`)

Components carry visible literal fallbacks (`size = 'md'`, `variant = 'outside'`, ...) resolved through `themeDefault(theme, key, fallback)`. The optional `theme.defaults` map overrides any of them globally - essential when your theme uses entirely different size or palette keys:

```tsx
<ThemeProvider defaults={{ size: 'compact', color: 'brand', switchVariant: 'inside' }}>
```

The full key table lives in the [README's Theming section](../README.md#component-defaults). The built-in `baseTheme` carries no `defaults` - the literals apply until you say otherwise. For _per-component_ defaults (only Buttons compact), use `theme.components.X.defaultProps` instead ([customization.md](./customization.md)).

## Extending the type system

Every scale is an open interface owned by `@soroush.tech/design-system/theme` - that module (not Emotion, an internal implementation detail) is the augmentation surface, and it merges reliably across tsdown's chunked d.ts for every consumer:

```ts
import type { PaletteEntry, SizeEntry } from '@soroush.tech/design-system/theme'

declare module '@soroush.tech/design-system/theme' {
  interface ThemePalette {
    brand: PaletteEntry // new palette color
  }
  interface ThemeBackground {
    tertiary: string // new background token
  }
  interface ThemeSizes {
    xl: SizeEntry // new size step
  }
  interface Theme {
    elevations: Record<'low' | 'mid' | 'high', string> // whole new scale
  }
}
```

Component prop unions derive via `keyof Theme['scale']`, so `color="brand"`, `bg="tertiary"`, and `size="xl"` typecheck everywhere automatically. Then supply the values:

```ts
const brand = createTheme(baseTheme, {
  palette: { brand: { main: '#00ff88', light: '#66ffb2', dark: '#00b25f', contrastText: '#000' } },
  background: { tertiary: '#101418' },
  sizes: { xl: { paddingTop: 2, paddingBottom: 2, paddingLeft: 4, paddingRight: 4, fontSize: 2 } },
  elevations: { low: '0 1px 2px', mid: '0 2px 6px', high: '0 6px 18px' },
  defaults: { size: 'xl' }, // components may default to augmented keys
})
```

Two rules: new object-valued keys (like a `PaletteEntry`) must be supplied complete - components read `.main`/`.contrastText` at runtime; and TypeScript cannot verify at runtime that an augmented token was supplied - **always pair an augmentation with the matching override**.

## Breakpoints and layout

`theme.breakpoints` and `theme.layout` hold the page's layout system: where it changes, how many
columns it has, its margins and gutters, its side panels and bars. The app lays out from them,
and a design tool reading the theme draws the same guides.

### `theme.breakpoints`

Named breakpoints - window widths, ascending, in declared order. `baseTheme` has:

```ts
breakpoints: { tablet: '600px', web: '1200px', wide: '1600px' }
```

A value is any CSS length (a min-width), a media condition such as `(600px <= width < 1200px)`,
or a full `@media` rule. `baseTheme` uses px, like the layout sizes the breakpoints switch. `em`
works too: in a media query it is relative to the browser's default font size, not the page's, so
`75em` is 1200px until the user raises that size - and then the layout switches earlier. Every value form
and the units are covered in the styled-system
[Breakpoints](https://docs.soroush.tech/styled-system/docs/breakpoints/) guide.

Responsive props use them by name or by position:

```tsx
<View display={{ _: 'none', web: 'block' }} />   // `_` is below the first breakpoint
<View p={[2, 3, 4]} />                           // base, tablet, web
```

### `theme.layout`

`layout.base` is the complete layout below the first breakpoint. Each breakpoint's entry lists
only what changes, and is merged over the ones before it (mobile-first, like min-width queries):

```ts
layout: {
  base: {
    bars: { bottom: 8 },
    panels: { start: { mode: 'hidden', width: '280px', railWidth: 9 } },
    content: { columns: 4, margin: 2, gutter: 2, mode: 'fluid' },
  },
  tablet: { panels: { start: { mode: 'collapsed' } }, content: { columns: 8, margin: 4 } },
  web: {
    bars: { top: 8, bottom: 0 },
    panels: { start: { mode: 'inline' } },
    content: { columns: 12, margin: 3, gutter: 3, mode: 'fixed', maxWidth: '1200px' },
  },
  wide: { content: { columns: 16, maxWidth: '1600px' } },
}
```

- **Units** - `margin` and `gutter` are `theme.space` keys, so they move with the spacing scale.
  Bar heights, panel widths and `maxWidth` take a space key or any CSS length: a 280px panel is a
  size, not a spacing step.
- **Bars** - `top` and `bottom` heights. `0` removes a bar a smaller breakpoint set.
- **Panels** - `start` and `end`, which follow the writing direction (they swap in RTL). `mode` is
  `inline` (a track of `width`; the content gets what is left), `collapsed` (a track of
  `railWidth`), `overlay` (over the content at `width`; the columns don't change) or `hidden`.
- **Content** - `columns` measured in the space the bars and inline panels leave. `fluid` spans
  it with `margin` as inline padding; `fixed` is the same inside a container centred at
  `maxWidth`.

[`PageLayout`](https://docs.soroush.tech/design-system/components/page-layout/) lays a page out from these entries and
`LayoutGrid` puts content on the columns, both in CSS alone.

### Your own breakpoints and layout

Override them with `createTheme`, like any scale:

```ts
const theme = createTheme(baseTheme, {
  breakpoints: { web: '64em' },
  layout: { web: { content: { maxWidth: '1024px' } } },
})
```

`createTheme` merges, so an overridden breakpoint keeps its place, and a breakpoint you add
(declared by augmenting `ThemeBreakpoints`) comes after the existing ones. An added breakpoint
must therefore be larger than `wide`. Its layout key exists as soon as the breakpoint does.

## The scale interfaces

| Scale           | Key in Theme           | Interface                 |
| --------------- | ---------------------- | ------------------------- |
| Palette         | `theme.palette`        | `ThemePalette`            |
| Text colors     | `theme.text`           | `ThemeText`               |
| Backgrounds     | `theme.background`     | `ThemeBackground`         |
| Borders         | `theme.border`         | `ThemeBorder`             |
| Space           | `theme.space`          | `ThemeSpace`              |
| Breakpoints     | `theme.breakpoints`    | `ThemeBreakpoints`        |
| Layout          | `theme.layout`         | `ThemeLayout`             |
| Sizes           | `theme.sizes`          | `ThemeSizes`              |
| Radii           | `theme.radii`          | `ThemeRadii`              |
| Border widths   | `theme.borderWidths`   | `ThemeBorderWidths`       |
| Fonts           | `theme.fonts`          | `ThemeFonts`              |
| Font weights    | `theme.fontWeights`    | `ThemeFontWeights`        |
| Line heights    | `theme.lineHeights`    | `ThemeLineHeights`        |
| Letter spacings | `theme.letterSpacings` | `ThemeLetterSpacings`     |
| Typography      | `theme.typography`     | `ThemeTypographyVariants` |
| Avatar sizes    | `theme.avatar`         | `ThemeAvatarSizes`        |
| Icon sizes      | `theme.icon`           | `ThemeIconSizes`          |
| Switch tokens   | `theme.switch`         | `ThemeSwitch`             |
| Shadow tokens   | `theme.shadow`         | `ThemeShadow`             |
| Defaults        | `theme.defaults`       | `ThemeDefaults`           |
| Components      | `theme.components`     | `ThemeComponents`         |

The contract is verified against the real published d.ts by `type-tests/augmentation.ts` (`pnpm test:types`), so it can't silently break in a release.
