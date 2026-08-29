---
description: Folder-directory and React component structure for this monorepo - where a new component, hook, helper, or package goes, the per-component file contract, the five-part component anatomy, test placement, and import rules. Use when creating or moving any React component, hook, util, or package, or when reviewing structure. This is the rulebook; each area's own .md stays the authority.
---

# React structure

Three structural regimes exist in this repo. Pick the regime first, then follow its
contract. The deep-dive docs are authoritative - read the matching one before building:

| Regime                     | Authority                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Component-library packages | `packages/design-system/design-system.md` (`## Component Architecture`, `## Files per Component`) - markdown and lab follow it verbatim |
| Utility/tool packages      | `packages/packages.md` (`## Folder structure`, `## Exports`)                                                                            |
| The docs app (`apps/docs`) | `apps/docs/docs-app.md`                                                                                                                 |

## Where does a new thing go?

- **Reusable UI component, stable API** -> `packages/design-system/src/<Name>/`.
- **Reusable UI component, API still settling** -> `packages/lab/src/<Name>/` (the
  incubator; promoted into design-system once stable).
- **Markdown-rendering component** -> `packages/markdown/src/<Name>/`.
- **Docs-site-only component** (chrome, doc rendering) -> `apps/docs/src/common/<Name>/`.
- **Shared React hook** -> `packages/hooks/src/useX.ts` (flat file + `useX.test.ts`, one
  subpath export per hook). App-only hooks -> `apps/docs/src/hooks/useX.ts`, flat.
- **Non-UI tool** (vite plugin, node util) -> its own `packages/<name>/` per packages.md.

## Component folder contract (design-system, markdown, lab)

Every component owns a folder; the barrel keeps subpath imports stable:

```
src/ComponentName/
  index.ts                  <- export * from './ComponentName'
  ComponentName.tsx         <- component + exported prop types
  README.md                 <- prop reference (token tables, styled-system props, Examples)
  ComponentName.mdx         <- optional hand-authored docs page; overrides the automatic
                               README+demos page on docs.soroush.tech
  ComponentName.stories.tsx <- design-system only (lab ships no storybook yet)
  ComponentName.test.tsx    <- unit tests, 100% coverage
```

Container components nest their primary: `Table/Table/`, `Table/TableCell/`, each with the
same contract. Scaffold design-system components with `/design_system <Name>`;
`Typography` is the reference implementation.

### The five-part component anatomy

1. **Prop interface** - extend the styled-system prop groups; derive token types from
   `Theme` (`color?: keyof Theme['text']`), never manual unions. Export the prop types.
2. **Prop forwarding** - `createShouldForwardProp([...props, 'customProp'])` so style
   props never reach the DOM.
3. **Custom prop -> theme scale** - wire through `system()`; `scale` must name a `Theme`
   key. No hardcoded hex anywhere outside `baseTheme` and test/story fixtures.
4. **Styled base** - `styled('el', { shouldForwardProp })(space, layout, custom, ...)`,
   custom systems before built-ins so overrides win.
5. **Wrapper component** - only when the rendered element varies (`as`, variant mapping,
   default props). A purely-styled component skips it (see `Quote`).

## Utility/tool package shape

`packages/<name>/src/index.ts` is the single entry: default-export the primary entity,
named-export its types. Do **not** pre-split a small entry file into helper modules -
extract siblings (with co-located tests) only when it grows unwieldy. Required files:
`package.json`, `tsconfig.json`, `.oxlintrc.json` (extends the shared config),
`vitest.config.ts` (100% thresholds); publishable packages add `tsdown.config.ts`,
`README.md`, `LICENSE`.

## App code (apps/docs)

- `src/common/<Name>/` - component folder: `<Name>.tsx` + `<Name>.test.tsx`; pure helpers
  in `<Name>/utils/` with **one file per helper** (`helperName.ts` + `helperName.test.ts`).
- `src/pages/<route>/` - Vike `+` files only; pages and `src/demos/` are **e2e-only**
  (excluded from unit coverage; co-located `*.e2e.ts` covers them against the build).
- `src/hooks/` - flat `useX.ts` + test; `src/mdx/` - the MDX layer; `content/` - MDX pages.

## Tests - co-located, always

| Tier         | Suffix                 | Runner            |
| ------------ | ---------------------- | ----------------- |
| Unit         | `*.test.ts(x)`         | vitest (jsdom)    |
| Integration  | `*.spec.ts(x)`         | vitest            |
| Real browser | `*.browser.test.ts(x)` | vitest + Chromium |
| E2E          | `*.e2e.ts`             | Playwright        |

100% coverage on every package and on non-page app code - no ignore pragmas.

## Imports

- Components ship on subpaths: `@soroush.tech/design-system/Button`; the barrel carries
  `styled`, `css`, `Theme`. Never deep-import another package's internals.
- App code uses the `src/`, `content/`, and `packages/` aliases - never relative `../../`.
  The one exception: Vike `+route.ts`/`+config.ts` run at config time without aliases and
  import their helpers relatively.
- Package directory name == package name minus the `@soroush.tech/` scope.
