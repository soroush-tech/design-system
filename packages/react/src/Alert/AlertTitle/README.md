# AlertTitle

The title of an `Alert`: its first line of the message, in a heavier weight.

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
