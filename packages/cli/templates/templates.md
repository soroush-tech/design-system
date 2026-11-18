# The starters' templates

`create` writes an app from these files. Each framework has a folder, and each language a folder
in it: `<framework>/ts/` is written by hand, and `<framework>/js/` is made from it - by the
package's build and its tests - and kept out of git.

## Layers

A framework's TypeScript folder holds layers, laid in this order, each over the ones before it:

1. `base/`: the isomorphic app, with no library and no sample data.
2. `<rendering>/`: the files a rendering writes in place of the base's, such as `ssr/`.
3. `sample-data/`: the items pages.
4. `with/<library>/`: a library's own files, in the order `create` offers the libraries.

A file a later layer has takes the place of the same file below it. A file left empty once its
markers are applied is not written, so a whole file can sit inside one `@if`.

## Markers

A line of its own, in the comment the file's language has, keeps or drops the lines up to the
next marker:

```tsx
// @if tanstack-query
import { useQuery } from '@tanstack/react-query'
// @elif swr
import useSWR from 'swr'
// @else
import { useState } from 'react'
// @endif
```

- In JSX and in an `.astro` page: `{/* @if msw */}` ... `{/* @endif */}`. In Markdown:
  `<!-- @if msw -->`.
- A condition holds names, `!`, `&&`, `||` and parentheses. The names are the app's rendering
  (`isomorphic`, `ssr`, `spa`, `ssg`), its libraries (`tanstack-query`, `msw`, ...),
  `sample-data`, and `ts` or `js`.
- **Every branch is whole** - a statement, a JSX element, a list item - so the file parses with
  all its branches in it: the formatter reads it, and so does the JavaScript build. A name
  declared in two branches is fine; a tag opened in one branch and closed in another is not.
- **What only TypeScript has goes in `// @if ts`** when taking the types out would leave something
  behind: the doc comment over an interface, the blank line before a type. `// @if ts` and
  `// @else` also hold two forms of a statement whose JavaScript is not its TypeScript stripped.

## Placeholders

`__TITLE__` (the app's title), `__TITLE_STRING__` (the title, quoted for a string in single
quotes) and `__SCHEME__` (`light` or `dark`). A path a text names is written as TypeScript's
(`src/theme/themes.ts`): the JavaScript build turns it to `.js`.

## Names npm would drop

`_gitignore` is written as `.gitignore`, and `_env` as `.env`.

## The JavaScript templates

The package's build, and its tests' setup, make `<framework>/js/` from `<framework>/ts/`
(`scripts/gen-templates.mjs`): it takes the types out of each
`.ts` and `.tsx` file and of an `.astro` file's frontmatter (`ts-blank-space`), drops a line that
held only types, turns the paths a text names and the file names to `.js` and `.jsx`, leaves out
`tsconfig.json` and `.d.ts` files, and formats the result. `pnpm build` runs it before the code is
built, so the published package holds both languages, and so do the tests, in their global setup.

Lint skips the templates, since a template is not a program until its markers are applied; the
formatter reads the TypeScript ones. The apps they write are checked as the fixtures in
`type-tests/create-*`.
