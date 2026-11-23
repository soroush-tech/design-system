# @soroush.design/styled-system

[![npm version](https://img.shields.io/npm/v/@soroush.design/styled-system.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@soroush.design/styled-system)
[![npm downloads](https://img.shields.io/npm/dm/@soroush.design/styled-system.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@soroush.design/styled-system)
[![coverage](https://codecov.io/gh/soroush-tech/design-system/branch/main/graph/badge.svg?flag=styled-system)](https://app.codecov.io/gh/soroush-tech/design-system?flags%5B0%5D=styled-system)
[![unpacked size](https://img.shields.io/npm/unpacked-size/@soroush.design/styled-system.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@soroush.design/styled-system)
[![types included](https://img.shields.io/npm/types/@soroush.design/styled-system.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@soroush.design/styled-system)
[![license](https://img.shields.io/npm/l/@soroush.design/styled-system.svg?cacheSeconds=86400)](./LICENSE)

Responsive, theme-aware style props for CSS-in-JS, written in TypeScript. The package ships its own types.

## Features

- Add style props that hook into your own theme
- Quickly set responsive `font-size`, `margin`, `padding`, `gap`, `width`, and more with props
- Influenced by constraint-based design-system principles
- Typographic scale, and a spacing scale for `margin`, `padding` and `gap`
- Works with any color palette
- Works with most CSS-in-JS libraries, including [Emotion](https://emotion.sh) and [styled-components](https://styled-components.com)
- First-class TypeScript types - theme-scale-aware props

## Install

```sh
# npm
npm install @soroush.design/styled-system
```

```sh
# pnpm
pnpm add @soroush.design/styled-system
```

```sh
# yarn
yarn add @soroush.design/styled-system
```

`prop-types` (`^15.8.1`, optional peer) is used by a single [subpath](#subpath-imports),
`prop-types`. Install it only if you import that subpath. The `should-forward-prop` subpath
needs nothing installed: its check for a valid attribute is a dependency of this package. You bring your own CSS-in-JS
library (Emotion, styled-components, ...); the core carries neither at runtime.

## Usage

```ts
// Example uses Emotion, but styled-system works with most other CSS-in-JS libraries as well
import styled from '@emotion/styled'
import { space, layout, typography, color } from '@soroush.design/styled-system'

// Add styled-system functions to your component
const Box = styled.div`
  ${space}
  ${layout}
  ${typography}
  ${color}
`
```

Each style function exposes its own set of component props that handle styles based on values defined in a theme.

```tsx
// width: 50%
<Box width={1 / 2} />

// font-size: 20px (theme.fontSizes[4])
<Box fontSize={4} />

// margin: 16px (theme.space[2])
<Box m={2} />

// padding: 32px (theme.space[3])
<Box p={3} />

// color
<Box color="tomato" />

// color: #333 (theme.colors.gray[0])
<Box color="gray.0" />

// background-color
<Box bg="tomato" />
```

### Responsive style props

Set responsive `width`, `margin`, `padding`, `font-size`, and other properties with a shorthand array syntax. See [Responsive Styles](./docs/responsive-styles.md).

```tsx
// responsive width
<Box width={[1, 1 / 2, 1 / 4]} />

// responsive font-size
<Box fontSize={[2, 3, 4]} />

// responsive margin
<Box m={[1, 2, 3]} />

// responsive padding
<Box p={[1, 2, 3]} />
```

### Subpath imports

Subpaths:

```ts
import { css } from '@soroush.design/styled-system/css'
import { themeGet } from '@soroush.design/styled-system/theme-get'
import { pick, omit } from '@soroush.design/styled-system/props'
import propTypes, { createPropTypes } from '@soroush.design/styled-system/prop-types'
import shouldForwardProp, {
  createShouldForwardProp,
  props,
} from '@soroush.design/styled-system/should-forward-prop'
```

Types resolve under both modern module resolution (`node16`/`nodenext`/`bundler`, via
`exports`) and classic `node` (via `typesVersions`).

## Documentation

Full docs live in [`docs/`](./docs/README.md):

- [Getting Started](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/docs/getting-started.md)
- [Responsive Styles](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/docs/responsive-styles.md)
- [How it Works](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/docs/how-it-works.md)
- [Custom Props](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/docs/custom-props.md)
- [Variants](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/docs/variants.md)
- [API](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/docs/api.md)
- [Reference Table](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/docs/table.md)
- [TypeScript](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/docs/typescript.md)
- [Guides](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/docs/guides/index.md)

Runnable demos live in the [examples repo](https://github.com/soroush-tech/examples/tree/main/styled-system).

## Release notes

Per-version notes for every published release live in
[`release-notes/`](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/release-notes).

## License

MIT - a rewrite of styled-system (© 2017-2021 Brent Jackson), see [`LICENSE`](https://github.com/soroush-tech/design-system/tree/main/packages/styled-system/LICENSE).
