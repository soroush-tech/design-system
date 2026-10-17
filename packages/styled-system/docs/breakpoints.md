# Breakpoints

`theme.breakpoints` decides where responsive values change. Every responsive prop, every value in
`css()`, and the query helpers turn this one scale into media queries - and into container queries
when you ask for them. Everything is CSS: no component measures the window or its container in
JavaScript, so a server-rendered page lays out the same as the client, with JavaScript or without.

## Each key is a range

A key holds from its value until the next key. The theme writes where each range **starts**,
because a mobile-first query is a min-width; the range ends where the next key starts.

```js
breakpoints: { xs: '0px', sm: '600px', md: '840px', lg: '1200px', xl: '1600px' }
```

| Key  | Range       | Window class (Material 3) |
| ---- | ----------- | ------------------------- |
| `xs` | 0-599px     | compact                   |
| `sm` | 600-839px   | medium                    |
| `md` | 840-1199px  | expanded                  |
| `lg` | 1200-1599px | large                     |
| `xl` | 1600px+     | extra-large               |

`xs` starts at 0, so it applies everywhere until `sm` overrides it - it is the base. The names
are window classes, not devices: a class is about the space the window has, not the hardware.
A theme can use any names (`mobile`, `tablet`, `web`) and any number of breakpoints; every form
below follows the theme's names.

A scale can also be a plain list, `['40em', '52em', '64em']`. A list has no base key: position 0
is the base and each entry starts the next range.

## Responsive values

A prop - or a property in `css()` - takes one of three forms:

```jsx
<Box p={2} />                                 // one value, everywhere
<Box display={{ xs: 'none', md: 'block' }} /> // by name: each key from its size up
<Box gap={[1, 2, 4]} />                       // by position: xs, sm, md - mobile-first
```

- **An object** takes breakpoint names only. Each value holds from that breakpoint up, until a
  larger key in the same object overrides it.
- **An array** maps by position onto the breakpoints in declared order; `null` skips one
  (`[1, null, 4]`). Prefer an object beyond about three values: adding a breakpoint to the theme
  shifts every array after it.

## Query helpers

`up`, `down`, `only`, `between` and `not` take a breakpoint name, or a width (a number is px, a
string any CSS length), and return an `@media` rule in range syntax - exact, with no `-0.02px`
step:

| Call                  | Output                                      |
| --------------------- | ------------------------------------------- |
| `up('md')`            | `@media (width >= 840px)`                   |
| `up(500)`             | `@media (width >= 500px)`                   |
| `down('md')`          | `@media (width < 840px)`                    |
| `only('md')`          | `@media (840px <= width < 1200px)`          |
| `only('xs')`          | `@media (width < 600px)`                    |
| `only('xl')`          | `@media (width >= 1600px)`                  |
| `between('sm', 'lg')` | `@media (600px <= width < 1200px)`          |
| `not('md')`           | `@media (width < 840px), (width >= 1200px)` |

Use them as keys in a style object, or in a template - the helper already writes `@media`:

```js
const Panel = styled.div(({ theme }) => ({
  padding: 16,
  [theme.breakpoints.down('sm')]: { padding: 8 },
}))

const Rail = styled.nav`
  width: 280px;
  ${({ theme }) => theme.breakpoints.only('sm')} {
    width: 72px;
  }
`
```

Without design-system, build them from any scale with `createMediaHelpers(breakpoints)`.

## Container queries

The same scale sizes container queries - for a component that should respond to the space its
container gives it, not to the window:

- **A container**: `containerType="inline-size"` (and `containerName="sidebar"` to name it) on
  the element whose width counts.
- **Prop keys**: `cq` + the breakpoint name, from that size up - `p={{ xs: 2, cqSm: 4 }}` writes
  `@container (width >= 600px)`. They follow the theme's names (`cqTablet` for a `tablet` key).
- **Helpers**: `containerQueries.up('sm')`, `.down`, `.only`, `.between`, `.not` write
  `@container (...)` rules; `containerQueries('sidebar').up(400)` targets a named container:
  `@container sidebar (width >= 400px)`. One-off sizes go through the helpers. Build them from
  any scale with `createContainerQueries(breakpoints)`.

## Units

Inside a media query, `em` and `rem` are relative to the browser's **initial** font size (16px
unless the user changed it), not to the root element's: `html { font-size: 62.5% }` doesn't move
a breakpoint. A user who raises their browser's default font size moves `em` breakpoints with it;
`px` breakpoints stay put. Viewport units are no use in a width query (`50vw` measures the
viewport being tested), and a media query can't read custom properties, so `var(--x)` is not a
breakpoint. A breakpoint written as a media condition or a full `@media` rule is passed through;
it has no width, so the helpers and `cq` keys skip it.

## The order blocks are written in

A prop's styles are written base first, then one `@media` block per breakpoint in declared order,
then the container blocks in the same order. Later blocks win where two match, so the largest
matching breakpoint wins, as mobile-first expects. In `css()`, the generated blocks come after the
keys you write yourself - a helper key such as `[up('md')]` keeps your order, and a generated
block with the same query is merged into it.

## The layout grid

The `layout` prop on design-system's `Grid` and `Flex` turns `theme.layout`'s tokens into CSS per
breakpoint: column tracks on a Grid, a wrapping row on a Flex, with the gutter, the margin, and a
centred max width when the mode is fixed. `layout={{ lg: { columns: 16 } }}` replaces the theme's
grid at `lg` only; `layout={{ gutter: 8 }}` replaces its gutter at every breakpoint, and the two
mix (`{ gutter: 8, lg: { columns: 16 } }`). On design-system's `View` the same prop is the frame
alone (margin and max width, no columns). A child takes columns with `span` (`span={{ xs: 4, md: 6 }}`,
or `span="full"` for the whole row): `grid-column` in a Grid, a width of N columns and gutters in
a Flex. The parsers compose: `layoutFrame` writes the frame, `layoutGrid` / `layoutFlex` the
columns on top. Outside design-system, `layoutGridStyles(theme, value, 'grid' | 'flex')` writes
both in a style function. The design-system theming guide has the details.
