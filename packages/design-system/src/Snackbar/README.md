# Snackbar

A transient message in a corner of the window, through a `Portal`. It hides itself after
`autoHideDuration` - the clock stops while the pointer or the focus is on it, and starts again for
`resumeHideDuration` once they leave - and asks to close on Escape and on a click away, `onClose`
told why. It is a `role="status"`, announced politely, and never takes the focus. Several at once do
not stack: the app queues them.

```tsx
import { Snackbar } from '@soroush.tech/design-system/Snackbar'

;<Snackbar
  isOpen={isOpen}
  onClose={(_event, reason) => reason !== 'clickaway' && setIsOpen(false)}
  autoHideDuration={4000}
  message="Saved"
  action={<Button variant="text">Undo</Button>}
/>
```

## Props

| Prop                       | Type                                                                        | Default                                       | Description                                                            |
| -------------------------- | --------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| `isOpen`                   | `boolean`                                                                   | -                                             | Whether it is shown. Controlled with `onClose`.                        |
| `defaultOpen`              | `boolean`                                                                   | `false`                                       | Whether it is shown at first, when uncontrolled.                       |
| `onClose`                  | `(event, reason: 'timeout' \| 'clickaway' \| 'escapeKeyDown') => void`      | -                                             | Fired when it asks to close, with why.                                 |
| `autoHideDuration`         | `number`                                                                    | -                                             | How long it stays, in milliseconds. Without it, it stays until closed. |
| `resumeHideDuration`       | `number`                                                                    | half of `autoHideDuration`                    | How long it stays once the pointer or focus has left it.               |
| `message`, `action`        | `ReactNode`                                                                 | -                                             | The message, and what sits after it - a button.                        |
| `children`                 | `ReactNode`                                                                 | -                                             | What it holds in place of the message and the action - an `Alert`.     |
| `anchorOrigin`             | `{ vertical: 'top' \| 'bottom', horizontal: 'start' \| 'center' \| 'end' }` | `{ vertical: 'bottom', horizontal: 'start' }` | The corner of the window; `start` and `end` swap right to left.        |
| `transition`               | `ComponentType<TransitionProps>`                                            | `Grow`                                        | The transition that shows and hides it. It must tell `onExited`.       |
| `layer`                    | `keyof Theme['zOrder']`                                                     | `'snackbar'`                                  | Stacking layer.                                                        |
| `container`                | `HTMLElement \| (() => HTMLElement \| null)`                                | `document.body`                               | Portal target.                                                         |
| `borderRadius`             | `keyof Theme['radii']`                                                      | `theme.defaults.surfaceRadius`, else square   | Corner radius.                                                         |
| `bg`                       | `keyof Theme['background']`                                                 | `'modal'`                                     | Background.                                                            |
| `textColor`                | `keyof Theme['text']`                                                       | `theme.defaults.textColor`, else `'initial'`  | Text color.                                                            |
| `className`, `data-testid` |                                                                             |                                               | On the root - the place it sits in.                                    |

## Closing

Controlled, it never closes on its own: it asks - `onClose` is told `'timeout'`, `'escapeKeyDown'` or
`'clickaway'` - and the owner sets `isOpen`. Uncontrolled, it closes itself on a time out and on
Escape, but not on a click away. An owner that does not want a click away to close it ignores that
reason.

## Customization

`theme.components.Snackbar` styles the `root` (the fixed place), the `content` (the bar), the `message`
and the `action`. Its `defaultProps` set `anchorOrigin`, `autoHideDuration`, `resumeHideDuration` and
`layer`, `borderRadius`, `bg` and `textColor`. The `snackbar` key of `theme.zOrder` is its layer.

## Server rendering

The snackbar is drawn in a `Portal`, which renders nothing on the server: it is absent from server-rendered and prerendered HTML, and mounts on the client when it opens (on a click, hover, focus or key, or when the app sets it open). One that starts open, by its open prop, is still closed in the static HTML and opens on hydration. Its trigger renders on the server as usual.

## Accessibility

- `role="status"` is a polite live region: it is read when the user is idle.
- It never takes the focus, so it never interrupts typing.
- A message that hides itself cannot be the only way to learn something: for an error that must be
  read, keep it open or put it in an `Alert`.
