# Installation

## Start a new app

To start a new app on the design system - a Vike app, prerendered at build time, that then moves
between pages with no reload - in TypeScript or JavaScript:

```sh
npx @soroush.tech/design-system create my-app
```

It makes the app in a new folder, with the themes, the providers and a few pages, shows every file
first, and installs it with the package manager you ran it with. Add `--sample-data`, or answer
yes to its question, for two pages that show how data gets onto a page: a list of sample items,
and a page for each. Its options are in the
[command line](/cli/) docs. For an app you already have, use `init`, below.

## Set it up with one command

In a client-rendered React app - built with Vite, webpack, Rspack, Parcel or Create React App,
in TypeScript or JavaScript - one command sets the design system up:

```sh
npx @soroush.tech/design-system init
```

It shows every change before it makes one, and writes nothing until you say yes:

- `src/theme/themes` - a `light` and a `dark` theme, each a `createTheme(baseTheme, {...})` call
  you make your own;
- `src/theme/Providers` - the `ThemeProvider` with the base page styles;
- your root - what it renders is wrapped in `<Providers>`;
- the install of `@soroush.tech/design-system`, with your own package manager.

It runs in a git repository with no uncommitted change, never overwrites a file, and takes back
every change if a write fails. Run in a workspace's root, it sets up the one app in it. Add
`--dry-run` to see the changes and exit. In PowerShell, quote the package name, since `@` starts a
splat there: `npx '@soroush.tech/design-system' init`.

Every option, and what `init` checks first, are in the [command line](/cli/) docs. Next.js, Vike
and React Router apps are not supported by `init` yet: set those up by hand, below.

## Or set it up by hand

Install the design system and its peer dependencies:

```sh
npm i @soroush.tech/design-system react react-dom
```

It works with React 18 and React 19: `react` and `react-dom` `^18.0.0 || ^19.0.0`. Both are tested
in CI, on 18.0.0 and on 19.

### Set up the ThemeProvider

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
