# Styling and overriding

There are four ways to change how a component looks. They do different jobs, and each is typed to what actually works, so a wrong one fails at compile time.

| Way                                    | For                                                                        | Takes                                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Style props (`mt`, `color`, `bg`, ...) | Customising within the design: spacing, colour, size of one instance       | Theme values only, typed from your registered theme                                            |
| `StyleSheet.create` and `style`        | Overriding the CSS of one instance, or of one slot of it                   | Entries of a sheet, or lists of them. Never a plain object                                     |
| `styled(Component)`                    | A new component that is the old one with other styles, used in many places | Style objects and functions of the theme and the props                                         |
| The theme's `components`               | One change for every instance of a component in the app                    | `defaultProps`, `styleOverrides` per slot, `variants`: see [customization](./customization.md) |

## Style props

Components take the style props of the design system: `m`, `p`, `width`, `color`, `bg`, `borderRadius` and the others. Their values are keys of the registered theme (`color="primary"`, `p={2}`), so they follow a theme change and cannot name a value the theme does not have. Use them first: they are the customisation the design allows.

## `StyleSheet.create` and the `style` prop

The `style` prop of every component overrides its CSS. It takes an entry of `StyleSheet.create`, or a list of entries with `false`, `null` and `undefined` for a condition that is off. A plain object is a type error: `style={{ padding: 12 }}` does not compile. No `style` attribute is rendered: the entries are merged, in order, into one class that is in a later cascade layer than the component's own styles, so it wins over them, nested `:hover` rules included, and only for what it sets.

```tsx
import { StyleSheet } from '@gild-ui/react'
import { Button } from '@gild-ui/react/Button'

const overrides = StyleSheet.create({
  danger: { backgroundColor: 'firebrick', borderRadius: 0 },
  dangerHover: { '&:hover': { backgroundColor: 'darkred' } },
})

function DeleteButton({ isArmed }: { isArmed: boolean }) {
  return <Button style={[overrides.danger, isArmed && overrides.dangerHover]}>Delete</Button>
}
```

Make a sheet once, at module level. An object sheet gives its entries at once, with no hook; it has no theme, so it cannot use tokens, only plain values. A style that reads the theme is a function sheet, and `useStyle` resolves it against the nearest `ThemeProvider`:

```tsx
import { StyleSheet, useStyle } from '@gild-ui/react'

const themed = StyleSheet.create((theme) => ({
  card: { padding: theme.space[2], borderRadius: theme.radii.md },
}))

function Panel() {
  const styles = useStyle(themed)
  return <Paper style={styles.card}>...</Paper>
}
```

`useStyle` is the resolver of the styling engine, re-exported (`@gild-ui/react/useStyle` and the root). Given a function sheet it returns one entry for each name, for the theme in use; given an object sheet it returns the same entries. An entry is opaque: pass it on, do not read it. The root also exports the types `StyleOverride` (what `style` takes), `SlotOverride` (what a slot takes) and `SlotProps<Slot>`.

### A value that changes on every render

A style entry is made once, so a number that follows a drag or a measure does not belong in a sheet. Give it as a style prop of the component where one exists (`width={...}`), or keep it in a live value: `useStyleValue(initial, unit)` gives the value and a setter. In a style the value is a reference to a CSS variable, so the class is the same for every value and the setter changes the variable without a render. `css()` turns a style that holds it into an entry:

```tsx
import { css, useStyleValue } from '@gild-ui/react'
import { useMemo } from 'react'

function Thumb() {
  const [left, setLeft] = useStyleValue(10, '%')
  const style = useMemo(() => css({ left: `${left}` }), [left])
  return <Paper style={style} onPointerMove={(event) => setLeft(event.clientX / 4)} />
}
```

`-${value}` and `${color}1F` are not valid for a token or a live value: use `negate(value)` and `alpha(color, opacity)` from the root.

## Slots

A component with parts a theme can style (`<Name>Slot` in its folder) takes `slotProps`, keyed by exactly those slot names. Each slot takes a `style` (as above), a `className`, and `data-*` and `aria-*` attributes, and nothing else: what a component controls (its handlers, its `ref`, its `id`) is not open to a slot. A slot's `style` is merged after the slot's own styles and the theme's, so it wins.

```tsx
<Tooltip
  title="Saved"
  hasArrow
  slotProps={{ arrow: { style: overrides.danger }, root: { 'data-mark': 'saved' } }}
>
  <Button>Save</Button>
</Tooltip>
```

The slots of every component are on its Specs page, from the catalog. The slot `root` is the component's root element, the one the `style` prop reaches: `slotProps.root.style` and `style` are the same channel, and when both are given `style` is merged after `slotProps.root.style`, so it wins. Class names of both are joined.

## `styled(Component)`

To use one restyled component in many places, wrap it once. The style objects and the functions of the theme and the props are the ones of `styled`:

```tsx
import { styled } from '@gild-ui/react'
import { Button } from '@gild-ui/react/Button'

const DangerButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
}))
```

## The theme's `components`

One change for every instance, set once for the app: see [customization](./customization.md).

## Values in a style

Write these with the functions of the package, not by joining text: a theme token is a reference to a CSS variable, and a hex digit, a minus or a unit glued after it is not valid CSS.

```tsx
import { alpha, negate, styled } from '@gild-ui/react'

const Tint = styled('div')(({ theme }) => ({
  // A colour at an opacity: `alpha(color, opacity)`, opacity from 0 to 1. Not `${color}1F`.
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  // A negative length: `negate(length)`. Not `-${length}`.
  marginLeft: negate(theme.space[2]),
}))
```

`alpha()` is written as `color-mix()`.

## Style factories

`withStyles` and `StylesConsumer` (`@gild-ui/react/withStyles`, `/StylesConsumer`) resolve a factory, an object with a `getStyles(theme)` method, into a `CSSObject` for a class component or a place a hook cannot be called:

```tsx
import { StylesConsumer } from '@gild-ui/react'

const card = { getStyles: (theme: Theme) => ({ padding: theme.space[2] }) }

<StylesConsumer style={card}>{(styles) => ...}</StylesConsumer>
```
