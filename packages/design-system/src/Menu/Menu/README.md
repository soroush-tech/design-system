# Menu

A trigger and the [`MenuList`](../MenuList/README.md) of commands it opens. It isn't modal: no
focus trap, no scroll lock, nothing laid over the page, so the pointer passes over it and the
page stays usable around it. The list is placed `position: fixed` in the window, under the
trigger, so a panel that scrolls or clips its content can't cut it off - but it stays inside the
menu's own box in the DOM, so focus moving inside it is still focus inside the menu.

```tsx
import { Menu, MenuDivider } from '@soroush.tech/design-system/Menu'
import { MenuItem } from '@soroush.tech/design-system/MenuItem'
import { Button } from '@soroush.tech/design-system/Button'

;<Menu trigger={<Button variant="text">main</Button>} onSelect={run}>
  <MenuItem value="new">New branch...</MenuItem>
  <MenuItem value="checkout" disabled note="Coming later">
    Checkout tag or revision...
  </MenuItem>
  <MenuDivider />
  <MenuItem value="rename">Rename...</MenuItem>
</Menu>
```

## Props

| Prop              | Type                                       | Default                                     | Description                                                                                                                                                                             |
| ----------------- | ------------------------------------------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trigger`         | `ReactElement`                             | -                                           | The element that opens the menu - a `Button`, a `Pressable`. It is given `aria-haspopup`, `aria-expanded` and `aria-controls`; its own `onClick` / `onKeyDown` still run. **Required.** |
| `children`        | `ReactNode`                                | -                                           | `MenuItem` rows and `MenuDivider`s.                                                                                                                                                     |
| `isOpen`          | `boolean`                                  | -                                           | Controlled open state. When set, the menu only asks to open or close, through `onOpen` / `onClose`.                                                                                     |
| `defaultOpen`     | `boolean`                                  | `false`                                     | Uncontrolled initial open state.                                                                                                                                                        |
| `onOpen`          | `() => void`                               | -                                           | Fired when the menu asks to open.                                                                                                                                                       |
| `onClose`         | `(event, reason: MenuCloseReason) => void` | -                                           | Fired when the menu asks to close: `'escapeKey'`, `'select'` (a row chosen), `'triggerClick'` or `'blur'`.                                                                              |
| `onStep`          | `(step: -1 \| 1) => void`                  | -                                           | Fired when Left or Right has nowhere further to go inside the menu, so a menu bar can step to the next menu. Swapped right to left.                                                     |
| `onSelect`        | `(value: string \| number) => void`        | -                                           | Fired with a row's `value` when a row that has one is chosen.                                                                                                                           |
| `align`           | `'start' \| 'end'`                         | `'start'`                                   | Which edge of the trigger the list lines up with. Mirrored right to left.                                                                                                               |
| `marginThreshold` | `keyof Theme['space']`                     | `2`                                         | The least room between the list and the window's edge.                                                                                                                                  |
| `elevation`       | `PaperElevation` (0-24)                    | `8`                                         | Shadow depth of the surface.                                                                                                                                                            |
| `borderRadius`    | `keyof Theme['radii']`                     | `theme.defaults.surfaceRadius`, else square | Corner radius of the list.                                                                                                                                                              |
| `layer`           | `keyof Theme['zOrder']`                    | `'modal'`                                   | Stacking layer - `modal` keeps a menu opened in a dialog above it.                                                                                                                      |
| `emptyLabel`      | `ReactNode`                                | -                                           | Shown as one disabled row when the menu has no rows ("Coming soon"); without it, the list stays empty.                                                                                  |
| `color`           | `keyof Theme['palette']`                   | -                                           | Accent color for every row.                                                                                                                                                             |
| `textColor`       | `keyof Theme['text']`                      | -                                           | Base text color for every row.                                                                                                                                                          |
| `size`            | `keyof Theme['sizes']`                     | -                                           | Density token for every row.                                                                                                                                                            |
| `dense`           | `boolean`                                  | -                                           | Compact vertical padding for every row.                                                                                                                                                 |
| `aria-label`      | `string`                                   | trigger's name                              | Names the list. Without it the trigger names it (`aria-labelledby`).                                                                                                                    |
| `className`       | `string`                                   | -                                           | Class on the menu's root.                                                                                                                                                               |

## Keyboard

| Where       | Key                 | Does                                                                         |
| ----------- | ------------------- | ---------------------------------------------------------------------------- |
| The trigger | Enter / Space       | Opens the menu (a click), focusing the checked row or the first enabled one  |
| The trigger | ArrowDown / ArrowUp | Opens the menu, focusing the checked row or the first enabled one            |
| The list    | Escape              | Closes the menu and gives focus back to the trigger                          |
| The list    | Enter / Space       | Chooses the focused row, closes the menu and gives focus back to the trigger |
| The list    | Left / Right        | `onStep(-1)` / `onStep(1)`, when set                                         |
| The list    | Tab                 | Focus leaves - the menu closes and focus stays where it went                 |

The arrow keys, Home, End and type-ahead inside the list are [`MenuList`](../MenuList/README.md)'s.

## Notes

- **Placement.** Under the trigger, lined up with its start or end edge; above it when there's
  no room below; moved only as far as it must to stay `marginThreshold` inside the window. It
  follows the trigger on scroll and resize, and is hidden until first placed so it never shows at
  the wrong spot. It can't grow taller than the window.
- **Not portaled, not `Popover`.** `Popover` is a modal - it moves focus in, traps it and hides
  the rest of the page from assistive technology, which suits a dialog and not a menu. The list is
  fixed in the window instead, inside the menu's box, so closing when focus leaves works and rows
  are found by their nearest `role="menu"`. An ancestor with a `transform`, `filter` or
  `contain` - a zoom wrapper, a sliding drawer - makes itself the containing block of
  `position: fixed`; the list measures where it landed and moves back by the difference, so it
  still opens against its trigger. A scaling transform still scales it.
- **Submenus.** A `MenuItem` with `submenu` opens a nested list beside it, placed and drawn
  the way the menu's own list is - see [`MenuItem`'s submenus](../../MenuItem/README.md#submenus).
  Escape in a submenu closes only that submenu.
- **A menu bar.** Hold `isOpen` for each menu and step between them with `onStep`.
- The list renders nothing until the menu opens, so it costs nothing on the server.
