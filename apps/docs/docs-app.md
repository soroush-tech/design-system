# Docs app conventions (apps/docs)

The Vike SSG app served at gild-ui.soroush.design. Architecture mirrors the soroush.tech web
app's renderer (critical CSS from the styling engine's cache, managed head tags) with the data layer removed:
every input is an in-repo glob over `packages/` and `content/` - no remote fetches, no MSW.

## Sections

Six per-package sections, independently versioned: `/react/`, `/react/markdown/`,
`/styled-system/`, `/mcp/`, `/ui-spec/` and `/cli/`. A section has an id (`react`, `markdown`, ...: its route
folder, `DOCS_SECTION` and its key in `versions.json`) and a route, where it is on the site
(`sectionRoutes.ts` in `@gild-ui/docs-content`). The registry in `src/common/nav.ts` drives the
sidebars, the component pages, and the drift tests; `sectionFor(pathname)` picks the active section -
the one with the longest route that holds the path, so `/react/markdown/Editor/` is the markdown
section's and not React's.

`/styled-system/` is the exception: the package lives in its own repository (`soroush-tech/styled-system`,
`dir: null` in `sections.json`), so its section is one static page with the install line and the links to
that repository and its docs - no docs folder, no releases page, and nothing generated from `packages/`.

## Routes

**A page's route is the import path under its platform.** The route of a thing is the path an app imports it from, with the hooks and the markdown package grouped under `/react/`, and the page's content is that thing's own markdown file. The URLs are
frozen from the first publish of the site, so no route is renamed after it.

| An app imports                                                      | The docs page                    | Content                                           |
| ------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------- |
| `@gild-ui/react/Button`                                             | `/react/Button/`                 | the component's README and MDX page               |
| `@gild-ui/react/Table` and its `TableCell`                          | `/react/Table/TableCell/`        | the member's README                               |
| `@gild-ui/react/useTheme` and the other names of the styling system | `/react/theme/`, `/react/style/` | `docs/theming.md`, `docs/style.md` of the package |
| `@gild-ui/react/engine`                                             | `/react/engine/`                 | `docs/engine.md` of the package                   |
| `@gild-ui/react/server`, `@gild-ui/react/next`                      | `/react/server/`, `/react/next/` | `docs/server.md`, `docs/next.md` of the package   |
| `@gild-ui/react-markdown/Editor`                                    | `/react/markdown/Editor/`        | the markdown package's README                     |
| `@gild-ui/hooks/useDebounce`                                        | `/react/hooks/useDebounce/`      | its section of the hooks README                   |
| later `@gild-ui/react-native/Button`                                | `/react-native/Button/`          |                                                   |
| a package of no platform: `@soroush.design/cli`                     | `/cli/`                          | its README and release notes                      |

- **The platform is the first segment.** A package that is not part of a platform keeps its
  own name: `/styled-system/...`, `/cli/...`, `/mcp/...`, `/ui-spec/...`, later `/core/...`.
