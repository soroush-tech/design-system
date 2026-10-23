# Accordion

A heading that opens and closes a region of content. The first child is the `AccordionSummary` - a
button in a heading - and the rest is the region it opens: a `role="region"` named by the summary,
which in turn carries `aria-expanded` and `aria-controls`. The region opens and closes with
`Collapse`, or the transition given. Open or closed it owns, until `isExpanded` takes it over.

```tsx
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from '@soroush.tech/design-system/Accordion'

;<Accordion>
  <AccordionSummary>Shipping</AccordionSummary>
  <AccordionDetails>It leaves on Monday.</AccordionDetails>
  <AccordionActions>
    <Button variant="text">Track</Button>
  </AccordionActions>
</Accordion>
```

## Props

| Prop                             | Type                                      | Default                                      | Description                                                    |
| -------------------------------- | ----------------------------------------- | -------------------------------------------- | -------------------------------------------------------------- |
| `children`                       | `ReactNode`                               | -                                            | An `AccordionSummary`, then what it opens.                     |
| `isExpanded` / `defaultExpanded` | `boolean`                                 | `false`                                      | Whether it is open - controlled with `onChange`, or at first.  |
| `onChange`                       | `(event, isExpanded: boolean) => void`    | -                                            | Fired when the summary is pressed, with the state it asks for. |
| `disabled`                       | `boolean`                                 | `false`                                      | Stays as it is, and its summary is off.                        |
| `hasGutters`                     | `boolean`                                 | `true`                                       | Side padding on the summary, the details and the actions.      |
| `transition`                     | `ComponentType<AccordionTransitionProps>` | `Collapse`                                   | The transition that opens and closes the region.               |
| `borderRadius`                   | `keyof Theme['radii']`                    | `theme.defaults.surfaceRadius`, else square  | Corner radius.                                                 |
| `bg`                             | `keyof Theme['background']`               | `'paper'`                                    | Background.                                                    |
| `textColor`                      | `keyof Theme['text']`                     | `theme.defaults.textColor`, else `'initial'` | Text color.                                                    |
| `className`, `data-testid`       |                                           |                                              | On the root.                                                   |

It takes the styled-system space props too.

## The parts

| Part               | What it is                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `AccordionSummary` | The button in a heading. `expandIcon` is the icon that turns; `headingLevel` its level.           |
| `AccordionDetails` | The padded body of the region.                                                                    |
| `AccordionActions` | The foot of the region: buttons at the end of a row.                                              |
| `AccordionGroup`   | A column of accordions: the arrows, Home and End move between them; `isExclusive` keeps one open. |

Each part reads the `Accordion` it sits in, and says so if it sits in none.

## Keys

A summary is a button: Enter and Space open and close it. Inside an `AccordionGroup`:

| Key                | Does                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| ArrowDown, ArrowUp | Next and previous summary, round the ends; one that is off is skipped. |
| Home, End          | The first and the last summary.                                        |

## Customization

`theme.components.Accordion` styles the `root` and the `region`; `AccordionSummary` its `root` (the
heading), `button`, `content` and `icon`; `AccordionDetails`, `AccordionActions` and
`AccordionGroup` their `root`. `defaultProps` set `hasGutters`, `borderRadius`, `bg` and `textColor` (`Accordion`), `headingLevel`
(`AccordionSummary`) and `isExclusive` (`AccordionGroup`).

## Accessibility

- The summary is a `button` in a heading - the level is yours: `headingLevel`.
- Closed, the region is `visibility: hidden`, so its content is out of the tab order and has no
  name; open, it is a named `region`.
- The icon is decoration, hidden from assistive technology; it does not turn under reduced motion.
