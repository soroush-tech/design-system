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
columns it has, its margins and gutters, its side panels and the top bar. Everything responsive is
CSS - no component measures the window in JavaScript - so a prerendered page lays out the same
with JavaScript off. The design system ships these as tokens and building blocks (`AppBar`,
`Sidebar`, `Drawer`, `Grid`, `Flex`); each app composes its own pages from them.

### `theme.breakpoints` - window classes

Each key is a range: its value is where the range starts, and it holds until the next key. The
theme writes the start because media queries are min-width. `xs` starts at 0, so it applies
everywhere until `sm` overrides it.

```ts
breakpoints: { xs: '0px', sm: '600px', md: '840px', lg: '1200px', xl: '1600px' }
```

| Key  | Range       | Material 3 window class |
| ---- | ----------- | ----------------------- |
| `xs` | 0-599px     | compact                 |
| `sm` | 600-839px   | medium                  |
| `md` | 840-1199px  | expanded                |
| `lg` | 1200-1599px | large                   |
| `xl` | 1600px+     | extra-large             |

They are window classes, not devices: a class is about the space the window has. Responsive props
use them by name - each key from its size up - or by position:

```tsx
<View display={{ xs: 'none', md: 'block' }} />
<View p={[2, 3, 4]} />                         // xs, sm, md
<View p={{ xs: 2, cqSm: 4 }} />                // cq keys: container queries on the same sizes
```

For hand-written styles, `theme.breakpoints` carries the query helpers (also exported for
`baseTheme` as `up`, `down`, `only`, `between`, `not` and `containerQueries`):

```ts
const Panel = styled.div(({ theme }) => ({
  padding: 16,
  [theme.breakpoints.down('sm')]: { padding: 8 }, // @media (width < 600px)
  [theme.breakpoints.only('md')]: { padding: 24 }, // @media (840px <= width < 1200px)
}))
```