- **A capitalised segment is a component, exactly as exported**: `/react/Button/`. A lowercase one is
  an entry point that is not a component (`/react/engine/`), a guide whose URL is indexed (`/react/theme/`, `/react/style/`, `/react/utils/`: the names they document are entry points of their own, or `@gild-ui/core`'s), a package grouped under the platform
  (`/react/markdown/`), or a page that is not an entry point at all: the guides
  (`/react/installation/`, `/react/usage/`, `/react/customization/`), `/react/components/` (the
  index of the components) and `/react/releases/`. A guide is never named like an entry point.
- **A component's pages are under its page**: `/react/Button/specs/` (props, tokens, defaults) and
  `/react/Button/accessibility/`, the tabs of its page. `specs` and `accessibility` are lowercase, so
  no export takes their path.
- **A member of a family is under the entry it is imported from**: `TableCell` is exported by
  `@gild-ui/react/Table`, so its page is `/react/Table/TableCell/`. If the library later
  exports a nested entry point, the path is that import path and nothing else changes.
- **A lowercase form of a component path redirects to the capitalised page**, because Cloudflare Pages
  tells paths apart by case: `/react/button/` goes to `/react/Button/`. `emitRedirects.ts` writes
  the `_redirects` file of the build from the same list of pages as the sitemap (the slash and the
  no-slash form of every rule: about 400 of the 2000 static rules the host takes). Two pages that
  differ only by case are an error.
- **A path ends in a slash**, as the prerendered `<path>/index.html` does; the host sends the path
  without it to the one with it.
- **The list of pages is derived, not kept twice.** `docsPages()` in `@gild-ui/docs-content`
  builds it from the registry; its test holds it to the entry points of `@gild-ui/react`,
  `hooks` and `react-markdown` (their `package.json`): every entry point has exactly one page at its path (the names of the styling system, `stylingEntries` in the registry, are covered by the guide that documents them), and every
  capitalised page is an entry point or an export of one. The built output is held to the same list by
  `routes.e2e.ts` (exact names, the sitemap, no broken link, no link to a path of the former site).
- **Adding a thing**: a new component is registered in `registry.ts` and has its README and MDX page; a
  new entry point that is not a component needs a page - add it to `entryGuides` with the file of the
  library's `docs/` that is its page; a library mounted under the platform is either a section with a
  route of `react/<name>` in `sectionRoutes.ts` (`markdown`), or, for the hooks, a list in
  `reactHooks` of `registry.ts`: `/react/hooks/` is the hooks README and `/react/hooks/<useName>/`
  its `## <useName>` section (`hookSection`). A hook is an entry point of the library, a section of its
  README and an item of that list together; the route and registry tests name what is missing.
- **Vike routes**: `/react/@name`, `/react/@name/specs`, `/react/@name/accessibility` and
  `/react/@name/@member` are Route Strings; the static ones (`/react/releases`, `/react/markdown/@name`)
  rank above the parameterised ones. Every page is prerendered from `+onBeforePrerenderStart`.

## Structure

- `src/renderer/` - Vike renderer: SSR + critical CSS from the styling engine's cache, managed head tags + CSP
  (`form-action` allows only the sandbox define endpoint), snapshot-aware robots default.
- `src/pages/<section>/...` - one folder per route (`react/@name/specs` is `/react/Button/specs/`). Pages are **e2e-only**: excluded from
  unit coverage; co-located `*.e2e.ts` cover them against the built output. Every section
  page's `+route.ts` goes through `sectionRoute()` and its `+config.ts` through
  `sectionPrerender()` (both read `process.env.DOCS_SECTION` at Vike config time - the
  `src` alias is unavailable there, so those two files import it **relatively**).
- `src/common/` - app chrome and helpers, unit-tested to 100%: `Layout`, `Navbar`,
  `DocsNav`, `DocPage`, `Readme` (+ link rewriting), `ReleaseNotes`, `VersionSwitcher`,
  `sectionPath`, `sectionRoute`.
- `src/mdx/` - the MDX element map (mirrors the markdown package's Preview),
  `MdxStoryDemo`, `MdxReadme`, and the README sources. Every component owns its page in
  its own package folder next to its README (`packages/react/src/<Name>/<Name>.mdx`)
  and the component route renders that page alone - `<StoryDemo of="Component/StoryExport" />`
  and `<Readme of="Name" part="intro" />` need no imports. Pages are mandatory:
  `nav.test.ts` guards the set against disk and a missing one fails the prerender.
- `src/demos/registry.ts` - the curated demo list. Each entry points a
  `<Component>/<StoryExport>` path at a design-system `*.stories.tsx` export; the
  registry globs every stories module (namespace + `?raw`) so the demo UI - rendering,
  controls, code synthesis, live editing, TS/JS toggle, sandbox export - comes from
  `@gild-ui/story-demo`'s `StoryDemo`. `src/demos/scope.ts` is the identifier
  scope for live-edited code.
- `vite/sitemapPlugin.ts` - vendored sitemap generator (live builds only).

## Versioning

The site is gild-ui.soroush.design, the documentation of Gild UI on Cloudflare Pages
(the deploy is [#147](https://github.com/soroush-tech/design-system/issues/147); until it lands CI
only builds this app, in the `docs` job of `ci.yml`). The former site, docs.soroush.tech, documents
the former package and is frozen: nothing here refers to it.

`DOCS_BASE` (vite base) + `DOCS_SECTION` are the build hooks of a section snapshot
(`DOCS_SECTION=<id> DOCS_BASE=/<route>/<version>/` prerenders that section alone, noindex). The
`VersionMenu` reads `/versions.json` at the domain root (`{ "<section>": ["<version>", ...] }`,
newest first); with none, or an empty list, it shows the live version alone.

What the deploy (#147) has to provide, as the former one did: the snapshot of each release, built
from the section's release tag (`<npm name>@<version>`, found per section from `sections.json`'s
`npm`), and the `versions.json` manifest it writes. Neither is in this repo any more.

## Rules

- Imports use the `src/`, `content/`, and `packages/` aliases. Never relative `../../`
  (the `+route.ts`/`+config.ts` exception above aside).
- Design-system imports use per-component subpaths (`@gild-ui/react/Button`).
- All prose content - MDX included - must use ASCII punctuation (the repo-wide `aiwg`
  guard scans it).
- Never hardcode a section URL - build links with `sectionPath()` (and the path of a component with `componentPagePath()` and its kin) so snapshots stay
  self-contained.

## Verify

```sh
pnpm --filter @soroush.design/docs test:coverage   # unit, 100% thresholds
pnpm --filter @soroush.design/docs build           # SSG prerender - gates every page
pnpm --filter @soroush.design/docs test:e2e        # Playwright against build/client
# Snapshot smoke (PowerShell: set env vars accordingly):
DOCS_SECTION=react DOCS_BASE=/react/9.9.9/ pnpm --filter @soroush.design/docs build
```
