# @soroush.tech/ui-spec

The generative-UI spec for the `@soroush.tech` design system: one JSON shape an agent writes, a
tool validates and, later, an engine renders.

It is built on [A2UI v1.0](https://github.com/a2ui-project/a2ui) and leaves that protocol
unchanged. A2UI describes what a page looks like: a flat list of components, bound to a data
model. It has no conditional rendering, no way to fetch data, and nowhere to say what a page's
title is. This package adds those three things beside the protocol, in the places A2UI provides
for extension, and ships validators for all of it.

```sh
pnpm add @soroush.tech/ui-spec
```

## What is in it

| Piece                                                    | What it is                                                                                                             |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `composeCatalog`                                         | Builds an A2UI v1.0 catalog from an app's components, plus the core below                                              |
| `When`                                                   | A component that renders one child chosen by a value. This is how a surface shows a skeleton, an error and the content |
| Core functions                                           | `setValue`, `lookup`, `sumField`, `divide`, `round`, `ceil`, `max`, `select`                                           |
| `applyTheme`                                             | Opens a catalog's token props to the keys of one app's theme                                                           |
| `behaviorSchema`                                         | The JSON Schema of a behavior document: page params, data sources, derived values, triggers, document head             |
| `validateCatalog`, `validateSurface`, `validateBehavior` | Validators that return findings as data and never throw                                                                |

This package does not read component types and does not depend on the design system. A catalog
is generated elsewhere, per app, and handed in. That keeps the spec usable by a design tool, by
an agent service and by a render engine alike.

## Catalogs

A catalog is the list of components and functions an agent may use, each as a JSON Schema.

```ts
import { composeCatalog, validateCatalog } from '@soroush.tech/ui-spec'

const catalog = composeCatalog({
  catalogId: 'https://example.com/ui/catalog.json',
  title: 'Example app',
  components: {
    Typography: {
      type: 'object',
      properties: {
        component: { const: 'Typography' },
        text: { $ref: 'common_types.json#/$defs/DynamicString' },
        variant: {
          anyOf: [
            { enum: ['h1', 'body1'] },
            { $ref: 'common_types.json#/$defs/DataBinding' },
            { $ref: 'common_types.json#/$defs/FunctionCall' },
          ],
        },
      },
      required: ['component', 'text'],
    },
  },
})

validateCatalog(catalog) // []
```

`composeCatalog` adds `When` and the core functions, so a surface names one catalog. It throws
if the app defines a name the core owns.

`validateCatalog` runs the A2UI meta-schema, then the rules the meta-schema cannot express.
Most come from the A2UI specification:

- Every name a catalog introduces is an identifier (Unicode UAX #31). `aria-label` is not one;
  A2UI's own `accessibility` block is the place for that.
- A `$ref` points at a component or function of the same catalog, or at one of the fourteen
  common types a catalog may reference. A shared file of prop types is not allowed, so prop
  types are written inline.
- A component cannot declare `id`, `catalogId`, `accessibility` or `metadata` as a prop. The
  envelope owns them.
- Every entry names itself as a constant (`component` or `@call`).

One rule is this package's own. A prop cannot be an object with nothing said about its contents,
because next to a binding it lets a malformed `{"@path": 1}` pass as a literal.

### Props that come from the theme

An app widens the design system's token scales through its theme, so the values a prop accepts
belong to the app. A component says where a prop's values come from in the slot A2UI gives a
component definition for static metadata:

```json
"metadata": {
  "extensions": {
    "tech_soroush_theme": {
      "props": { "color": { "scale": "palette" }, "variant": { "variants": "Button" } }
    }
  }
}
```

`applyTheme` then specializes the catalog for one theme:

```ts
import { applyTheme } from '@soroush.tech/ui-spec'

const forThisApp = applyTheme(catalog, {
  scales: { palette: ['default', 'primary', 'brand'] },
  variants: { Button: ['contained', 'outlined', 'dashed'] },
})
```

It fills the first enumeration in the prop's schema, and every copy of it, so a prop that takes
one token per breakpoint is filled in both places. Other literals the prop takes, such as
`inherit`, are written as branches of their own and are kept. A source the theme says nothing
about keeps its values.

## Showing a skeleton, an error and the content

```json
{
  "id": "articles",
  "component": "When",
  "value": { "@path": "/resources/gists/status" },
  "cases": [
    { "when": "pending", "child": "list_skeleton" },
    { "when": "error", "child": "list_error" }
  ],
  "otherwise": "article_list"
}
```

The first case whose `when` equals the resolved value renders. With no match `otherwise`
renders, and without `otherwise` nothing does. `value` can be any binding or function call, so
the same component covers an empty list, an open menu or a signed-out view.

## The behavior document

A separate JSON document says where a surface's data comes from. It is this package's own
format, versioned on its own (`behaviorVersion: "0.1"`), and it is not part of A2UI.

```json
{
  "behaviorVersion": "0.1",
  "surfaceId": "articles_page",
  "catalogId": "https://example.com/ui/catalog.json",
  "requires": { "functions": ["divide", "ceil"] },
  "params": { "tag": { "from": "query", "type": "string", "default": "all" } },
  "resources": {
    "gists": {
      "kind": "query",
      "request": { "method": "get", "url": "/users/soroushm/gists" },
      "cache": { "key": ["gists", { "@path": "/page/params/tag" }] },
      "into": "/gists"
    }
  },
  "derived": [
    {
      "id": "readMinutes",
      "forEach": "/gists",
      "into": "readMinutes",
      "value": {
        "@call": "ceil",
        "args": { "value": { "@call": "divide", "args": { "a": { "@path": "words" }, "b": 265 } } }
      }
    }
  ],
  "triggers": [{ "on": { "change": "/page/params/tag" }, "run": ["gists"] }],
  "head": { "title": "Articles" }
}
```

It holds no code. Every computation is a named function that a catalog provides, written in the
shapes A2UI v1.0 gives a binding (`{"@path": ...}`) and a call (`{"@call": ..., "args": ...}`).

What a runtime does with it:

- **`params`** are written to `/page/params/<name>` when the surface is created.
- **`resources`** are queries and mutations. The runtime keeps `/resources/<name>` as
  `{ status, error }`, with `status` one of `idle`, `pending`, `error` or `ready`, and writes the
  response to `into`. A `When` bound to that status is the loading state.
- **`derived`** values are computed in order and written into the data model. With `forEach`,
  the value is computed for each item of a list and `into` is a field of the item.
- **`triggers`** run a resource on an event or on a change. The event is the `name` of an A2UI
  action a component dispatches, which is how a button runs a mutation.
- **`head`** is the document title and meta tags.

`/resources` and `/page/params` belong to the runtime. A document cannot write there.

A surface can say it expects a behavior document, in `createSurface.metadata.extensions`:

```json
"metadata": { "extensions": { "tech_soroush_behavior": { "behaviorVersion": "0.1" } } }
```

## Validating

```ts
import { validateBehavior, validateSurface } from '@soroush.tech/ui-spec'

const catalogs = [catalog]
const surfaceFindings = validateSurface(messages, { catalogs, behavior })
const behaviorFindings = validateBehavior(behavior, { messages, catalogs })
```

Each returns an array of findings, empty when nothing is wrong:

```ts
type Finding = {
  code: FindingCode // a closed set, listed below
  message: string
  path: string // a JSON Pointer into the document that was validated
  componentId?: string
}
```

`messages` is an array of A2UI v1.0 messages, validated as the state they leave a surface in. A
child that arrives two messages after its parent is not missing. Pass every catalog the
messages name: a surface may mix catalogs, with a `catalogId` on a component or on a call.

Pass the behavior document to `validateSurface` when there is one. A surface binds to data
before any of it exists, such as a resource's status or a page param, and without the document
those bindings read as mistakes.

Catalogs are taken as valid by the other two validators. Run `validateCatalog` first.

### Finding codes

| Code                                    | Meaning                                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------- |
| `catalog-schema`                        | The catalog fails the A2UI meta-schema. Nothing else is checked                         |
| `catalog-id`, `catalog-version`         | `$id` differs from `catalogId`, or `protocolVersion` is not `1.0`                       |
| `catalog-name`                          | A name is not an identifier                                                             |
| `catalog-discriminator`                 | An entry does not name itself as a constant                                             |
| `catalog-reserved-prop`                 | A prop carries a name the envelope owns                                                 |
| `catalog-ref`                           | A `$ref` points outside the catalog and the allowed common types                        |
| `catalog-open-object`                   | A prop is an object with nothing said about its contents                                |
| `catalog-theme`                         | A theme source is malformed, or names a prop with no enumeration                        |
| `envelope`                              | A message is not a valid A2UI v1.0 message. Nothing else is checked                     |
| `unknown-catalog`                       | A catalog was not named, or was named and not supplied                                  |
| `unknown-component`, `component-schema` | The catalog has no such component, or the component's props are wrong                   |
| `duplicate-id`, `missing-root`          | An id is used twice in one message, or there is no `root`                               |
| `unknown-child`, `orphan`, `cycle`      | A reference leads nowhere, nothing leads to a component, or a component contains itself |
| `unallowed-parent`, `unallowed-child`   | The catalog's `allowedParents` or `allowedChildren` is broken                           |
| `unknown-function`, `function-args`     | The catalog has no such function, or the arguments are wrong                            |
| `return-type`                           | A call returns what its position does not take                                          |
| `unresolved-path`                       | A binding leads nowhere in the data model                                               |
| `index-outside-template`                | `@index` is used outside a list template                                                |
| `behavior-schema`                       | The document fails the behavior schema. Nothing else is checked                         |
| `behavior-surface`                      | The document and the surface do not belong together                                     |
| `reserved-path`                         | The document writes where the runtime does                                              |
| `unknown-resource`, `unknown-event`     | A trigger names a resource or an event that does not exist                              |
| `requires-functions`                    | `requires.functions` is not exactly what the document calls                             |

## Limits

- **A binding below data that has not arrived is not checked.** A path is reported only when the
  data model plainly has nothing there. Below an empty list or a `null` nothing can be known, and
  a behavior document does not declare what a response looks like inside. Putting one sample
  item in a list makes its template checkable.
- **Responsive values are a value or an array of values**, one per breakpoint. The design system
  has no named breakpoints, so there is no object form.
- **There is no animation vocabulary.** The design system has no motion tokens to name.
- **`validateSurface` reports one finding per prop**, the most specific one. Fix it and run
  again to see the next.

## A2UI

This package vendors the A2UI v1.0 JSON schemas and its basic catalog, unmodified, and bundles
them as data. They are licensed under the Apache License, Version 2.0, and that license and a
note of their source ship with this package in `vendor/a2ui/v1_0/`.

Everything this package validates is valid A2UI v1.0. The behavior document, `When`, the core
functions and the theme sources are additions made through a custom catalog and
`metadata.extensions`, which are the extension points the protocol defines. They are not part of
A2UI and are not endorsed by the A2UI project.

## License

MIT. See [`LICENSE`](./LICENSE). The vendored A2UI files keep their own license.

Release notes: [`release-notes/`](./release-notes).
