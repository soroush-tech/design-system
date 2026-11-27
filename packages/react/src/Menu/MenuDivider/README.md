# MenuDivider

A line between groups of rows in a [`MenuList`](../MenuList/README.md), rendered as
`<li role="separator">`. The arrow keys pass over it.

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
import { MenuDivider, MenuList } from '@gild-ui/react/Menu'
import { MenuItem } from '@gild-ui/react/MenuItem'

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
