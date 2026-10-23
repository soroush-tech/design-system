# ContextMenu

A [`MenuList`](../MenuList/README.md) opened by a right-click over its target, at the pointer - or,
from the keyboard, by the context-menu key or Shift+F10 at the focused element. It is placed and
closes as [`Menu`](../Menu/README.md) does, and gives focus back to where it was. The browser's own
context menu is held back only when this one opens.

```tsx
import { ContextMenu } from '@soroush.tech/design-system/Menu'
import { MenuItem } from '@soroush.tech/design-system/MenuItem'

;<ContextMenu target={<Canvas />} aria-label="Canvas" onSelect={run}>
  <MenuItem value="paste" shortcut="Control+V">
    Paste
  </MenuItem>
  <MenuItem value="select-all">Select all</MenuItem>
</ContextMenu>
```

Rows can come as data instead, with `items` - the same entries
[`MenuItems`](../MenuItems/README.md) renders:

```tsx
<ContextMenu
  target={<Canvas />}
  items={[
    { value: 'paste', label: 'Paste', shortcut: 'Control+V' },
    { type: 'divider' },
    { label: 'Align', submenu: [{ value: 'left', label: 'Left' }] },
  ]}
/>
```

## Props

| Prop              | Type                                       | Default                                     | Description                                                                                                  |
| ----------------- | ------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `target`          | `ReactElement`                             | -                                           | The element whose right-click opens the menu. Its own `onContextMenu` / `onKeyDown` still run. **Required.** |
| `children`        | `ReactNode`                                | -                                           | `MenuItem` rows and `MenuDivider`s.                                                                          |
| `items`           | `MenuItemData[]`                           | -                                           | The rows as data, in place of `children`.                                                                    |
| `onClose`         | `(event, reason: MenuCloseReason) => void` | -                                           | Fired when the menu closes: `'escapeKey'`, `'select'` or `'blur'`.                                           |
| `onSelect`        | `(value: string \| number) => void`        | -                                           | Fired with a row's `value` when a row that has one is chosen.                                                |
| `marginThreshold` | `keyof Theme['space']`                     | `2`                                         | The least room between the list and the window's edge.                                                       |
| `elevation`       | `PaperElevation` (0-24)                    | `8`                                         | Shadow depth of the surface.                                                                                 |
| `borderRadius`    | `keyof Theme['radii']`                     | `theme.defaults.surfaceRadius`, else square | Corner radius of the list.                                                                                   |
| `layer`           | `keyof Theme['zOrder']`                    | `'modal'`                                   | Stacking layer.                                                                                              |
| `emptyLabel`      | `ReactNode`                                | -                                           | Shown as one disabled row when the menu has no rows; without it, the list stays empty.                       |
| `color`           | `keyof Theme['palette']`                   | -                                           | Accent color for every row.                                                                                  |
| `textColor`       | `keyof Theme['text']`                      | -                                           | Base text color for every row.                                                                               |
| `size`            | `keyof Theme['sizes']`                     | -                                           | Density token for every row.                                                                                 |
| `dense`           | `boolean`                                  | -                                           | Compact vertical padding for every row.                                                                      |
| `aria-label`      | `string`                                   | -                                           | Names the list.                                                                                              |
| `className`       | `string`                                   | -                                           | Class on the menu's root.                                                                                    |

## Notes

- **Placement.** Its top-left corner at the pointer (top-right, right to left), moved above or to
  the other side where the window has no room, and kept `marginThreshold` inside it. From the
  keyboard it opens at the focused element's bottom start corner.
- **Layout.** The root is `display: contents`, so wrapping a target changes nothing about how it
  lays out. Its surface has a `paper` slot of its own, over `Menu`'s:
  `theme.components.Menu.styleOverrides.paper` styles every menu's surface,
  `theme.components.ContextMenu.styleOverrides.paper` only this one's.
- Submenus, the keys inside the list and focus following the pointer are the same as in a `Menu`.
