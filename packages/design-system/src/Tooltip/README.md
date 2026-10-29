# Tooltip

A short description of one child, shown on hover, keyboard focus and a long touch - a
`role="tooltip"` in a `Portal`, placed beside its child and flipped for want of room. It opens and
closes after their delays, stays open while the pointer is on the tooltip itself (so its text can be
read and selected), closes on Escape, and never takes or traps the focus. The text is yours: no
built-in English.

```tsx
import { Tooltip } from '@soroush.tech/design-system/Tooltip'

;<Tooltip title="Save the page" placement="bottom" hasArrow>
  <IconButton aria-label="Save">...</IconButton>
</Tooltip>
```

## Props

| Prop                                                            | Type                                                                             | Default                                      | Description                                                                                                                                       |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                                                      | `ReactElement?`                                                                  | -                                            | The one element it is about. It holds a `ref` and takes the handlers. None with `anchorPosition`.                                                 |
| `anchorPosition`                                                | `{ top, left }`                                                                  | -                                            | A point in the window (client coordinates, as Popover's) to place it at, not beside the child - with no child, `isOpen` opens it.                 |
| `title`                                                         | `ReactNode`                                                                      | -                                            | What it says. Nothing says no tooltip.                                                                                                            |
| `placement`                                                     | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'`, each with `-start` or `-end` | `'top'`                                      | The side of the child, and the end it lines up with; `auto` takes the side with the most room. Flips for want of room.                            |
| `slots`                                                         | `{ root?, arrow? }`                                                              | -                                            | The element a part is drawn as - the surface or the arrow. It keeps its styles.                                                                   |
| `slotProps`                                                     | `{ root?, arrow? }`                                                              | -                                            | Props for a part, put first: the tooltip's own `ref`, `id`, `role`, pointer handlers and the arrow's position win.                                |
| `hasArrow`                                                      | `boolean`                                                                        | `false`                                      | An arrow towards the middle of the child.                                                                                                         |
| `enterDelay` / `leaveDelay`                                     | `number`                                                                         | `100` / `0`                                  | In milliseconds: before it opens, and after the pointer or focus has left.                                                                        |
| `enterTouchDelay` / `leaveTouchDelay`                           | `number`                                                                         | `700` / `1500`                               | How long a touch is held to open it, and how long after it ends it closes.                                                                        |
| `shouldDescribeChild`                                           | `boolean`                                                                        | `false`                                      | Describes the child (`aria-describedby`, while open) instead of naming it (`aria-label`).                                                         |
| `isDescriptionPersistent`                                       | `boolean`                                                                        | `false`                                      | With `shouldDescribeChild`: describes the child all the time, by a hidden copy of the `title`, as a native `title` does.                          |
| `isOpen` / `defaultOpen`                                        | `boolean`                                                                        | `false`                                      | Controlled with `onOpen` and `onClose`, or at first.                                                                                              |
| `onOpen` / `onClose`                                            | `(event) => void`                                                                | -                                            | Fired when it asks to open or close - once each, however often it is asked.                                                                       |
| `isInteractive`                                                 | `boolean`                                                                        | `true`                                       | Whether the pointer can move onto the tooltip, which then stays open. With `false` it takes no pointer events - a click goes to what is under it. |
| `shouldOpenOnHover` / `shouldOpenOnFocus` / `shouldOpenOnTouch` | `boolean`                                                                        | `true`                                       | What opens it. Focus is keyboard focus: a press with the pointer is not.                                                                          |
| `layer`                                                         | `keyof Theme['zOrder']`                                                          | `'tooltip'`                                  | Stacking layer.                                                                                                                                   |
| `borderRadius`                                                  | `keyof Theme['radii']`                                                           | `theme.defaults.surfaceRadius`, else square  | Corner radius.                                                                                                                                    |
| `bg`                                                            | `keyof Theme['background']`                                                      | `'modal'`                                    | Background.                                                                                                                                       |
| `textColor`                                                     | `keyof Theme['text']`                                                            | `theme.defaults.textColor`, else `'initial'` | Text color.                                                                                                                                       |
| `className`, `data-testid`                                      |                                                                                  |                                              | On the tooltip.                                                                                                                                   |

## Naming and describing

By default a text `title` names its child (`aria-label`) - for an icon with no text of its own - unless the
child already has a name. With `shouldDescribeChild` it describes it instead: the child gets
`aria-describedby` for as long as the tooltip is open, added to a description it already has.

With `isDescriptionPersistent` as well, the description holds while the tooltip is closed, as that of a
native `title` does: a visually hidden copy of the `title` is rendered beside the child, outside the
`Portal`, and the child points at it the whole time (the open tooltip is then not read a second time).
It is in the server-rendered HTML. It is one more element beside the child, which a parent that counts
its children will see.

## At a point

With `anchorPosition` the tooltip is placed at a point in the window, not beside a child - for a hint
that depends on where the pointer is, such as a canvas. It needs no child, and is open when `isOpen` says
so; with a `title` that changes as the point does, it follows both. It keeps its gap from the point, and
flips to the other side for want of room, as it does around a child. With a child and a point, the point
wins, and neither the child's hover, focus and touch nor the pointer on the tooltip open or close it (an open asked for just before is dropped): `isOpen` does. Escape still asks it to close, through `onClose`. Nothing describes or names a child it does not have.

## A tooltip that is not interactive

By default the pointer can move onto the tooltip and it stays open, so its text can be read and selected
(WCAG 1.4.13), and a click on it is a click on the tooltip. For a text hint that holds nothing to use, set
`isInteractive={false}`: the surface takes no pointer events, so a click goes to what is under it, and the
tooltip closes as the pointer leaves the child.

A press of the child closes the tooltip as a native `title` goes away: a mouse or pen press, not a touch,
which is left to its long press. A press anywhere else cannot let a click through - the click goes to what
was under the pointer when it went down, which is the tooltip - so only `isInteractive={false}` does.

## A disabled child

A disabled control sends no pointer events of its own (React holds them back), so a `Tooltip` around
one would never open. When the child has `disabled`, the tooltip wraps it in an inline-grid `span` and
listens, and is placed, on that. The control keeps its own `ref`; nothing else changes, and a child that
is not disabled is not wrapped. A disabled control cannot take the focus, so it opens on hover and touch.

## Customization

`theme.components.Tooltip` styles the `root` (the surface) and the `arrow`. Its `defaultProps` set `placement`,
`hasArrow`, `layer`, `borderRadius`, `bg`, `textColor`, `enterDelay`, `leaveDelay`, `enterTouchDelay`,
`leaveTouchDelay`, `shouldDescribeChild`, `isDescriptionPersistent`, `shouldOpenOnHover`,
`shouldOpenOnFocus` and `shouldOpenOnTouch` - not `children`, `title`, `anchorPosition`, `isOpen` or the
handlers. The arrow takes the surface's background. The `tooltip` key of `theme.zOrder` is its layer.

## Server rendering

The tooltip is drawn in a `Portal`, which renders nothing on the server: it is absent from server-rendered and prerendered HTML, and mounts on the client when it opens (on a click, hover, focus or key, or when the app sets it open). One that starts open, by its open prop, is still closed in the static HTML and opens on hydration. Its trigger renders on the server as usual.

## Accessibility

- `role="tooltip"`, with the child named or described by it.
- Opens on keyboard focus and closes on Escape; stays open while hovered (WCAG 1.4.13: dismissible,
  hoverable, persistent) - unless `isInteractive={false}`, for a hint with nothing in it to use.
- Never takes the focus, and holds nothing that needs it: a tooltip is for text, not controls.
- Placed by `useAnchoredPlacement`, shared with `Menu`: it follows its child as the page scrolls.
