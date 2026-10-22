# Alert

An inline message with a severity: an icon, the message, an optional `AlertTitle`, an action and a
close control. `role="alert"` is announced at once; `"status"`, politely. Every text is yours - the
message, and the close control's name (`closeLabel`) - no built-in English.

```tsx
import { Alert, AlertTitle } from '@soroush.tech/design-system/Alert'

;<Alert severity="success" onClose={dismiss} closeLabel="Dismiss">
  <AlertTitle>Saved</AlertTitle>
  Your changes are live.
</Alert>
```

## Props

| Prop                       | Type                                          | Default        | Description                                      |
| -------------------------- | --------------------------------------------- | -------------- | ------------------------------------------------ |
| `children`                 | `ReactNode`                                   | -              | The message. An `AlertTitle` may come first.     |
| `severity`                 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'`       | Picks the icon and the palette color.            |
| `variant`                  | `'standard' \| 'contained' \| 'outlined'`     | `'standard'`   | Tinted, filled, or only outlined.                |
| `icon`                     | `ReactNode \| false`                          | the severity's | The icon before the message; `false` draws none. |
| `action`                   | `ReactNode`                                   | -              | What sits at the end of the alert - a button.    |
| `onClose`                  | `(event) => void`                             | -              | Shows a close control.                           |
| `closeLabel`               | `string`                                      | -              | Names the close control.                         |
| `role`                     | `'alert' \| 'status'`                         | `'alert'`      | Announced at once, or politely.                  |
| `className`, `data-testid` |                                               |                | On the root.                                     |

It takes the styled-system space props too.

## Colors and contrast

- **Standard**: a tint of the severity's `main` (15%) behind the theme's `text.initial`; the icon is
  the severity's color.
- **Outlined**: a border in the severity's `main`, `text.initial` for the text.
- **Contained**: the severity's `main` with the theme's `contrastText` on it - so its contrast is the
  theme's, and a theme whose `contrastText` is too light on a `main` makes it so here too.

The standard and outlined texts are checked against AA in the tests, for each severity.

## Customization

`theme.components.Alert` styles the `root`, the `icon`, the `message`, the `action` and the
`closeButton`; `AlertTitle` its `root`. Its `defaultProps` set `severity`, `variant`, `closeLabel`
and `role`.

## Accessibility

- A `role="alert"` is announced as it appears; use `"status"` for what need not interrupt.
- The icon is decoration, hidden from assistive technology: the message says the rest.
- Name the close control with `closeLabel`: an icon alone says nothing.
