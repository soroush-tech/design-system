# The style entry

`@soroush.design/react/style` resolves a style that is either a plain object or a function of the theme into the `CSSObject` a component applies. It is for styles you write yourself; the components of the library use the same helpers.

```ts
import { useStyle, withStyles, StylesConsumer } from '@soroush.design/react/style'
```

A **style input** is a `CSSObject`, or a factory: an object with a `getStyles(theme)` method that returns one. A factory reads the active theme, so its values follow a theme change.

```tsx
import type { Theme } from '@soroush.design/react'

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
