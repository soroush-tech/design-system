# Collapse

Opens and closes its content by its height - or, horizontal, its width. The size it moves to is
measured from the content as it starts, and left to the content once it is open, so content that
grows keeps showing. Closed, it keeps `collapsedSize`, and is hidden when that is nothing. A user
who asked for less motion (`prefers-reduced-motion: reduce`) sees it change at once, and the
callbacks still fire.

```tsx
import { Collapse } from '@soroush.tech/design-system/Collapse'

;<Collapse isShown={isOpen}>
  <p>Content that opens and closes.</p>
</Collapse>
```

## Props

| Prop                                 | Type                                   | Default                               | Description                                                       |
| ------------------------------------ | -------------------------------------- | ------------------------------------- | ----------------------------------------------------------------- |
| `children`                           | `ReactNode`                            | -                                     | What opens and closes.                                            |
| `isShown`                            | `boolean`                              | `false`                               | Whether it is open.                                               |
| `shouldAppear`                       | `boolean`                              | `true`                                | Moves on the first render too, when open.                         |
| `shouldMountOnEnter`                 | `boolean`                              | `false`                               | Keeps the content out of the tree until it is first opened.       |
| `shouldUnmountOnExit`                | `boolean`                              | `false`                               | Takes the content out of the tree once it is closed.              |
| `timeout`                            | `number \| { enter, exit }`            | `theme.transitions.duration.standard` | How long it takes, in milliseconds.                               |
| `easing`                             | `keyof Theme['transitions']['easing']` | `'standard'`                          | Which easing of the theme it moves by.                            |
| `collapsedSize`                      | `string \| number`                     | `0`                                   | The height - or width - it keeps when closed. A number is pixels. |
| `orientation`                        | `'vertical' \| 'horizontal'`           | `'vertical'`                          | Which way it opens.                                               |
| `onEnter`, `onEntering`, `onEntered` | `(node: HTMLElement) => void`          | -                                     | Fired before it opens, as it starts to, and when it is open.      |
| `onExit`, `onExiting`, `onExited`    | `(node: HTMLElement) => void`          | -                                     | Fired before it closes, as it starts to, and when it is closed.   |
| `className`, `data-testid`           |                                        |                                       | On the root.                                                      |

## Time and easing

The time and the easing come from `theme.transitions` - `duration` (`short`, `standard`, `long`)
and `easing` (`standard`, `enter`, `exit`) - so a theme changes how everything moves in one place.

## Customization

`theme.components.Collapse` styles the `root` (the box whose size moves), the `wrapper` that holds
the content and is measured, and the `inner` box. Its `defaultProps` set `orientation`,
`collapsedSize`, `timeout`, `easing` and `shouldAppear`.

## Accessibility

- Closed with no `collapsedSize`, the root is `visibility: hidden`, so its content is out of the
  tab order and the accessibility tree. With a `collapsedSize` it stays visible.
- Nothing moves for a user who asked for less motion.
- Use `shouldUnmountOnExit` for content that should not exist while it is closed.
- `Accordion` builds its panel on `Collapse`.
