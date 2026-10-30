# MenuItem

A row of a list, in one of two roles:

- **An option of [`Select`](../Select/README.md)'s listbox**, rendered as a semantic
  `<li role="option">`. Inside a `Select` the selection, highlight, density, and accent props are
  injected automatically - you only supply `value` and the label. On its own it renders a styled,
  static row.
- **A menu row** inside a [`MenuList`](../Menu/): a `menuitem` (or `menuitemradio` /
  `menuitemcheckbox`) with a leading icon column, its label and a trailing shortcut, chosen by a
  click, Enter or Space.

```tsx
import { Select } from '@soroush.tech/design-system/Select'
import { MenuItem } from '@soroush.tech/design-system/MenuItem'

;<Select placeholder="Pick a platform">
  <MenuItem value="web">Web</MenuItem>
  <MenuItem value="android">Android</MenuItem>
  <MenuItem value="ios">iOS</MenuItem>
</Select>
```

```tsx
import { MenuList } from '@soroush.tech/design-system/Menu'
import { MenuItem } from '@soroush.tech/design-system/MenuItem'

;<MenuList aria-label="File" onSelect={run}>
  <MenuItem value="open" startIcon={<Icon name="folder" size="sm" />} shortcut="Control+O">
    Open...
  </MenuItem>
  <MenuItem value="share" disabled note="Coming later">
    Share...
  </MenuItem>
  <MenuItem value="wrap" role="menuitemcheckbox" selected={isWrapped}>
    Wrap lines
  </MenuItem>
</MenuList>
```

## Props

| Prop                    | Type                                | Default        | Description                                                                                                                                                     |
| ----------------------- | ----------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                 | `string \| number`                  | -              | The value this row represents - reported to `Select`'s `onChange` or `MenuList`'s `onSelect`. **Required inside a `Select`.**                                   |
| `children`              | `ReactNode`                         | -              | The row label.                                                                                                                                                  |
| `as`                    | `ElementType`                       | `'li'`         | The element used for the root node.                                                                                                                             |
| `disabled`              | `boolean`                           | `false`        | Disables the row - it cannot be highlighted or chosen. In a menu the keys skip it.                                                                              |
| `selected`              | `boolean`                           | `false`        | Marks the row as the current selection. **Injected by `Select`**; in a menu it sets `aria-checked` on `menuitemradio` / `menuitemcheckbox` rows and ticks them. |
| `highlighted`           | `boolean`                           | `false`        | Marks the option as the keyboard-highlighted row. **Injected by `Select`.**                                                                                     |
| `multiple`              | `boolean`                           | `false`        | Reserves a leading checkmark slot for multi-select menus. **Injected by `Select`.**                                                                             |
| `color`                 | `keyof Theme['palette']`            | `'primary'`    | Accent color for hover/selected shading - resolves to `theme.palette[color]`.                                                                                   |
| `textColor`             | `keyof Theme['text']`               | color's `main` | Base text color of the row - resolves against `theme.text`. Falls back to the accent color's `main`.                                                            |
| `size`                  | `keyof Theme['sizes']`              | `'md'`         | Density token - resolves against `theme.sizes`.                                                                                                                 |
| `dense`                 | `boolean`                           | `false`        | Compact vertical padding, independent of `size`.                                                                                                                |
| `disableGutters`        | `boolean`                           | `false`        | Remove the left and right padding.                                                                                                                              |
| `divider`               | `boolean`                           | `false`        | Add a 1px bottom border to separate the row.                                                                                                                    |
| `autoFocus`             | `boolean`                           | `false`        | Focus the row on first mount, and whenever `autoFocus` flips from `false` to `true`.                                                                            |
| `focusVisibleClassName` | `string`                            | -              | Class applied only while the row has keyboard focus - a `:focus-visible` hook.                                                                                  |
| `onSelect`              | `(value: string \| number) => void` | -              | Fired with `value` when the option is chosen. **Injected by `Select`.**                                                                                         |
| `id`                    | `string`                            | -              | DOM id. `Select` assigns one so the trigger can reference it via `aria-activedescendant`.                                                                       |

### Menu row props

Used inside a `MenuList`; ignored by `Select`. `color`, `textColor`, `size` and `dense` default to
the `MenuList`'s own.

