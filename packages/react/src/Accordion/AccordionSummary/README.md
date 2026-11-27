# AccordionSummary

The header of an `Accordion`: a button in a heading that opens and closes it. It carries `aria-expanded` and `aria-controls` for the region, and an icon that turns as it opens. It must sit in an `Accordion`.

Client component: its entry carries `'use client'`, so a server component can import and render it.

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

## Overrides

`style` takes an entry of `StyleSheet.create`, or a list of them with `false`, `null` and `undefined`, and puts it on the root after the component's own styles. `slotProps` takes, for each slot (`root`, `button`, `content`, `icon`), a `style` of the same kind, a `className`, and `data-*` and `aria-*` attributes. On the root, `style` and `className` come after `slotProps.root`, so they win.
