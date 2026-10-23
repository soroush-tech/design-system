# Fab

A floating action button: the one main action of a page, circular - its icon - or extended, a pill
with a label. It is a `Button`, with its focus ring, press state and disabled behavior, raised on a
theme shadow. Where it floats is the page's: no position is built in.

```tsx
import { Fab } from '@soroush.tech/design-system/Fab'

;<Fab aria-label="Add" onClick={add}>
  <Icon name="add" color="inherit" />
</Fab>
;<Fab variant="extended" startIcon={<Icon name="add" color="inherit" />}>
  Create
</Fab>
```

## Props

| Prop                      | Type                       | Default      | Description                                                              |
| ------------------------- | -------------------------- | ------------ | ------------------------------------------------------------------------ |
| `variant`                 | `'circular' \| 'extended'` | `'circular'` | A circle, or a pill with a label.                                        |
| `color`                   | `keyof Theme['palette']`   | `'primary'`  | Resolves to `theme.palette`.                                             |
| `size`                    | `keyof Theme['sizes']`     | `'md'`       | Its height - and a circle's width - are those of an avatar of it.        |
| `startIcon`               | `ReactNode`                | -            | An extended fab's icon, before the label. A circular one is its content. |
| `disabled`                | `boolean`                  | `false`      | Off.                                                                     |
| `aria-label`              | `string`                   | -            | Names a fab with no text - a circular one.                               |
| `m`, `mx`, `p`, `px`, ... | `theme.space` keys         |              | Margin and padding as everywhere; they win over the fab's own.           |
| `onClick`, ...            |                            |              | Any `Button` prop but its look (`variant`, `shape`, loading, links).     |

## Touch target, motion and spacing

- **Touch target.** However small the fab, a target at least `theme.space[6]` (48px) square is centred on it and presses it. The fab is not drawn larger.
- **Motion.** Its shadow and colors move over `theme.transitions.duration.standard` with `easing.standard`, and not at all under `prefers-reduced-motion`. It rises on hover (`shadows[8]`) and is no higher pressed than at rest (`shadows[6]`).
- **Spacing.** Margin and padding are `theme.space` keys, and an instance's win over the fab's own.
- **Extended.** `paddingLeft` is `space[2]`, `paddingRight` `space[3]`, and the icon is `space[1.5]` from the label. The label is one line, cut with an ellipsis where its container ends.

## Customization

`theme.components.Fab` styles the `root` and the extended fab's `label`; the icon inside is `Button`'s own slot. Its
`defaultProps` set `variant`, `color` and `size`.

## Accessibility

- A circular fab has no text: name it with `aria-label` or `aria-labelledby`.
- It is a native `button`: Enter and Space press it, and it takes `Button`'s focus ring.
