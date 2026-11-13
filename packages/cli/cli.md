# Command line

`@soroush.design/cli` holds the design system's command line: `init` today, `create` later
(RFC #84). This is the contributor's view; [`README.md`](./README.md) is the user's.

## Two ways in, one command line

| Run as                                 | Bin                                 | The design system it installs                    |
| -------------------------------------- | ----------------------------------- | ------------------------------------------------ |
| `npx @soroush.tech/design-system init` | `packages/design-system/src/bin.ts` | That package itself, found by its `package.json` |
| `npx @soroush.design/cli init`         | `packages/cli/src/bin.ts`           | The workspace's version, read at build time      |

`@soroush.tech/design-system` depends on this package at an exact version, and its bin is a
shim: it calls this package's default export, `main(argv, io, designSystem)`, with its own
`package.json`. So the version `init` installs and the React range it checks always come from
the design system that ran it. This package never depends on the design system, so there is no
cycle; its `type-tests/init` fixture reads the design system's built types by path.

Publish this package first: the design system's release names its exact version. CD orders an
`all` run dependencies-first.

## Layout

- `src/main.ts` reads the command line; `src/init.ts` runs `init`.
- `src/detect/` reads the app: its package manager, React, its root, a workspace's apps, git.
- `src/plan/` works out every change from what `detect` read, writing nothing: the files, the
  root's edit, the install. It reads files only through `InitFacts.readFile`.
- `src/apply/` writes the plan, taking every change back when a write fails.
- `src/templates/` holds the files `init` writes. Each starts with `MARKER`, which is how a second
  run tells its own files from the app's.

## The rules each change keeps

Each has a test: nothing is written before a yes; a clean git tree unless `--force`; no file is
overwritten; an edit is made only to the standard shape and read back; a failed write is undone;
the install runs last, with the app's own package manager and no scripts; no network but the
install; no path outside the app, and no symbolic link.

## Tests

- `pnpm test:coverage`: unit tests in Node, 100% coverage.
- `pnpm test:types`: builds the design system and typechecks `type-tests/init`, the strictest app
  `init` writes into. `src/fixture.test.ts` keeps its files equal to `init`'s output; after a
  template change, update them with `vitest run -u`.
