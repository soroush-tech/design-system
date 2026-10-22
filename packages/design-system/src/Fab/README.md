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

| Prop           | Type                       | Default      | Description                                                              |
| -------------- | -------------------------- | ------------ | ------------------------------------------------------------------------ |
| `variant`      | `'circular' \| 'extended'` | `'circular'` | A circle, or a pill with a label.                                        |
| `color`        | `keyof Theme['palette']`   | `'primary'`  | Resolves to `theme.palette`.                                             |
| `size`         | `keyof Theme['sizes']`     | `'md'`       | Its height - and a circle's width - are those of an avatar of it.        |
| `startIcon`    | `ReactNode`                | -            | An extended fab's icon, before the label. A circular one is its content. |
| `disabled`     | `boolean`                  | `false`      | Off.                                                                     |
| `aria-label`   | `string`                   | -            | Names a fab with no text - a circular one.                               |
| `onClick`, ... |                            |              | Any `Button` prop but its look (`variant`, `shape`, loading, links).     |

## Customization

`theme.components.Fab` styles the `root`; the label and icon inside are `Button`'s own slots. Its
`defaultProps` set `variant`, `color` and `size`.

## Accessibility

- A circular fab has no text: name it with `aria-label` or `aria-labelledby`.
- It is a native `button`: Enter and Space press it, and it takes `Button`'s focus ring.
