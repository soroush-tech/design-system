# AccordionDetails

What an `Accordion` opens: the padded body of its region. It must sit in an `Accordion`, and takes the side padding of its `hasGutters`.

```tsx
<AccordionDetails>It leaves on Monday.</AccordionDetails>
```

## Props

| Prop                       | Type        | Default | Description               |
| -------------------------- | ----------- | ------- | ------------------------- |
| `children`                 | `ReactNode` | -       | What the accordion opens. |
| `className`, `data-testid` |             |         | On the root.              |

## Customization

`theme.components.AccordionDetails` styles the `root`.
