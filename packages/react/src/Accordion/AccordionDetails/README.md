# AccordionDetails

What an `Accordion` opens: the padded body of its region. It must sit in an `Accordion`, and takes the side padding of its `hasGutters`.

Client component: its entry carries `'use client'`, so a server component can import and render it.

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

## Overrides

`style` takes an entry of `StyleSheet.create`, or a list of them with `false`, `null` and `undefined`, and puts it on the root after the component's own styles. `slotProps` takes, for each slot (`root`), a `style` of the same kind, a `className`, and `data-*` and `aria-*` attributes. On the root, `style` and `className` come after `slotProps.root`, so they win.
