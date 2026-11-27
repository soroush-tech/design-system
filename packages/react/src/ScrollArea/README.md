# ScrollArea

A scrolling area whose scrollbars are drawn **over** its content rather than beside it - so a rounded
panel keeps its corner clean - and show only while the pointer is over the area or focus is inside it.
Scrolling itself stays native: the wheel, the keyboard and touch work as they do anywhere. Each axis that
overflows gets a track, down the right edge or along the bottom, whose thumb drags and whose track pages
one view toward the pointer, as a native one does.

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
import { ScrollArea } from '@gild-ui/react/ScrollArea'

;<ScrollArea maxHeight={240} aria-label="Notes" tabIndex={0}>
  {notes}
</ScrollArea>
```

## Props

| Prop                                                                | Type                   | Default | Description                                                                                          |
| ------------------------------------------------------------------- | ---------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `children`                                                          | `ReactNode`            | -       | What scrolls.                                                                                        |
| `axes`                                                              | `'y' \| 'x' \| 'both'` | `'y'`   | Which ways it scrolls. An axis it does not scroll is `overflow: hidden`.                             |
| `viewportRef`                                                       | `Ref<HTMLDivElement>`  | -       | The scrolling element - for code that reads or sets its scroll.                                      |
| `maxHeight`, `height`, `minHeight`, `width`, `minWidth`, `maxWidth` | styled-system layout   | -       | A ceiling for an area that otherwise grows with its content - a menu. Instance props win over theme. |
| `tabIndex`                                                          | `0`                    | -       | Puts the scrolling box in the tab order, so the keys scroll it - for content with nothing focusable. |
| `aria-label`, `aria-labelledby`                                     | `string`               | -       | Name the scrolling box, which then is a `region`.                                                    |
| space props, `className`, `data-testid`                             |                        |         | On the root.                                                                                         |

Without `maxHeight` it is `flex: 1 1 auto` with `minHeight: 0`: as tall as its content and no taller than
its container allows, which is what lets a dialog grow to the window and then scroll.

## Scrolling

An axis it scrolls keeps the wheel at its ends (`overscroll-behavior: none`), so a list does not scroll the
panel behind it. An axis it does not scroll passes the wheel on, so a sideways area inside a vertical one
never swallows the vertical wheel over it.

## Customization

`theme.components.ScrollArea` styles the `root`, the `viewport` (the box that scrolls), the `track` and the
`thumb`. Its `defaultProps` set `axes`. The look is tokens:

- `theme.background.scrollbar` - the thumb; `theme.background.scrollbarTrack` - the track while it is hovered
  or dragged. Both are translucent, so the content shows through.
- `theme.border.default` - the line on the inner side of the track while it is hovered or dragged.
- The track is `theme.space[1.25]` wide, the thumb `theme.space[0.75]`, fading in over
  `theme.transitions.duration.short` (and not at all under `prefers-reduced-motion`).

## Accessibility

- The native scrollbar is hidden; the drawn one is `aria-hidden` and a pointer aid only. The box underneath
  is native, so the wheel, touch and (with `tabIndex={0}`) the keyboard scroll it.
- A scrolling box with nothing focusable in it should be in the tab order (`tabIndex={0}`) and named
  (`aria-label`), or a keyboard user cannot scroll it.
- Server rendering: it renders the box and no bar; the bars are measured after mount.

## Overriding the CSS

`style` takes an entry of `StyleSheet.create`, or a list of entries with `false`, `null` and `undefined` for a condition that is off, and overrides the CSS of the root. A plain style object is a type error.

`slotProps` takes one object for each slot of `ScrollArea` - `root`, `viewport`, `track`, `thumb` - the slots `theme.components.ScrollArea` styles. A slot object holds `style` (an entry or a list, as above), `className` and `data-*` and `aria-*` attributes, and nothing else. A slot's `style` is merged after the slot's own styles and the theme's. For the root, `style` and `slotProps.root.style` are one channel: when both are given, `style` comes last and wins, and the class names are joined.

```tsx
import { StyleSheet } from '@gild-ui/react'

const overrides = StyleSheet.create({ tight: { padding: 0 } })

;<ScrollArea style={overrides.tight} slotProps={{ thumb: { 'data-testid': 'scrollarea-thumb' } }} />
```
