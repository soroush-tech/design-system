# Markdown package conventions

`@gild-ui/react-markdown` is the markdown package of Gild UI for React, a companion to
[`@gild-ui/react`](../react); an app writes
`@gild-ui/react-markdown/Editor`. **Its components follow Gild UI's
conventions verbatim** - read [`../react/design-system.md`](../react/design-system.md)
before working here. That doc is the law for: per-component folder structure, prop types derived
from `Theme` (never manual unions), `styled(...)` naming + `system()` wiring, `shouldForwardProp`,
the Storybook argType rules (`controls.include` whitelist, an `argType` per included prop,
`table.category`, no top-level `name`), no hardcoded hex in components (only in test/story
fixtures), and the four-plus-index files every component ships.

It also follows [`../packages.md`](../packages.md): the publishable-package layout
(`publishConfig` dist-swap, tsdown, `LICENSE`, release notes), **100% test coverage**, and the
Codecov/CI registration.

This file only records what is **specific** to this package.

## Components

Each lives in its own folder with the files design-system.md requires
(`index.ts`, `Component.tsx`, `README.md`, `Component.stories.tsx`, `Component.test.tsx`); a
sub-component adds `SubName.README.md` + `SubName.stories.tsx` next to its sibling (as
`Toolbar/TablePicker` and `Mermaid/DiagramViewer` do):

- **`Control`, `Toolbar` (+ `TablePicker`), `Editor`, `Preview`** - the headless markdown
  editor/renderer.
- **`LiveEdit`** - a preview you write on directly: `Preview`-rendered blocks are
  `contentEditable`, and each input serializes the edited block's DOM back to markdown
  (rehype-remark) and splices it into the source. Untouched blocks keep their exact source.
- **`CodeBlock`** - the fenced-code surface (moved here from Gild UI; `Preview`/`Mermaid`
  are its only consumers).
- **`Mermaid` (+ `DiagramViewer`)** - renders ` ```mermaid ` blocks as themed, zoomable diagrams.

## Markdown-specifics

- **Its own package, a peer of the React package.** An app that never imports it installs no editor or
  diagram dependencies: `@gild-ui/react` does not depend on it. Its entry points are listed one
  by one in `exports` and `publishConfig.exports`, and each has a docs page at
  `/react/markdown/<Name>/`; a new one is an entry and a page together. `tsdown.config.ts` builds the
  entries `exports` lists.
- **The hooks are a dependency.** `@gild-ui/hooks` is imported by its name and never
  bundled; the React package stays a peer.

- **Theme slots via one augmentation.** Unlike an in-repo design-system component, this package is a
  _consumer_ of Gild UI, so it registers its `theme.components` slots (`MarkdownEditor`,
  `MarkdownPreview`, `MarkdownToolbar`, `CodeBlock`) with one `declare module '@gild-ui/react'`
  block on `ThemeComponents`, and `theme.syntax` and `theme.mermaid` with one on
  `@gild-ui/core/theme`'s `Theme`, in `src/themeTypes.ts`. Every entry's `index.ts` imports
  that file, so the built declaration of each entry reaches the block: an app that imports any entry
  has the slots and the keys typed. Its own `themeComponents.spec.tsx` locks the wiring
  (design-system's spec covers only design-system components).
- **No `audit:styled`.** The styled-audit tooling is design-system-only. Markdown's named `styled`
  roots (`MarkdownEditor`, `MarkdownPreview`, `MarkdownToolbar`, `CodeBlock`) are instead locked by
  `themeComponents.spec.tsx`.
- **Design-system tokens only.** Components read tokens from the active design-system theme. e.g.
  `Mermaid` anchors mermaid's palette to `theme.background`/`theme.fonts` (mermaid derives the
  rest) with `darkMode` from `theme.colorScheme`, and lets consumers override any variable via the
  augmented `theme.mermaid` key (typed `MermaidThemeVariables`). Hex literals appear only in
  test/story fixtures.
- **`theme.syntax`** (typed `ThemeSyntax`, defined in `CodeBlock/CodeBlock.data.ts`) is likewise a
  markdown-owned augmentation, not a design-system scale - it exists solely for `CodeBlock`'s
  highlight.js token mapping and its own `font` (independent of `theme.fonts.mono`). It's required,
  with no runtime fallback: any theme rendering `CodeBlock` (directly, or via `Preview`/`Mermaid`'s
  fallback) must merge one of the exported `syntaxDark`/`syntaxLight` presets, or its own.
- **Browser-only libraries are lazy-loaded.** `mermaid` is imported inside an effect, never at
  module scope, so the package stays SSR-safe and it lands in a lazy chunk. Invalid diagrams fall
  back to their source (`suppressErrorRendering`).
