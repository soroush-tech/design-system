# Chip

A small pill-shaped label for compact metadata - version badges, statuses, counts. Renders
through `Typography`, so the full Typography prop surface applies. Part of `@soroush.tech/lab`:
the API may change before the component is promoted into the design system.

---

## Chip-specific props

### `as`

Element to render. Default: `` `span` ``.

### `variant`

Typography variant for the label text. Default: `` `caption` ``.

## Inherited props (from `Typography`)

Every `Typography` prop applies: `color`, typography scales, and the styled-system
space/layout props.

## Base styles

| CSS property    | Resolved value             |
| --------------- | -------------------------- |
| `padding`       | `space[0.5] space[2]`      |
| `border`        | `1px solid` `border.light` |
| `border-radius` | `999px` (pill)             |
| `line-height`   | `lineHeights.none`         |

## Examples

```tsx
import { Chip } from '@soroush.tech/lab/Chip'

// Version badge
<Chip>v1.3.3</Chip>

// Emphasized
<Chip color="primary" variant="body2">beta</Chip>
```
