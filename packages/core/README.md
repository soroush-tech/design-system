# @soroush.design/core

[![npm version](https://img.shields.io/npm/v/@soroush.design/core.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@soroush.design/core)
[![coverage](https://codecov.io/gh/soroush-tech/design-system/branch/main/graph/badge.svg?flag=core)](https://app.codecov.io/gh/soroush-tech/design-system?flags%5B0%5D=core)
[![license](https://img.shields.io/npm/l/@soroush.design/core.svg?cacheSeconds=86400)](./LICENSE)

What every platform of the soroush.design family shares and that needs no framework. The React,
React Native and Vue libraries build on it; an app seldom installs it directly. Today it holds the
component catalog; the theme, the tokens and the behaviour logic that need no framework follow.

```sh
npm i @soroush.design/core
```

It has no dependencies. It imports no React, React Native, Vue, DOM API or styling engine, and a
test fails when it does.

## The catalog

Every component as data, for tools that place and write components rather than render them: a
design tool's palette, a page's source writer, a generator. It loads in plain Node and survives
`JSON.stringify` unchanged.

```ts
import { catalog } from '@soroush.design/core/catalog'

catalog.components.Select.subpath // 'Select'
catalog.components.Select.example // { component: 'Select', props: { placeholder: ... }, children: [...] }
catalog.components.Select.options.color // { scale: 'palette', default: 'primary' }
catalog.styleScales.p // 'space'
```

| Field         | What it is                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------- |
| `categories`  | The docs' categories, in their order, each with its components.                              |
| `styleScales` | Each style prop that reads a theme scale, and that scale: `p` to `space`, `color` to `text`. |
| `components`  | One entry per component, keyed by its export name.                                           |

An entry has the `name`, the `subpath` a platform library serves it from, its `category`, a
`summary`, whether a palette offers it (`isPlaceable`), its `example` and `variants` as nodes, the
`options` a picker offers, how its node props are written (`content`), a `twoWay` prop and its
`domEvents` when it has them, and the `preview` room its picture needs.

A node is `{ component, props, children }`, its children more nodes or text - the shape a tool
writes into source: `{ component: 'MenuItem', props: { value: 'web' }, children: ['Web'] }` is
`<MenuItem value="web">Web</MenuItem>`.

### What a platform adds

An entry says where a component lives inside a platform library, not which package. The platform's
library re-exports the catalog and adds its own facts. The React component library adds `module`:

```ts
import { catalog } from '@soroush.design/react/catalog'

catalog.components.Select.module // '@soroush.design/react-components/Select'
```

### The entries

`@soroush.design/core/catalog/entries` exports each component's entry as it is written
(`selectCatalog`) and the lists of values its props take (`selectVariantValues`), for the stories and
demos of a platform library, which read their option lists from the same arrays so that a story and
the catalog cannot disagree.

### Adding a component

Write `src/catalog/entries/ComponentName.ts` with `defineCatalogEntry`, and register it in
`src/catalog/sources.ts` with the subpath it is imported from and, for a member of a family, its
family. The tests hold the catalog to the docs: every component the docs list has an entry, every
entry is listed, every example names components the catalog has.

## License

MIT
