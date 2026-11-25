# The style system

`useStyle`, `withStyles` and `StylesConsumer` (`@soroush.design/react/useStyle`, `/withStyles` and `/StylesConsumer`) resolve a style that is either a plain object or a function of the theme into the `CSSObject` a component applies. It is for styles you write yourself; the components of the library use the same helpers.

```ts
import { useStyle, withStyles, StylesConsumer } from '@soroush.design/react'
```

A **style input** is a `CSSObject`, or a factory: an object with a `getStyles(theme)` method that returns one. A factory reads the active theme, so its values follow a theme change.

```tsx
import type { Theme } from '@soroush.design/core/theme'

const card = {
  getStyles: (theme: Theme) => ({ padding: theme.space[2], borderRadius: theme.radii.md }),
}
```

## `useStyle(style)`

A hook. Returns the `CSSObject` of a style input, calling `getStyles` with the theme from `ThemeProvider` when the input is a factory.

```tsx
function Panel() {
  const styles = useStyle(card)
  return <View css={styles}>...</View>
}
```

## `withStyles(style)(Component)`

A higher-order component. The wrapped component receives the resolved `CSSObject` as its `styles` prop.

## `StylesConsumer`

The same as a render prop, for a class component or a place a hook cannot be called: `<StylesConsumer style={card}>{(styles) => ...}</StylesConsumer>`. The `style` prop takes a factory.

Where a style belongs to a component of the library, change it through `theme.components` instead - see [how to customize](./customization.md).

## Values in a style

Write these with the functions of the package, not by joining text: a theme token is a reference to a CSS variable, and a hex digit, a minus or a unit glued after it is not valid CSS.

```tsx
import { alpha, negate, styled, useStyleValue } from '@soroush.design/react'

const Tint = styled('div')(({ theme }) => ({
  // A colour at an opacity: `alpha(color, opacity)`, opacity from 0 to 1. Not `${color}1F`.
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  // A negative length: `negate(length)`. Not `-${length}`.
  marginLeft: negate(theme.space[2]),
}))
```

`alpha()` is written as `color-mix()`. For a number that changes at runtime, such as a slider's thumb or a pan, `useStyleValue(initial, unit)` gives a value to put in a style and a setter: the style is one class, and the setter changes a CSS variable, so a drag writes no rule and renders no `style` attribute. A style object written in JSX, `style={{ ... }}`, is not allowed in the library's own source.
