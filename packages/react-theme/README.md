# @soroush.design/react-theme

[![npm version](https://img.shields.io/npm/v/@soroush.design/react-theme.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@soroush.design/react-theme)
[![coverage](https://codecov.io/gh/soroush-tech/design-system/branch/main/graph/badge.svg?flag=react-theme)](https://app.codecov.io/gh/soroush-tech/design-system?flags%5B0%5D=react-theme)
[![license](https://img.shields.io/npm/l/@soroush.design/react-theme.svg?cacheSeconds=86400)](./LICENSE)

The theme of the soroush.design React platform, without the components: `ThemeProvider`, the hooks
that read the theme, the theme's types, and the configured `styled`, `css`, `keyframes` and `Global`
on the UmberStyle engine. An app can build its own components on the same tokens, server-rendered
with the same class names and variables, and install none of ours.

```sh
npm i @soroush.design/react-theme
```

An app that installs the React umbrella writes `@soroush.design/react/style` and
`@soroush.design/react/engine`, which come from this package, and `@soroush.design/react/theme`,
which adds the typing of the components to it; the library's own name is the lean route. The
component library `@soroush.design/react-components` depends on this package, never bundles it, and
re-exports it, so an app that installs both has one copy: one theme context and one engine
configuration.

## Your own component on the tokens

```tsx
import { ThemeProvider, styled } from '@soroush.design/react-theme'

const Badge = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: theme.space[2],
  borderRadius: theme.radii.md,
}))

export const App = () => (
  <ThemeProvider>
    <Badge>New</Badge>
  </ThemeProvider>
)
```

`ThemeProvider` without a `theme` prop provides `baseTheme`. The element renders with a `soroush-`
class on the server and the client, and the theme is declared once as CSS variables on `:root`. The
engine is configured by a function the package's own `styled` calls, so an app that imports only
`styled` gets the prefix, the value repair and the raw theme keys.

## Entry points

| Entry point                          | Holds                                                                                                                                                      |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@soroush.design/react-theme`        | Everything below, and `styled`, `css`, `keyframes`                                                                                                         |
| `@soroush.design/react-theme/theme`  | `ThemeProvider`, `LayoutProvider`, `useTheme`, `useDefaultProps`, `withTheme`, `baseTheme`, the theme types, and the core's `createTheme` and token scales |
| `@soroush.design/react-theme/style`  | `useStyle`, `withStyles`, `StylesConsumer`                                                                                                                 |
| `@soroush.design/react-theme/engine` | `Global`, `globalStyles` (the base reset), `CacheProvider`, `styleCache`, `createCache`                                                                    |

The tokens, `baseTheme` and `createTheme` are `@soroush.design/core`'s, re-exported unchanged from
the theme entry points.

## Extend the theme

Every scale is an open interface, so an app adds a color, a token or a whole scale with a
`declare module` block that names this package, the umbrella (`@soroush.design/react/theme`), the
component library (`@soroush.design/react-components/theme`) or the core
(`@soroush.design/core/theme`): all reach the same interface.

```ts
import type { PaletteEntry } from '@soroush.design/react-theme'

declare module '@soroush.design/react-theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
}
```

`theme.components` is typed by `ThemeComponents`, which starts empty. A component library adds its
components to it, and an app adds its own, so a theme can set their `defaultProps`, `styleOverrides`
and `variants`:

```ts
import type { ComponentConfig } from '@soroush.design/react-theme'

declare module '@soroush.design/react-theme' {
  interface ThemeComponents {
    MyWidget?: ComponentConfig<{ mood?: 'calm' | 'loud' }, 'root' | 'handle'>
  }
}
```

`styled('div', { name: 'MyWidget', slot: 'root' })` then reads `theme.components.MyWidget`. An app
that installs only this package sees `components` empty and untyped, which is correct: the typing
of a library's components arrives with the library's own entry points.

## Package

Peers: `react` and `react-dom` `^19.2.8`. Dependencies: `@soroush.design/core` and the UmberStyle
engine. ESM and CJS builds with declarations, `sideEffects: false`.
