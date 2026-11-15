# Command line

`@soroush.design/cli` holds the design system's command line: `init` sets the design system up in
an existing app, and `create` starts a new one (RFC #84). This is the contributor's view. The
user's is [`docs/command-line.md`](./docs/command-line.md), which the docs site's `/cli/` page
renders; [`README.md`](./README.md) is npm's short page, which points there.

## Two ways in, one command line

| Run as                                 | Bin                                 | The design system it installs                                                            |
| -------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `npx @soroush.tech/design-system init` | `packages/design-system/src/bin.ts` | That package itself, found by its `package.json`                                         |
| `npx @soroush.design/cli init`         | `packages/cli/src/bin.ts`           | The workspace's version, read at build time; a prerelease cli asks for its own channel's |

`@soroush.tech/design-system` depends on this package at an exact version, and its bin is a
shim: it calls this package's default export, `main(argv, io, designSystem)`, with its own
`package.json`. So the version `init` installs and the React range it checks always come from
the design system that ran it. This package never depends on the design system, so there is no
cycle; its `type-tests/init` fixture reads the design system's built types by path.

Publish this package first: the design system's release names its exact version. CD orders an
`all` run dependencies-first.

## Layout

- `src/main.ts` reads the command line, and holds the help: `USAGE` with no command, and `HELP`,
  each command's own, which `<command> --help` and a wrong option print. `src/init.ts` runs
  `init`, and `src/create/` runs `create`.
- `src/detect/` reads the app: its package manager, React, its root, a workspace's apps, git.
- `src/plan/` works out every change from what `detect` read, writing nothing: the files, the
  root's edit, the install. It reads files only through `InitFacts.readFile`.
- `src/apply/` writes the plan, taking every change back when a write fails.
- `src/templates/` holds the files `init` writes. Each starts with `MARKER`, which is how a second
  run tells its own files from the app's.
- `src/closing.ts` holds the lines both commands end on: the fonts, and the agent suggestions.

## How `create` works, and where a starter plugs in

`create` is the same for every framework. A starter, in `src/create/starters.ts`, only supplies
the files: `createFiles(facts)` gets the name, the language, the scheme, whether to add the
sample data pages, and the design system's version, and returns each file by its path from the app's folder, its `package.json` among them.
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

### The workspace

A starter writes the app alone. For the workspace layout (the default), `src/create/workspace.ts`
moves its files to `apps/web` and adds the root's: `package.json` with the workspaces and the
scripts that run the app's, one for each script the app's own `package.json` has (each package
manager's own workspace command, no task runner),
`pnpm-workspace.yaml` for pnpm, a README, a `.gitignore`, and `services/.gitkeep`. The starter is
told the app's package name, `@<name>/web`. The workspace adds no source, so it has no type-test
fixture of its own; two `create-smoke` rows build it from the root.

### The Astro starter

`src/create/astro/astro.ts` writes an Astro app whose React parts are islands. Astro renders an
island with plain `react-dom/server`, not as a server component, so the design system needs no
`'use client'`, and Emotion writes each island's styles into its HTML with no extraction. Each
island is its own React root: a page's component renders inside `Theme`, the header's
`<Providers>` draws the base styles once a page, and the scheme is a small shared store
(`useSyncExternalStore`, with the default as the server snapshot, so an island hydrates on the
HTML it got). Isomorphic, the layout has Astro's `<ClientRouter />` and a script on
`astro:before-swap` that keeps Emotion's style tags in the head, which the router would otherwise
replace, and moves the next page's inline styles there, except its base styles, which the header
draws. SSR has all of that, with `output: 'server'` and `@astrojs/node` standalone, and an item
route that reads its id on each request (`Astro.rewrite('/404')` for an unknown one).
`Starter.renderings` lists `isomorphic`, `ssr` and `ssg`; `hasLibraries` is false until its
recipes land. Its fixtures are `type-tests/create-astro`, `-ssr` and `-ssg`: `test:types` checks their
TypeScript, and the smoke test runs `astro check` on a whole app. `astro check` takes TypeScript 6
at most, so the starter's TypeScript is this package's `typescript-astro` alias.

### The Vike starter

`src/create/vike/vike.ts` writes a Vike app with no renderer package, rendered as the developer
picks (`StarterFacts.rendering`):

- `isomorphic`: every page prerendered at build time (`prerender: true`), then client routing
  (`clientRouting: true`).
- `spa`: `Page` and `Layout` load in the browser only (`meta` `env`); `+onRenderHtml` writes an
  empty shell and `+onRenderClient` renders into it, with no `@emotion/server`.
- `ssr`: `server: true`, Vike's built-in server, renders each page on request, with client
  routing after; `+data` runs on the server, and there is no `+onBeforePrerenderStart`. `npm start`
  runs `node dist/server/index.mjs`.
- `ssg`: `Page` and `Layout` load at build time only, and there is no `+onRenderClient`, so a page
  ships no script; the layout has no scheme switch.

Each has its type-test fixture: `type-tests/create-vike`, `-ssr`, `-spa` and `-ssg`.

The libraries (`src/create/libraries.ts`, `StarterFacts.libraries`) are asked by job: the
`group` of each library is its question (data, state), and the rest share the last one. Their
examples are in `src/create/recipes.ts`, for every starter: `src/data/api` and the msw handlers
that answer it, the home page's `Counter` (its count in the state library, or its own state) and
`Greeting` (read through the data library), and the form, which sends through it. Every choice
shows in the app. In the Vike starter, `createLibraryFiles` adds their files (the store or atom,
the mock API, `src/data/api`),
`createLayout` holds the query client and the scheme where the state library says, and
`withMocks` makes the client renderer start msw first. Their versions are this package's
devDependencies too. `type-tests/create-vike-libraries` (TanStack Query, msw, zustand) and
`-jotai` typecheck them, and `-more` (SWR, Redux Toolkit, React Hook Form, Vitest). In the isomorphic app:

- `+onRenderHtml` renders the page with `@emotion/server` on the design system's `styleCache`, and
  puts the styles it used in the head, so the page is drawn styled before any script runs.
  `+onRenderClient` hydrates it with the same cache. Both render `PageShell`, the page inside
  `+Layout`.
- `+Layout` is a setting of the app's own (`meta` in `+config`), and it renders `<Providers>`: the
  providers live in the app, not in the files that start it, so the scheme it holds can switch
  the theme. `src/theme/` is `init`'s own templates.
- `PageShell` gives every component the page's `pageContext`, through `usePageContext` and
  `useData` in `src/pages/usePageContext`.
- With `--sample-data` (or a yes to its question), `createSampleDataFiles` adds `src/data/items`,
  six sample items, and two routes that read them in `+data` at build time: `/items`, and
  `/items/@id`, whose `+onBeforePrerenderStart` lists one URL per item for the build to
  prerender. An id with no item throws `render(404)`. They use no data library.
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
  sample data pages included, under its own `tsconfig.json`. `src/fixture.test.ts` and `src/create/vike/vike.test.ts` keep
  them equal to what the commands write; after a template change, update them with `vitest run -u`.
- `pnpm smoke:create [--lang ts|js] [--pm npm|pnpm] [--sample-data]`, from the repo's root: packs
  the design system and the packages it depends on, creates an app on them with the built cli,
  typechecks, builds and serves it, and checks its prerendered pages and their HTML for the
  styles. CI's `create-smoke` job runs it in TypeScript with npm and the sample data pages, and in
  JavaScript with pnpm without them.
