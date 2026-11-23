# AccordionSummary

The header of an `Accordion`: a button in a heading that opens and closes it. It carries `aria-expanded` and `aria-controls` for the region, and an icon that turns as it opens. It must sit in an `Accordion`.

```tsx
<AccordionSummary headingLevel={2}>Shipping</AccordionSummary>
```

## Props

| Prop                       | Type        | Default                | Description                      |
| -------------------------- | ----------- | ---------------------- | -------------------------------- |
| `children`                 | `ReactNode` | -                      | What the header says.            |
| `expandIcon`               | `ReactNode` | the `expand_more` icon | The icon that turns as it opens. |
| `headingLevel`             | `1          | 2                      | 3                                | 4   | 5   | 6`  | `3` | The level of the heading the button sits in. |
| `className`, `data-testid` |             |                        | On the heading.                  |

## Customization

`theme.components.AccordionSummary` styles the `root` (the heading), the `button`, its `content` and the `icon`. Its `defaultProps` set `headingLevel`.
