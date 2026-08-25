# Installation

Install the design system and its peer dependencies:

```sh
npm i @soroush.tech/design-system react react-dom
```

## Set up the ThemeProvider

Every component reads its colors, spacing, and typography from the theme. Wrap your app once:

```tsx
import { ThemeProvider, baseTheme, createTheme } from '@soroush.tech/design-system/theme'

const theme = createTheme(baseTheme, {
  // Your brand overrides - palettes, backgrounds, text colors, ...
})

export function App() {
  return <ThemeProvider theme={theme}>{/* your app */}</ThemeProvider>
}
```

`baseTheme` is a complete dark-schemed default, so an empty override object is a valid start.
See [Theming](/design-system/customization/theming/) for building light and dark brand themes.

## Fonts

The theme's default stacks reference Space Grotesk (body) and JetBrains Mono (code). Self-host
them with Fontsource, or swap the `fonts` scale to your own faces:

```sh
npm i @fontsource-variable/space-grotesk @fontsource-variable/jetbrains-mono
```

```ts
import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
```
