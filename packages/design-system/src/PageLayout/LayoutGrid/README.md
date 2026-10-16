# LayoutGrid

A `Grid` on the theme's content columns. At each breakpoint it has `theme.layout.*.content.columns`
equal tracks with that breakpoint's `gutter` (a `theme.space` key) between them - 4, 8, 12 and 16
columns with `baseTheme`. It works inside `PageLayout`'s content or on its own.

## Usage

```tsx
import { LayoutGrid } from '@soroush.tech/design-system/PageLayout'

;<LayoutGrid rowGap={2}>
  <Grid gridColumn="1 / -1">Full row</Grid>
  <Grid gridColumn={{ _: '1 / -1', web: 'span 6' }}>Half from web up</Grid>
</LayoutGrid>
```

## Props

Extends all [Grid](../../Grid/README.md) props. `grid` and `space` props are applied after the
theme columns, so `gridTemplateColumns` or `gap` passed as a prop wins at every breakpoint.

## Theme customization

`theme.components.LayoutGrid` takes `styleOverrides.root`.
