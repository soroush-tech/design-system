# soroush.design

[![npm version](https://img.shields.io/npm/v/soroush.design.svg?cacheSeconds=86400)](https://www.npmjs.com/package/soroush.design)
[![coverage](https://codecov.io/gh/soroush-tech/design-system/branch/main/graph/badge.svg?flag=soroush.design)](https://app.codecov.io/gh/soroush-tech/design-system?flags%5B0%5D=soroush.design)
[![license](https://img.shields.io/npm/l/soroush.design.svg?cacheSeconds=86400)](./LICENSE)

The soroush.design family under one name. It holds no code of its own: every entry point
re-exports an entry point of a platform umbrella, so an app installs this package and writes
`soroush.design/<platform>/...` for everything it uses. Today the platform is React:
`soroush.design/react/Button` is
[`@soroush.design/react/Button`](../react), which is `@soroush.design/react-components/Button`.

## Install

A React web app installs this package and React:

```sh
npm i soroush.design react react-dom
```

That is all: `react` and `react-dom` (19.2.8 or later) are peer dependencies, and this package
brings the React platform, [`@soroush.design/react`](../react), with the component, theme and hooks
libraries behind it, once each. A later platform (React Native, Vue) is a subpath of this same
package, and an app that does not use it neither installs its framework nor gets a warning about it:
the framework is an optional peer of that platform's umbrella.

The markdown library, [`@soroush.design/react-markdown`](../react-markdown), has heavy dependencies
(an editor and a diagram library), so it is an optional peer. An app that wants
`soroush.design/react/markdown` installs it beside this package:

```sh
npm i soroush.design react react-dom @soroush.design/react-markdown
```

Without it, importing a `markdown` entry point fails with a module-not-found error that names
`@soroush.design/react-markdown`, and nothing else is affected.

## Import

One name, three levels. The first segment after the package is the platform, the next is a component
or a library, and a library's own components come last:

```tsx
import { Button } from 'soroush.design/react/Button'
import { ThemeProvider, baseTheme } from 'soroush.design/react/theme'
import { styled } from 'soroush.design/react'
import { useDebounce } from 'soroush.design/react/hooks/useDebounce'
import { Editor } from 'soroush.design/react/markdown/Editor'
```

| Level    | Package                                                                    | An app writes                             |
| -------- | -------------------------------------------------------------------------- | ----------------------------------------- |
| Family   | `soroush.design`                                                           | `soroush.design/react/Button`             |
| Platform | [`@soroush.design/react`](../react)                                        | `@soroush.design/react/Button`            |
| Library  | [`@soroush.design/react-components`](../react-components) and its siblings | `@soroush.design/react-components/Button` |

The three names reach the same code, once: the family imports the platform, the platform imports the
libraries, and none of them bundles the one below, so an app has one theme and one set of styles
whichever name its files import from. Every path of the platform is here, with its types, behind
`/react`; the package has no root entry point of its own.

Apps need modern module resolution in TypeScript (`"moduleResolution": "bundler"`, `"node16"` or
`"nodenext"`) to see subpath entry points.

## Extend the theme

An app adds its own colors, sizes and component variants with module augmentation, and the name of
this package works in that line:

```ts
import type { PaletteEntry } from 'soroush.design/react/theme'

declare module 'soroush.design/react/theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
}
```

After it, `brand` is a color of `Button`, of `theme.palette` in `useTheme()` and in a `styled`
callback, and of `createTheme`. Naming the platform umbrella or a library in that line works as
well and changes the same interfaces. The family's own name and the platform's are checked in
[`type-tests`](./type-tests).

## How it is made

`src/` and the `exports` of `package.json` are generated from the platforms listed in
[`libraries.ts`](./libraries.ts), by the generator the platform umbrella uses:

```sh
pnpm gen:umbrellas          # write them
pnpm gen:umbrellas --check  # fail when a platform changed and this package did not (CI, pre-commit)
```

Release notes are in [`release-notes`](./release-notes).
