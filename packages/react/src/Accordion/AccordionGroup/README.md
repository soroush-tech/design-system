# AccordionGroup

A column of accordions that move by the keys - ArrowDown and ArrowUp step between their summaries, round the ends, Home and End go to the first and the last, and one that is off is skipped - and, with `isExclusive`, keep one open at a time.

Client component: its entry carries `'use client'`, so a server component can import and render it.

```tsx
<AccordionGroup isExclusive>
  <Accordion>...</Accordion>
  <Accordion>...</Accordion>
</AccordionGroup>
```

## Props

| Prop                       | Type                        | Default       | Description                                                                                             |
| -------------------------- | --------------------------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| `children`                 | `ReactNode`                 | -             | The accordions.                                                                                         |
| `isExclusive`              | `boolean`                   | `false`       | Opening one closes the others. An accordion that was open at first stays until another is opened.       |
| `variant`                  | `'separated' \| 'attached'` | `'separated'` | `'attached'` joins them into one block: no gap, one border at each joint, only the outer corners round. |
| `className`, `data-testid` |                             |               | On the root.                                                                                            |

An accordion given `isExpanded` is its owner's, and the group leaves it alone. A key on any control in a region but a summary is that control's own. It takes the styled-system space props too.

## Customization

`theme.components.AccordionGroup` styles the `root`. Its `defaultProps` set `isExclusive` and `variant`.

## Overrides

`style` takes an entry of `StyleSheet.create`, or a list of them with `false`, `null` and `undefined`, and puts it on the root after the component's own styles. `slotProps` takes, for each slot (`root`), a `style` of the same kind, a `className`, and `data-*` and `aria-*` attributes. On the root, `style` and `className` come after `slotProps.root`, so they win.
