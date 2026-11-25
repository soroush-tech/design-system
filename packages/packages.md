# Packages

Conventions for everything under `packages/` - the workspace's shared code. Most packages are framework-agnostic tooling; `react` (`@soroush.design/react`) is the React design system - the components, the theme's provider and hooks, and the styling system - `react-hooks` its hooks, and `react-markdown` a companion React library that builds on it (a headless markdown editor/renderer). The component packages follow [`react/design-system.md`](./react/design-system.md) for component conventions - the `react-markdown` package's specifics are in [`react-markdown/markdown.md`](./react-markdown/markdown.md). Each folder is its own pnpm package, globbed by `packages/*` in `pnpm-workspace.yaml` and consumed by apps (and by each other) via `workspace:*`.

For a plain-English overview of what currently lives here, see [`README.md`](./README.md).

---

## What belongs here

`packages/` is for **shared, app-agnostic code** - framework-agnostic tooling (lint config, Vite plugins), shared schemas, generic utilities.

| Belongs in `packages/`                           | Belongs elsewhere                                             |
| ------------------------------------------------ | ------------------------------------------------------------- |
| A Vite plugin reusable across builds             | App-specific sections/pages/hooks → `apps/web/src/`           |
| The shared oxlint base                           | App-specific composed UI → `apps/web/src/common\|section`     |
| UI primitives (`Flex`, `View`) → `react`         | A single-consumer, app-coupled component → keep it in the app |
| A schema/util shared by two members or published | A single-consumer, app-coupled helper → keep it in the app    |

**A package is justified only when** it is (a) reused by more than one member, or (b) intended to be published on its own. Until then, keep the code in the app - don't pre-extract.

---

## Folder structure

Directory name == package name **minus its scope**: `@soroush.design/react-markdown` is `packages/react-markdown`.

```
packages/
  package-name/
    src/
      index.ts            ← single entry: the plugin/util + its exported types
      index.test.ts       ← co-located unit tests (100% coverage - required)
    package.json
    tsconfig.json         ← bundler resolution, noEmit; NOT in the root solution
    .oxlintrc.json        ← extends @soroush.tech/eslint-config's base + env
    vitest.config.ts      ← v8 coverage, reporter ['text', 'lcov'], 100% thresholds
    tsdown.config.ts      ← publishable packages only
    README.md             ← usage docs (publishable packages)
    LICENSE               ← publishable packages
```

Keep the **public API in `index.ts`** (the single entry); extract internal helpers into sibling modules (`filters.ts`, `collector.ts`, ...) with co-located `*.test.ts` only once the entry file grows unwieldy - don't pre-split a small, well-factored file. The app-level "one file per helper" rule (CLAUDE.md "Logic & data co-location") is scoped to `common`/`section`/`pages` components, not packages: a package's job is to present one clear entry, so internal structure is an optimization for size, not a default. When `index.ts` does re-export a sibling barrel-style, follow the `export *` rule in the `code-style` skill.

---

## Naming & scope

- Every package is scoped **`@soroush.design/*`**, private ones included (`@soroush.design/docs-content`, `story-demo`, `lab`, `contract`, and the docs app `@soroush.design/docs`). The exceptions: **`@soroush.tech/ui-spec`**, which keeps its name and is not edited; and **`@soroush.tech/eslint-config`**, which keeps its name because `ui-spec` lists it as a `workspace:*` dev dependency and renaming it would edit `ui-spec`. A new package takes the `@soroush.design` scope (apps are not - `apps/web` stays `@soroush/web`).
- A Vite plugin's internal `name` field **must equal its package name minus the scope** (`vite-plugin-watch`), so build logs read `[vite-plugin-watch]`. Keep the directory, package name, and plugin `name` in sync.

---

## The `soroush.design` family

