# TableRow

A row in a table. Renders `<tr>` with optional hover and selected shading.

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
<TableRow isHoverable isSelected={row.id === selectedId}>
  <TableCell>web</TableCell>
</TableRow>
```

## Props

| Prop          | Type                        | Default     | Description                                                                                                                |
| ------------- | --------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `isHoverable` | `boolean`                   | `false`     | Shades the row on hover with `theme.palette[color].light`.                                                                 |
| `isSelected`  | `boolean`                   | `false`     | Fills the row with `theme.palette[color].dark` + contrast text.                                                            |
| `color`       | `PaletteColor`              | `'primary'` | Palette color driving the hover/selected shading (`theme.palette[color]`) - falls back to the enclosing `Table`'s `color`. |
| `bg`          | `keyof Theme['background']` | -           | Background color.                                                                                                          |
| `as`          | `ElementType`               | `'tr'`      | Overrides the root element.                                                                                                |

Also supports styled-system `space` and `border` props.

## Overrides

`style` takes an entry of `StyleSheet.create`, or a list of them with `false`, `null` and `undefined`, and puts it on the root after the component's own styles. `slotProps` takes, for each slot (`root`), a `style` of the same kind, a `className`, and `data-*` and `aria-*` attributes. On the root, `style` and `className` come after `slotProps.root`, so they win.
