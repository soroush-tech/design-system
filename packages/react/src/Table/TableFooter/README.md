# TableFooter

The footer section of a `Table`. Renders `<tfoot>` and provides `TableSectionContext` = `'footer'`,
which makes descendant `TableCell`s render as `<td>`. The natural home for totals rows and
`TablePagination`.

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
<Table>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

## Props

| Prop          | Type                        | Default   | Description                 |
| ------------- | --------------------------- | --------- | --------------------------- |
| `color`       | `keyof Theme['text']`       | -         | Text color.                 |
| `bg`          | `keyof Theme['background']` | -         | Background color.           |
| `borderColor` | `keyof Theme['border']`     | -         | Border color.               |
| `as`          | `ElementType`               | `'tfoot'` | Overrides the root element. |

Also supports styled-system `space` and `border` props.

## Overrides

`style` takes an entry of `StyleSheet.create`, or a list of them with `false`, `null` and `undefined`, and puts it on the root after the component's own styles. `slotProps` takes, for each slot (`root`), a `style` of the same kind, a `className`, and `data-*` and `aria-*` attributes. On the root, `style` and `className` come after `slotProps.root`, so they win.
