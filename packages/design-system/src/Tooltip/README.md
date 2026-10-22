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

| Prop                                                            | Type                                                                   | Default        | Description                                                                               |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------- |
| `children`                                                      | `ReactElement`                                                         | -              | The one element it is about. It holds a `ref` and takes the handlers.                     |
| `title`                                                         | `ReactNode`                                                            | -              | What it says. Nothing says no tooltip.                                                    |
| `placement`                                                     | `'top' \| 'bottom' \| 'left' \| 'right'`, each with `-start` or `-end` | `'top'`        | The side of the child, and the end it lines up with. Flips for want of room.              |
| `hasArrow`                                                      | `boolean`                                                              | `false`        | An arrow towards the middle of the child.                                                 |
| `enterDelay` / `leaveDelay`                                     | `number`                                                               | `100` / `0`    | In milliseconds: before it opens, and after the pointer or focus has left.                |
| `enterTouchDelay` / `leaveTouchDelay`                           | `number`                                                               | `700` / `1500` | How long a touch is held to open it, and how long after it ends it closes.                |
| `shouldDescribeChild`                                           | `boolean`                                                              | `false`        | Describes the child (`aria-describedby`, while open) instead of naming it (`aria-label`). |
| `isOpen` / `defaultOpen`                                        | `boolean`                                                              | `false`        | Controlled with `onOpen` and `onClose`, or at first.                                      |
| `onOpen` / `onClose`                                            | `(event) => void`                                                      | -              | Fired when it asks to open or close - once each, however often it is asked.               |
| `shouldOpenOnHover` / `shouldOpenOnFocus` / `shouldOpenOnTouch` | `boolean`                                                              | `true`         | What opens it. Focus is keyboard focus: a press with the pointer is not.                  |
| `layer`                                                         | `keyof Theme['zOrder']`                                                | `'tooltip'`    | Stacking layer.                                                                           |
| `className`, `data-testid`                                      |                                                                        |                | On the tooltip.                                                                           |

## Naming and describing

By default a text `title` names its child (`aria-label`) - for an icon with no text of its own - unless the
child already has a name. With `shouldDescribeChild` it describes it instead: the child gets
`aria-describedby` for as long as the tooltip is open, added to a description it already has.

## Customization

`theme.components.Tooltip` styles the `root` (the surface) and the `arrow`. Its `defaultProps` set every
prop above but `title` and `isOpen`. The `tooltip` key of `theme.zOrder` is its layer.

## Server rendering

The tooltip is drawn in a `Portal`, which renders nothing on the server: it is absent from server-rendered and prerendered HTML, and mounts on the client when it opens (on a click, hover, focus or key, or when the app sets it open). One that starts open, by its open prop, is still closed in the static HTML and opens on hydration. Its trigger renders on the server as usual.

## Accessibility

- `role="tooltip"`, with the child named or described by it.
- Opens on keyboard focus and closes on Escape; stays open while hovered (WCAG 1.4.13: dismissible,
  hoverable, persistent).
- Never takes the focus, and holds nothing that needs it: a tooltip is for text, not controls.
- Placed by `useAnchoredPlacement`, shared with `Menu`: it follows its child as the page scrolls.
