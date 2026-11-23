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

| Prop                      | Type                       | Default      | Description                                                                                                            |
| ------------------------- | -------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `variant`                 | `'circular' \| 'extended'` | `'circular'` | A circle, or a pill with a label.                                                                                      |
| `color`                   | `keyof Theme['palette']`   | `'primary'`  | Resolves to `theme.palette`.                                                                                           |
| `size`                    | `keyof Theme['sizes']`     | `'md'`       | Its height - and a circle's width - are those of an avatar of it.                                                      |
| `startIcon`               | `ReactNode`                | -            | An extended fab's icon, before the label. A circular one is its content.                                               |
| `isCollapsed`             | `boolean`                  | `false`      | Draws an extended fab as a circle - its icon alone - and back, the label moving in and out. A circular fab ignores it. |
| `disabled`                | `boolean`                  | `false`      | Off.                                                                                                                   |
| `aria-label`              | `string`                   | -            | Names a fab with no text - a circular one.                                                                             |
| `m`, `mx`, `p`, `px`, ... | `theme.space` keys         |              | Margin and padding as everywhere; they win over the fab's own.                                                         |
| `onClick`, ...            |                            |              | Any `Button` prop but its look (`variant`, `shape`, loading, links).                                                   |

## With a menu

A fab can be the `trigger` of a `Menu`: it takes the menu's `aria-haspopup` and `aria-expanded`, opens it on a click, Enter and Space, and names it. Use `align="end"` so the list lines up with the fab's end edge; it flips above the fab where the window has no room below.

```tsx
;<Menu align="end" aria-label="Create" trigger={<Fab aria-label="Create">{add}</Fab>}>
  <MenuItem value="document">New document</MenuItem>
</Menu>
```

## Collapsing

An extended fab collapses to a circle - the pattern for a page that scrolls: extended at the top, collapsed while it is scrolled - when `isCollapsed` is set. Its label moves out over `theme.transitions.duration.standard` (instantly under `prefers-reduced-motion`), the padding goes and the fab is as wide as it is tall, so the icon is centred in a circle, and the label stays in the tree, so a collapsed fab keeps its name. The app decides when, from its scroll or anything else.

```tsx
;<Fab variant="extended" isCollapsed={isScrolled} startIcon={<Icon name="add" color="inherit" />}>
  Create
</Fab>
```

## Touch target, motion and spacing

- **Touch target.** However small the fab, a target at least `theme.space[6]` (48px) square is centred on it and presses it. The fab is not drawn larger.
- **Motion.** Its shadow and colors move over `theme.transitions.duration.standard` with `easing.standard`, and not at all under `prefers-reduced-motion`. It rises on hover (`shadows[8]`) and is no higher pressed than at rest (`shadows[6]`).
- **Spacing.** Margin and padding are `theme.space` keys, and an instance's win over the fab's own.
- **Extended.** `paddingLeft` is `space[2]`, `paddingRight` `space[3]`, and the icon is `space[1.5]` from the label. The label is one line, cut with an ellipsis where its container ends.

## Customization

`theme.components.Fab` styles the `root`, the extended fab's `label` (the column that collapses) and its `labelText`; the icon inside is `Button`'s own slot. Its
`defaultProps` set `variant`, `color` and `size`.

## Accessibility

- A circular fab has no text: name it with `aria-label` or `aria-labelledby`.
- It is a native `button`: Enter and Space press it, and it takes `Button`'s focus ring.
