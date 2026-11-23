# AccordionActions

The foot of an `Accordion` region: its buttons, at the end of a row. It must sit in an `Accordion`, and takes the side padding of its `hasGutters`.

```tsx
<AccordionActions>
  <Button variant="text">Track</Button>
</AccordionActions>
```

## Props

| Prop                       | Type        | Default | Description  |
| -------------------------- | ----------- | ------- | ------------ |
| `children`                 | `ReactNode` | -       | The buttons. |
| `className`, `data-testid` |             |         | On the root. |

## Customization

`theme.components.AccordionActions` styles the `root`.
