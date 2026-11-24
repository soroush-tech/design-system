# Packages

Conventions for everything under `packages/` - the workspace's shared code. Most packages are framework-agnostic tooling; `react-components` (`@soroush.design/react-components`) is the React component library, `react-hooks` its hooks, `react-theme` its theme and styling, and `react-markdown` a companion React library that builds on it (a headless markdown editor/renderer). The component packages follow [`react-components/design-system.md`](./react-components/design-system.md) for component conventions - the `react-markdown` package's specifics are in [`react-markdown/markdown.md`](./react-markdown/markdown.md). Each folder is its own pnpm package, globbed by `packages/*` in `pnpm-workspace.yaml` and consumed by apps (and by each other) via `workspace:*`.

For a plain-English overview of what currently lives here, see [`README.md`](./README.md).

---

## What belongs here

`packages/` is for **shared, app-agnostic code** - framework-agnostic tooling (lint config, Vite plugins), shared schemas, generic utilities.

| Belongs in `packages/`                              | Belongs elsewhere                                             |
| --------------------------------------------------- | ------------------------------------------------------------- |
| A Vite plugin reusable across builds                | App-specific sections/pages/hooks → `apps/web/src/`           |
| The shared oxlint base                              | App-specific composed UI → `apps/web/src/common\|section`     |
| UI primitives (`Flex`, `View`) → `react-components` | A single-consumer, app-coupled component → keep it in the app |
| A schema/util shared by two members or published    | A single-consumer, app-coupled helper → keep it in the app    |

**A package is justified only when** it is (a) reused by more than one member, or (b) intended to be published on its own. Until then, keep the code in the app - don't pre-extract.

---

## Folder structure

Directory name == package name **minus its scope**: `@soroush.design/react-theme` is `packages/react-theme`, and the unscoped `soroush.design` is `packages/soroush.design`.

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

- Every package is scoped **`@soroush.design/*`**, private ones included (`@soroush.design/docs-content`, `story-demo`, `lab`, `umbrella-gen`, and the docs app `@soroush.design/docs`). The exceptions: the family umbrella, whose name is the unscoped **`soroush.design`**; **`@soroush.tech/ui-spec`**, which keeps its name and is not edited; and **`@soroush.tech/eslint-config`**, which keeps its name because `ui-spec` lists it as a `workspace:*` dev dependency and renaming it would edit `ui-spec`. A new package takes the `@soroush.design` scope (apps are not - `apps/web` stays `@soroush/web`).
- A Vite plugin's internal `name` field **must equal its package name minus the scope** (`vite-plugin-watch`), so build logs read `[vite-plugin-watch]`. Keep the directory, package name, and plugin `name` in sync.

---

## The `soroush.design` family