Every form, the container queries, the units and the order blocks are written in are covered in
the styled-system [Breakpoints](https://docs.soroush.tech/styled-system/docs/breakpoints/) guide.

### `theme.layout` - layout tokens per window class

`xs` is complete; each later class lists only what changes and is merged over the ones before it.
With `baseTheme`:

| Class | Columns | Margin / gutter | Content    | Start panel | End panel   | Top bar |
| ----- | ------- | --------------- | ---------- | ----------- | ----------- | ------- |
| `xs`  | 4       | 16 / 16         | fluid      | hidden      | hidden      | 64      |
| `sm`  | 8       | 32 / 16         | fluid      | rail 72     | hidden      | 64      |
| `md`  | 12      | 24 / 24         | fluid      | rail 72     | overlay 360 | 64      |
| `lg`  | 12      | 24 / 24         | fixed 1200 | rail 72     | overlay 412 | 64      |
| `xl`  | 12      | 24 / 24         | fixed 1600 | inline 280  | inline 412  | 64      |

- **Units** - `margin` and `gutter` are `theme.space` keys, so they move with the spacing scale.
  Bar heights, panel widths and `maxWidth` take a space key or any CSS length.
- **Columns** - 1 to 16. 12 is the default from `md` up.
- **Panels** - `start` and `end` follow the writing direction (they swap in RTL). `mode` is
  `inline` (beside the content at `width`), `collapsed` (a rail at `railWidth`), `overlay` (over
  the content at `width`) or `hidden`. A panel first declared at a later class needs its `mode`,
  `width` and `railWidth` there.
- **Bars** - `top` (and an optional `bottom`) heights; `0` removes an inherited bar.

These are tokens: the app places its own `AppBar`, `Sidebar` and `Drawer` with them, and the
design studio draws them on its frames.

### The `layout` prop - the page frame on a View, the layout grid on a Grid or Flex

`layout` turns the content tokens into CSS per window class. On any `View`-based component it is
the **frame** - the margin and the max width - and the element stays a normal block. `Grid` and
`Flex` add their **columns** on top of that frame:

```tsx
<View layout>...</View>                                // the theme's frame, no columns
<Grid layout>...</Grid>                                // the frame and the theme's columns
<Grid layout={{ lg: { columns: 16, gutter: 2 } }}>...</Grid> // its own at lg only
<Grid layout={{ gutter: 8 }}>...</Grid>                // its own gutter at every class
<Grid layout={{ gutter: 8, lg: { columns: 16 } }}>...</Grid> // both: gutter 8, 16 columns at lg
```

- **The frame** (`View`, and under `Grid`/`Flex`) - the margin as `padding-inline`; in fixed mode
  a `max-width` centred with computed inline margins, so a frame that is itself a grid or flex
  item still stretches to its parent.
- **Grid** - `grid-template-columns: repeat(N, minmax(0, 1fr))` and the gutter as `column-gap`.
- **Flex** - a wrapping row with the same gutter.
- **Both** set `--layout-columns` and `--layout-gutter` for each class.
- **Children take `span`** - how many columns an element takes, on any `View`-based component:
  `span={6}`, per class `span={{ xs: 4, md: 6 }}`, or `span="full"` for the whole row whatever
  the column count. In a Grid it is `grid-column`; in a Flex it is a width of N columns and the
  gutters between them, read from the variables above. Outside a layout grid a number does
  nothing; `"full"` fills any grid.
- A field in the value (`gutter: 8`) replaces the theme's at every class; whatever it does not
  set still follows the theme. An entry under a class name replaces the theme's grid at that
  class only, on top of the fields; the next class is back to the theme and the fields.
- **The layout owns what it writes** - column tracks, column spacing, inline padding and max
  width. An explicit `gridTemplateColumns`, `gap`, `columnGap` or padding prop on the same element
  does not override them from the second class up. Rows take `rowGap`.

### Layout: one way per intent

Generated code, agents and people write each layout intent one way:

| Intent                                           | Write                                                                | Not                                                       |
| ------------------------------------------------ | -------------------------------------------------------------------- | --------------------------------------------------------- |
| Content on the page frame, no columns            | `<View layout>`                                                      | `maxWidth` + `mx="auto"` + `px`, a custom frame component |
| A section on the theme's columns                 | `<Grid layout>` / `<Flex layout>`                                    | hand-written tracks on a page section                     |
| A section's own values                           | `layout={{ gutter: 8 }}`, `layout={{ md: { columns: 6 } }}`, or both | helpers that repeat a value per class                     |
| A child taking N columns                         | `span={6}` / `span={{ xs: 4, md: 6 }}`                               | `gridColumn="span 6"`                                     |
| A child taking the whole row                     | `span="full"`                                                        | `grid-column: 1 / -1`, `style`, column-count objects      |
| Space between rows                               | `rowGap`                                                             | `gap` on a layout container                               |
| A grid with tracks of its own (`auto-fill`, ...) | a plain `Grid` without `layout`, inside a frame                      | `layout` plus `gridTemplateColumns`                       |

The same page without the prop needs every value written out - and stops following the theme:

```tsx
<Grid
  gridTemplateColumns={{
    xs: 'repeat(4, minmax(0, 1fr))',
    sm: 'repeat(8, minmax(0, 1fr))',
    md: 'repeat(12, minmax(0, 1fr))',
  }}
  columnGap={{ xs: 2, md: 3 }}
  px={{ xs: 2, sm: 4, md: 3 }}
>
  ...
</Grid>
```

### Your own breakpoints and layout

Override values with `createTheme`, like any scale:

```ts
const theme = createTheme(baseTheme, {
  breakpoints: { md: '900px' },
  layout: { lg: { content: { maxWidth: '1280px' } } },
})
```

The helpers on `theme.breakpoints` are rebuilt from the merged sizes. `createTheme` merges, so
it can change values and add a larger breakpoint after the existing ones, but not remove or rename
one. To use your own names, declare them by augmenting `BreakpointOverrides` (`true` adds a name,
`false` removes a default) and replace the scale and the layout on the base:

```ts
declare module '@soroush.tech/design-system/theme' {
  interface BreakpointOverrides {
    mobile: true
    tablet: true
    web: true
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
  }
}

const theme = createTheme(
  {
    ...baseTheme,
    breakpoints: withBreakpointHelpers({ mobile: '0px', tablet: '768px', web: '1280px' }),
    layout: { mobile: { ...a complete entry... }, tablet: { ... }, web: { ... } },
  },
  {}
)
```

Responsive props, `cq` keys (`cqTablet`), the helpers and the `layout` keys all follow the new
names.

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
