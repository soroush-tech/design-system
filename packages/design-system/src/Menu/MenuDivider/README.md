# MenuDivider

A line between groups of rows in a [`MenuList`](../MenuList/README.md), rendered as
`<li role="separator">`. The arrow keys pass over it.

```tsx
import { MenuDivider, MenuList } from '@soroush.tech/design-system/Menu'
import { MenuItem } from '@soroush.tech/design-system/MenuItem'

;<MenuList aria-label="Edit">
  <MenuItem>Cut</MenuItem>
  <MenuItem>Copy</MenuItem>
  <MenuDivider />
  <MenuItem>Select all</MenuItem>
</MenuList>
```

## Props

| Prop        | Type     | Default | Description             |
| ----------- | -------- | ------- | ----------------------- |
| `className` | `string` | -       | Class on the separator. |

## Notes

- The line is `theme.borderWidths.thin` in `theme.border.light`, with `0.5` space above and below.
