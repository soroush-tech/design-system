# The component catalog

`@soroush.tech/design-system/catalog` describes every component as data, for tools that place
and write components rather than render them: a design tool's component palette, a page's
source writer, a generator. It ships with the package and is versioned with it, so a tool reads
the catalog of the version it installed instead of keeping a copy that drifts.

```ts
import { catalog } from '@soroush.tech/design-system/catalog'

catalog.components.Select.module // '@soroush.tech/design-system/Select'
catalog.components.Select.example // { component: 'Select', props: { placeholder: ... }, children: [...] }
catalog.components.Select.options.color // { scale: 'palette', default: 'primary' }
catalog.styleScales.p // 'space'
```

It is pure data. It loads in plain Node - no DOM, no React, no Emotion - and survives
`JSON.stringify` unchanged.

## What it holds

| Field         | What it is                                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `categories`  | The docs' categories, in their order, each with its components.                                                              |
| `styleScales` | Each styled-system prop that reads a theme scale, and that scale: `p` → `space`, `borderRadius` → `radii`, `color` → `text`. |
| `components`  | One entry per component, keyed by its export name.                                                                           |

An entry:

| Field         | What it is                                                                                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | The export name.                                                                                                                                                                         |
| `module`      | The subpath to import it from. Family members (`TableRow`, `SidebarItem`) name their family's.                                                                                           |
| `category`    | Its category in the docs.                                                                                                                                                                |
| `summary`     | What it is for, in a sentence.                                                                                                                                                           |
| `isPlaceable` | Whether a palette offers it. `Portal`, `TableCell` and the like aren't placed by hand, but still have entries - a tool editing a page that uses them needs their `module` and `content`. |
| `example`     | What a freshly placed one is, as a node.                                                                                                                                                 |
| `variants`    | Its named looks, each a node - shown as pictures.                                                                                                                                        |
| `options`     | The props a picker offers: `scale` (a theme scale whose keys are the values - so an app's own theme widens them), `values` (a closed set), `default`.                                    |
| `content`     | How each node-taking prop is written: `children`, one `child` element, `text`, or `none` (a render function a tool shouldn't write).                                                     |
| `twoWay`      | A prop that shows a value and reports changes, the event, and how to read the change: `target.value`, `target.checked` or the callback's `argument`.                                     |
| `domEvents`   | The React handlers worth offering.                                                                                                                                                       |
| `preview`     | The room its picture needs, in pixels, when it would otherwise be a sliver.                                                                                                              |

A node is `{ component, props, children }`, its children more nodes or text - the shape a tool
writes into source: `{ component: 'MenuItem', props: { value: 'web' }, children: ['Web'] }` is
`<MenuItem value="web">Web</MenuItem>`.

## Adding a component's entry

Each component's entry lives beside it, in `ComponentName.catalog.ts`:

```ts
import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { SwitchProps, SwitchVariant } from './Switch'

export const switchVariantValues = ['outside', 'inside'] satisfies SwitchVariant[]

export const switchCatalog = defineCatalogEntry<SwitchProps>()({
  summary: 'An on/off control.',
  isPlaceable: true,
  example: { component: 'Switch', props: { defaultChecked: true }, children: [] },
  variants: [],
  options: { variant: { values: switchVariantValues, default: 'outside' } },
  content: {},
  twoWay: { prop: 'checked', event: 'onChange', read: 'target.checked' },
})
```

- `defineCatalogEntry<Props>()` checks the entry against the component's own props: an option,
  a content prop or an example prop the component doesn't have fails to compile, and so does a
  value the prop can't take.
- Import the props with `import type` only - the file must stay free of runtime imports, so the
  catalog stays pure data.
- Register it in `src/catalog/sources.ts` with the folder it is imported from (and, for a family
  member, its family). The catalog fills in its name, module and category.
- Its stories read their `args` from the example - `args: exampleArgs(switchCatalog.example)`
  (`src/utils/test/renderExample.tsx`) - and their option lists from the `*Values` arrays
  (`utils/test/storiesOptions.ts` re-exports them), so a story and the catalog can't disagree.

`src/catalog/catalog.test.ts` holds the catalog to the docs: every component the docs list has an
entry and every entry is listed (or in a listed family), every module is exported, every scale is
a theme scale, every example names components the catalog has and renders.
