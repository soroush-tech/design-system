# Badge

A count or a dot anchored over another element. The badge is decoration: it is hidden from assistive
technology, and `badgeLabel` is what is heard instead - read with its child and, over one element,
as that element's description. A count past `max` shows as `max+`, and a count of zero - or nothing -
shows no badge, unless `shouldShowZero`.

```tsx
import { Badge } from '@soroush.tech/design-system/Badge'

;<Badge badgeContent={4} badgeLabel="4 unread">
  <Button>Inbox</Button>
</Badge>
```

## Props

| Prop                       | Type                                                            | Default                                  | Description                                                             |
| -------------------------- | --------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `children`                 | `ReactNode`                                                     | -                                        | What the badge sits over.                                               |
| `badgeContent`             | `ReactNode`                                                     | -                                        | The count or the text.                                                  |
| `max`                      | `number`                                                        | `99`                                     | Above it, a number shows as `max+`.                                     |
| `variant`                  | `'standard' \| 'dot'`                                           | `'standard'`                             | A count, or only a dot. A dot has no content, and is not hidden for it. |
| `color`                    | `keyof Theme['palette']`                                        | `'error'`                                | Resolves to `theme.palette`; the text is the theme's `contrastText`.    |
| `isHidden`                 | `boolean`                                                       | `false`                                  | Draws no badge.                                                         |
| `shouldShowZero`           | `boolean`                                                       | `false`                                  | Draws a badge for a count of zero.                                      |
| `anchorOrigin`             | `{ vertical: 'top' \| 'bottom', horizontal: 'start' \| 'end' }` | `{ vertical: 'top', horizontal: 'end' }` | The corner it sits on. `'end'` is the left in a right-to-left page.     |
| `overlap`                  | `'rectangular' \| 'circular'`                                   | `'rectangular'`                          | Sits on the box's corner, or on the curve of a circle.                  |
| `badgeLabel`               | `string`                                                        | -                                        | What a screen reader hears - no built-in English.                       |
| `className`, `data-testid` |                                                                 |                                          | On the root.                                                            |

It takes the styled-system space props too.

## Customization

`theme.components.Badge` styles the `root`, the `badge` and the visually hidden `label`. Its
`defaultProps` set `max`, `variant`, `color`, `anchorOrigin` and `overlap`.

## Accessibility

- The visible badge is `aria-hidden`: a count heard as a bare number says little.
- `badgeLabel` is a visually hidden text after the child. Over one element it also becomes that
  element's `aria-describedby` (added to what it has), so a button reads "Inbox, 4 unread".
- No label is rendered for a badge that is not drawn.
