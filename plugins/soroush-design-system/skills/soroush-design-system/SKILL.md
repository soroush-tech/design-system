---
name: soroush-design-system
description: Build UI with @soroush.tech/design-system - the token-driven Emotion component library documented at docs.soroush.tech. Load when starting or styling a React/Next.js app that should match that house style, when wiring ThemeProvider or the brand light+dark themes, when adding pages, cards, tables, forms, nav chrome, or status chips, or when reviewing UI code for token compliance (no raw hex, no ad-hoc spacing).
---

# @soroush.tech design system

A house style, not just a package. Two layers:

1. **`@soroush.tech/design-system`** (npm, MIT) - Emotion + `@soroush.tech/styled-system`
   primitives and components. Ships a _dark, unbranded_ `baseTheme` with raw hex.
2. **The brand layer** - a `theme.ts` in each app that builds `light` and `dark` via
   `createTheme(baseTheme, ...)` from the shared color ramps, plus a small local
   "layout kit" of app-level components (`PageCard`, `PageHeader`, `Pill`, ...).

Layer 2 is what makes two apps look like siblings. Copy it; don't reinvent it.

## Look it up rather than guessing

This plugin ships an MCP server (`soroush`). Prefer it over recalling an API:

- `list_components` - the inventory with each component's subpath import.
- `get_component` with `part: "api"` - a component's real props, token values, and
  defaults, straight from its README. Call this before writing markup with a component
  you have not used in this session.
- `get_tokens` - the live token contract; use it instead of inventing a value.
- `search_docs`, `get_doc` - guides, including setup, theming, and the layout kit.

The bundled `references/` files mirror the same content for offline reading.

## Setting up a new app

1. `pnpm add @soroush.tech/design-system @emotion/cache` (React 19 peer).
2. Copy `references/theme.ts` verbatim into the app (`app/theme.ts` or `src/theme.ts`).
   The color ramps are the brand - change palette _assignments_ per app if you must,
   never the ramp hex values.
3. Wire the provider. Next.js App Router needs an Emotion SSR registry - copy
   `references/providers.tsx` verbatim; without it server-rendered markup arrives
   unstyled and flashes.
4. Default to `light`. Both themes exist so `colorScheme`-aware components work, but
   the shipped default is light unless the app says otherwise.
5. Copy the layout kit you need from `references/layout-kit.md`.

See `references/setup.md` for the full checklist including fonts and the global reset.

## The rules

**Tokens or nothing.** Every color, font, weight, radius, and border width comes off
`theme`. A raw hex in a component is a bug - the one legitimate exception in the
existing apps is `PageCard`'s hairline shadow (`rgba(0,0,0,0.05) 0 1px 3px 0`), which
predates a token. `references/tokens.md` has the whole contract.

**Semantic colors, not literal ones.** Write `theme.text.secondary`, not "grey". Write
`theme.palette.error.main`, not "red". Status to tone mapping is a lookup table
(`STATUS_TONE` in `references/layout-kit.md`), so a new status is one line, not a new
component.

**`styled()` for app components, props for one-offs.** Anything reused gets a
`styled(...)` at module scope with a one-line doc comment saying what it is. Layout
tweaks inside a page use the styled-system props already on `Flex`, `Typography`,
`View` (`gap={2}`, `mt={1}`, `p={3}`, `color="secondary"`). Never a `style={{}}` prop.

**Custom props never reach the DOM.** Any styling prop you invent must be filtered:

```tsx
const Root = styled('span', { shouldForwardProp: (prop) => prop !== 'tone' })<{
  tone: PaletteColor
}>(({ theme, tone }) => ({ color: theme.palette[tone].main }))
```

**Subpath imports.** `import { Button } from '@soroush.tech/design-system/Button'` -
one component per import, for tree-shaking. Only `styled`, the shared types, and
`PaletteColor` come from the package root. `createTheme`/`baseTheme`/`ThemeProvider`
from `/theme`, `alpha`/`generateBoxShadow` from `/utils`, `CacheProvider`/`Global`
from `/engine`.

**`"use client"` on anything themed.** Emotion's theme context is client-side. Every
file that calls `styled()` or reads `useTheme()` needs the directive.

**Breakpoints are hand-written media queries**, mobile-first, at `600px` (chrome/rail)
and `800px` (content density). Stay on those two numbers.

**Fill the gaps locally, don't fork the package.** The library has no Tabs, no stat
strip, no pill. Those live in the app as small composed components (see the layout kit)
built from `Pressable`, `Flex`, and tokens.

## Reference files

- `references/tokens.md` - the token contract: scales, palette slots, semantic colors,
  typography variants, component sizes. Generated from the live theme.
- `references/components.md` - the shipped components and which to reach for.
  Generated from the component registry.
- `references/layout-kit.md` - app-level components to copy: `PageCard`, `PageHeader`,
  `SectionLabel`, `Pill`, `StatusBadge`, `StatStrip`, `TabNav`, `SettingCard`,
  `SearchInput`, `Main`, `TopBar`, `ProjectRail`.
- `references/theme.ts` - the brand theme, copy verbatim.
- `references/providers.tsx` - Next.js App Router provider + Emotion SSR registry.
- `references/setup.md` - new-app checklist.

## Review checklist

When reviewing UI code in an app that uses this system:

- [ ] Raw hex / `rgb()` / named colors outside `theme.ts`
- [ ] Hardcoded font stacks instead of `theme.fonts.*`
- [ ] Numeric font weights instead of `theme.fontWeights.*`
- [ ] Barrel import `from '@soroush.tech/design-system'` for a component
- [ ] Missing `"use client"` on a file that calls `styled()`
- [ ] Custom styling prop without `shouldForwardProp`
- [ ] `style={{}}` where a styled component or styled-system prop belongs
- [ ] A breakpoint that isn't 600px or 800px
- [ ] A one-off card/chip that duplicates a layout-kit component
