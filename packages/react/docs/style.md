# The style system

`useStyle`, `withStyles` and `StylesConsumer` (`@gild-ui/react/useStyle`, `/withStyles` and `/StylesConsumer`) resolve a style that is either a plain object or a function of the theme into the `CSSObject` a component applies. It is for styles you write yourself; the components of the library use the same helpers.

```ts
import { useStyle, withStyles, StylesConsumer } from '@gild-ui/react'
```

A **style input** is a `CSSObject`, or a factory: an object with a `getStyles(theme)` method that returns one. A factory reads the active theme, so its values follow a theme change.

```tsx
import type { Theme } from '@gild-ui/core/theme'

const card = {
  getStyles: (theme: Theme) => ({ padding: theme.space[2], borderRadius: theme.radii.md }),
}
```

## `useStyle(style)`

A hook. Returns the `CSSObject` of a style input, calling `getStyles` with the theme from `ThemeProvider` when the input is a factory.

```tsx
function Panel() {
  const styles = useStyle(card)
  return <View style={styles}>...</View>
}
```

## `withStyles(style)(Component)`

A higher-order component. The wrapped component receives the resolved `CSSObject` as its `styles` prop.

## `StylesConsumer`

The same as a render prop, for a class component or a place a hook cannot be called: `<StylesConsumer style={card}>{(styles) => ...}</StylesConsumer>`. The `style` prop takes a factory.

Where a style belongs to a component of the library, change it through `theme.components` instead - see [how to customize](./customization.md).

## `StyleSheet`

`StyleSheet` (`@gild-ui/react/StyleSheet`, also on the root) keeps named styles. Given an object, `StyleSheet.create` returns the entries at once, with no hook, and an entry goes to the `style` prop of a component. There is no `css` prop: `style` takes a sheet entry, a style object, or an array of them, with `false`, `null` and `undefined` dropped, and merges them after the component's own styles into one class. No `style` attribute is rendered, and `style` takes no function: a style that reads the theme is written with `styled`.

```tsx
import { StyleSheet } from '@gild-ui/react'
import { View } from '@gild-ui/react/View'

const styles = StyleSheet.create({
  box: { padding: 16, '&:hover': { opacity: 0.9 } },
  active: { outline: '2px solid currentColor' },
})

function Box({ isActive }: { isActive?: boolean }) {
  return <View style={[styles.box, isActive && styles.active]}>...</View>
}
```

An entry is opaque: pass it on, do not read it.

## Values in a style

Write these with the functions of the package, not by joining text: a theme token is a reference to a CSS variable, and a hex digit, a minus or a unit glued after it is not valid CSS.

```tsx
import { alpha, negate, styled, useStyleValue } from '@gild-ui/react'

const Tint = styled('div')(({ theme }) => ({
  // A colour at an opacity: `alpha(color, opacity)`, opacity from 0 to 1. Not `${color}1F`.
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  // A negative length: `negate(length)`. Not `-${length}`.
  marginLeft: negate(theme.space[2]),
}))
```

`alpha()` is written as `color-mix()`. For a number that changes at runtime, such as a slider's thumb or a pan, `useStyleValue(initial, unit)` gives a value to put in a style and a setter: the style is one class, and the setter changes a CSS variable, so a drag writes no rule and renders no `style` attribute. A style object written in JSX, `style={{ ... }}`, is not allowed in the library's own source.
