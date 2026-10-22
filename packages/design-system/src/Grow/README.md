# Grow

Grows one child in from a little smaller, fading as it does, and shrinks it out. The child holds a `ref` and takes a `style` - a `ref`-holding component, or a DOM element - and the transition draws its opacity and its scale on it. Out, the child is hidden, so it takes no click or focus. A user who asked for less motion (`prefers-reduced-motion: reduce`) sees it change at once, and the callbacks still fire.

```tsx
import { Grow } from '@soroush.tech/design-system/Grow'

;<Grow isShown={isOpen}>
  <Paper p={3}>Content</Paper>
</Grow>
```

## Props

| Prop                                 | Type                                   | Default                          | Description                                                     |
| ------------------------------------ | -------------------------------------- | -------------------------------- | --------------------------------------------------------------- |
| `children`                           | `ReactElement`                         | -                                | The one element that moves.                                     |
| `isShown`                            | `boolean`                              | `false`                          | Whether the child is shown.                                     |
| `shouldAppear`                       | `boolean`                              | `true`                           | Moves on the first render too, when shown.                      |
| `shouldMountOnEnter`                 | `boolean`                              | `false`                          | Keeps the child out of the tree until it is first shown.        |
| `shouldUnmountOnExit`                | `boolean`                              | `false`                          | Takes the child out of the tree once it is out.                 |
| `timeout`                            | `number                                | { enter: number; exit: number }` | `theme.transitions.duration.standard`                           | How long it takes, in milliseconds. |
| `easing`                             | `keyof Theme['transitions']['easing']` | `'standard'`                     | Which easing of the theme it moves by.                          |
| `onEnter`, `onEntering`, `onEntered` | `(node: HTMLElement) => void`          | -                                | Fired before it moves in, as it starts to, and when it is in.   |
| `onExit`, `onExiting`, `onExited`    | `(node: HTMLElement) => void`          | -                                | Fired before it moves out, as it starts to, and when it is out. |

## Time and easing

The time and the easing come from `theme.transitions` - `duration` (`short`, `standard`, `long`) and `easing` (`standard`, `enter`, `exit`) - so a theme changes how everything moves in one place.

## Accessibility

- Out, the child is `visibility: hidden`, so it is out of the tab order and the accessibility tree.
- Nothing moves for a user who asked for less motion.
- Use `shouldUnmountOnExit` for content that should not exist while it is out.
