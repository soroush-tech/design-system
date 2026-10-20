# Breadcrumbs

The trail of links from a site's root to the current page, so a page shows where it sits and every
ancestor is one click away. A `nav` landmark named by `aria-label`, its crumbs an ordered list with
a separator between two; past `maxItems` the trail collapses to its first and last crumbs and a
button that shows them all.

The crumbs are yours - a `Link` for each ancestor, and the current page as `Typography` or a `Link`
marked `aria-current="page"`. The trail lays them out, separates and collapses them; it styles
none of them, so a router's link drops in as a crumb.

```tsx
import { Breadcrumbs } from '@soroush.tech/design-system/Breadcrumbs'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'

;<Breadcrumbs aria-label="Breadcrumb" expandLabel="Show path">
  <Link href="/" underline="hover" color="inherit">
    Home
  </Link>
  <Link href="/catalog" underline="hover" color="inherit">
    Catalog
  </Link>
  <Typography color="primary" aria-current="page">
    Accessories
  </Typography>
</Breadcrumbs>
```

## Props

| Prop                  | Type                                     | Default       | Description                                                                                                                 |
| --------------------- | ---------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `children`            | `ReactNode`                              | -             | The crumbs. Children that aren't elements are skipped.                                                                      |
| `as`                  | `ElementType`                            | `'nav'`       | The root element.                                                                                                           |
| `separator`           | `ReactNode`                              | `'/'`         | Between two crumbs, hidden from assistive technology. An icon separator mirrors right to left.                              |
| `maxItems`            | `number`                                 | `8`           | Past this many crumbs, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse` show, with a button between them. |
| `itemsBeforeCollapse` | `number`                                 | `1`           | Crumbs shown before the button when collapsed.                                                                              |
| `itemsAfterCollapse`  | `number`                                 | `1`           | Crumbs shown after the button when collapsed. When the two cover every crumb, nothing collapses.                            |
| `expandLabel`         | `string`                                 | -             | Names the button that shows the whole trail - no built-in text, so give it whenever the trail can collapse.                 |
| `slots`               | `{ collapsedIcon?: ElementType }`        | -             | An icon of your own in the button, in place of `more_horiz`.                                                                |
| `slotProps`           | `{ collapsedIcon?: Partial<IconProps> }` | -             | Props for the button's icon.                                                                                                |
| `color`               | `keyof Theme['text']`                    | `'secondary'` | The trail's and its separators' color - the root is a `Typography`.                                                         |
| `variant`             | `keyof Theme['typography']`              | `'body1'`     | The trail's type.                                                                                                           |
| `align`               | `TypographyAlign`                        | -             | Text alignment.                                                                                                             |
| `aria-label`          | `string`                                 | -             | Names the landmark - always give one.                                                                                       |

It takes every other `Typography` prop too - the styled-system space, layout and position props,
`className`, `id` and `data-testid`.

## Collapsing

A long trail shows its first and last crumbs and a button between them. Pressing it shows the
whole trail and moves focus to its first link, so focus isn't lost with the button. It stays open.

## Customization

`theme.components.Breadcrumbs` styles the `root`, the `list` (`ol`), each `item` (`li`), the
`separator`, the `collapsed` button and its `collapsedIcon`. Its `defaultProps` set `separator`,
`maxItems`, `itemsBeforeCollapse`, `itemsAfterCollapse`, `color` - and `expandLabel`, which gives
every trail the app's language:

```tsx
createTheme(baseTheme, {
  components: {
    Breadcrumbs: { defaultProps: { expandLabel: 'Afficher le chemin', separator: '›' } },
  },
})
```

## Accessibility

- Name the trail with `aria-label` - a `nav` landmark that's easy to find.
- Mark the current page's crumb `aria-current="page"`.
- The crumbs are an ordered list; the separators are hidden from assistive technology.
- The collapsed button is a native `button` named by `expandLabel`.
