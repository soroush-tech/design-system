# Command line

`@soroush.design/cli` holds the design system's command line: `init` sets the design system up in
an existing app, and `create` starts a new one (RFC #84). This is the contributor's view. The
user's is [`docs/command-line.md`](./docs/command-line.md), which the docs site's `/cli/` page
renders; [`README.md`](./README.md) is npm's short page, which points there.

## One command line, one way in

| Run as                         | Bin                       | The React range it checks                         |
| ------------------------------ | ------------------------- | ------------------------------------------------- |
| `npx @soroush.design/cli init` | `packages/cli/src/bin.ts` | The workspace's React package, read at build time |

An app imports from `@soroush.design/react`, so that is what the command installs, at the version it
was released next to: `src/designSystemPackage.ts` reads it from `packages/react/package.json` when
this package is built, and the bundler keeps only that field. It is a released version, even from
an alpha cli. `src/bin.ts` reads the package's name and its React peer range the same way.

`@soroush.design/react` has no bin and does not depend on this package: an app installs the React
package and never the command line at run time. This package never depends on the package it
installs, so there is no cycle; its `type-tests` read that package's built types by path. Build
and publish the React package before this one, so the version it bundles exists on npm.

An app counts as set up when it has `@soroush.design/react` as a dependency.

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
- `src/templates/` holds the files `init` writes. Each starts with `MARKER`
  (`// Set up by @soroush.design/react init.`), which is how a second run tells its own files from the
  app's. A file that starts with an earlier marker, the former library name or `@soroush.tech/design-system`,
  is still init's own.
- `src/closing.ts` holds the lines both commands end on: the fonts, and the agent suggestions.

## How `create` works, and where a starter plugs in

`create` is the same for every framework. A starter, in `src/create/starters.ts`, only supplies
the files: `createFiles(facts)` gets the name, the language, the scheme, whether to add the
sample data pages, and the React package's version, and returns each file by its path from the app's folder, its `package.json` among them.
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

### The templates

A starter's files are real files, in `templates/<framework>/ts/`, as `templates/templates.md`
says: a `base/` app, then a layer per rendering, the sample data and each library
(`with/<library>/`), laid one over the other by `src/create/template/`. Where several choices
meet in one file, it marks its lines with `// @if <condition>` (`{/* @if */}` in JSX,
`<!-- @if -->` in Markdown), and `create` keeps the lines whose condition holds. Two rules keep a
template a file the tools can read:

- **Every branch is whole:** a statement, a JSX element, a list item. With all its branches in
  it, a template must parse, since the formatter and the JavaScript build read it that way; two
  returns or two declarations of a name are fine, a half-open element is not.
- **TypeScript's own lines are marked `// @if ts`** when stripping the types would leave something
  behind, such as the doc comment over an interface. `// @if ts` and `// @else` also hold two
  forms of a statement where the JavaScript is not the TypeScript stripped (zustand's
  `create<State>()(...)`, Astro's `getStaticPaths`).

`templates/<framework>/js/` is made from the `ts/` folder by `scripts/gen-templates.mjs` (the types
taken out by `ts-blank-space`, the paths a text names turned to `.js`, then the formatter), which
`pnpm build` runs before tsdown and the tests run in their global setup; git ignores it. `create`
only copies and chooses, with nothing to strip or format at run time. Lint skips `templates/`, since a
template is not a program until its markers are applied; the apps it writes are linted and
typechecked as the `type-tests/create-*` fixtures, which the starters' tests keep in step.

What stays in code: `package.json` (its packages come from the choices, at the versions in this
package's own `devDependencies`), and the themes and `Providers`, which are `init`'s templates
(`src/templates/templates.ts`).

### The Astro starter

`templates/astro/` writes an Astro app whose React parts are islands. Astro renders an island
with plain `react-dom/server`, not as a server component, so the design system needs no
`'use client'`, and the styling engine writes each island's styles into its HTML with no
extraction. Each island is its own React root: each is exported inside `withIsland` (`src/theme/Island`), which
renders it inside the theme - and the query client and the Redux store, one of each in the
browser for every island - so its hooks find them; the header's
`<Providers>` draws the base styles once a page, and the scheme is a small shared store
(`useSyncExternalStore`, with the default as the server snapshot, so an island hydrates on the
HTML it got). With islands (SSR), the layout has Astro's `<ClientRouter />` and a
script on `astro:before-swap` that keeps the engine's style elements and markers (the very ones its
cache writes into) in the head, which the router would otherwise replace, and moves the next page's inline styles there, except its base styles, which
the header draws. SSR adds `output: 'server'` with `@astrojs/node` standalone, and an item route
that reads its id on each request (`Astro.rewrite('/404')` for an unknown one).
The home page's counter and greeting are islands of their own with `client:only`, children of
the `Home` island: what they show lives in memory (a store, the query cache), so an island that
hydrates again after the router moves back cannot meet a stale copy in the HTML. msw's switch is
`PUBLIC_MSW` (Astro hands the browser only `PUBLIC_` variables), and `src/data/api` waits for the
worker before each request. `Starter.renderings` lists `ssr` and `ssg`, not
`isomorphic`: an `.astro` page never renders in the browser, so the client router fetches each
next page's HTML, which is not what isomorphic means here. Its fixtures are
`type-tests/create-astro-ssr` and `-ssg`, and `-libraries` (SSR, TanStack Query, msw, zustand,
React Hook Form) and `-more` (SSR, SWR, Redux Toolkit): `test:types`
checks their TypeScript, and the smoke test runs `astro check` on a whole app. `astro check` takes
TypeScript 6 at most, so the starter's TypeScript is this package's `typescript-astro` alias.

### The Vike starter

`templates/vike/` writes a Vike app with no renderer package, rendered as the developer picks:

- `isomorphic` (`base/`): every page prerendered at build time, then client routing.
- `ssr/`: `server: true`, Vike's built-in server, renders each page on request, with client
  routing after; `+data` runs on the server, and there is no `+onBeforePrerenderStart`.
  `npm start` runs `node dist/server/index.mjs`.
- `ssg/`: `Page` and `Layout` load at build time only, and there is no `+onRenderClient`, so a
  page ships no script; the layout has no scheme switch.

`+onRenderHtml` renders the page with `@umber-style/server` on the design system's `styleCache`, and
puts the styles it used in the head; `+onRenderClient` hydrates it with the same cache. Both
render `PageShell`, the page inside `+Layout`, which renders `<Providers>`: the providers live in
the app, so the scheme it holds can switch the theme.

The libraries are asked by job (`src/create/libraries.ts`: a library's `group` is its question),
and every choice shows in the app: the home page's `Counter` keeps its count in the state library
or its own state, its `Greeting` reads `src/data/api` through the data library, the form sends
through it, and msw answers each of those calls. The fixtures: `type-tests/create-vike`, `-ssr`
and `-ssg` for the renderings, `-libraries` (TanStack Query, msw, zustand), `-jotai` and
`-more` (SWR, msw, Redux Toolkit, React Hook Form) for the libraries. Vitest is in every app,
in the base layer; with msw, `with/msw/` adds msw's Node server and the tests' setup.

### The React Router starter

`templates/react-router/` writes the SPA, the only rendering it has and the only starter for it:
React Router's data mode on Vite, with `index.html` loading `src/main`, which creates the router
from `src/routes` with `createBrowserRouter`. Every page is a child of a pathless route with an
`errorElement`, inside `src/pages/Layout`, so a path with no page (`*`), a loader's 404 and a
render error all show `ErrorPage` in the layout. The layout renders `<Providers>` and the query
client, as Vike's `+Layout` does; the Redux store is provided in `src/main`, above the router.
The design system's `Link` always renders an `<a>`, so `src/components/RouterLink` gives it
`useHref` and `useLinkClickHandler` to move with no reload. With the sample data and no data
library, `items/loader` and `item/loader` read `src/data/items` (`data(..., { status: 404 })` for
an unknown id); with TanStack Query or SWR there is no loader, the pages query `src/data/api`,
and msw answers `/api/items`. msw starts with a top-level `await` in `src/main`, before the
router. Its fixtures are `type-tests/create-react-router`, `-libraries` (TanStack Query, msw,
zustand, React Hook Form), `-more` (SWR, Redux Toolkit, React Hook Form) and `-jotai`.

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
