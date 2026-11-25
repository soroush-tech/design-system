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
position, and `as` (default `'div'`). See `@soroush.design/react/View/README.md`.
