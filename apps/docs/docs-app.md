# Docs app conventions (apps/docs)

The Vike SSG app served at docs.soroush.tech. Architecture mirrors the soroush.tech web
app's renderer (critical CSS from the styling engine's cache, managed head tags) with the data layer removed:
every input is an in-repo glob over `packages/` and `content/` - no remote fetches, no MSW.

## Sections

Six per-package sections, independently versioned: `/design-system/`, `/markdown/`,
`/styled-system/`, `/mcp/`, `/ui-spec/` and `/cli/`. The registry in `src/common/nav.ts` drives the sidebars, the component
pages, and the drift tests; `sectionFor(pathname)` picks the active section.

## Structure

- `src/renderer/` - Vike renderer: SSR + critical CSS from the styling engine's cache, managed head tags + CSP
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
  its own package folder next to its README (`packages/react-components/src/<Name>/<Name>.mdx`)
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

**docs.soroush.tech is frozen.** It documents the former package and is served by GitHub Pages
from the `docs-dist` branch, which no workflow writes to any more: no deploy, no new version, no
URL change. The `soroush.design` family is a new project whose docs will be a separate site on
Cloudflare Pages; its deploy comes with #147. Until then CI only builds this app (the `docs` job
of `ci.yml`) and deploys nothing.

`DOCS_BASE` (vite base) + `DOCS_SECTION` are the build hooks that made a section snapshot
(`DOCS_SECTION=<pkg> DOCS_BASE=/<pkg>/<version>/` prerenders that section alone, noindex).
`public/CNAME` and `public/.nojekyll` bind the old site to GitHub Pages and ride along in every
build; they mean nothing to the new site. The `VersionMenu`, `sections.json`,
`scripts/docs-release-tag.mjs` and `scripts/canonicalize-docs-dist.mjs` (with its tests) served
that deploy and are used by no workflow now; they go or change with #148.

## Rules

- Imports use the `src/`, `content/`, and `packages/` aliases. Never relative `../../`
  (the `+route.ts`/`+config.ts` exception above aside).
- Design-system imports use per-component subpaths (`@soroush.design/react/Button`).
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
