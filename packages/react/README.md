# @soroush.design/react

[![npm version](https://img.shields.io/npm/v/@soroush.design/react.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@soroush.design/react)
[![coverage](https://codecov.io/gh/soroush-tech/design-system/branch/main/graph/badge.svg?flag=react)](https://app.codecov.io/gh/soroush-tech/design-system?flags%5B0%5D=react)
[![license](https://img.shields.io/npm/l/@soroush.design/react.svg?cacheSeconds=86400)](./LICENSE)

The React platform of the soroush.design family, under one name. It holds no code of its own:
every entry point re-exports an entry point of a library package, so an app that installs only
this package writes `@soroush.design/react/...` for everything.

## Install

```sh
npm i @soroush.design/react
```

`react` and `react-dom` (19.2.8 or later) are peer dependencies. The component library,
[`@soroush.design/react-components`](../react-components), and the hooks library,
[`@soroush.design/react-hooks`](../react-hooks), are installed with it, once each: the umbrella
imports them and never bundles them, so an app has one theme context.

The markdown library, [`@soroush.design/react-markdown`](../react-markdown), has heavy dependencies
(an editor and a diagram library), so it is an optional peer. An app that wants
`@soroush.design/react/markdown` installs it beside this package:

```sh
npm i @soroush.design/react @soroush.design/react-markdown
```

Without it, importing a `markdown` entry point fails with a module-not-found error naming the
library, and nothing else is affected.

## Import

Components sit directly under the package and keep their own name. The theme, the styling API and
the other entry points of the component library keep theirs too.

```tsx
import { Button } from '@soroush.design/react/Button'
import { ThemeProvider, baseTheme } from '@soroush.design/react/theme'
import { styled } from '@soroush.design/react'
import { useDebounce } from '@soroush.design/react/hooks/useDebounce'
import { Editor } from '@soroush.design/react/markdown/Editor'
```

The hooks are under `/hooks` and the markdown library under `/markdown`: libraries other than the
component library are mounted under a lowercase name.

Apps need modern module resolution in TypeScript (`"moduleResolution": "bundler"`, `"node16"` or
`"nodenext"`) to see subpath entry points.

## Extend the theme

An app adds its own colors, sizes and component variants with module augmentation. The name of
this package works in that line, because `/theme` is a plain re-export:

```ts
import type { PaletteEntry } from '@soroush.design/react/theme'

declare module '@soroush.design/react/theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
}
```

After it, `brand` is a color of `Button`, of `theme.palette` in `useTheme()` and in a `styled`
callback, and of `createTheme`. Naming the library in that line,
`declare module '@soroush.design/react-components/theme'`, works as well and changes the same
interfaces. Both forms are checked in [`type-tests`](./type-tests). The scales you can extend are
listed in the
[theming guide](https://github.com/soroush-tech/design-system/blob/main/packages/react-components/docs/theming.md).

## The lean route

Every library of the platform works installed alone. An app that wants only the components
installs `@soroush.design/react-components` and imports from it. This package is for apps that
want one name for all of them.

## How it is made

`src/` and the `exports` of `package.json` are generated from the libraries listed in
[`libraries.ts`](./libraries.ts):

```sh
pnpm gen:react          # write them
pnpm gen:react --check  # fail when a library changed and this package did not (CI, pre-commit)
```

Release notes are in [`release-notes`](./release-notes).
