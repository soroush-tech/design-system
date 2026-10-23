# Chip

A compact tag: a label, an optional icon or avatar, and - given `onClick` - a button, and - given
`onDelete` - a delete control. A clickable chip is one tab stop. A deletable one deletes through its
control and through Backspace and Delete on the chip, so the control itself is out of the tab order;
it is a button of its own, not a child of the chip's, so pressing it never clicks the chip.

Every text is yours: the label, and the delete control's name (`deleteLabel`) - no built-in English.

```tsx
import { Chip } from '@soroush.tech/design-system/Chip'

;<Chip label="Design" color="primary" />
;<Chip label="Design" onClick={open} />
;<Chip label="Design" onDelete={remove} deleteLabel="Remove Design" />
```

## Props

| Prop                       | Type                                  | Default       | Description                                                  |
| -------------------------- | ------------------------------------- | ------------- | ------------------------------------------------------------ |
| `label`                    | `ReactNode`                           | -             | What the chip says. A long one truncates with an ellipsis.   |
| `variant`                  | `'contained' \| 'outlined' \| 'text'` | `'contained'` | Filled, outlined, or only its text - as `Button`'s.          |
| `color`                    | `keyof Theme['palette']`              | `'default'`   | Resolves to `theme.palette`.                                 |
| `size`                     | `keyof Theme['sizes']`                | `'md'`        | Resolves against `theme.sizes`.                              |
| `shape`                    | `'square' \| 'rounded' \| 'pill'`     | `'pill'`      | The corners: 0, `theme.radii.md`, or fully round.            |
| `borderRadius`             | `keyof Theme['radii']`                | `'md'`        | The radius of a `'rounded'` chip; other shapes ignore it.    |
| `icon`                     | `ReactNode`                           | -             | An icon before the label. An `avatar` takes its place.       |
| `avatar`                   | `ReactNode`                           | -             | An avatar before the label.                                  |
| `onClick`                  | `(event) => void`                     | -             | Makes the chip a button.                                     |
| `onDelete`                 | `(event) => void`                     | -             | Shows a delete control, and deletes on Backspace and Delete. |
| `deleteLabel`              | `string`                              | -             | Names the delete control.                                    |
| `disabled`                 | `boolean`                             | `false`       | Stays as it is, off.                                         |
| `className`, `data-testid` |                                       |               | On the root.                                                 |

It takes the styled-system space props too.

## Colors

A filled chip is the `main` of its color with the theme's `contrastText` on it, so its contrast is the
theme's. Outlined, it is the color as its border and text; with no color (`'default'`), the theme's
`border.default` and `text.initial`.

## Customization

`theme.components.Chip` styles the `root`, the `body` (what is pressed: a button when clickable), the
`label`, the `icon`, the `avatar` and the `deleteIcon` (the delete control). Its `defaultProps` set
`variant`, `color`, `size`, `shape`, `borderRadius` and `deleteLabel`.

## Accessibility

- A plain chip is text, not focusable. A clickable one is a `button`.
- A chip that only deletes takes the focus, for Backspace and Delete.
- Name the delete control with `deleteLabel`: an icon alone says nothing.
- `Autocomplete` shows its multiple values as chips.
