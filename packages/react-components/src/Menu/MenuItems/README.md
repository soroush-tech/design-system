# MenuItems

Menu rows from data - for menus that come from a list of commands. Each entry is a row (a
[`MenuItem`](../../MenuItem/README.md)'s menu row props, with its label as `label` and its
submenu as more entries) or `{ type: 'divider' }`. It renders the same `MenuItem`s and
[`MenuDivider`](../MenuDivider/README.md)s JSX would, inside a [`MenuList`](../MenuList/README.md).
[`Menu`](../Menu/README.md) and [`ContextMenu`](../ContextMenu/README.md) take the same array as
`items`.

```tsx
import { MenuItems, MenuList, type MenuItemData } from '@soroush.tech/design-system/Menu'

const items: MenuItemData[] = [
  { value: 'new', label: 'New branch...', shortcut: 'Control+B' },
  { value: 'checkout', label: 'Checkout...', disabled: true, note: 'Coming later' },
  { type: 'divider' },
  {
    label: 'Local branches',
    submenu: [{ value: 'main', label: 'main', role: 'menuitemradio', selected: true }],
  },
  { label: 'Remote branches', submenu: [], emptyLabel: 'Coming soon' },
]

;<MenuList aria-label="Branch" onSelect={run}>
  <MenuItems items={items} />
</MenuList>
```

## Props

| Prop    | Type             | Default | Description                                           |
| ------- | ---------------- | ------- | ----------------------------------------------------- |
| `items` | `MenuItemData[]` | -       | The rows: `MenuItemRowData` or `{ type: 'divider' }`. |

A `MenuItemRowData` takes `value`, `label`, `role`, `selected`, `disabled`, `startIcon`,
`shortcut`, `note`, `onClick`, `submenu` (more entries; `null` or `[]` is an empty submenu) and
`emptyLabel` - each as on a `MenuItem`.

## Notes

- A row's key is its `value`, else its position - give rows that move a `value`.
- It renders rows only; it lays nothing out and takes no theme slots of its own.
