# The step `gild-ui-0.1.0`

Moves an app from `@soroush.tech/design-system` 2.x (and its companions `@soroush.tech/markdown` and
`@soroush.tech/hooks`) to Gild UI 0.1.0: `@gild-ui/react`, `@gild-ui/core`, `@gild-ui/hooks` and
`@gild-ui/react-markdown`. Task [#176](https://github.com/soroush-tech/design-system/issues/176), from the
inventory of [#171](https://github.com/soroush-tech/design-system/issues/171).

## Files

| File                              | What it holds                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `index.ts`                        | The `MigrationStep`: reads each file of the app once, answers with the changes        |
| `data.ts`                         | Reads `inventory/`: where each old name goes, the report messages, the old engine     |
| `inventory/`                      | The step's data: every difference between 2.2.0 and 0.1.0, human and machine readable |
| `source.ts`, `names.ts`           | The parser, the walk over the tree, range edits, the names a file uses                |
| `imports.ts`                      | Rewrites imports, exports, `import()`, `require()`, mocks, `declare module`           |
| `styles.ts`                       | `css` and `style` on components, and `useStyle` with a factory                        |
| `theme.ts`                        | `components` into `defineThemes`, `Theme['components']`, theme augmentations          |
| `detect.ts`                       | What is only reported: calls whose meaning changed, token math, old output            |
| `dependencies.ts`                 | package.json: packages added and removed, React, and its reports                      |
| `fixtures/<name>/before`, `after` | An app on 2.2.0 and what the step must make of it; `reports.json` is what is left     |

`inventory.json` is the source of every report message (`[ID]` and then the item's `how`), so a
message cannot drift from the inventory; `imports.json` is the import map. `data.test.ts` checks that
every module the map names is an entry of the workspace's package.

## The parser

`@babel/parser`, a development dependency of the package that `tsdown` bundles into `dist`, so the
command line still has no dependency to install. A file is read as TypeScript with JSX (TypeScript
without it for `.ts`, `.mts`, `.cts`); the tree has the range of every node, and every edit replaces a
range of the original text, so nothing the step does not touch changes by a byte. A file that does not
parse is reported and left as it is. The small tokenizer a regular expression would give cannot tell
an `import` in a string or a comment from one in code, nor read a JSX attribute: those are the two
things this step has to do.

## What it edits

- **Imports**, one entry for each name of the styling system
  (`import { ThemeProvider } from '@gild-ui/react/ThemeProvider'`), the theme from
  `@gild-ui/core/theme`, the style-prop functions from `@soroush.tech/styled-system`, every component
  from `@gild-ui/react/<Component>`, hooks, markdown. Aliases, `type` modifiers and the quotes and
  semicolons of the file are kept; statements that meet in a module are merged, and one that goes to
  several is split. The same for `export ... from`, `import()`, `require()`, `vi.mock`/`jest.mock`,
  `import('x').T`, `declare module 'x'`, and the old paths named in comments.
- **`css` and `style` on a Gild UI component** (one imported from a component entry, or made with
  `styled`): a static object is lifted into `const styles = StyleSheet.create({ ... })`, an entry for
  each place; `css={(theme) => ({ ... })}` that reads nothing but its theme becomes a function sheet
  and `const x = useStyle(sheet)` at the top of the function component, when the component has a body
  with lines of its own.
- **`useStyle({ getStyles: (theme) => ({ ... }) })`** becomes a function sheet and
  `useStyle(sheet).root`; a `css={result}` of it becomes `style={result}`.
- **`components` in `createTheme`**, when every `createTheme` call of a file has the same
  `components` and the file collects its themes in one place (an object of the calls, or consts
  gathered by `const themes = { light, dark }`): moved into `defineThemes(themes, components)`; the
  exported names stay (`export const { light, dark } = themes`).
- **`Theme['components']`** is `ThemeComponents`; the `declare module` of the old theme is the
  core one.
- **package.json**: `@gild-ui/core`, `@gild-ui/hooks`, `@gild-ui/react-markdown` and
  `@soroush.tech/styled-system` `^6.0.3` where an import reaches them; the old markdown and hooks
  packages and the previous engine's packages (while no file imports them) removed; `react` and
  `react-dom` to `^19.2.8` where lower. The runner puts `@gild-ui/react` where the design system was.

## What it reports

Every report is a file and a line and the inventory's words. Imports it cannot decide (a default or
namespace import of a path whose names are split, a path or a name the inventory does not know, a
path built at run time), what has no successor (`TabsVariants`, `ComponentStyle`, ...), the `css` and
`style` it cannot lift (props, state, a conditional, a theme function that reads more than its
theme), `components` it cannot move, `createTheme` annotated with `Theme`, a theme module (the
registration recipe), server rendering (`useServerInsertedHTML`, the server's critical-style
extraction, `createCache`), `withTheme`, `css` and `keyframes` calls, token math in style functions,
the Tooltip arrow's style, providers and portals, selectors of the old output, the old engine's
settings in tsconfig and Babel, `design-system init` in a script, peer ranges, React 18 pins, and two
lists of what no source line shows: output and type differences, to check once the app runs.

## Fixtures and tests

`fixtures/docs-app` is the documentation app at the 2.2.0 tag, trimmed to the files the step
touches; `fixtures/init-templates` is what `init` wrote at 2.2.0; `fixtures/synthetic` has every
shape the first two do not (the `css` prop, the pragma, `TabsVariants`, owner states, `/testing`,
`/catalog`, `withTheme`, keyframes, the Tooltip arrow, a file that does not parse, ...).
`fixtures.test.ts` runs the step through the runner over each `before` and compares every file and
the report list with `after` and `reports.json`, runs it again over the result (nothing left to
edit), and moves a copy through `runMigrate` twice (the second run does nothing). After a change of
the step, `UPDATE_FIXTURES=1 pnpm vitest run` writes the `after` and `reports.json`: read the diff.
`pnpm test:types` type-checks the `after` of `init-templates`, and the files of `docs-app` that
need nothing the fixture does not carry, against the workspace's built packages.
