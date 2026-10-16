# PageLayout

The page frame from `theme.layout`: a top and a bottom bar, side panels at the start and the end,
and the content container between them. Each breakpoint arranges them from its layout entry, in
CSS alone (no JavaScript media queries), so a server-rendered page lays out the same as the
client. Put the content on the theme's columns with `LayoutGrid`.

## Usage

```tsx
import { PageLayout, LayoutGrid } from '@soroush.tech/design-system/PageLayout'

;<PageLayout topBar={<AppBar>...</AppBar>} startPanel={<Navigation />} bottomBar={<TabBar />}>
  <LayoutGrid>
    <Grid gridColumn="1 / -1">...</Grid>
  </LayoutGrid>
</PageLayout>
```

## How the theme lays it out

`theme.layout.base` is the layout below the first breakpoint; each breakpoint's entry lists only
what changes, merged mobile-first in `theme.breakpoints` order.

- **Bars** - a bar is shown where its height (`bars.top` / `bars.bottom`) is set and not `0`.
- **Panels** - `inline` takes a track of `width`; `collapsed` takes a track of `railWidth`;
  `overlay` sits over the page at `width`, shown while `openPanels` says so; `hidden` is not
  shown. `start` and `end` follow the writing direction, so they swap sides in RTL.
- **Content** - `margin` is its inline padding. `fluid` spans the space the bars and panels
  leave; `fixed` is centred at `maxWidth`.

A region you don't pass takes no space at any breakpoint.

With `baseTheme`:

| Breakpoint     | Bars        | Start panel     | Content                                        |
| -------------- | ----------- | --------------- | ---------------------------------------------- |
| base           | bottom 64px | hidden          | 4 columns, fluid, margin 16, gutter 16         |
| tablet (600px) | bottom 64px | collapsed, 72px | 8 columns, fluid, margin 32, gutter 16         |
| web (1200px)   | top 64px    | inline, 280px   | 12 columns, fixed 1200px, margin 24, gutter 24 |
| wide (1600px)  | top 64px    | inline, 280px   | 16 columns, fixed 1600px, margin 24, gutter 24 |

## What the regions tell their contents

Each bar and panel provides `PageLayoutContext` - `{ region: 'bar', placement }` or
`{ region: 'panel', side }` - so a component can fill the region it sits in. `Sidebar` fills a
panel's track and shows its icons only in a collapsed rail; `AppBar` takes a bar's height. Your
own components can read the context the same way.

## Props

Extends all [Grid](../../Grid/README.md) props. A `minHeight` or `height` prop beats the default
height.

| Prop         | Type                                 | Default  | Description                                            |
| ------------ | ------------------------------------ | -------- | ------------------------------------------------------ |
| `children`   | `ReactNode`                          | -        | The page content, in the content container             |
| `topBar`     | `ReactNode`                          | -        | The top bar                                            |
| `bottomBar`  | `ReactNode`                          | -        | The bottom bar                                         |
| `startPanel` | `ReactNode`                          | -        | The start-side panel                                   |
| `endPanel`   | `ReactNode`                          | -        | The end-side panel                                     |
| `openPanels` | `{ start?: boolean; end?: boolean }` | `{}`     | Which `overlay` panels are open; other modes ignore it |
| `minHeight`  | `string`                             | `100dvh` | Height of the page frame                               |

## Theme customization

`theme.components.PageLayout` takes `styleOverrides` for the slots `root`, `bar`, `panel` and
`content`.

## LayoutGrid

A `Grid` on the theme's content columns: each breakpoint's `content.columns` equal tracks with its
`gutter` between them. Place items with a `Grid`'s `gridColumn` (`'span 4'`, `'1 / -1'`). A
`gridTemplateColumns` or `gap` prop still wins. See [LayoutGrid](../LayoutGrid/README.md).
