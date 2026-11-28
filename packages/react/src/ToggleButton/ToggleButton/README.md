# ToggleButton

An individual toggle button (text or icon) - usable standalone or inside a `ToggleButtonGroup`.
Built on `Button`: it pins `variant="outlined"` and layers selected/unselected color styles on
top, so everything else (`size`, `shape`, `gap`, `startIcon` / `endIcon`, `loading`, `fullWidth`,
space/layout/border/typography props) is inherited. `variant`, `href`, `target`, and `rel` are
not part of the API. Reflects its active state via `aria-pressed`; when grouped, selection comes
from `ToggleButtonGroupContext` and color / size / disabled / fullWidth from `ButtonGroupContext`
(explicit props always win).

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
<ToggleButton
  value="check"
  isSelected={isSelected}
  onChange={() => setIsSelected((prev) => !prev)}
  aria-label="check"
>
  <Icon name="check" size="1em" color="inherit" />
</ToggleButton>
```

## Props

| Prop         | Type                                | Default     | Description                                                        |
| ------------ | ----------------------------------- | ----------- | ------------------------------------------------------------------ |
| `value`      | `string \| number`                  | -           | The value associated with the button inside a group. **Required.** |
| `isSelected` | `boolean`                           | _inferred_  | Active state - inferred from the group's value when omitted.       |
| `color`      | `keyof Theme['palette']`            | `'default'` | Active-state color. Inherited from the group.                      |
| `onChange`   | `(value: string \| number) => void` | -           | Fired with the button's `value` when toggled.                      |
| `loading`    | `boolean`                           | `false`     | Shows a spinner and disables the button - e.g. while saving.       |

All other `Button` props (except `variant` / `href` / `target` / `rel`) pass through. `type`
defaults to `'button'`. Icon-only buttons need an `aria-label`.

## Overriding the CSS

`style` takes an entry of `StyleSheet.create`, or a list of entries with `false`, `null` and `undefined` for a condition that is off, and overrides the CSS of the root. A plain style object is a type error.

`slotProps` takes one object for each slot of `ToggleButton` - `root` - the slots `theme.components.ToggleButton` styles. A slot object holds `style` (an entry or a list, as above), `className` and `data-*` and `aria-*` attributes, and nothing else. A slot's `style` is merged after the slot's own styles and the theme's. For the root, `style` and `slotProps.root.style` are one channel: when both are given, `style` comes last and wins, and the class names are joined.

```tsx
import { StyleSheet } from '@gild-ui/react'

const overrides = StyleSheet.create({ tight: { padding: 0 } })

;<ToggleButton
  style={overrides.tight}
  slotProps={{ root: { 'data-testid': 'togglebutton-root' } }}
/>
```
