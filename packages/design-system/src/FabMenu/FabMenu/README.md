# FabMenu

A `Fab` that opens a stack of actions - extended pills, each a `FabMenuItem` - from one corner of a page.
The trigger is a disclosure button (`aria-expanded`, `aria-controls`) whose icon turns to a close one while
the menu is open. The actions zoom in over `theme.transitions`, the one next to the trigger first, and are
out of the tree while it is closed. Where it floats is the page's: no position is built in.

```tsx
import { FabMenu, FabMenuItem } from '@soroush.tech/design-system/FabMenu'

;<FabMenu aria-label="Create">
  <FabMenuItem icon={<Icon name="add" color="inherit" />} onClick={newDocument}>
    New document
  </FabMenuItem>
  <FabMenuItem onClick={newFolder}>New folder</FabMenuItem>
</FabMenu>
```

## Props

| Prop                                       | Type                     | Default                    | Description                                                                                 |
| ------------------------------------------ | ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------- |
| `children`                                 | `FabMenuItem`s           | -                          | The actions, in the order they are drawn: top to bottom.                                    |
| `icon` / `closeIcon`                       | `ReactNode`              | an add icon / a close icon | The trigger's icon while closed and while open.                                             |
| `label`                                    | `ReactNode`              | -                          | A label makes the trigger an extended fab; without it, it is a circle.                      |
| `aria-label`                               | `string`                 | -                          | Names a trigger with no label - the same open or closed.                                    |
| `isOpen` / `defaultOpen`                   | `boolean`                | `false`                    | Controlled with `onOpen` and `onClose`, or at first.                                        |
| `onOpen` / `onClose`                       | `(event) => void`        | -                          | Fired when it asks to open or close - on a press, Escape, a press away or an action chosen. |
| `direction`                                | `'up'                    | 'down'                     | 'left'                                                                                      | 'right'`                                                                                                                       | `'up'` | A column above or below the trigger, or a row beside it. `left` and `right` are the page's start and end side, so they swap right to left. |
| `align`                                    | `'start'                 | 'end'`                     | `'end'`                                                                                     | The edge of the trigger a column lines up with; mirrored right to left. A row is level with the trigger, so it does not apply. |
| `color`                                    | `keyof Theme['palette']` | `'primary'`                | The trigger's color.                                                                        |
| `size`                                     | `keyof Theme['sizes']`   | `'md'`                     | The trigger's size, and the items'.                                                         |
| `m`, `p`, ... , `className`, `data-testid` |                          |                            | Spacing as `theme.space` keys; on the root.                                                 |

## Keyboard

- Enter and Space press the trigger. On a closed trigger the arrows of the axis the actions go along open it:
  ArrowUp and ArrowDown for a column, ArrowLeft and ArrowRight for a row.
- Open, those arrows move the focus along what is drawn - the actions and the trigger, top to bottom or
  from side to side - without wrapping, skipping an action that is off; Home and End go to the first and the
  last. A row reads the other way right to left, and so do its arrows. The other axis's arrows are the page's.
- Escape closes it and returns the focus to the trigger; so does choosing an action. A press anywhere else
  closes it too, and leaves the focus where the press put it.

## Customization

`theme.components.FabMenu` styles the `root` (the trigger's box) and the `list` (the stack of actions). Its
`defaultProps` set `direction`, `align`, `color` and `size`. The trigger and the items are `Fab`s: their
look is `theme.components.Fab`'s.

## Accessibility

- The trigger has `aria-expanded` and, while open, `aria-controls` the stack. A circular trigger needs an
  `aria-label`; an extended one is named by its label.
- Closed, the actions are `visibility: hidden`: out of the tab order and the accessibility tree.
- The stack is a disclosure of buttons, not a `menu`: use `Menu` for a list of commands that takes arrow
  keys as its only way in.