The layout the UI packages move to ([#114](https://github.com/soroush-tech/design-system/issues/114)). The component library, the hooks library, the theme library and the markdown library have their new names, `@soroush.design/react-components`, `@soroush.design/react-hooks`, `@soroush.design/react-theme` and `@soroush.design/react-markdown`; the other UI packages keep the names they have today until their step of the plan, and a new UI package follows these rules from the start.

### Three levels

The code lives in **library** packages. A **platform umbrella** points at the libraries of one platform. The **family umbrella** points at the platforms. An umbrella holds no code of its own.

| Level    | Package                                                                        | An app writes                                       |
| -------- | ------------------------------------------------------------------------------ | --------------------------------------------------- |
| Family   | `soroush.design`                                                               | `soroush.design/react/Button`                       |
| Platform | `@soroush.design/react`, `@soroush.design/react-native`, `@soroush.design/vue` | `@soroush.design/react/Button`                      |
| Library  | `@soroush.design/<platform>-<library>`                                         | `@soroush.design/react-components` - the lean route |
| Shared   | `@soroush.design/core`                                                         | no framework: tokens, `createTheme`, the catalog    |

A scope on npm has one level, so a library is named `@soroush.design/react-markdown`, never `@soroush.design/react/markdown`. The nesting an app sees comes from subpaths on the umbrellas.

### The libraries of a platform

Shown for React. React Native and Vue repeat the pattern (`@soroush.design/react-native-theme`, `@soroush.design/vue-hooks`, ...). A library depends only on the ones above it in this table, and on `core`.

| Library            | Subpath on the platform         | Holds                                                                                                                                            |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `react-hooks`      | `/hooks`                        | Hooks tied to no component and no theme                                                                                                          |
| `react-theme`      | `/theme`                        | `ThemeProvider`, the hooks that read the theme, the theme's types, and the configured `styled`, `css`, `keyframes`, `Global` with the base reset |
| `react-components` | `/Button`, `/TextInput`, ...    | The components                                                                                                                                   |
| `react-markdown`   | `/markdown`, `/markdown/Editor` | The markdown editor and renderer                                                                                                                 |
| `react-charts`     | `/charts`                       | Charts                                                                                                                                           |

**A new library is justified by what it depends on**, not by size: `markdown` brings an editor and a diagram library, `charts` a charting library, and an app that wants buttons should not install either. Components are **not** split into a package each - subpath imports already load only what is used. A split by group (data tables, date pickers) is decided case by case.

### The core

`@soroush.design/core` holds what every platform shares and that needs **no framework**: the theme (the token scales, `baseTheme`, the `Theme` types, `createTheme`, `themeDefault`, `spacing`) at `/theme`, the breakpoint and container-query helpers at `/breakpoints`, the pure utilities at `/utils`, and the catalog at `/catalog`; the behaviour logic follows. The platform libraries (React, React Native, Vue) depend on it as a real dependency - `workspace:^`, never bundled - and import it by its subpaths (`@soroush.design/core/catalog`), one per area.

- **The rule: no framework import; a test enforces it.** The core has no `dependencies` and no `peerDependencies`, its `tsconfig` has no DOM library, and a test loads it in plain Node with `react`, `react-native`, `vue` and `@umber-style/*` mocked to throw, then reads the built files and fails on any import that is not one of its own chunks. A platform-neutral thing that needs a framework type or a DOM read does not move here until that is split from it.
- **The core describes; a platform names.** Data is platform-neutral: a catalog entry holds the `subpath` a component is served from, not the package. A platform library re-exports the core's data and adds the facts that are its own - the React component library's `/catalog` adds `module` (`@soroush.design/react-components/<subpath>`) to each entry and keeps every other field as the core wrote it. A library's test holds its result to the core's data, and its built output imports the core instead of copying it.
- **A platform composes its `Theme` on top of the core's.** The core's `Theme` and every scale (`ThemePalette`, `ThemeSpace`, ...) are open interfaces with no framework type in them: `typography.element` is a tag name, a `string`. A platform library declares `interface Theme extends CoreTheme { components?: ... }` for what names its framework - the typing of `theme.components` (owner states, slots, `styleOverrides`) and any field typed by a framework type - and re-exports the core's theme with `export * from '@soroush.design/core/theme'`, which its own `Theme` shadows. It re-types `baseTheme` as its `Theme` (`export const baseTheme: Theme = coreBaseTheme`, the same object), so `createTheme(baseTheme, ...)`, generic over the theme it is given, returns the platform's type. An app's `declare module` may name the core, the platform library or its umbrella: each reaches the same interface. Types a component's public props use are imported from `@soroush.design/core/theme`, not through the library's barrel, which the declaration build cannot flatten.
- **Publish the core before the libraries.** A library depends on it, and `scripts/prerelease-versions.mjs` orders a run dependencies-first.

### The theme library

`@soroush.design/react-theme` holds `ThemeProvider`, `LayoutProvider`, `useTheme`, `useDefaultProps` and `withTheme`, the `Theme` type that composes the core's with `theme.components`, and the styling the components are written in: the configured `styled`, `css` and `keyframes`, `Global` with the base reset, the style cache, `useStyle` and the engine configuration. An app builds its own components on it with no component library installed.

- **Entry points.** `.` holds everything; `/theme`, `/style` and `/engine` hold the same names by area - the three the component library has had - so the library re-exports each one for one, and an app's imports do not change.
- **The component library depends on it and never bundles it** (`workspace:^`; two copies are two React contexts and two engine configurations). Its `/theme`, `/style` and `/engine` are re-exports of the theme library's, and its source imports a name from the package that owns it - core names from `@soroush.design/core/...`, theme names from `@soroush.design/react-theme/...` - never through its own barrel. A bundler builds a namespace object for a barrel that `export *`s a package, and the object lacks the starred names (`theme_exports.themeDefault` threw at run time once). `src/externalOwnership.test.ts` reads the library's build and fails on such a read.
- **The engine is configured by a function** (`configureEngine()`), which the theme library's `styled` calls before its first use. An app that imports only `styled` gets the prefix, the value repair and the raw theme keys.
- **`ThemeComponents` is open, and starts empty.** It names components, which the theme library cannot import, so each library adds its own: the folder of a component holds, in its `index.ts`, `declare module '@soroush.design/react-theme/theme' { interface ThemeComponents { Button?: ComponentConfig<ButtonOwnerState, 'root' | 'label'> } }`, and the owner-state types it names (`ButtonOwnerState`) stay in the library, exported from its `/theme`. The block is in the component's entry point on purpose: the declaration build keeps it in what that entry's `.d.ts` imports, so an app that imports `@soroush.design/react-components/Button` has `theme.components.Button` typed, and one that imports another entry point does not. An app that installs only the theme library sees `components` empty and untyped, which is correct. A new component with a `name` for `theme.components` adds its block to its folder's `index.ts`; a type test per umbrella and library holds it.

### Subpath names

- A component of the main library sits directly under the platform and keeps its own name, capitalised: `/Button`, `/TextInput`.
- A library uses a lowercase name: `/markdown`, `/charts`, `/theme`, `/hooks`.
- A library's own components go under it: `/markdown/Editor`.
- A library is never named after a component of the main library, so two paths never differ only by case.
- **The docs route of a thing is its import path**: `soroush.design/react/Button` is documented at `/react/Button/`, and `soroush.design/react/markdown/Editor` at `/react/markdown/Editor/`. A new subpath needs its page, and a test fails naming the one that is missing - see the Routes section of `apps/docs/docs-app.md`.

```ts
// ✗ a scope has one level - this is not a package
import { Editor } from '@soroush.design/react/markdown-editor'
// ✗ a library's component at the top of the platform
import { Editor } from '@soroush.design/react/Editor'
// ✓
import { Editor } from '@soroush.design/react/markdown/Editor'
```

### Where a hook lives

Ask what the hook is about:

| The hook...            | It lives in             | An app imports it from      |
| ---------------------- | ----------------------- | --------------------------- |
| belongs to a component | that component's folder | the component's entry point |
| reads the theme        | the theme library       | `/theme`                    |
| is tied to nothing     | the hooks library       | `/hooks`                    |

```ts
// ✓ a component's behaviour, exported with the component
import { NumberInput, useHoldRepeat } from 'soroush.design/react/NumberInput'
// ✓ needs the theme
import { useTheme } from 'soroush.design/react/theme'
// ✓ useful in an app with none of our components
import { useMergedRefs, useEventCallback } from 'soroush.design/react/hooks'
```

- The test for the hooks library: **would someone want it without the component?** A hook that sits in one component's folder and is imported by others belongs there.
- A hook exported from a component is public API: its signature is reviewed before it is exported, and it has its own tests and docs, not only its component's.
- A hook in the hooks library says whether it needs a browser; one that does not is shared with the React Native library, not written again.

### Packaging rules

- **Aliases are generated.** Every subpath on both umbrella levels comes from the library packages by a script, and CI fails when they drift. Nobody writes an umbrella's `exports` by hand.
- **Frameworks are optional peers** of the umbrellas (`react`, `react-native`, `vue`), and so is any dependency with native code: installing an umbrella must not download a framework the app does not use, nor make a native build link a module it does not need.
- **The theme library exists once in an app.** The other libraries depend on it by a version range and never bundle it; two copies are two contexts, and components that do not see the app's theme.
- **The styling engine is configured in the theme library**, by a function the library calls - not by a module imported for its effect, which a bundler drops from a package marked `"sideEffects": false`.
- **An app can take the lean route.** Every library works installed alone, without an umbrella.
- **An app imports from the umbrella; libraries import each other by their real names.** The docs, the starters, `init`, the READMEs and the MCP content all write `@soroush.design/react/...`, so splitting a library later changes no import of an app. A library, private ones such as `story-demo` and `lab` included, imports the library it builds on by its own name and never the umbrella: the umbrella depends on the libraries, so the reverse is a cycle.
- **An umbrella is generated whole.** `src/` holds one file per entry point, each a line of `export * from '<library>/<subpath>'` (plus `export { default } from` where the target has a default export). The `exports` and `publishConfig.exports` of package.json are written beside them. Both are committed, like the plugin references, and `pnpm gen:umbrellas --check` fails in the pre-commit hook and in CI when they drift. One generator, `@soroush.design/umbrella-gen`, writes both umbrellas: an umbrella is a list of sources in its `libraries.ts`, each mounted under a prefix or merged at the top, and the platform umbrella's sources are libraries while the family umbrella's are the platform umbrellas. The generator reads what each library _publishes_ (`publishConfig.exports`): an entry a library serves only in the workspace never reaches the umbrella.
- **Registering a library on an umbrella** is one line in the umbrella's `libraries.ts` - `{ package: '@soroush.design/react-components' }` merges it at the top (`/Button`), `{ package: '...', under: 'markdown' }` mounts it under a lowercase name (`/markdown`, `/markdown/Editor`) - plus the library in the umbrella's `dependencies` as `workspace:^`. A library with heavy dependencies (`markdown`) is `optional: true` instead: the umbrella lists it in `peerDependencies` with an explicit range and `peerDependenciesMeta` `optional`, and in `devDependencies` as `workspace:*` for the generator and the tests, so an app installs it only when it imports its entry points; without it, those imports fail with a module-not-found error naming the library. Run `pnpm gen:umbrellas`. Two libraries that claim the same subpath, or two that differ only by case, fail the generator with both package names, unless one **omits** it: `omit: ['./style', './engine']` on the component library's line leaves those two entry points to the theme library, which serves them (the generator fails when an omitted entry point is not one the library publishes, or when no other library serves it). The theme library's own `.` and `./theme` are omitted too: the umbrella's root is the component library's, and its `/theme` is the component library's, which adds the typing of the components (owner states, `TabsVariants`) to the theme library's names. The family umbrella is the same list one level up (next paragraph).
- **The family umbrella** (`soroush.design`, in `packages/soroush.design`: the folder is the package name minus its scope, and it has none) points at the platform umbrellas: `{ package: '@soroush.design/react', under: 'react' }` mounts every entry point of `@soroush.design/react` under `/react` (`soroush.design/react/Button`, `soroush.design/react/markdown/Editor`; the platform's root is `soroush.design/react`). It has **no root entry point** - an app imports a platform, never the family - so its `exports` start at `./react` and it has no `main`, `module` or `types`. Its entries come from the platform umbrella's own export map, so a library registered on the platform reaches the family with one `pnpm gen:umbrellas`, and the pre-commit hook and CI fail when it has not. **Adding a platform** (`@soroush.design/react-native`, `@soroush.design/vue`) is one line in `packages/soroush.design/libraries.ts` (`{ package: '@soroush.design/vue', under: 'vue' }`), the platform in `dependencies` as `workspace:^`, its framework as an optional peer `peerDependencies` entry of the family, and `pnpm gen:umbrellas`. A platform umbrella is a **dependency** of the family, never an optional peer: it holds no code but its re-exports, its own framework is an optional peer of that umbrella, so it brings no framework, and an app that installs `soroush.design` and React has what it needs, with no warning about React Native or Vue; making a platform optional later would be a breaking change for the apps that rely on it. The family's `test:types` holds the theme typing through the extra hop (`type-tests/family-name`, `platform-name`, `no-augmentation`).
- **An unscoped package** is handled where tooling reads names: the Codecov flag is `name.split('/').pop()` (`soroush.design`, the directory's name), the release tag is `<name>@<version>` (`soroush.design@0.1.0`), the docs' release-notes heading accepts a scope or none, and `--filter soroush.design` selects it. npm trusted publishing is set up per package by the owner, so the first publish of a new name needs that step before the workflow can run.
- **An umbrella's tests are not in `src/`**, which holds only generated files: they are in `test/` and `scripts/`. v8 reports a file of re-exports as empty, so its coverage is a test that imports every entry point and compares its names with the library's, a test that no file of `src/` is not generated, and a test of the build: each file in `dist/` imports its library and holds none of it. A file with real code in `src/` counts toward the 100% and fails it.
- **Theme typing goes through an umbrella unchanged.** `/theme` is a plain `export *`, and TypeScript merges `declare module '@soroush.design/react/theme' { interface ThemePalette { ... } }` into the library's own interface, so the line can name the umbrella or the library, and both reach `useTheme`, `styled` and the props of every component. Nothing is declared in the umbrella. Each umbrella has a type test for each form (`type-tests/`), one program per form, because an augmentation in one program leaks into every file of it. The interfaces are the core's and reach the umbrella through three re-exports (core, theme library, component library, umbrella); `type-tests/core-name` holds the form that names the core and `type-tests/theme-name` the one that names the theme library.
- **New packages start at `0.1.0`**, with release notes written for that version: what the package is and how to move to it, not a list of changes against a package it replaces.

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
- A peer on a **sibling package** (react-markdown on react-components) is an explicit range covering every
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

- Each package gets a minimal `.oxlintrc.json` extending one of the three configs in `packages/eslint-config/` - `.oxlintrc.json` (base), `.oxlintrc.react.json`, or `.oxlintrc.storybook.json` - plus its own `env` (node, browser, serviceworker). Tooling packages stay React-free and extend the base; React-shipping packages (`react-components`, `react-markdown`) extend the storybook layer. The React and Storybook plugins are declared once in `eslint-config`, not per package.
- `tsconfig.json` uses bundler resolution and `noEmit`. It is **not** referenced by the root solution `tsconfig.json`: packages are typechecked in isolation via `pnpm -r typecheck` and never pulled into the app's TS graph (so a backend/tooling package's types can't leak into the React/DOM build).
