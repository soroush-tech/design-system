# Docs app conventions (apps/docs)

The Vike SSG app served at docs.soroush.tech. Architecture mirrors the soroush.tech web
app's renderer (Emotion critical CSS, managed head tags) with the data layer removed:
every input is an in-repo glob over `packages/` and `content/` - no remote fetches, no MSW.

## Sections

Three per-package sections, independently versioned: `/design-system/`, `/markdown/`,
`/styled-system/`. The registry in `src/common/nav.ts` drives the sidebars, the component
pages, and the drift tests; `sectionFor(pathname)` picks the active section.

## Structure

- `src/renderer/` - Vike renderer: SSR + Emotion critical CSS, managed head tags + CSP
  (`form-action` allows only the sandbox define endpoint), snapshot-aware robots default.
- `src/pages/<section>/...` - one folder per route. Pages are **e2e-only**: excluded from
  unit coverage; co-located `*.e2e.ts` cover them against the built output. Every section
  page's `+route.ts` goes through `sectionRoute()` and its `+config.ts` through
  `sectionPrerender()` (both read `process.env.DOCS_SECTION` at Vike config time - the
  `src` alias is unavailable there, so those two files import it **relatively**).
- `src/common/` - app chrome and helpers, unit-tested to 100%: `Layout`, `Navbar`,
  `DocsNav`, `DocPage`, `Readme` (+ link rewriting), `ReleaseNotes`, `VersionSwitcher`,
  `sectionPath`, `sectionRoute`.
- `src/mdx/` - the MDX element map (mirrors the markdown package's Preview),
  `MdxStoryDemo`, `MdxReadme`, and the README sources. Every component owns its page in
  its own package folder next to its README (`packages/design-system/src/<Name>/<Name>.mdx`)
  and the component route renders that page alone - `<StoryDemo of="Component/StoryExport" />`
  and `<Readme of="Name" part="intro" />` need no imports. Pages are mandatory:
  `nav.test.ts` guards the set against disk and a missing one fails the prerender.
- `src/demos/registry.ts` - the curated demo list. Each entry points a
  `<Component>/<StoryExport>` path at a design-system `*.stories.tsx` export; the
  registry globs every stories module (namespace + `?raw`) so the demo UI - rendering,
  controls, code synthesis, live editing, TS/JS toggle, sandbox export - comes from
  `@soroush.tech/story-demo`'s `StoryDemo`. `src/demos/scope.ts` is the identifier
  scope for live-edited code.
- `vite/sitemapPlugin.ts` - vendored sitemap generator (live builds only).

## Versioning

`DOCS_BASE` (vite base) + `DOCS_SECTION` are the only build hooks. A snapshot build
(`DOCS_SECTION=<pkg> DOCS_BASE=/<pkg>/<version>/`) prerenders that section alone at
section-relative routes, links ride the base via `sectionPath()`, cross-section links
escape to the live site, and every page defaults to noindex. `cd-docs.yml` builds the
live tree on CI-passed main pushes and freezes a section from its release tag when
`CD · Packages (npm)` completes; `scripts/compose-docs-dist.mjs` composes the `docs-dist`
orphan branch (live root + `<pkg>/<version>/` snapshots + `versions.json`), which deploys
wholesale to Cloudflare Pages. The `VersionSwitcher` reads `/versions.json` from the
domain root, so old snapshots list newer releases.

## Rules

- Imports use the `src/`, `content/`, and `packages/` aliases. Never relative `../../`
  (the `+route.ts`/`+config.ts` exception above aside).
- Design-system imports use per-component subpaths (`@soroush.tech/design-system/Button`).
- All prose content - MDX included - must use ASCII punctuation (the repo-wide `aiwg`
  guard scans it).
- Never hardcode a section URL - build links with `sectionPath()` so snapshots stay
  self-contained.

## Verify

```sh
pnpm --filter @soroush.tech/docs test:coverage   # unit, 100% thresholds
pnpm --filter @soroush.tech/docs build           # SSG prerender - gates every page
pnpm --filter @soroush.tech/docs test:e2e        # Playwright against build/client
# Snapshot smoke (PowerShell: set env vars accordingly):
DOCS_SECTION=design-system DOCS_BASE=/design-system/9.9.9/ pnpm --filter @soroush.tech/docs build
```