| Prop                            | Type                                                  | Default      | Description                                                                                                                                                                                                                                                                          |
| ------------------------------- | ----------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `role`                          | `'menuitem' \| 'menuitemradio' \| 'menuitemcheckbox'` | `'menuitem'` | A command, the current choice of a group, or an on/off setting.                                                                                                                                                                                                                      |
| `startIcon`                     | `ReactNode`                                           | -            | An icon in the leading column. Every row keeps the column, so labels line up; a checked row shows a tick there.                                                                                                                                                                      |
| `shortcut`                      | `ReactNode`                                           | -            | The row's keyboard shortcut, shown quieter at its end and kept out of its name. A string is also given to the row as `aria-keyshortcuts`.                                                                                                                                            |
| `aria-keyshortcuts`             | `string`                                              | -            | What a screen reader hears of the row's keys - the `aria-keyshortcuts` form, such as `Control+=` - where it differs from what `shortcut` shows (`Ctrl+=`). It wins over a string `shortcut`.                                                                                         |
| `note`                          | `string`                                              | -            | Why the row is off - shown by a `Tooltip` beside the row (it takes no click, and opens over a disabled row) and the row's accessible description, open or closed. Never a native `title`.                                                                                            |
| `onClick`                       | `(event) => void`                                     | -            | Fired when the row is chosen, by a click, Enter or Space.                                                                                                                                                                                                                            |
| `submenu`                       | `ReactNode`                                           | -            | The rows of a submenu this row opens, beside it. `null` or `[]` is a submenu with nothing in it yet. A row with a submenu opens it rather than being chosen.                                                                                                                         |
| `emptyLabel`                    | `ReactNode`                                           | -            | Shown as one disabled row in an empty submenu ("Coming soon"); without it, the submenu stays empty.                                                                                                                                                                                  |
| `secondaryAction`               | `ReactNode`                                           | -            | A control of the row's own beside it - a close button. It sits with the row in its `role="none"` entry, out of the arrow keys and hidden from assistive technology (a menu owns rows alone): give it `tabIndex={-1}`, and the row a key of its own through `MenuList`'s `onKeyDown`. |
| `shouldAnnounceSecondaryAction` | `boolean`                                             | `false`      | Leaves `secondaryAction` in the accessibility tree - a screen reader finds the control by its own name. A menu owns rows alone, so a control beside a row is an exception a tool may report; name it and keep it out of the tab order.                                               |

### Submenus

```tsx
<MenuItem
  submenu={[
    <MenuItem key="main" value="main" role="menuitemradio" selected>
      main
    </MenuItem>,
    <MenuItem key="feat" value="feat/menu" role="menuitemradio">
      feat/menu
    </MenuItem>,
  ]}
>
  Local branches
</MenuItem>
<MenuItem submenu={null} emptyLabel="Coming soon">
  Remote branches
</MenuItem>
```

A row can't contain rows, so the row and its submenu sit side by side in a `role="none"` entry;
the row is `aria-haspopup="menu"` with `aria-expanded`, and shows a chevron that mirrors right to
left.

- **Focus decides the submenu.** A row opens its submenu when it takes focus - by the keys or by
  the pointer, which moves focus as it goes - so it is already open when Right is pressed. Focus
  moving to a sibling row closes it.
- **Keys.** Right, Enter or Space go into the submenu's first enabled row; Left or Escape close it
  and come back to the row. Right to left, Left and Right swap. Each list moves only between its
  own rows.
- **Choosing** a row anywhere in a submenu is the outer list's choice (`onSelect`) and, in a
  `Menu`, closes the whole menu.
- **Placement.** Beside the row, on the side away from the menu's `align` edge (to the right of a
  start-aligned menu, left to right), or the other side when the window has no room - and a
  submenu that opened the other way takes its own submenus that way too, so they go on away
  from the menu rather than back over it. With room on neither side - a phone-width window - it
  opens under the row instead, or over it near the bottom, so it never covers the row it came
  from.

### Rows from data

Rows can come as data instead - see [`MenuItems`](../Menu/MenuItems/README.md).

## Notes

- `color` and `textColor` are supplied by `Select` (from its own props), but an item's own value
  **wins** - set them on a `MenuItem` to override the row's accent or text color.
- Hover and selected shading are derived from `theme.palette[color]` with hex-suffix opacity, so
  the row stays on-theme in both color schemes.
- `mousedown` is prevented so clicking an option does not blur `Select`'s trigger - the trigger
  keeps focus for its `aria-activedescendant` model. A menu row takes focus itself instead, and the
  pointer moves focus as it goes, so one row is highlighted at a time.
- A disabled menu row keeps pointer events, so its `note` tooltip shows on hover; the row sits in an entry (`role="none"`) with the description the tooltip keeps for it.
