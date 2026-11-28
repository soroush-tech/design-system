# AlertTitle

The title of an `Alert`: its first line of the message, in a heavier weight.

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
<Alert severity="success">
  <AlertTitle>Saved</AlertTitle>
  Your changes are live.
</Alert>
```

## Props

| Prop                       | Type        | Default | Description  |
| -------------------------- | ----------- | ------- | ------------ |
| `children`                 | `ReactNode` | -       | The title.   |
| `className`, `data-testid` |             |         | On the root. |

## Customization

`theme.components.AlertTitle` styles the `root`.

## Overrides

`style` takes an entry of `StyleSheet.create`, or a list of them with `false`, `null` and `undefined`, and puts it on the root after the component's own styles. `slotProps` takes, for each slot (`root`), a `style` of the same kind, a `className`, and `data-*` and `aria-*` attributes. On the root, `style` and `className` come after `slotProps.root`, so they win.
