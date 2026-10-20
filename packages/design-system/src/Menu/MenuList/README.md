# MenuList

A list of commands, rendered as a semantic `<ul role="menu">`. It owns the keyboard: the arrow
keys, Home and End move focus between its rows, skipping disabled ones, and typing jumps to a row
by its label. Its rows are [`MenuItem`](../../MenuItem/README.md)s, which inside a `MenuList` render
as menu rows (`menuitem`, `menuitemradio`, `menuitemcheckbox`) rather than `Select` options, and
[`MenuDivider`](../MenuDivider/README.md)s between groups.

A `MenuList` renders in place - a menu embedded in a panel or a sidebar. It moves focus between
its rows, but doesn't move focus into itself unless `shouldAutoFocus` is set.

```tsx
import { MenuDivider, MenuList } from '@soroush.tech/design-system/Menu'
import { MenuItem } from '@soroush.tech/design-system/MenuItem'

;<MenuList aria-label="Branch" onSelect={(value) => run(value)}>
  <MenuItem value="new" shortcut="Control+B">
    New branch...
  </MenuItem>
  <MenuItem value="checkout" disabled note="Coming later">
    Checkout tag or revision...
  </MenuItem>
  <MenuDivider />
  <MenuItem value="main" role="menuitemradio" selected>
    main
  </MenuItem>
  <MenuItem value="feat/menu" role="menuitemradio">
    feat/menu
  </MenuItem>
</MenuList>
```

## Props

| Prop              | Type                                | Default | Description                                                                                  |
| ----------------- | ----------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `children`        | `ReactNode`                         | -       | `MenuItem` rows and `MenuDivider`s.                                                          |
| `onSelect`        | `(value: string \| number) => void` | -       | Fired with a row's `value` when a row that has one is chosen.                                |
| `shouldWrap`      | `boolean`                           | `true`  | Carry the arrow keys past the last row to the first, and back.                               |
| `shouldAutoFocus` | `boolean`                           | `false` | Focus the checked row, or the first enabled one, on mount; the list itself when it has none. |
| `color`           | `keyof Theme['palette']`            | -       | Accent color for every row - its focus shading. A row's own `color` wins.                    |
| `textColor`       | `keyof Theme['text']`               | -       | Base text color for every row. A row's own `textColor` wins.                                 |
| `size`            | `keyof Theme['sizes']`              | -       | Density token for every row. A row's own `size` wins.                                        |
| `dense`           | `boolean`                           | -       | Compact vertical padding for every row. A row's own `dense` wins.                            |
| `onKeyDown`       | `(event) => void`                   | -       | Fired for every key pressed in the list, after its own handling.                             |
| `aria-label`      | `string`                            | -       | Names the menu.                                                                              |
| `aria-labelledby` | `string`                            | -       | Names the menu after another element.                                                        |
| `id`              | `string`                            | -       | DOM id.                                                                                      |
| `className`       | `string`                            | -       | Class on the list.                                                                           |

Plus the styled-system **space** (`m`, `p`, ...) and **layout** (`width`, `maxHeight`, ...)
props. The list has `0.5` vertical padding and no margin by default.

## Keyboard

| Key                 | Does                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------- |
| ArrowDown / ArrowUp | Focus the next / previous enabled row, wrapping unless `shouldWrap` is off            |
| Home / End          | Focus the first / last enabled row                                                    |
| A printable key     | Focus the next row whose label starts with it; keys typed within 500ms build a prefix |
| Enter / Space       | Choose the focused row                                                                |

## Notes

- Rows are found in the DOM by their nearest `role="menu"`, so a list nested inside another
  (a submenu) keeps its rows and its keys to itself.
- The pointer moves focus as it goes over a row, so the row under the pointer and the row the keys
  move are always the same one, and one row is highlighted at a time.
- Type-ahead matches a row's label only - not its icon, shortcut or note.
