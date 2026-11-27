# @gild-ui/react

[![npm version](https://img.shields.io/npm/v/@gild-ui/react.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@gild-ui/react)
[![npm downloads](https://img.shields.io/npm/dm/@gild-ui/react.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@gild-ui/react)
[![coverage](https://codecov.io/gh/soroush-tech/design-system/branch/main/graph/badge.svg?flag=react)](https://app.codecov.io/gh/soroush-tech/design-system?flags%5B0%5D=react)
[![unpacked size](https://img.shields.io/npm/unpacked-size/@gild-ui/react.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@gild-ui/react)
[![types included](https://img.shields.io/npm/types/@gild-ui/react.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@gild-ui/react)
[![license](https://img.shields.io/npm/l/@gild-ui/react.svg?cacheSeconds=86400)](./LICENSE)

**Your design system. Your tokens. Your rules.**
A fully typed React component library where nothing is hardcoded - every color, scale, and default belongs to you, not the package.

Tired of forking a component library just to change a color? Every token here is designed to be overridden - theming isn't an afterthought, it's the whole point.

## Install

```sh
npm i @gild-ui/react @gild-ui/core
```

`@gild-ui/core` holds the theme your app writes (`createTheme`, `defineThemes`), imported as `@gild-ui/core/theme`. `react` and `react-dom` are peer dependencies, and React 19.2 or later is required. The styling engine (UmberStyle, the `@umber-style/*` packages) is an internal implementation detail - it ships as a regular dependency, not a peer, so you never install it yourself.

---

## Use it with AI tools

Two skills teach a coding agent how to build with this library: a house-style skill, and a
WCAG 2.2 AA skill for contrast, labels, landmarks and accessibility tests. Both install for
whichever agents you use:

```sh
npx skills add soroush-tech/design-system
```

An MCP server serves this library's component inventory, every component's props
reference, and the live token contract, so an AI assistant writes against the real API
instead of guessing. Add the hosted server, `https://mcp.soroush.design/mcp`, to any MCP
client; in Claude Code:

```sh
claude mcp add --transport http soroush https://mcp.soroush.design/mcp
```

It also runs locally over stdio (`npx -y @soroush.design/mcp`). Claude Code users can
install the plugin instead, which brings the skills, the server and a UI review agent in
one step:

```sh
claude plugin marketplace add soroush-tech/design-system
claude plugin install soroush-design-system@soroush-tech
```

Any other tool can read [gild-ui.soroush.design/llms.txt](https://gild-ui.soroush.design/llms.txt).
See [`@soroush.design/mcp`](../mcp) for the full tool list.

---

## Importing

Import components by subpath, the styling system from the root:

```ts
import { Typography } from '@gild-ui/react/Typography'
import { Flex } from '@gild-ui/react/Flex'
```

The styling system comes from the root `@gild-ui/react` - `ThemeProvider`, `LayoutProvider`, `useTheme`, `useDefaultProps`, `useMediaQuery`, `withTheme`, `styled`, `css`, `keyframes`, `Global`, `StyleSheet`, `useStyle`, `withStyles` and `StylesConsumer` - and each name is also an entry point of its own (`@gild-ui/react/useTheme`). The style-prop functions (`space`, `system`, ...) are `@soroush.tech/styled-system`'s, and the theme (`baseTheme`, `createTheme`, the `Theme` type) is `@gild-ui/core/theme`'s: this package re-exports neither.

```ts
import { styled, css } from '@gild-ui/react'
import { type Theme } from '@gild-ui/core/theme'
```

`ThemeProvider` and the theme-value hooks (`useTheme`, `useDefaultProps`, `withTheme`):

```ts
import { ThemeProvider, useTheme } from '@gild-ui/react'
```

Overriding a component: its `style` prop takes entries of `StyleSheet.create` only, and `slotProps` takes a `style`, a `className` and `data-*` and `aria-*` attributes for each slot a theme can style. A sheet that reads the theme is resolved with `useStyle`:

```ts
import { StyleSheet, useStyle } from '@gild-ui/react'
```

`withStyles` and `StylesConsumer` resolve a `StyleInput`/`StyleFactory` into a `CSSObject`. See [Styling and overriding](./docs/style.md).

`Global` is on the root. The raw engine primitives for building your own global styles - `globalStyles`, and the SSR-only `CacheProvider`/`styleCache` pairing - live at `/engine`:

```ts
import { Global } from '@gild-ui/react'
import { globalStyles, CacheProvider, styleCache } from '@gild-ui/react/engine'
```

`Global` (retyped against this package's `Theme`) applies app-wide CSS and should render inside `ThemeProvider` so it resolves against the active theme. `globalStyles(theme)` is the base reset this package owns - box-sizing, margin/table resets, and theme-driven body colors - compose it into your own `Global` styles array alongside your app's own concerns (font-family, webfont loading, and anything else app-specific stay entirely app policy).

The component catalog - every component as data, for tools that place and write components (a
design tool's palette, a source writer) - lives at its own subpath and loads in plain Node
([docs](./docs/catalog.md)):

```ts
import { catalog } from '@gild-ui/react/catalog'
```

Server rendering with critical CSS (a Vike or other static or server renderer) is a separate, opt-in concern - that's what `CacheProvider` and its paired `styleCache` instance are for. Give `CacheProvider` the `styleCache` (the cache the library's own engine writes to, so there is one cache on the page), render, then read the CSS of the page from the same cache with `styleServer` from `@gild-ui/react/server`: `extractCriticalToChunks(html)` and `constructStyleTagsFromChunks(chunks)` give the `<style data-umber>` tags to put in the head ([docs](./docs/server.md)). Next.js App Router apps collect the styles with `StyleRegistry` from `@gild-ui/react/next` instead, which also works under a strict nonce policy ([docs](./docs/next.md), and `docs/consumer/setup.md`).

The cache key and class prefix is `soroush`. Server-rendered style elements carry `data-umber="soroush ..."`, and the live element in the browser is `<style data-style="soroush">`.

The engine packages are regular dependencies of this package, not peers, on purpose: an app installs nothing extra to render the components, and has no version to keep in step. An app never imports an engine package: what it needs of the engine is exported from this package (`StyleSheet`, `setNonceSource`, `styleCache`, `styleServer`, `StyleRegistry`).

---

## Component inventory

### Layout & surfaces

| Component    | Purpose                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `ScrollArea` | A scrolling area with scrollbars drawn over its content, shown on hover |
| `View`       | Styled `div` primitive - the base building block                        |
| `Flex`       | `View` with flexbox defaults                                            |
| `Grid`       | CSS grid container                                                      |
| `Paper`      | Elevated surface with background and shadow                             |
| `Card`       | Content container built on `Paper`                                      |
| `Quote`      | Bordered quote / terminal-panel surface on `View`                       |
| `AppBar`     | Top application bar                                                     |
| `Drawer`     | Slide-in side panel                                                     |

### Content & data display

| Component    | Purpose                                                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Typography` | Text with variant → element mapping - the reference implementation for all components                                                                                                                                           |
| `Link`       | Anchor with theme-aware styling                                                                                                                                                                                                 |
| `Icon`       | Icon renderer                                                                                                                                                                                                                   |
| `Image`      | Image with styled-system props                                                                                                                                                                                                  |
| `Avatar`     | User/entity avatar                                                                                                                                                                                                              |
| `Table`      | Compound data table - exports `TableContainer`, `TableHead`, `TableBody`, `TableFooter`, `TableRow`, `TableCell`, `TablePagination`, `TablePaginationActions`, `TableSortLabel`, and `TableControl` from `@gild-ui/react/Table` |
| `Accordion`  | A heading that opens and closes a region - exports `AccordionSummary`, `AccordionDetails`, `AccordionActions` and `AccordionGroup` from `@gild-ui/react/Accordion`                                                              |

### Inputs & forms

| Component                                            | Purpose                                                                                   |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `Autocomplete`                                       | A field whose text finds an option in a list - one, several as chips, or free text        |
| `Fab`                                                | A floating action button: the one main action of a page, circular or extended             |
| `Button`, `ButtonGroup`, `ToggleButton`              | Actions and toggles                                                                       |
| `TextInput`                                          | Text field                                                                                |
| `Checkbox`, `Radio`, `Switch`                        | Selection controls                                                                        |
| `RangeInput`                                         | A slider - one value on a range, or two or more thumbs for a range of values              |
| `TransferList`                                       | Two lists and the buttons that move the checked items from one to the other               |
| `NumberInput`                                        | A field for a number - read in its locale, clamped to a range, stepped by keys or buttons |
| `Rating`                                             | A row of icons the user sets as a rating, or a read-only display of one                   |
| `NativeSelect`                                       | Low-level platform `<select>` - not recommended; use `Select native`                      |
| `Select`                                             | The select to use - custom listbox, or `native` for the platform picker                   |
| `MenuItem`                                           | Option row for `Select`'s listbox, and a menu row in a `MenuList`                         |
| `Form`, `FormControl`, `FormLabel`, `FormHelperText` | Form composition and labeling                                                             |
| `Pagination`                                         | Page navigation control                                                                   |

### Navigation & menus

| Component     | Purpose                                                                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NavTree`     | A tree of links to the pages of a site - groups of links, which can fold                                                                                                                                                                                           |
| `Breadcrumbs` | The trail of links from a site's root to the current page - a long one collapses behind a button that shows it all                                                                                                                                                 |
| `Menu`        | A trigger and the list of commands it opens - exports `MenuList` (the `role="menu"` list that owns the keyboard), `MenuDivider`, `MenuItems` (rows from data) and `ContextMenu` (the same list, opened at the pointer by a right-click) from `@gild-ui/react/Menu` |
| `Tabs`        | A row of tabs - exports `Tab`, `TabContext` (holds the value for a `TabList` and its panels), `TabList` (the `Tabs` of a `TabContext`), `TabPanel` (the content a tab shows) and `TabScrollButton` from `@gild-ui/react/Tabs`                                      |

### Feedback

| Component                            | Purpose                                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `FabMenu`                            | A fab that opens a stack of actions from the corner of a page                                                        |
| `Snackbar`                           | A transient message in a corner of the window, with auto-hide and an action                                          |
| `Alert`                              | An inline message with a severity, an icon, a title and an action - exports `AlertTitle` from `@gild-ui/react/Alert` |
| `Badge`                              | A count or a dot anchored over another element                                                                       |
| `Chip`                               | A compact tag: a label, an icon or avatar, a click and a delete                                                      |
| `CircularProgress`, `LinearProgress` | Determinate/indeterminate progress indicators                                                                        |
| `Skeleton`                           | Loading placeholder with pulse/wave animations                                                                       |
| `Backdrop`                           | Dimmed overlay behind modal surfaces                                                                                 |

### Transitions

| Component                       | Purpose                                                            |
| ------------------------------- | ------------------------------------------------------------------ |
| `Collapse`                      | Opens and closes its content by its height, or its width           |
| `Fade`, `Grow`, `Slide`, `Zoom` | Show and hide one child by opacity, scale, an edge or from nothing |

### Overlay & behavior primitives

| Component       | Purpose                                                                             |
| --------------- | ----------------------------------------------------------------------------------- |
| `Tooltip`       | A short description of one element, shown on hover, keyboard focus and a long touch |
| `Portal`        | Renders children into a DOM node outside the parent hierarchy                       |
| `FocusTrap`     | Keeps focus inside a subtree                                                        |
| `Modal`         | Dialog primitive composing `Portal`, `Backdrop`, and `FocusTrap`                    |
| `Popover`       | Anchored floating surface built on `Modal`                                          |
| `ThemeProvider` | Supplies the theme and global styles to the app                                     |

---

## Theme tokens

Components never hardcode colors or sizes - props resolve against scales on the `Theme` object:

| Group              | Scales                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| Color              | `palette` (main/light/dark/contrastText per color) · `text` · `background` · `border` · `colorScheme`         |
| Typography         | `typography` (variant map) · `fonts` · `fontSizes` · `fontWeights` · `lineHeights` · `letterSpacings`         |
| Space & shape      | `space` · `sizes` · `radii` · `borderWidths` · `shadows`                                                      |
| Layout             | `breakpoints` (xs/sm/md/lg/xl window classes) · `layout` (columns, margins, panels, top bar per class)        |
| Component scales   | `avatar` (size steps) · `skeleton` (wave highlight)                                                           |
| Layering & effects | `zOrder` (appBar/drawer/modal/snackbar/tooltip) · `blur` · `logoFilter` · `portraitBlend` · `portraitOpacity` |

Prop types are derived from the interface (`keyof Theme['text']`), so adding a token to `themes.ts` propagates everywhere automatically. See [`design-system.md`](./design-system.md) for the full scale table and the palette rules.

---

## Theming

The theme belongs to you - the package only ships defaults. This section is the overview; the full guides are [`docs/theming.md`](./docs/theming.md) and [`docs/customization.md`](./docs/customization.md).

### One theme, yours

`ThemeProvider` provides exactly one theme - the built-in dark theme when you pass nothing. Bring one theme, or as many as you like: switching between them is your state, not the provider's.

```tsx
import { ThemeProvider } from '@gild-ui/react'
import { registerBaseTheme } from '@gild-ui/react/ThemeProvider'
import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'

// Your themes - written from scratch or extended from the base, gathered by `defineThemes`.
export const themes = defineThemes(
  {
    light: createTheme(baseTheme, { name: 'light', colorScheme: 'light' }),
    dark: createTheme(baseTheme, { palette: { primary: { main: '#00ff88' } } }),
  },
  {}
)

// The theme the app starts in, for server components, which have no provider above them.
registerBaseTheme(themes.dark)

// Mode switching is app policy - own the state and pass the active theme:
const [isDark, setIsDark] = useState(true)
<ThemeProvider theme={isDark ? themes.dark : themes.light}>{app}</ThemeProvider>
```

With no theme, `ThemeProvider` provides the built-in dark theme. Themes are not annotated with `Theme`: their own type is what the registration (below) hands to every component.

`createTheme(base, overrides)` (exported from `@gild-ui/core/theme`) is the merge primitive: plain objects recurse, arrays (`shadows`, `fontSizes`) and functions replace wholesale, `undefined` values are ignored - keys are added or replaced, never removed.

### Breakpoints and layout

`theme.breakpoints` are Material 3's window classes, each a range from its start until the next:
`xs` 0-599px (compact, the base), `sm` 600-839 (medium), `md` 840-1199 (expanded), `lg`
1200-1599 (large), `xl` 1600+ (extra-large). Responsive props use them by name or position -
`p={{ xs: 2, md: 4 }}`, `p={[2, 3, 4]}` - and `cqSm`-style keys write container queries;
`theme.breakpoints.up('md')` and its siblings write queries for hand-written styles. Everything is
CSS, so pages work with JavaScript off. `theme.layout` holds the layout tokens per class (columns,
margins, gutters, side panels, top bar); `Grid` and `Flex` apply the column grid with
`layout` / `layout={{ lg: { columns: 16 } }}`, and apps place `AppBar`, `Sidebar` and `Drawer`
themselves. The full guide is the
[Breakpoints and layout](./docs/theming.md#breakpoints-and-layout) section of the theming guide.

### Component defaults

Components carry visible literal fallbacks (`size = 'md'`, `variant = 'outside'`, ...) resolved through `themeDefault(theme, key, fallback)` - so every default, including behavioral variants, is overridable via the optional `theme.defaults` map or the provider's `defaults` prop:

| Key                                          | Fallback                           | Drives                                 |
| -------------------------------------------- | ---------------------------------- | -------------------------------------- |
| `size` / `compactSize`                       | `'md'` / `'sm'`                    | sized components / dense table actions |
| `color` / `neutralColor`                     | `'primary'` / `'default'`          | accent controls / toggle controls      |
| `textColor` / `accentTextColor`              | `'initial'` / `'primary'`          | body text / icons + input labels       |
| `bg` / `surfaceBg` / `inputBg`               | `'default'`/`'paper'`/`'terminal'` | switch track / paper surfaces / inputs |
| `borderRadius` / `surfaceRadius`             | `'md'` / `'sq'`                    | grouped controls / surfaces            |
| `avatarSize` / `borderColor` / `borderWidth` | `'md'` / `'primary'` / `'thin'`    | avatars and rings                      |
| `iconSize`                                   | `'lg'`                             | Icon default glyph size (`theme.icon`) |
| `inputMinWidth`                              | `'12rem'`                          | least width of an input not full width |
| `buttonVariant` / `switchVariant`            | `'contained'` / `'outside'`        | Button / Switch visual variants        |
| `inputVariant`                               | `'default'`                        | TextInput, Select, NativeSelect frames |
| `avatarVariant` / `cardVariant`              | `'circular'` / `'paper'`           | Avatar shape / Card treatment          |
| `linkUnderline`                              | `'always'`                         | Link underline behavior                |
| `paginationVariant` / `paginationShape`      | `'text'` / `'circular'`            | Pagination items                       |

The built-in themes carry no `defaults` - the literals apply. A theme with entirely different size or palette keys stays valid by pointing the keys at its own tokens:

```tsx
<ThemeProvider defaults={{ size: 'compact', color: 'brand', switchVariant: 'inside' }}>
```

Two `defaults` objects with the same contents give the same theme, so an inline literal costs nothing per render: the provider derives one theme for each theme and `defaults` contents, and the engine declares its tokens once.

### Per-component customization (`theme.components`)

Customize one component for the whole app - default prop values, per-slot CSS, and new variant values - without wrapping or forking:

```tsx
import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'
import type { ThemeComponents } from '@gild-ui/react'

const brand = createTheme(baseTheme, { name: 'brand' })

// The components are set once for all your themes, and checked with `satisfies ThemeComponents`.
export const themes = defineThemes({ brand }, {
  Button: {
    // Buttons default to sm + rounded; explicit props and ButtonGroup still win.
    defaultProps: { size: 'sm', shape: 'rounded' },

    // Per-slot CSS merged after Button's own styles - the theme wins the cascade,
    // but per-instance props (m, p, width, ...) still beat the theme.
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        letterSpacing: theme.letterSpacings.wide,
        ...(ownerState.variant === 'contained' && { textTransform: 'none' }),
      }),
      label: { fontStyle: 'italic' },
    },

    // A new variant value - register the themes (below) and `variant="dashed"` typechecks:
    variants: [
      {
        props: { variant: 'dashed' },
        style: ({ theme }) => ({
          backgroundColor: 'transparent',
          border: `${theme.borderWidths.thin} dashed ${theme.border.primary}`,
        }),
      },
    ],
  },
} satisfies ThemeComponents)

declare module '@gild-ui/core/theme' {
  interface Register {
    themes: typeof themes
  }
}
```

Style callbacks receive `{ theme, ownerState }`, where `ownerState` is the styled root's **resolved** props (after group context, `defaultProps`, and `theme.defaults`). `defaultProps` sits in the standard precedence chain: explicit prop → group context → `defaultProps` → `theme.defaults.*` → the component's literal fallback.

Your own components can join the same mechanism: create their roots with this package's `styled(tag, { name: 'MyWidget', slot: 'root' })` and register the name by augmenting `ThemeComponents`. Zero-config themes pay nothing - the resolver bails out on the first check when `theme.components` is absent.

### Extending tokens (declaration merging)

Every scale is an open interface declared on `@gild-ui/core/theme`, so you can add palette colors, tokens, or whole scales - and every component prop union (`color`, `bg`, `size`, ...) widens automatically:

```ts
import type { PaletteEntry } from '@gild-ui/core/theme'

declare module '@gild-ui/core/theme' {
  interface ThemePalette {
    brand: PaletteEntry // new palette color
  }
  interface ThemeBackground {
    tertiary: string // new background token
  }
  interface Theme {
    elevations: Record<'low' | 'mid' | 'high', string> // whole new scale
  }
}
```

Then supply the values with `createTheme` and use the new keys:

```tsx
const brandDark = createTheme(baseTheme, {
  palette: { brand: { main: '#00ff88', light: '#66ffb2', dark: '#00b25f', contrastText: '#000' } },
  background: { tertiary: '#101418' },
  elevations: { low: '0 1px 2px', mid: '0 2px 6px', high: '0 6px 18px' },
})

<ThemeProvider theme={brandDark}>
  <Button color="brand" />
  <View bg="tertiary" />
</ThemeProvider>
```

Notes: new object-valued keys (like a `PaletteEntry`) must be supplied complete - components read `.main`/`.contrastText` at runtime; and TypeScript cannot verify at runtime that an augmented token was actually supplied, so always pair an augmentation with the matching override.

---

## Adding a component

Scaffold with the skill - it reads the live `Typography` files and `design-system.md` so output matches the codebase:

```
/new_theme_component ComponentName
```

Then work through the checklist at the bottom of [`design-system.md`](./design-system.md).

---

The library takes inspiration from [Material UI](https://mui.com/) - its component vocabulary and prop conventions will feel familiar - but it is written entirely in house. It is not a clone or a fork: every component is built from scratch on our own engine and token system, and the API is free to diverge wherever it serves its consumers better.

---

## Release notes

Per-version notes for every published release live in
[`release-notes/`](https://github.com/soroush-tech/design-system/tree/main/packages/react/release-notes).
