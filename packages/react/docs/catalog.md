# The component catalog

`@gild-ui/react/catalog` describes every component as data, for tools that place
and write components rather than render them: a design tool's component palette, a page's
source writer, a generator. It ships with the package and is versioned with it, so a tool reads
the catalog of the version it installed instead of keeping a copy that drifts.

```ts
import { catalog } from '@gild-ui/react/catalog'

catalog.components.Select.module // '@gild-ui/react/Select'
catalog.components.Select.example // { component: 'Select', props: { placeholder: ... }, children: [...] }
catalog.components.Select.options.color // { scale: 'palette', default: 'primary' }
catalog.styleScales.p // 'space'
```

The data is `@gild-ui/core`'s - it needs no framework - and this library's `/catalog` adds the
`module` each component is imported from. It is pure data. It loads in plain Node - no DOM, no React, no styling engine - and survives
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
| `module`      | The subpath to import it from, which this library adds to the core's `subpath`. Family members (`TableRow`, `SidebarItem`) name their family's.                                          |
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

Each component's entry lives in `@gild-ui/core`, in `packages/core/src/catalog/entries/ComponentName.ts`:

```ts
import { defineCatalogEntry } from '../defineCatalogEntry'

export const switchVariantValues = ['outside', 'inside'] as const

export const switchCatalog = defineCatalogEntry({
  summary: 'An on/off control.',
  isPlaceable: true,
  example: { component: 'Switch', props: { defaultChecked: true }, children: [] },
  variants: [],
  options: { variant: { values: switchVariantValues, default: 'outside' } },
  content: {},
  twoWay: { prop: 'checked', event: 'onChange', read: 'target.checked' },
})
```

- The file imports nothing from this library or from any framework: a test in the core holds it
  to that, and the catalog stays pure data. It is not checked against the component's props, so
  the component's own tests and stories are what keep an option, a content prop or a value the
  component does not have from reaching it.
- Register it in `packages/core/src/catalog/sources.ts` with the subpath it is imported from (and,
  for a family member, its family). The catalog fills in its name and category, and this
  library adds its module.
- Its stories read their `args` from the example - `args: exampleArgs(switchCatalog.example)`
  (`src/utils/test/renderExample.tsx`) - and their option lists from the `*Values` arrays
  (`@gild-ui/core/catalog/entries`, which `utils/test/storiesOptions.ts` re-exports
  under the stories' names), so a story and the catalog can't disagree.

The core's `catalog.test.ts` holds the catalog to the docs: every component the docs list has an
entry and every entry is listed (or in a listed family), every example names components the
catalog has. This library's `src/catalog/catalog.test.ts` holds what is its own: every module is
exported, every scale is a theme scale, and the style scales equal what the styled-system parsers
read.