The layout of the UI packages ([#114](https://github.com/soroush-tech/design-system/issues/114),
[#157](https://github.com/soroush-tech/design-system/issues/157)). A package is separate only when it
is **shared by platforms**, **brings third-party dependencies** an app should not be forced to
install, or is **meant to be used without the design system**. Packages never re-export each other,
so every name has one path.

| Package                          | Holds                                                                                                                      | An app writes                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `@soroush.design/core`           | What every platform shares and needs no framework: the theme, tokens, `createTheme`, `baseTheme`, breakpoints, the catalog | `@soroush.design/core/theme`                   |
| `@soroush.design/react-hooks`    | General hooks, one subpath each, usable without the design system                                                          | `@soroush.design/react-hooks/useDebounce`      |
| `@soroush.design/react`          | The components (one subpath each) and the styling system: `ThemeProvider`, `useTheme`, `styled`, `Global`, ...             | `@soroush.design/react/Button`, `.../useTheme` |
| `@soroush.design/react-markdown` | The markdown editor and renderer, with its third-party libraries; a peer of `@soroush.design/react`                        | `@soroush.design/react-markdown/Editor`        |

A scope on npm has one level, so a package of a platform is named `@soroush.design/<platform>-<name>`,
never `@soroush.design/react/markdown`. Later packages repeat the pattern (`react-charts`,
`react-native`, `vue`). `@soroush.design/styled-system`, `@soroush.design/mcp` and
`@soroush.design/cli` are outside it.

**A new package is justified by what it depends on**, not by size: `react-markdown` brings an editor
and a diagram library, and an app that wants buttons should not install either. Components are
**not** split into a package each - subpath imports already load only what is used.

### The core

`@soroush.design/core` holds what every platform shares and that needs **no framework**: the theme
(the token scales, `baseTheme`, the `Theme` types, `createTheme`, `themeDefault`, `spacing`) at
`/theme`, the breakpoint and container-query helpers at `/breakpoints`, the pure utilities at
`/utils`, and the catalog at `/catalog`. The platform packages depend on it as a real dependency -
`workspace:^`, never bundled - and import it by its subpaths (`@soroush.design/core/catalog`), one
per area.

- **The rule: no framework import; a test enforces it.** The core has no `dependencies` and no
  `peerDependencies`, its `tsconfig` has no DOM library, and a test loads it in plain Node with
  `react`, `react-native`, `vue` and `@umber-style/*` mocked to throw, then reads the built files and
  fails on any import that is not one of its own chunks.
- **The core describes; a platform names.** Data is platform-neutral: a catalog entry holds the
  `subpath` a component is served from, not the package. The React package's `/catalog` adds `module`
  (`@soroush.design/react/<subpath>`) to each entry and keeps every other field as the core wrote it.
- **A platform composes its `Theme` on top of the core's.** The core's `Theme` and every scale are
  open interfaces with no framework type in them. The React package declares
  `interface Theme extends CoreTheme { components?: ... }` for what names its framework - the typing
  of `theme.components` (owner states, slots, `styleOverrides`) - and uses it inside; it does not
  re-export the core. An app imports the theme from `@soroush.design/core/theme` and augments it
  there.
- **Publish the core before the packages that use it.** `scripts/prerelease-versions.mjs` orders a
  run dependencies-first.

### The React package

`@soroush.design/react` holds the components and the styling system they are written in: root and
one subpath each for `ThemeProvider`, `LayoutProvider`, `useTheme`, `useDefaultProps`,
`useMediaQuery`, `withTheme`, `styled`, `css`, `keyframes`, `Global`, `useStyle`, `withStyles` and
`StylesConsumer`; `/engine` for server-rendering setup; `/catalog` and `/testing`; and one subpath
for every component. The public paths and the exact names of each are the contract in
`packages/contract` (`exports/react.json`), checked by its tests.

- **One copy.** The theme provider, the engine configuration and the style cache are defined once in
  the build and shared by every entry point; the package depends on the core, the hooks and the
  style-prop package by name and never bundles them. `src/externalOwnership.test.ts` reads the build
  and fails on a second copy, and on a core name read off a namespace object. A bundler builds a
  namespace object for a barrel that `export *`s a package, and the object lacks the starred names
  (`theme_exports.themeDefault` threw at run time once): source imports a core name from
  `@soroush.design/core/...`, never through a barrel of the package.
- **The engine is configured by a function** (`configureEngine()`), which every entry point of the
  styling system calls before its first use. An app that imports only `keyframes` gets the prefix,
  the value repair and the raw theme keys. `src/entries/entries.test.ts` holds each entry to it.
- **A component's theme types are plain types next to it.** `<Name>/<Name>.types.ts` holds
  `<Name>OwnerState` (the resolved props its styled elements receive), `<Name>Slot` (the slot names
  it uses with `styled(..., { name, slot })`) and `<Name>ThemeConfig`
  (`ComponentConfig<<Name>OwnerState, <Name>Slot>`), and the folder's `index.ts` exports them.
  `src/theme/components.ts` is **generated** from those files (`pnpm gen:theme-components`; the
  pre-commit hook and CI run it with `--check`) and holds the plain `ThemeComponents` interface. No
  component declares into another module, and a test fails when a `styled(..., { name })` has no key
  or uses a slot its `Slot` type lacks. An app checks its looks with `satisfies ThemeComponents`.
- **A package that adds components** - `react-markdown` - extends `ThemeComponents` with one
  `declare module '@soroush.design/react'` block, and the core's `Theme` with its own keys, in a types
  file every entry of the package imports, so an app that imports any entry has them typed.
- **Server and client components.** The package is used from server components, so each entry is
  one or the other, and the build keeps it where an app's bundler reads it. A component is
  **server-capable** when it renders with props, `styled`, `useTheme` and `useDefaultProps` alone: no
  state, effect, ref logic, event handler of its own, browser API, or React context of ours (a family
  context - Table, ButtonGroup, Tabs, Menu - makes its members client). Every other entry is
  **client**. A client entry's modules start with `'use client'` (the first line of the file,
  never in an `index.ts`, which has `export *`): every module of its folder, and the shared
  hooks only clients use. The engine's server build (the `react-server` condition, resolved by the
  app) lacks `CacheProvider`, `ThemeContext`, `ThemeScope`, `useThemeClass` and `useMediaQuery`, so
  those are imported only by client modules (`theme/engine.client.ts`), and `@umber-style/*` stays
  external in the build. The bundler drops a directive that is not on an entry, so `tsdown.config.ts`
  puts it back on each chunk made of such a module and on the entry file of a client folder.
  `src/clientBoundary.test.ts` reads `dist` (ESM and CJS): each client entry starts with the
  directive, each server-capable entry (the list is in the test) does not, no file that uses a
  client-only API lacks it, and a server-capable entry reaches no client chunk but the entry of a
  client component. A new component is classified by that list, and its README says
  "Server component" or "Client component" on its second paragraph. `apps/next-fixture` renders
  both kinds in a Next.js App Router page and is end-to-end tested with and without JavaScript.
  `registerBaseTheme(theme)` (from `ThemeProvider`) gives server components the app's theme.
- **No command line.** The package has no `bin` and does not depend on `@soroush.design/cli`: an app
  runs `npx @soroush.design/cli init`, and never installs the command line.

### Subpath names

- A component of the React package sits directly under it and keeps its own name, capitalised:
  `/Button`, `/TextInput`. A name of the styling system keeps its own name too: `/ThemeProvider`,
  `/useTheme`, `/styled`.
- A different package is a different package name: `@soroush.design/react-markdown/Editor`.
- **The docs route of a thing is its import path under the platform**: `@soroush.design/react/Button`
  is documented at `/react/Button/`, `@soroush.design/react-hooks/useDebounce` at
  `/react/hooks/useDebounce/` and `@soroush.design/react-markdown/Editor` at
  `/react/markdown/Editor/`. A test fails naming a subpath that has no page - see the Routes section
  of `apps/docs/docs-app.md`. The URLs never change once indexed.

### Where a hook lives

Ask what the hook is about:

| The hook...            | It lives in                   | An app imports it from                    |
| ---------------------- | ----------------------------- | ----------------------------------------- |
| belongs to a component | that component's folder       | the component's entry point               |
| reads the theme        | `@soroush.design/react`       | `@soroush.design/react/useTheme`          |
| is tied to nothing     | `@soroush.design/react-hooks` | `@soroush.design/react-hooks/useDebounce` |

- The test for the hooks package: **would someone want it without the component?** A hook that sits in
  one component's folder and is imported by others belongs there.
- A hook exported from a component is public API: its signature is reviewed before it is exported,
  and it has its own tests and docs, not only its component's.
- A hook in the hooks package says whether it needs a browser; one that does not is shared with the
  React Native package, not written again.

### Packaging rules

- **Frameworks are peers**: the React package and `react-markdown` list `react` and `react-dom`, and
  any dependency with native code is an optional peer, so installing a package does not make a
  native build link a module it does not need.
- **The theme exists once in an app.** The packages depend on each other by a version range and never
  bundle each other; two copies are two contexts, and components that do not see the app's theme.
- **An app imports from the packages by their real names.** The docs, the starters, `init`, the
  READMEs and the MCP content all write `@soroush.design/react/...`, and `@soroush.design/core/theme`
  for the theme.
- **`core`, `react-hooks`, `react` and `react-markdown` share one version**, published together in
  dependency order.
- **New packages start at `0.1.0`**, with release notes written for that version: what the package is
  and how to use it, not a list of changes against a package it replaces.

---

## Exports

- **Default-export the primary entity** (the plugin factory / main function); export supporting **types as named** exports. This matches the Vite-plugin ecosystem (`import react from '@vitejs/plugin-react'`).

  ```ts
  // src/index.ts
  export interface WatchOptions {
    /* ... */
  }
  export default function watch(opts: WatchOptions): Plugin {
    /* ... */
  }
  ```

  ```ts
  // consumer
  import watch from '@soroush.design/vite-plugin-watch'
  ```

- Internal (monorepo) consumption is **TypeScript source**: `exports: { ".": "./src/index.ts" }`, consumed under `moduleResolution: bundler` via `workspace:*`. **No `paths` alias, no build step** for internal use.

---

## Publishing

Internal-only packages stay `"private": true` and consume source directly. To make a package publishable:

- Drop `private`; add `version`, `description`, `keywords`, `license`, `author`, `repository.directory`, `homepage`, `files: ["dist"]`.
- `repository.url` is this repo - `git+https://github.com/soroush-tech/design-system.git` - and `bugs.url` its issues. npm verifies a publish's provenance against `repository.url` and refuses one that names another repo (`E422 ... expected to match "https://github.com/soroush-tech/design-system" from provenance`), which is how markdown, still pointing at soroush-tech/core, failed to publish.
- Build with **tsdown** (`format: ['esm', 'cjs']`, `dts: true`) → `dist/`. tsdown is preferred over tsup here: it emits declarations via Oxc/Rolldown and does **not** inject the deprecated `baseUrl` that breaks `.d.ts` under TypeScript 6.
- Keep `exports → ./src/index.ts` for the monorepo, and use **`publishConfig`** to swap `exports`/`main`/`module`/`types` to `dist/` **only on publish** - so the app keeps consuming source while npm gets compiled output:

  ```jsonc
  "exports": { ".": "./src/index.ts" },
  "publishConfig": {
    "access": "public",
    "exports": { ".": { "import": { "types": "./dist/index.d.mts", "default": "./dist/index.mjs" },
                        "require": { "types": "./dist/index.d.cts", "default": "./dist/index.cjs" } } },
    "main": "./dist/index.cjs", "module": "./dist/index.mjs", "types": "./dist/index.d.mts"
  }
  ```

- Declare the host framework as a **`peerDependency`** (e.g. `vite`); never bundle the peer.
- A peer on a **sibling package** (react-markdown on react) is an explicit range covering every
  version line it supports - `"^0.1.0"` (below 1.0.0 a caret covers one minor, so list each
  minor: `"^0.1.0 || ^0.2.0"`) - widened deliberately when a new line lands,
  never `workspace:^`. pnpm freezes `workspace:^` to `^<the sibling's version at publish time>`,
  so the published peer would exclude the next line until the package is republished. The
  `devDependency` stays `workspace:*`, so the monorepo still builds against the local sibling.
- `prepublishOnly: pnpm build`; verify the tarball with `pnpm pack` before publishing.

### Releasing to npm - always via pnpm, never `npm publish`

The `publishConfig` → `dist` swap above is a **pnpm feature**. `pnpm pack` / `pnpm publish` rewrite the top-level `exports`/`main`/`module`/`types` to the `dist` targets before packing. **`npm publish` does not** - it ships the raw `exports: "./src/index.ts"`, but the tarball only contains `dist` (`files: ["dist"]`), so **every consumer's `import` fails with `MODULE_NOT_FOUND`** (`.../src/index.ts` not found). A package published this way looks fine in `npm view` metadata but is dead on install.

So release **only** one of these two ways:

1. **CI (preferred)** - dispatch the [`cd-packages.yml`](../.github/workflows/cd-packages.yml) workflow (manual `workflow_dispatch`, npm Trusted Publishing via OIDC) with a `channel`: `alpha` from a CI-passed branch, `rc` and `stable` from `main` (see the `prerelease` skill). It runs `pnpm publish`, so the swap is always applied and there is no long-lived token. Add the package to the workflow's `package` choice list first.
2. **Local, only if you must** - from the repo root:

   ```sh
   # bump the version in packages/<name>/package.json first (a version can't be republished)
   pnpm --filter '@soroush.design/<name>' publish --no-git-checks --otp=<code>
   ```

   `--no-git-checks` is needed off a clean/main branch; quote the `@scope/name` in PowerShell (a bare `@` is the splat operator). **Do not** `cd packages/<name> && npm publish` - that is the exact thing that ships the broken `./src` exports.

**Verify the published artifact, not just the metadata.** Download the real tarball and confirm `exports` resolves to `dist`:

```sh
npm pack '@soroush.design/<name>@<version>'        # downloads from the registry
tar -xzf soroush.design-<name>-<version>.tgz -O package/package.json | grep -A3 '"exports"'
# exports must point at ./dist/*, and the tarball must NOT rely on any ./src file
```

If a broken version already went out, you can't overwrite it - **bump, republish with pnpm, then deprecate** the bad ones:

```sh
npm deprecate '@soroush.design/<name>@<badrange>' 'Broken exports; use >=<fixed>.' --otp=<code>
```

---

## Testing - 100% coverage, no exceptions

**Every package must have 100% test coverage.** No package ships internally or publishes below 100% - this extends the repo-wide rule (CLAUDE.md §6) to the package layer.

- Co-locate `index.test.ts` next to `src/index.ts`; vitest with v8 coverage.
- Every package ships a `vitest.config.ts` with `coverage.reporter: ['text', 'lcov']` (v8 provider, `thresholds: { 100: true }`). The `lcov` reporter is **required** - CI reads each package's `coverage/lcov.info` to rewrite `SF:` paths and upload to Codecov, so a package without it (or relying on vitest's default reporters) breaks the coverage step.
- Each package exposes `test` and `test:coverage` scripts; the root aggregates with `pnpm -r test:coverage`.
- **Register the package with Codecov** so its coverage surfaces and doesn't regress to "No report uploaded". Run `pnpm gen:publish-options` to sync [`.codecov.yml`](../.codecov.yml): it regenerates every package's entry under **both** `flag_management.individual_flags` (which inherits `carryforward: true`, so the badge keeps its last report on commits that don't re-upload the flag) **and** `component_management.individual_components` (`packages/<name>/` for the flag, the `/**` glob for the component). The pre-commit `--check` fails if these drift. Then add a row to the **Coverage** table in the root [`README.md`](../README.md), reusing the existing badge URL shape (`?flag=<name>&label=<name>`). Flag name == component id == directory name.
- Plugin code that depends on the Vite/Rollup runtime is exercised by invoking the exported factory and asserting the returned plugin object's hooks; environment-dependent calls jsdom/node can't run are isolated behind injectable inputs (e.g. the msw server is passed in) so they stay unit-testable.

---

## Licensing

- A **publishable** (non-`private`) package **must** declare a `license` field and ship a `LICENSE` file.
- **Private** internal packages may omit a license while unpublished, but must adopt one before `private` is removed.

---

## Linting & types

- Each package gets a minimal `.oxlintrc.json` extending one of the three configs in `packages/eslint-config/` - `.oxlintrc.json` (base), `.oxlintrc.react.json`, or `.oxlintrc.storybook.json` - plus its own `env` (node, browser, serviceworker). Tooling packages stay React-free and extend the base; React-shipping packages (`react`, `react-markdown`) extend the storybook layer. The React and Storybook plugins are declared once in `eslint-config`, not per package.
- `tsconfig.json` uses bundler resolution and `noEmit`. It is **not** referenced by the root solution `tsconfig.json`: packages are typechecked in isolation via `pnpm -r typecheck` and never pulled into the app's TS graph (so a backend/tooling package's types can't leak into the React/DOM build).
