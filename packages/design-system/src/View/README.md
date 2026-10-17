# View

The base layout primitive. Renders as `<div>`. All styled-system prop groups are supported: space, layout, color, typography, flexbox, border, and position.

`Flex`, `Grid`, and `Paper` all extend `View`.

---

## Props

---

### `bg`

Resolves against `theme.background`.

| Token         | Dark source                      |
| ------------- | -------------------------------- |
| `"backdrop"`  | `carbonBlack[900]` + 80% opacity |
| `"modal"`     | `kineticSurface[800]`            |
| `"primary"`   | `kineticSurface[900]`            |
| `"secondary"` | `kineticSurface[700]`            |
| `"paper"`     | `kineticSurface[800]`            |
| `"terminal"`  | `kineticSurface[900]`            |
| `"grid"`      | `kineticSurface[800]`            |

---

### `opacity`

Raw CSS opacity value (0-1).

---

### `cursor`

CSS cursor - controls the mouse pointer style. Accepts any valid CSS cursor value.

Common values: `"pointer"` · `"default"` · `"move"` · `"not-allowed"` · `"wait"` · `"grab"` · `"text"`

```tsx
<View cursor="pointer" onClick={handleClick}>
  clickable
</View>
```

---

### `order`

CSS `order` for placing a flex/grid item out of source order. Accepts a single value or a responsive array.

```tsx
// First on mobile, last in a 2-col layout, first again on wide screens
<View order={[0, 1, 1, 0]}>logo</View>
```

---

### `layout`

Puts the element on the page frame from `theme.layout`: the inline margin and, in fixed mode, the centred max width, per breakpoint. No columns - the element stays a normal block, so text, articles and forms flow as usual. `Grid` and `Flex` take the same prop and add their columns on top.

Values: `true` for the theme's frame; fields for every breakpoint (`{ maxWidth: '1280px' }`); entries for one breakpoint (`{ md: { margin: 0 } }`); or both. A frame takes `margin`, `mode` and `maxWidth` - columns belong to `Grid` and `Flex`. The layout owns what it writes: explicit inline padding or `maxWidth` on the same element does not override it.

```tsx
<View as="article" layout py={6}>...</View>
<View layout={{ maxWidth: '1280px' }}>...</View>
```

---

### `span`

How many columns of a `Grid layout` or `Flex layout` parent the element takes, or `"full"` for the whole row in any grid - whatever its column count. Responsive like any prop.

```tsx
<View span={{ xs: 4, md: 6 }}>half from md</View>
<View span="full">a full-width row</View>
```

---

## Styled-system props

### Space - `theme.space`

| Prop                              | Shorthand for   |
| --------------------------------- | --------------- |
| `m` `mt` `mr` `mb` `ml` `mx` `my` | margin + sides  |
| `p` `pt` `pr` `pb` `pl` `px` `py` | padding + sides |
| `gap` `rowGap` `columnGap`        | gap + axes      |

| Key      | Value |
| -------- | ----- |
| `0`      | 0     |
| `0.5`    | 4px   |
| `1`      | 8px   |
| `1.5`    | 12px  |
| `2`      | 16px  |
| `3`      | 24px  |
| `4`      | 32px  |
| `5`      | 40px  |
| `6`      | 48px  |
| `7`      | 56px  |
| `8`      | 64px  |
| `"auto"` | auto  |

---

### Layout

`width` · `height` · `minWidth` · `minHeight` · `maxWidth` · `maxHeight` · `display` · `overflow` · `overflowX` · `overflowY` · `verticalAlign` · `aspectRatio`

---

### Border - `theme.radii`

`border` · `borderWidth` · `borderStyle` · `borderColor` · `borderRadius` · `borderTop` · `borderRight` · `borderBottom` · `borderLeft` · `borderX` · `borderY`

Radii: `"sm"` (4px) · `"md"` (8px) · `"lg"` (16px)

---

---

### Position

`position` · `zIndex` · `top` · `right` · `bottom` · `left`

---

## HTML attributes

Extends `HTMLAttributes<HTMLElement>`. Standard attributes (`style`, `className`, `onClick`, `data-*`, `aria-*`) pass through.

---

## Examples

```tsx
// Basic container with spacing and background
<View p={3} bg="secondary" borderRadius="md">content</View>


// Positioned overlay
<View position="relative">
  <View position="absolute" top="0" right="0" p={1}>badge</View>
</View>

```
