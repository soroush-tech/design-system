# TableBody

The body section of a `Table`. Renders `<tbody>` and provides `TableSectionContext` = `'body'`,
which makes descendant `TableCell`s render as `<td>`.

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
<Table>
  <TableBody>
    <TableRow>
      <TableCell>web</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Props

| Prop          | Type                        | Default   | Description                 |
| ------------- | --------------------------- | --------- | --------------------------- |
| `color`       | `keyof Theme['text']`       | -         | Text color.                 |
| `bg`          | `keyof Theme['background']` | -         | Background color.           |
| `borderColor` | `keyof Theme['border']`     | -         | Border color.               |
| `as`          | `ElementType`               | `'tbody'` | Overrides the root element. |

Also supports styled-system `space` and `border` props.
