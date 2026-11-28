# Installation

## Start a new app

To start a new app on Gild UI - a Vike app, prerendered at build time, that then moves
between pages with no reload - in TypeScript or JavaScript:

```sh
npx @soroush.design/cli create my-app
```

It makes the app in a new folder, with the themes, the providers and a few pages, shows every file
first, and installs it with the package manager you ran it with. Add `--sample-data`, or answer
yes to its question, for two pages that show how data gets onto a page: a list of sample items,
and a page for each. Its options are in the
[command line](/cli/) docs. For an app you already have, use `init`, below.

## Set it up with one command

In a client-rendered React app - built with Vite, webpack, Rspack, Parcel or Create React App,
in TypeScript or JavaScript - one command sets Gild UI up:

```sh
npx @soroush.design/cli init
```

It shows every change before it makes one, and writes nothing until you say yes:

- `src/theme/themes` - a `light` and a `dark` theme, each a `createTheme(baseTheme, {...})` call
  you make your own, gathered by `defineThemes`, with the registration of the themes' types and
  `registerBaseTheme`;
- `src/theme/Providers` - the `ThemeProvider` with the base page styles;
- your root - what it renders is wrapped in `<Providers>`;
- the install of `@gild-ui/react` and `@gild-ui/core`, with your own package manager.

It runs no git, never overwrites a file, and takes back
every change if a write fails. Run in a workspace's root, it sets up the one app in it. Add
`--dry-run` to see the changes and exit. In PowerShell, quote the package name, since `@` starts a
splat there: `npx '@soroush.design/cli' init`.

Every option, and what `init` checks first, are in the [command line](/cli/) docs. Next.js, Vike
and React Router apps are not supported by `init` yet: set those up by hand, below.

## Or set it up by hand

Install Gild UI and its peer dependencies:

```sh
npm i @gild-ui/react @gild-ui/core react react-dom
```

React 19.2 or later is required.

### Set up the ThemeProvider

Every component reads its colors, spacing, and typography from the theme. Wrap your app once:

```tsx
import { ThemeProvider } from '@gild-ui/react'
import { registerBaseTheme } from '@gild-ui/react/ThemeProvider'
import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'

export const themes = defineThemes(
  {
    light: createTheme(baseTheme, { name: 'light', colorScheme: 'light' }),
    dark: createTheme(baseTheme, { name: 'dark', colorScheme: 'dark' }),
  },
  {}
)

// The theme the app starts in, for server components, which have no provider above them.
registerBaseTheme(themes.dark)

declare module '@gild-ui/core/theme' {
  interface Register {
    themes: typeof themes
  }
}

export function App() {
  return <ThemeProvider theme={themes.dark}>{/* your app */}</ThemeProvider>
}
```

`baseTheme` is a complete dark-schemed default, so empty overrides are a valid start. The second
argument of `defineThemes` holds the looks of the components, the same in every theme.
See [Theming](/react/theme/) for building light and dark brand themes.

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
