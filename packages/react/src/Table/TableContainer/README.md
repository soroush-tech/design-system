# TableContainer

Scroll wrapper for `Table`. Extends `View` and adds `overflow-x: auto`, so wide tables scroll
horizontally inside it instead of breaking the page layout. Give it a bounded `maxHeight` to make
`Table`'s `hasStickyHeader` stick.

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
<TableContainer maxHeight="320px">
  <Table hasStickyHeader>...</Table>
</TableContainer>
```

## Props

Accepts every `View` prop - `bg`, `borderColor`, `borderWidth`, `borderRadius`, spacing, layout,
position, and `as` (default `'div'`). See `@gild-ui/react/View/README.md`.

## Overrides

`style` takes an entry of `StyleSheet.create`, or a list of them with `false`, `null` and `undefined`, and puts it on the root after the component's own styles. `slotProps` takes, for each slot (`root`), a `style` of the same kind, a `className`, and `data-*` and `aria-*` attributes. On the root, `style` and `className` come after `slotProps.root`, so they win.
