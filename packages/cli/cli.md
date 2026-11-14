# Command line

`@soroush.design/cli` holds the design system's command line: `init` sets the design system up in
an existing app, and `create` starts a new one (RFC #84). This is the contributor's view;
[`README.md`](./README.md) is the user's.

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

- `src/main.ts` reads the command line; `src/init.ts` runs `init`, `src/create/` runs `create`.
- `src/detect/` reads the app: its package manager, React, its root, a workspace's apps, git.
- `src/plan/` works out every change from what `detect` read, writing nothing: the files, the
  root's edit, the install. It reads files only through `InitFacts.readFile`.
- `src/apply/` writes the plan, taking every change back when a write fails.
- `src/templates/` holds the files `init` writes. Each starts with `MARKER`, which is how a second
  run tells its own files from the app's.
- `src/closing.ts` holds the lines both commands end on: the fonts, and the agent suggestions.

## How `create` works, and where a starter plugs in

`create` is the same for every framework. A starter, in `src/create/starters.ts`, only supplies
the files: `createFiles(facts)` gets the name, the language, the scheme and the design system's
version, and returns each file by its path from the app's folder, its `package.json` among them.
`create` does the rest:

1. It reads the options, and asks for what it was not told, in a terminal only.
2. It checks the name (a package name with no scope, since it names the folder too) and the
   folder: new, or empty. A folder that holds anything is refused.
3. It plans: the starter's files, and `<package manager> install` with no scripts. The package
   manager is the one that ran it, read from `npm_config_user_agent`; a new app has no lockfile.
4. It shows the plan with `formatPlan`, and writes with `applyPlan` after a yes.
5. It installs, then runs `git init` with no commit, unless the folder is in a repository.

When a write or the install fails, it takes the app away: the folder it made, or what it wrote in
the empty folder it was given. To add a starter, add it to `STARTERS`; the first one is the
default.

### The Vike starter

`src/create/vike/vike.ts` writes an isomorphic Vike app - every page prerendered at build time (`prerender: true`), then
client routing (`clientRouting: true`) - with no renderer package:

- `+onRenderHtml` renders the page with `@emotion/server` on the design system's `styleCache`, and
  puts the styles it used in the head, so the page is drawn styled before any script runs.
  `+onRenderClient` hydrates it with the same cache. Both render `PageShell`, the page inside
  `+Layout`.
- `+Layout` is a setting of the app's own (`meta` in `+config`), and it renders `<Providers>`: the
  providers live in the app, not in the files that start it, so the scheme it holds can switch
  the theme. `src/theme/` is `init`'s own templates.
- Each file is written once, in TypeScript; `t(...)` holds what only TypeScript has, so the
  JavaScript app is the same file with the types taken out.
- The versions it installs are this package's own `devDependencies`, which the fixture below is
  checked against. Bump them there.

## The rules each change keeps

Each has a test: nothing is written before a yes; a clean git tree unless `--force` (`init`); a
new or empty folder only, taken away on a failure (`create`); no file is overwritten; an edit is made only to the standard shape and read back; a failed write is undone;
the install runs last, with the app's own package manager and no scripts; no network but the
install; no path outside the app, and no symbolic link.

## Tests

- `pnpm test:coverage`: unit tests in Node, 100% coverage.
- `pnpm test:types`: builds the design system, then typechecks `type-tests/init`, the strictest app
  `init` writes into, and `type-tests/create-vike`, the TypeScript app the Vike starter writes,
  under its own `tsconfig.json`. `src/fixture.test.ts` and `src/create/vike/vike.test.ts` keep
  them equal to what the commands write; after a template change, update them with `vitest run -u`.
- `pnpm smoke:create [--lang ts|js] [--pm npm|pnpm]`, from the repo's root: packs the design system
  and the packages it depends on, creates an app on them with the built cli, typechecks, builds
  and serves it, and checks its server HTML for the styles. CI's `create-smoke` job runs it in
  TypeScript with npm and in JavaScript with pnpm.
