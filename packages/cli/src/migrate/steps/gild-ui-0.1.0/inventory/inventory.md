# Inventory: @soroush.tech/design-system 2.2.0 -> Gild UI 0.1.0

Input of the first `migrate` step (issue #171). Everything below was produced by scripts in `scripts/` (TypeScript compiler API over the published 2.2.0 `.d.mts` and the HEAD sources, a TypeScript module loader for the catalogs and `baseTheme`, an AST scan of the 2.2.0 consumers); nothing was read from the working tree.

- OLD side: tag `@soroush.tech/design-system@2.2.0` and the npm tarballs `@soroush.tech/design-system@2.2.0`, `@soroush.tech/markdown@1.3.0` (the latest markdown tag; the 2.2.0-era markdown), `@soroush.tech/hooks` (private, source only, version 0.1.0), `@soroush.tech/styled-system` 6.0.1/6.0.2/6.0.3.
- NEW side: `git show HEAD` of `feat/umber-style` (452a8475): `packages/core`, `react`, `react-hooks`, `react-markdown` at 0.1.0, written with the NEW names (`@gild-ui/core`, `@gild-ui/react`, `@gild-ui/hooks`, `@gild-ui/react-markdown`). The style-prop package is `@soroush.tech/styled-system` on both sides (`^6.0.1` -> `^6.0.3`; export names identical; 6.0.2 swapped its `@emotion/is-prop-valid` peer for `@umber-style/is-prop-valid`).
- Item ids: `IMP-` imports, `EXP-` exports, `CMP-` components, `THM-` theme, `STY-` styling, `SSR` is part of `STY-`, `DEP-` dependencies, `OUT-` rendered output. `mechanical` = the step edits it; `manual` = the step reports file:line and the user acts. Items marked report-only are `manual` items the step can only list (no source edit exists).

## 1. Summary

| Area                 | mechanical | manual | of which report-only |
| -------------------- | ---------: | -----: | -------------------: |
| imports              |         19 |      2 |                    0 |
| exports              |          0 |      4 |                    0 |
| components           |          0 |      6 |                    1 |
| theme                |          2 |      9 |                    0 |
| styling              |          1 |     10 |                    1 |
| ssr                  |          0 |      4 |                    0 |
| dependencies         |          5 |      4 |                    0 |
| output               |          0 |      8 |                    8 |
| **total (74 items)** |     **27** | **47** |               **10** |

What the numbers say, in short:

- **Components did not change their API.** 121 component functions compared (106 design-system + 15 markdown; the new side has 110 + 15, the 4 extra are new sub-components; every old component exists on the same subpath, except ThemeProvider, LayoutProvider and StylesConsumer, which moved with their entries). Own props: 0 removed, 0 renamed, 0 added, 0 changed value sets, 0 changed optionality (only the `as` prop of Flex, Grid, Quote, TableContainer and View is now declared by the engine instead of by the package: same accepted values). Defaults: the catalog of 93 components is identical option by option (values, defaults, scales, content, two-way, events, variants, examples), and the 401 comparable source files differ in 0 default values of any component. Only type _names_ moved (`keyof ButtonVariants` -> `ButtonVariant`, `keyof ThemePalette` -> `ThemeColor`, `keyof ThemeSizes` -> `ThemeSize`): same literal sets on the built-in theme.
- **Imports are the bulk of the work, and almost all mechanical:** 79 old import paths, 837 (path, name) pairs: 470 kept at the same relative path under the new package name, 361 moved to another path, 0 renamed, 6 removed (all types).
- **The theme moved its component looks.** `createTheme` is tokens-only; `components` go to `defineThemes(themes, components)`, which is also what makes the typing of `color="brand"` / `variant="pill"` work through `Register`. `baseTheme` is value-identical (223 leaf keys, 0 diff).
- **The styling engine change is where the manual work and the risk are:** SSR setup (registry / `@emotion/server` -> nothing / `@umber-style/server`), theme tokens becoming CSS variables (string math on tokens breaks), `css` and `keyframes` semantics, Emotion-specific selectors in tests, the `css` prop.
- **React 19.2.8 is now the minimum** (peers were `^18 || ^19`).

## 2. Import paths and exported names

Full per-name table: `imports.json` (every old path, every name, value/type, status, target path, rule id) and `imports.md` (the same, human). Below, one row per path or family.

| Old path (2.2.0)                                     | New path                                                                                                                                                    | Values                             | Types                              | Notes                                                                           |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------- |
| `@soroush.tech/design-system/<Component>` (62 paths) | `@gild-ui/react/<Component>`                                                                                                                                | 113 (all kept)                     | 290 (all kept)                     | mechanical (IMP-COMP); the new paths only add names                             |
| @soroush.tech/design-system                          | `@soroush.tech/styled-system` (233), `@gild-ui/react` (4), `@soroush.tech/styled-system/should-forward-prop` (2), `@gild-ui/core/theme` (2), removed (1)    | 112 (3 kept, 109 moved, 0 removed) | 130 (1 kept, 128 moved, 1 removed) | the old root re-exported all of styled-system (IMP-ROOT-SS/-SP/-STYLING/-TYPES) |
| @soroush.tech/design-system/theme                    | `@gild-ui/core/theme` (70), `@gild-ui/react` (9), `@gild-ui/react/<Component>` for the 37 `*OwnerState` types, `@gild-ui/core/breakpoints` (2), removed (5) | 31 (0 kept, 31 moved, 0 removed)   | 84 (0 kept, 79 moved, 5 removed)   | the pure tokens and the React provider/hooks are split (IMP-THEME-*)            |
| @soroush.tech/design-system/style                    | `@gild-ui/react`                                                                                                                                            | 3 (0 kept, 3 moved, 0 removed)     | 2 (0 kept, 2 moved, 0 removed)     | IMP-STYLE                                                                       |
| @soroush.tech/design-system/engine                   | `@gild-ui/react/engine` (4), `@gild-ui/react` (`Global`)                                                                                                    | 5 (4 kept, 1 moved, 0 removed)     | 0 (0 kept, 0 moved, 0 removed)     | IMP-ENGINE, IMP-ENGINE-GLOBAL                                                   |
| @soroush.tech/design-system/utils                    | `@gild-ui/core/utils`                                                                                                                                       | 4 (0 kept, 4 moved, 0 removed)     | 0 (0 kept, 0 moved, 0 removed)     | IMP-UTILS                                                                       |
| @soroush.tech/design-system/testing                  | `@gild-ui/react/testing`                                                                                                                                    | 1 (1 kept, 0 moved, 0 removed)     | 0 (0 kept, 0 moved, 0 removed)     | IMP-TESTING                                                                     |
| @soroush.tech/design-system/catalog                  | `@gild-ui/react/catalog` (also `@gild-ui/core/catalog`)                                                                                                     | 1 (1 kept, 0 moved, 0 removed)     | 9 (9 kept, 0 moved, 0 removed)     | IMP-CATALOG; each entry gains `slots`, `ownerState`; `module` value changes     |
| @soroush.tech/markdown ...                           | `@gild-ui/react-markdown` (same subpaths)                                                                                                                   | 22 (22 kept, 0 moved, 0 removed)   | 23 (23 kept, 0 moved, 0 removed)   | IMP-MD; all names kept                                                          |
| @soroush.tech/markdown/MarkdownContext               | `@gild-ui/react-markdown` (root)                                                                                                                            | 2 (0 kept, 2 moved, 0 removed)     | 2 (0 kept, 2 moved, 0 removed)     | only reachable through the `./*` wildcard in 1.3.0 (IMP-MD-CONTEXT)             |
| @soroush.tech/hooks/useCopyToClipboard               | `@gild-ui/hooks/useCopyToClipboard`                                                                                                                         | 2 (2 kept, 0 moved, 0 removed)     | 1 (1 kept, 0 moved, 0 removed)     | private package, never published (IMP-HOOKS)                                    |

Removed names (the only 6 of 837): `ThemeCustomizationOptions`, `ComponentStyle`, `ComponentVariant`, `CardSlotIconProps`, `CardSlotTypographyProps`, `TabsVariants` (EXP-001..004). No name was **renamed**: a search for same-named or near-named replacements (checker over every new entry) found none; `TabsVariants` has a successor in concept only (`TabsVariant`, a union, no augmentation).

Added (new names with no old counterpart), by group - not a migration concern, listed so the diff is complete:

- Per component entry: `<Name>OwnerState`, `<Name>Slot`, `<Name>ThemeConfig` (227 names over 61 entries), plus `useHoldRepeat`/`UseHoldRepeatOptions` (NumberInput), `useAutoHide`/`UseAutoHideParams` (Snackbar).
- `@gild-ui/core/theme` (15): `defineThemes`, `Register`, `RegisteredTheme`, `ThemeColor`, `ThemeSize`, `ThemeSpaceKey`, `ThemeBreakpoint`, `ThemeTypography`, `VariantOf`, `ThemeFor`, `LooksOf`, `SpaceUnits`, `spacing`, `InputVariantKey`, `TextTransform`.
- `@gild-ui/react` root: `registerBaseTheme`, `useMediaQuery`, `alpha`, `negate`, `useStyleValue`, `LiveValue`; and each name of the styling system as its own entry (`/ThemeProvider`, `/useTheme`, `/styled`, `/css`, `/keyframes`, `/Global`, ...).
- `@gild-ui/core/utils`: `deepMerge`, `getAnchorRel`, `getShapeRadius`, `getSurfaceRadius`, `getDecimalPrecision`, `roundToPrecision`, `addExact`, `snapToStep`, `Shape`; `@gild-ui/core/breakpoints` (the pure query helpers); `@gild-ui/core/catalog` (+ `/entries`).
- `@gild-ui/hooks`: `useControlled`, `useDebounce`, `useDebouncedCallback`, `useEventCallback`, `useMergedRefs`.

## 3. Components: props, values, defaults, behaviour

**Props.** For all 121 component functions present on both sides the own props are identical in name, optionality and literal value set. The components flagged by the raw diff differ in _type text only_:

`Button`, `ButtonGroup`, `Card`, `DrawerToggle`, `Fab`, `FabMenuItem`, `Icon`, `NativeSelect`, `Select`, `SidebarItem`, `TableSortLabel`, `TabList`, `Tabs`, `ThemeProvider`, `StylesConsumer`, `ToggleButton`, `ToggleButtonGroup` - the old prop was `keyof ButtonVariants | keyof ThemePalette | keyof ThemeSizes | keyof TabsVariants | <icon-name union>` and is `ButtonVariant`, `ThemeColor`, `ThemeSize`, `TabsVariant`, `IconName`-like aliases now; the resolved literal sets are equal (checked, `props-diff.json`). Also `as` of `Flex`, `Grid`, `Quote`, `TableContainer`, `View` is declared by the engine now (prints as a union of tag names) but accepts a component exactly as before (compiled `<View as={Link} />` against HEAD: no error).

**Values and defaults.** `catalog-diff.json`: 93 components on both sides, every option (`values`, `default`, `scale`), `content`, `twoWay`, `domEvents`, `variants`, `example`, `isPlaceable` equal; the folder (old) = `subpath` (new) for each. `defaults-diff.json`: every destructuring default of every component source (401 files) is equal; the one reported difference is `ThemeProvider`'s internal `theme = baseTheme` default, now applied in the body (same behaviour). `ThemeDefaults` (24 keys, `theme.defaults`) is unchanged.

**Behaviour changes visible in the sources** (the diff of the 401 source files present on both sides is: imports, `'use client'`, and the lines below):

| Where                                                                                                                    | Change                                                                                                                                  | Item             |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| every file that wrote opacity as a hex suffix (Tabs/Tab, Tabs, MenuItem, MenuList, NumberInput, Breadcrumbs, RangeInput) | `${main}1F` -> `alpha(main, 0.12)` (`color-mix`); `-${theme.borderWidths.base}` -> `negate(...)`                                        | OUT-006, STY-012 |
| Tooltip                                                                                                                  | the arrow's position is class-based (live values); `slotProps.arrow.style` can no longer set `top/right/bottom/left`                    | CMP-005          |
| RangeInput                                                                                                               | thumb place is a live value (class + CSS variable), `zIndex` of the last used thumb is a class; no `style` attribute                    | STY-015          |
| LinearProgress                                                                                                           | segment width/left are props of a styled segment, not inline `style`                                                                    | STY-015          |
| Portal                                                                                                                   | children wrapped in `ThemeScope` (re-renders the nested provider's wrapper around portalled content)                                    | OUT-005          |
| LayoutProvider / ThemeProvider                                                                                           | the outermost provider renders no element and declares the theme on `:root`; a nested one renders a wrapper `div` (`display: contents`) | OUT-004, OUT-003 |
| View, Table, TableCell, TableRow, TableHead, TableBody, TableFooter                                                      | `systemProps` order: `colorSystem` moved after `typography`/`border`                                                                    | CMP-006          |
| Sidebar                                                                                                                  | `shouldForwardProp` is `createShouldForwardProp([...props, ...])` (style props no longer reach the element)                             | (fix, no action) |
| Typography                                                                                                               | `theme.typography[variant].element` is a string tag name (cast to `ElementType`)                                                        | CMP-003          |
| `text.inherit`                                                                                                           | real keyword `inherit` (was a CSS variable that resolved to nothing)                                                                    | OUT-007          |
| interactive components                                                                                                   | `'use client'`                                                                                                                          | OUT-008          |
| ARIA / elements                                                                                                          | no `aria-*`, `role` or rendered-element change appears in the diff of any component source                                              | -                |

## 4. Theme

| Topic                                                        | 2.2.0                                                                                                                                                  | 0.1.0                                                                                                                                                                                                                                                       | Item                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `baseTheme`                                                  | `@soroush.tech/design-system/theme`                                                                                                                    | `@gild-ui/core/theme`; 223 leaf keys, identical values                                                                                                                                                                                                      | IMP-THEME-CORE                             |
| `createTheme(base, overrides)`                               | deep merge, returns `Theme` (with breakpoint helpers)                                                                                                  | same merge (`deepMerge` now in `@gild-ui/core/utils`); result type keeps keys the overrides add (`ThemeMerge`); `components` in overrides is a type error                                                                                                   | THM-001, THM-008                           |
| Theme shape                                                  | 32 keys + `components?`                                                                                                                                | 32 keys, no `components` in the core `Theme`; the React `Theme` (`Theme & { components? }`, from `useTheme`) has it; markdown still adds `mermaid`, `syntax` by augmentation                                                                                | THM-002                                    |
| `ThemeOverride`                                              | `DeepPartial<Theme>` (with `components`)                                                                                                               | `DeepPartial<Theme>` without `components`; `createTheme` takes `ThemeOverrides<T, O>`                                                                                                                                                                       | THM-001                                    |
| Token naming                                                 | values inlined                                                                                                                                         | in style functions (`styled`, `Global`, `components` callbacks) tokens are `--soroush-<scale>-<key>` variable references (`rawKeys`: breakpoints, components, defaults, transitions, sizes, typography, layout stay real); `useTheme()` returns real values | THM-011, STY-012, OUT-003                  |
| Type registration                                            | augmentation only: `declare module '@soroush.tech/design-system/theme' { interface ThemePalette { brand: PaletteEntry } }`                             | the same augmentation at `@gild-ui/core/theme`, and `defineThemes` + `declare module '@gild-ui/core/theme' { interface Register { themes: typeof themes } }`                                                                                                | THM-004, THM-006                           |
| `ThemeProvider` props                                        | `children`, `theme?` (default `baseTheme`), `defaults?`                                                                                                | same three props; generic `T`, `theme` checked against the registered shape; same default                                                                                                                                                                   | THM-009                                    |
| `components` customization                                   | `ComponentConfig<OwnerState, Slot>`: `defaultProps`, `styleOverrides` (per slot, object or `({ theme, ownerState })`), `variants` (`{ props, style }`) | same shape and semantics; `$owner` (type only); `<Name>ThemeConfig`, `ThemeComponents` generated; set via `defineThemes`                                                                                                                                    | THM-001, THM-005, THM-010, EXP-002         |
| `defaults` (`ThemeDefaults`)                                 | 24 keys                                                                                                                                                | same 24 keys, same `themeDefault(theme, key, fallback)`                                                                                                                                                                                                     | -                                          |
| Server components                                            | not applicable                                                                                                                                         | `registerBaseTheme(theme)`                                                                                                                                                                                                                                  | THM-007                                    |
| `useTheme`, `useDefaultProps`, `withTheme`, `LayoutProvider` | `./theme`                                                                                                                                              | `@gild-ui/react`; registered-theme typing; `useMediaQuery` is new                                                                                                                                                                                           | IMP-THEME-REACT, CMP-001, CMP-002, CMP-004 |

## 5. Styling system, server rendering, output

| Name                                       | Came from (2.2.0)                                                                                                                                      | Is now                                                                                                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styled`                                   | root, Emotion `styled` wrapped by `style/styled.ts`                                                                                                    | `@gild-ui/react` (and `/styled`), `@umber-style/styled` wrapped by the same file; same options (`name`, `slot`, `systemProps`, `overridesResolver`)                  |
| `css`                                      | root, `@emotion/react`                                                                                                                                 | `@gild-ui/react` (and `/css`), `@umber-style/react`; static styles only, a function is a `TypeError`                                                                 |
| `keyframes`                                | root, `@emotion/react`                                                                                                                                 | `@gild-ui/react` (and `/keyframes`); template or steps object                                                                                                        |
| `Global`                                   | `/engine` (Emotion `Global`)                                                                                                                           | `@gild-ui/react` (and `/Global`); `globalStyles` stays in `/engine`                                                                                                  |
| `useTheme`, `withTheme`, `ThemeProvider`   | `/theme`                                                                                                                                               | `@gild-ui/react` (and each name's own entry)                                                                                                                         |
| `useStyle`, `withStyles`, `StylesConsumer` | `/style`                                                                                                                                               | `@gild-ui/react`; new `useStyleValue`, `alpha`, `negate`                                                                                                             |
| `shouldForwardProp`                        | `createShouldForwardProp`, `props` re-exported from the root                                                                                           | `@soroush.tech/styled-system/should-forward-prop` (import it there)                                                                                                  |
| `css` prop                                 | not part of the API; works only if the app set Emotion's `jsxImportSource` (a Paper README example shows it)                                           | none (STY-004)                                                                                                                                                       |
| cache                                      | `styleCache` (Emotion cache, key `soroush`) used only by SSR providers; `styled` used Emotion's default cache (class `css-<hash>`)                     | `styleCache` (UmberStyle cache, key `soroush`) is the one cache the engine writes to; classes `soroush-<hash>`                                                       |
| SSR (Next)                                 | client `Providers` with an Emotion registry (`createCache`, `cache.compat`, `useServerInsertedHTML`) over `CacheProvider` + `ThemeProvider` + `Global` | server layout + `ThemeProvider`; `providers.tsx` imports the theme module that calls `registerBaseTheme`; no registry                                                |
| SSR (others)                               | `@emotion/server` extraction                                                                                                                           | `@umber-style/server` `createInstance(styleCache)` under `<CacheProvider value={styleCache}>`                                                                        |
| style element                              | `<style data-emotion="css <ids>">` (or `<key> ...`)                                                                                                    | `<style data-style="soroush">`; server: `data-precedence="soroush" data-href`, registry: `data-umber ... data-umber-registry`; nonce from the page's `script[nonce]` |
| class prefix                               | `css-` (default) / the app's cache key                                                                                                                 | `soroush-`                                                                                                                                                           |

## 6. Dependencies and peers

|                                    | 2.2.0                                                                                                                                                                             | 0.1.0                                                                                                                                                                             |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@soroush.tech/design-system` deps | `@emotion/cache ^11.14.0`, `@emotion/react ^11.14.0`, `@emotion/styled ^11.14.1`, `@soroush.design/cli 0.1.0`, `@soroush.tech/styled-system ^6.0.1`                               | `@gild-ui/react`: `@gild-ui/core`, `@gild-ui/hooks`, `@soroush.tech/styled-system ^6.0.3`, `@umber-style/cache ^0.8.0`, `@umber-style/react ^0.8.0`, `@umber-style/styled ^0.8.0` |
| peers                              | `react ^18 \|\| ^19`, `react-dom ^18 \|\| ^19`                                                                                                                                    | `react ^19.2.8`, `react-dom ^19.2.8`                                                                                                                                              |
| markdown                           | deps `mermaid ^12.3.0`, `react-markdown ^10.1.0`, `rehype-*`, `remark-*`, `unified ^11.0.5`; peers `@soroush.tech/design-system ^1.3.3 \|\| ^2.0.0`, `react`, `react-dom` (18/19) | `@gild-ui/react-markdown`: the same third-party deps + `@gild-ui/core`, `@gild-ui/hooks`; peers `@gild-ui/react`, `react ^19.2.8`, `react-dom ^19.2.8`                            |
| hooks                              | `@soroush.tech/hooks` private, peer `react ^19.2.8`                                                                                                                               | `@gild-ui/hooks`, peer `react ^19.2.8`                                                                                                                                            |
| bin                                | `design-system` -> `dist/bin.mjs` (`init`)                                                                                                                                        | none; `npx @soroush.design/cli init` (bin `soroush-design`)                                                                                                                       |
| remove from apps                   | `@emotion/*` (also `@emotion/server`, `@emotion/css`)                                                                                                                             | engine packages come with `@gild-ui/react`                                                                                                                                        |
| add to apps                        | -                                                                                                                                                                                 | `@gild-ui/core` (themes), `@soroush.tech/styled-system` (style props), `@umber-style/server` (non-Next SSR extraction only)                                                       |

## 7. Items

Evidence is `file:line` at the tag (`2.2.0:`), at `HEAD:` or in a published tarball (`npm ...:`). "2.2.0 fixtures" is how many occurrences the sanity pass found in the consumers at the tag (section 8).

### imports

#### IMP-COMP - mechanical

- **From:** @soroush.tech/design-system/<Component> (62 subpaths: Accordion ... Zoom, Menu, Tabs, Table ...)
- **To:** @gild-ui/react/<Component> (same name)
- **How:** Import rewrite of the specifier: `@soroush.tech/design-system/X` -> `@gild-ui/react/X`. Every name exported at an old component path is exported at the same path of the new package (0 removed, 0 renamed, 0 changed kind); the new paths only add names (`XOwnerState`, `XSlot`, `XThemeConfig`, `useHoldRepeat`, `useAutoHide`). Also covers `import type`, `export ... from`, `require`, `import()` with a string literal, and `vi.mock`/`jest.mock` specifiers.
- **2.2.0 fixtures:** 196 occurrence(s) in 59 file(s) - docs-app 94, docs content 3, cli init templates + type-test app 1, lab 2, story-demo 29, mcp + plugin 7, markdown package 60; e.g. 2.2.0:apps/docs/src/common/ComponentCard/ComponentCard.tsx:1, 2.2.0:apps/docs/src/pages/index/+Page.tsx:2, 2.2.0:apps/docs/src/pages/packages/+Page.tsx:1
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:44`, `HEAD:packages/react/package.json:32`

#### IMP-ROOT-SS - mechanical

- **From:** @soroush.tech/design-system (root) - the style-prop functions and types it re-exported (`space`, `layout`, `color`, `typography`, `border`, `flexbox`, `grid`, `position`, `compose`, `system`, `variant`, `get`, `createParser`, `breakpointQueries`, `SpaceProps`, `LayoutProps`, ...; 233 names)
- **To:** @soroush.tech/styled-system (root)
- **How:** Import rewrite per name: the old root did `export * from '@soroush.tech/styled-system'`; the new `@gild-ui/react` root re-exports nothing of it. Move the specifiers to `@soroush.tech/styled-system`, and add `@soroush.tech/styled-system@^6.0.3` to the app's own dependencies (it was only transitive before: DEP-005). Every name exists at the new package root (233/233 verified with the compiler API).
- **2.2.0 fixtures:** 6 occurrence(s) in 6 file(s) - docs-app 6; e.g. 2.2.0:apps/docs/src/common/ComponentHero/ComponentHero.tsx:2, 2.2.0:apps/docs/src/common/Footer/Footer.tsx:1, 2.2.0:apps/docs/src/common/NavRail/NavRail.tsx:1
- **Evidence:** `2.2.0:packages/design-system/src/index.ts:11`, `HEAD:packages/react/src/index.ts:3`

#### IMP-ROOT-SP - mechanical

- **From:** @soroush.tech/design-system (root): `createShouldForwardProp`, `props`
- **To:** @soroush.tech/styled-system/should-forward-prop
- **How:** Import rewrite: the old root re-exported these two from the styled-system subpath `should-forward-prop`; import them from there directly. Same functions (STY-005 covers the forwarding behaviour of the engine).
- **2.2.0 fixtures:** 1 occurrence(s) in 1 file(s) - docs-app 1; e.g. 2.2.0:apps/docs/src/common/ComponentHero/ComponentHero.tsx:2
- **Evidence:** `2.2.0:packages/design-system/src/index.ts:12`, `HEAD:packages/react/src/Button/Button.tsx:20`

#### IMP-ROOT-STYLING - mechanical

- **From:** @soroush.tech/design-system (root): `styled`, `css`, `keyframes`
- **To:** @gild-ui/react (root; also @gild-ui/react/styled, /css, /keyframes)
- **How:** Import rewrite. The names are kept; their semantics changed with the engine - `css` and `keyframes` are no longer Emotion's (STY-002, STY-003), `styled` keeps its call forms (STY-001).
- **2.2.0 fixtures:** 27 occurrence(s) in 16 file(s) - docs-app 8, docs content 2, lab 1, story-demo 1, mcp + plugin 9, markdown package 6; e.g. 2.2.0:apps/docs/src/common/ComponentHero/ComponentHero.tsx:2, 2.2.0:apps/docs/src/common/Footer/Footer.tsx:1, 2.2.0:apps/docs/src/common/NavRail/NavRail.tsx:1
- **Evidence:** `2.2.0:packages/design-system/src/index.ts:6`, `HEAD:packages/react/src/style/styled.ts:14`

#### IMP-ROOT-TYPES - mechanical

- **From:** @soroush.tech/design-system (root) types: `Theme`, `PaletteColor`, `CSSObject`
- **To:** `Theme`, `PaletteColor` -> @gild-ui/core/theme; `CSSObject` -> @gild-ui/react
- **How:** Import rewrite per name. `Theme` loses `components` (THM-002); `CSSObject` is the new engine's type (STY-013).
- **2.2.0 fixtures:** 9 occurrence(s) in 8 file(s) - docs-app 3, mcp + plugin 3, markdown package 3; e.g. 2.2.0:apps/docs/src/common/ComponentHero/ComponentHero.tsx:2, 2.2.0:apps/docs/src/theme/GlobalStyles.tsx:5, 2.2.0:apps/docs/src/theme/themes.ts:1
- **Evidence:** `2.2.0:packages/design-system/src/index.ts:10`, `HEAD:packages/react/src/index.ts:16`

#### IMP-THEME-CORE - mechanical

- **From:** @soroush.tech/design-system/theme: `createTheme`, `baseTheme`, `themeDefault`, the token scales (`space`, `radii`, `typography`, ...), `up/down/only/between/not`, `containerQueries`, `Theme*`, `Palette*`, `*Entry`, `Layout*`, `DeepPartial`, `ThemeOverride`, ... (70 names)
- **To:** @gild-ui/core/theme
- **How:** Import rewrite per name (the old `./theme` mixed pure tokens and React; the new core has the pure part). Same names, same values: `baseTheme` has 223 leaf keys on both sides, 0 added, 0 removed, 0 changed (basetheme-diff.json).
- **2.2.0 fixtures:** 43 occurrence(s) in 23 file(s) - docs-app 2, docs content 4, cli init templates + type-test app 6, story-demo 16, mcp + plugin 2, markdown package 13; e.g. 2.2.0:apps/docs/src/theme/themes.ts:2, 2.2.0:apps/docs/content/docs/installation.md:17, 2.2.0:apps/docs/content/docs/usage.md:17
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:634`, `HEAD:packages/core/package.json:33`

#### IMP-THEME-REACT - mechanical

- **From:** @soroush.tech/design-system/theme: `ThemeProvider`, `LayoutProvider`, `LayoutProviderProps`, `useTheme`, `useDefaultProps`, `withTheme`, `ThemeComponents`, `ComponentConfig`, `CSSObject`
- **To:** @gild-ui/react (root; each also at @gild-ui/react/<Name>)
- **How:** Import rewrite per name; split the old import line, the rest of the names go to `@gild-ui/core/theme` (IMP-THEME-CORE). Props of `ThemeProvider` are unchanged (`theme`, `defaults`, `children`); typing changes are THM-009, THM-011, CMP-002.
- **2.2.0 fixtures:** 32 occurrence(s) in 31 file(s) - docs-app 9, docs content 1, cli init templates + type-test app 2, story-demo 10, mcp + plugin 1, markdown package 9; e.g. 2.2.0:apps/docs/src/common/ComponentCard/ComponentCard.test.tsx:5, 2.2.0:apps/docs/src/common/DocsNav/DocsNav.test.tsx:6, 2.2.0:apps/docs/src/common/Footer/Footer.test.tsx:3
- **Evidence:** `2.2.0:packages/design-system/src/theme/index.ts:3`, `HEAD:packages/react/src/index.ts:3`

#### IMP-THEME-OWNERSTATE - mechanical

- **From:** @soroush.tech/design-system/theme: `<Component>OwnerState` types (29: ButtonOwnerState, TabsOwnerState, MenuItemOwnerState, ...)
- **To:** @gild-ui/react/<Component> (the entry of the component that owns it)
- **How:** Import rewrite per name; the table in imports.json gives the exact entry for each (e.g. `TabOwnerState` -> `@gild-ui/react/Tabs`, `MenuListOwnerState` -> `@gild-ui/react/Menu`). Their `color`/`size`/`variant` fields are typed `ThemeColor`/`ThemeSize`/`ButtonVariant` now (same values with the built-in theme).
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/theme/themes.ts:650`, `HEAD:packages/react/src/Button/Button.types.ts:8`

#### IMP-THEME-BREAKPOINTS - mechanical

- **From:** @soroush.tech/design-system/theme: `withBreakpointHelpers`, `BreakpointHelpers`
- **To:** @gild-ui/core/breakpoints
- **How:** Import rewrite per name.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/theme/breakpoints.ts:22`, `HEAD:packages/core/src/breakpoints/index.ts:1`

#### IMP-STYLE - mechanical

- **From:** @soroush.tech/design-system/style: `useStyle`, `withStyles`, `StylesConsumer`, `StyleFactory`, `StyleInput`
- **To:** @gild-ui/react (root; each also at /useStyle, /withStyles, /StylesConsumer)
- **How:** Import rewrite. Same names and call forms; `StyleFactory.getStyles` now returns the engine's `WebStyleObject` (STY-013). `useStyleValue` and `LiveValue` are new.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:654`, `HEAD:packages/react/src/entries/useStyle.ts:1`

#### IMP-ENGINE-GLOBAL - mechanical

- **From:** @soroush.tech/design-system/engine: `Global`
- **To:** @gild-ui/react (root or /Global) - NOT /engine any more
- **How:** Import rewrite per name: `Global` left the engine entry. The rest of the old `./engine` names stay at `@gild-ui/react/engine` (IMP-ENGINE).
- **2.2.0 fixtures:** 4 occurrence(s) in 4 file(s) - docs-app 1, cli init templates + type-test app 2, mcp + plugin 1; e.g. 2.2.0:apps/docs/src/theme/GlobalStyles.tsx:8, 2.2.0:packages/cli/src/templates/templates.ts:110, 2.2.0:packages/cli/type-tests/init/src/theme/Providers.ts:4
- **Evidence:** `2.2.0:packages/design-system/src/engine/index.ts:1`, `HEAD:packages/react/src/engine/index.ts:5`

#### IMP-ENGINE - mechanical

- **From:** @soroush.tech/design-system/engine: `globalStyles`, `CacheProvider`, `styleCache`, `createCache`
- **To:** @gild-ui/react/engine (same path)
- **How:** Import rewrite of the specifier only. The names are kept but are the new engine's: `createCache` takes UmberStyle's options, `CacheProvider`/`styleCache` are used with `@umber-style/server` (STY-007, STY-008, STY-009).
- **2.2.0 fixtures:** 7 occurrence(s) in 6 file(s) - docs-app 4, cli init templates + type-test app 2, mcp + plugin 1; e.g. 2.2.0:apps/docs/src/common/Bootstrap.tsx:2, 2.2.0:apps/docs/src/renderer/+onRenderHtml.tsx:6, 2.2.0:apps/docs/src/theme/GlobalStyles.tsx:8
- **Evidence:** `2.2.0:packages/design-system/src/engine/index.ts:3`, `HEAD:packages/react/src/engine/index.ts:2`

#### IMP-UTILS - mechanical

- **From:** @soroush.tech/design-system/utils: `alpha`, `clamp`, `luminance`, `generateBoxShadow`
- **To:** @gild-ui/core/utils
- **How:** Import rewrite per name. NOTE `alpha` here is the hex helper, kept; the styling system's own `alpha` (`color-mix`, from `@gild-ui/react`) is the one to use inside styles (STY-012).
- **2.2.0 fixtures:** 9 occurrence(s) in 7 file(s) - docs-app 6, mcp + plugin 3; e.g. 2.2.0:apps/docs/src/common/ComponentHero/ComponentHero.tsx:3, 2.2.0:apps/docs/src/common/Footer/Footer.tsx:7, 2.2.0:apps/docs/src/common/OnThisPage/OnThisPage.tsx:3
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:704`, `HEAD:packages/core/src/utils/index.ts:1`

#### IMP-TESTING - mechanical

- **From:** @soroush.tech/design-system/testing: `installPopover`
- **To:** @gild-ui/react/testing
- **How:** Import rewrite.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:644`, `HEAD:packages/react/package.json:95`

#### IMP-CATALOG - mechanical

- **From:** @soroush.tech/design-system/catalog (`catalog` + 9 types)
- **To:** @gild-ui/react/catalog (the platform-neutral data is also at @gild-ui/core/catalog)
- **How:** Import rewrite. Entries gain `slots` and `ownerState`; each entry's `module` value reads `@gild-ui/react/<subpath>` (was `@soroush.tech/design-system/<folder>`): a tool that compares or prints it sees the new package name.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:624`, `HEAD:packages/react/src/catalog/index.ts:11`

#### IMP-MD - mechanical

- **From:** @soroush.tech/markdown (root) and /CodeBlock /Control /Editor /LiveEdit /Mermaid /Preview /Toolbar
- **To:** @gild-ui/react-markdown (same subpaths)
- **How:** Import rewrite of the specifier. All 12 values and 13 types of the root and every subpath are kept (props of its 15 components identical, props-diff.json). The `peerDependencies` entry `@soroush.tech/design-system ^1.3.3 || ^2.0.0` becomes `@gild-ui/react` (DEP-003).
- **2.2.0 fixtures:** 12 occurrence(s) in 12 file(s) - docs-app 4, story-demo 8; e.g. 2.2.0:apps/docs/src/common/Readme/Readme.tsx:2, 2.2.0:apps/docs/src/common/ReleaseNotes/ReleaseNotes.tsx:2, 2.2.0:apps/docs/src/mdx/mdxComponents.tsx:16
- **Evidence:** `npm @soroush.tech/markdown@1.3.0:package.json:42`, `HEAD:packages/react-markdown/package.json:33`

#### IMP-MD-CONTEXT - mechanical

- **From:** @soroush.tech/markdown/MarkdownContext (reachable only through the `./*` wildcard of 1.3.0)
- **To:** @gild-ui/react-markdown (root: `MarkdownContext`, `useMarkdownContext`)
- **How:** Import rewrite to the root: the new package lists its entries and has no wildcard, so there is no `/MarkdownContext` path.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `npm @soroush.tech/markdown@1.3.0:package.json:42`, `HEAD:packages/react-markdown/package.json:31`

#### IMP-HOOKS - mechanical

- **From:** @soroush.tech/hooks/useCopyToClipboard (private workspace package of 2.2.0, never on npm)
- **To:** @gild-ui/hooks/useCopyToClipboard (also /useControlled, /useDebounce, /useDebouncedCallback, /useEventCallback, /useMergedRefs)
- **How:** Import rewrite; only apps inside the old monorepo ever imported it. `useCopyToClipboard`, `COPIED_RESET_MS`, `UseCopyToClipboardResult` are unchanged.
- **2.2.0 fixtures:** 2 occurrence(s) in 2 file(s) - story-demo 1, markdown package 1; e.g. 2.2.0:packages/story-demo/src/StoryDemo/StoryDemo.tsx:5, 2.2.0:packages/markdown/src/CodeBlock/CodeBlock.tsx:6
- **Evidence:** `2.2.0:packages/hooks/package.json:2`, `HEAD:packages/react-hooks/package.json:32`

#### IMP-UNTESTED-PATHS - mechanical

- **From:** @soroush.tech/design-system/utils/test/{renderWithTheme,storiesArgs,storiesOptions,storiesToggle} (in the source `exports` of 2.2.0, not in the published ones)
- **To:** @gild-ui/react/utils/test/... (same relative paths, still source-only helpers)
- **How:** Import rewrite for monorepo consumers (docs app, markdown, story-demo, lab); npm consumers of 2.2.0 could not import them.
- **2.2.0 fixtures:** 11 occurrence(s) in 10 file(s) - docs-app 2, lab 1, story-demo 1, markdown package 7; e.g. 2.2.0:apps/docs/src/demos/scope.ts:4, 2.2.0:apps/docs/src/demos/scope.ts:6, 2.2.0:packages/lab/src/Chip/Chip.test.tsx:3
- **Evidence:** `2.2.0:packages/design-system/package.json:103`, `HEAD:packages/react/package.json:97`

#### IMP-DYNAMIC - manual

- **From:** a specifier assembled at run time (`import('@soroush.tech/design-system/' + name)`, a template literal, `importSubpathOf(item)`)
- **To:** the same string with the new package
- **How:** The step reports each file and line: a rewrite cannot know the value. The user changes the prefix (and checks the name exists: every component folder name is unchanged).
- **2.2.0 fixtures:** 1 occurrence(s) in 1 file(s) - docs-app 1; e.g. 2.2.0:apps/docs/src/pages/design-system/api/@name/+Page.tsx:27
- **Evidence:** `2.2.0:apps/docs/src/pages/design-system/api/@name/+Page.tsx:5`

#### IMP-EMOTION - manual

- **From:** imports of `@emotion/react`, `@emotion/styled`, `@emotion/cache`, `@emotion/css`, `@emotion/server` in the app's own code
- **To:** no equivalent import; use the styling system of `@gild-ui/react` (styled, css, keyframes, Global, useStyle) and, for server extraction, `@umber-style/server`
- **How:** The step reports each import with file and line and names the replacement from STY-014 (`css`/`keyframes`/`Global`/`useTheme`/`ThemeProvider` have equivalents; `jsx`, `ClassNames`, `Interpolation`, `SerializedStyles` do not). 2.2.0 pulled `@emotion/react` and `@emotion/styled` in as dependencies, so apps imported them without declaring them.
- **2.2.0 fixtures:** 9 occurrence(s) in 7 file(s) - docs-app 3, story-demo 5, mcp + plugin 1; e.g. 2.2.0:apps/docs/src/demos/scope.ts:2, 2.2.0:apps/docs/src/renderer/+onRenderHtml.test.tsx:20, 2.2.0:apps/docs/src/renderer/+onRenderHtml.tsx:3
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:731`

### exports

#### EXP-001 - manual

- **From:** `ThemeCustomizationOptions` (type, root)
- **To:** removed (not exported)
- **How:** Report file:line. The options object of `styled(tag, { name, slot, systemProps, overridesResolver })` has the same fields; type it with `Parameters<typeof styled>[1]` or drop the annotation.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/style/styled.ts:20`, `HEAD:packages/react/src/style/styled.ts:27`

#### EXP-002 - manual

- **From:** `ComponentStyle<OwnerState>`, `ComponentVariant<OwnerState>` (types, /theme)
- **To:** removed (declared in the package, not exported)
- **How:** Report file:line. Replace with `ThemeComponents` (`@gild-ui/react`) and `satisfies ThemeComponents` for a whole `components` object, or the per-component `<Name>ThemeConfig` from the component's entry.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/theme/themes.ts:405`, `HEAD:packages/react/src/theme/themes.ts:22`

#### EXP-003 - manual

- **From:** `CardSlotIconProps`, `CardSlotTypographyProps` (types, /theme)
- **To:** removed
- **How:** Report file:line. Use `ComponentProps<typeof Icon>` / `TypographyProps` (`@gild-ui/react/Typography`).
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/theme/themes.ts:742`

#### EXP-004 - manual

- **From:** `TabsVariants` (augmentable interface, /theme)
- **To:** removed: a Tabs look is now declared by the registered theme (`components.Tabs.variants`); `TabsVariant` (`@gild-ui/react/Tabs`) is the resulting union
- **How:** Report every `declare module '@soroush.tech/design-system/theme' { interface TabsVariants { ... } }` block and import of `TabsVariants`. The user moves each custom look to a `components.Tabs.variants` entry in `defineThemes` and registers the themes (THM-006). `ButtonVariants` stays an augmentable interface at `@gild-ui/core/theme`.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/theme/themes.ts:660`, `HEAD:packages/react/src/Tabs/Tabs/Tabs.types.ts:16`, `HEAD:packages/core/src/theme/types.ts:412`

### components

#### CMP-001 - manual

- **From:** withTheme(Component): `withTheme<P>(C: ComponentType<P & { theme: Theme }>)` returning a component that takes `P`
- **To:** `withTheme<P extends { theme: AppTheme }>(C: ComponentType<P>)` returning a component that takes `Omit<P, 'theme'>`
- **How:** Runtime unchanged (hands the theme as the `theme` prop). The step reports each `withTheme(` call: a class component whose props type did not declare `theme` must declare `theme: Theme` (`useTheme()`'s type) now. Type-level only.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/theme/hoc/withTheme.tsx:5`, `HEAD:packages/react/src/theme/hoc/withTheme.tsx:8`

#### CMP-002 - manual

- **From:** `useTheme()` and `styled` callbacks typed with the package `Theme` (with `components?`)
- **To:** typed `AppTheme`: the theme registered with `Register`, else the package `Theme` (core `Theme` + `components`)
- **How:** Type-level. Code that reads only built-in keys compiles unchanged; code reading keys it added by `declare module` augmentation compiles unchanged too (augmentation of `@gild-ui/core/theme` is kept: THM-004). Report only on compile errors.
- **Evidence:** `2.2.0:packages/design-system/src/theme/hooks/useTheme.ts:8`, `HEAD:packages/react/src/theme/hooks/useTheme.ts:8`

#### CMP-003 - manual

- **From:** `TypographyVariantStyle.element: ElementType` (theme.typography[variant].element)
- **To:** `element: string`
- **How:** Type-level: a theme that sets `typography.<variant>.element` to a component (not a tag name) no longer type-checks. Report the `createTheme` call with an `element:` that is not a string literal.
- **Evidence:** `2.2.0:packages/design-system/src/theme/themes.ts:321`, `HEAD:packages/core/src/theme/types.ts:328`

#### CMP-004 - manual

- **From:** `useDefaultProps(name)` return type `NonNullable<ThemeComponents[N]["defaultProps"]>`
- **To:** `Partial<NonNullable<ThemeComponents[N]["$owner"]>>`
- **How:** Type-level only; same runtime (`theme.components[name].defaultProps ?? {}`). Report on compile errors.
- **Evidence:** `2.2.0:packages/design-system/src/theme/hooks/useDefaultProps.ts:4`, `HEAD:packages/react/src/theme/hooks/useDefaultProps.ts:4`

#### CMP-005 - manual

- **From:** `<Tooltip slotProps={{ arrow: { style: { top|right|bottom|left } } }}>`
- **To:** those four keys of `slotProps.arrow.style` are dropped (the arrow's place is the tooltip's)
- **How:** Behaviour change visible in the source: the arrow's own `style` no longer merges position keys. The step searches `slotProps` objects with `arrow` and `style` and reports them; the user moves the offset to `styleOverrides.arrow` or removes it.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/Tooltip/Tooltip.tsx:459`, `HEAD:packages/react/src/Tooltip/Tooltip.tsx:259`

#### CMP-006 - manual (report-only)

- **From:** style props order on View-based components: `systemProps: [space, layout, colorSystem, typography, border, ...]` (View, Table, TableCell, TableRow, ...)
- **To:** `[space, layout, typography, border, colorSystem, ...]`
- **How:** Report-only: when two style props write the same CSS property on one element (e.g. `bg` and `background`, `color` and `typography`), the later group wins, and the groups swapped places. Not detectable in user code with certainty; listed so a visual check is done.
- **Evidence:** `2.2.0:packages/design-system/src/View/View.tsx:84`, `HEAD:packages/react/src/View/View.tsx:83`

### theme

#### THM-001 - manual

- **From:** `createTheme(baseTheme, { ..., components: { Button: { styleOverrides, variants, defaultProps } } })`
- **To:** `createTheme` takes tokens only; the components are the second argument of `defineThemes({ light, dark }, components)` and are shared by every theme
- **How:** The step reports each `createTheme` call with a `components` key (file:line) - a type error in the new package (`ThemeOverrides` types `components` as a message). The user pulls the `components` object out, passes it once to `defineThemes`, and imports the themes from its result. A single-theme app: `defineThemes({ light }, components)`. Checking: `components satisfies ThemeComponents`.
- **2.2.0 fixtures:** 5 occurrence(s) in 3 file(s) - docs-app 2, mcp + plugin 2, markdown package 1; e.g. 2.2.0:apps/docs/src/theme/themes.ts:40, 2.2.0:apps/docs/src/theme/themes.ts:143, 2.2.0:plugins/soroush-design-system/skills/soroush-design-system/references/theme.ts:124
- **Evidence:** `2.2.0:packages/design-system/docs/consumer/theme.ts:131`, `HEAD:packages/core/src/theme/createTheme.ts:33`, `HEAD:packages/core/src/theme/defineThemes.ts:82`

#### THM-002 - mechanical

- **From:** `Theme['components']` / `Theme` with `components` (the root `Theme` type)
- **To:** `@gild-ui/core/theme` `Theme` has no `components`; the typing is `ThemeComponents` (`@gild-ui/react`)
- **How:** Rewrite of the exact text `Theme['components']` -> `ThemeComponents` (import added from `@gild-ui/react`); any other use of `.components` on a `Theme`-typed value is reported (type error: use `useTheme()`'s type, which has it).
- **2.2.0 fixtures:** 1 occurrence(s) in 1 file(s) - mcp + plugin 1; e.g. 2.2.0:plugins/soroush-design-system/skills/soroush-design-system/references/theme.ts:105
- **Evidence:** `2.2.0:packages/design-system/docs/consumer/theme.ts:105`, `HEAD:packages/react/src/theme/themes.ts:69`

#### THM-003 - manual

- **From:** `const light: Theme = createTheme(baseTheme, {...})`
- **To:** no annotation (it erases the keys the theme adds, and makes the registration below useless)
- **How:** Only matters when THM-006 is adopted: the guide says not to annotate a theme with `Theme`. The step reports annotated `createTheme` results; removing the annotation is safe but changes inferred types, so the user confirms.
- **2.2.0 fixtures:** 4 occurrence(s) in 2 file(s) - docs-app 2, mcp + plugin 2; e.g. 2.2.0:apps/docs/src/theme/themes.ts:40, 2.2.0:apps/docs/src/theme/themes.ts:143, 2.2.0:plugins/soroush-design-system/skills/soroush-design-system/references/theme.ts:124
- **Evidence:** `2.2.0:packages/design-system/docs/consumer/theme.ts:124`, `HEAD:packages/react/docs/theming.md:113`

#### THM-004 - mechanical

- **From:** `declare module '@soroush.tech/design-system/theme' { interface ThemePalette | ThemeBackground | ThemeSizes | ThemeSpace | BreakpointOverrides | ButtonVariants | Theme ... }`
- **To:** `declare module '@gild-ui/core/theme' { ... }` (same interfaces)
- **How:** Rewrite of the module specifier string of every `declare module` block, plus the matching `import type { PaletteEntry } from ...`. Every augmentable interface of the old module is exported by the new one except `TabsVariants` (EXP-004). `interface Theme { components?: ... }` blocks are reported (THM-005).
- **2.2.0 fixtures:** 5 occurrence(s) in 5 file(s) - cli init templates + type-test app 3, markdown package 2; e.g. 2.2.0:packages/cli/src/templates/templates.test.ts:22, 2.2.0:packages/cli/src/templates/templates.ts:15, 2.2.0:packages/cli/type-tests/init/src/theme/themes.ts:9
- **Evidence:** `2.2.0:packages/design-system/docs/theming.md:63`, `HEAD:packages/react/docs/theming.md:86`, `2.2.0:packages/cli/src/templates/templates.ts:15`

#### THM-005 - manual

- **From:** augmentation of `Theme` with a `components` key, or of the `ThemeComponents` interface
- **To:** no module to augment: each component's `<Name>ThemeConfig` is generated into `ThemeComponents`; the app's own looks are typed by the registered themes
- **How:** Report the block; the user deletes it and registers the themes (THM-006).
- **2.2.0 fixtures:** 9 occurrence(s) in 3 file(s) - markdown package 9; e.g. 2.2.0:packages/markdown/src/index.ts:38, 2.2.0:packages/markdown/src/index.ts:44, 2.2.0:packages/markdown/src/themeComponents.spec.tsx:5
- **Evidence:** `HEAD:packages/react/release-notes/0.1.0.md:72`, `2.2.0:packages/markdown/src/index.ts:42`

#### THM-006 - manual

- **From:** (2.2.0 types: augmentation only, e.g. `interface ThemePalette { brand: PaletteEntry }` plus a matching override)
- **To:** `export const themes = defineThemes({ light, dark }, components)` + `declare module '@gild-ui/core/theme' { interface Register { themes: typeof themes } }`
- **How:** New capability, optional but the way the typed props (`color="brand"`, `variant="pill"`) are produced now. The step cannot write it for the user (it needs the app's themes); it reports the app's `createTheme` modules and prints the 3-line recipe. Without it components accept the built-in values only, and augmentation blocks (THM-004) keep working.
- **Evidence:** `HEAD:packages/core/src/theme/register.ts:21`, `HEAD:packages/react/docs/theming.md:65`

#### THM-007 - manual

- **From:** (none) - `ThemeProvider` was the only place a theme was read, on server and client alike
- **To:** `registerBaseTheme(theme)` (`@gild-ui/react/ThemeProvider`), called once in the module that defines the themes, so server components read the app's `components`, `defaults` and tokens
- **How:** Only for server-rendered apps with server components (Next App Router): report and print the recipe from the setup guide (`registerBaseTheme(light)` as the last line of the theme module, `providers.tsx` that imports it, `ThemeProvider` in the root layout). Client-only apps need nothing.
- **Evidence:** `HEAD:packages/react/src/theme/registerBaseTheme.ts:16`, `HEAD:packages/react/docs/consumer/setup.md:32`

#### THM-008 - manual

- **From:** `createTheme(base, overrides)` accepts any DeepPartial<Theme>
- **To:** same runtime merge; types: a scale in `palette|sizes|background|text|border|radii|fonts|space` accepts new keys only as whole entries, and `components` is rejected
- **How:** Report compile errors only (a partial `palette.brand`, for instance). Runtime merge rules are unchanged: objects recurse, arrays and functions replace, `undefined` is ignored.
- **Evidence:** `2.2.0:packages/design-system/src/theme/utils/createTheme.ts:47`, `HEAD:packages/core/src/theme/createTheme.ts:23`

#### THM-009 - manual

- **From:** `<ThemeProvider theme={x}>` accepts any `Theme`
- **To:** once themes are registered, a `theme` object with a key the registered themes lack is a type error (`Exact<T, AppTheme>`)
- **How:** Type-level, only after THM-006. Report compile errors.
- **Evidence:** `HEAD:packages/react/src/theme/ThemeProvider.tsx:13`

#### THM-010 - manual

- **From:** `theme.components.X.styleOverrides.slot({ theme, ownerState })` where `theme` is the full registered theme
- **To:** `theme` in a `components` callback is the built-in `Theme`, not the registered one
- **How:** Type-level: a callback reading a custom token (`theme.palette.brand`) needs a cast or `useTheme()`. Report compile errors.
- **Evidence:** `HEAD:packages/react/docs/theming.md:112`

#### THM-011 - manual

- **From:** theme values in style functions are the literal values (`theme.palette.primary.main` is `#006e17`, `theme.space[2]` a length)
- **To:** inside style FUNCTIONS (`styled` callbacks, `Global` styles functions, `components` `styleOverrides`/`variants` callbacks, `systemProps`) the `theme` is a view whose tokens are CSS variable references (`var(--soroush-palette-primary-main)`); `useTheme()` and `useStyle`'s `getStyles(theme)` still give the real values; `breakpoints`, `components`, `defaults`, `transitions`, `sizes`, `typography`, `layout` are real values in both
- **How:** See STY-012 (the same item seen from the theme side): string concatenation and arithmetic on tokens inside style functions.
- **2.2.0 fixtures:** 2 occurrence(s) in 2 file(s) - docs-app 2; e.g. 2.2.0:apps/docs/src/common/Footer/Footer.tsx:34, 2.2.0:apps/docs/src/common/Search/SearchDialog.tsx:44
- **Evidence:** `HEAD:packages/react/src/style/engine.ts:19`, `HEAD:packages/react/docs/style.md:40`, `HEAD:packages/react/src/theme/hooks/useTheme.ts:8`

### styling

#### STY-001 - manual

- **From:** `styled(tag, { name, slot, systemProps, overridesResolver, shouldForwardProp, label, target })`, `styled.div<P>(...)`, template literals
- **To:** same call forms from `@gild-ui/react`, on the new engine
- **How:** Mostly source-compatible (the file diff of `style/styled.ts` is the engine swap only). The step reports uses of Emotion-only members: `.withComponent(`, `@emotion/babel-plugin`/macro, `label:` used to build selectors, and props functions that return `css` results. Component selectors (`${Other}`) are supported (the styled component is a selector as text).
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/style/styled.ts:1`, `HEAD:packages/react/src/style/styled.ts:1`

#### STY-002 - manual

- **From:** `css` from the root (Emotion's: `css`...`` with function interpolations, SerializedStyles used in `styled`, the `css` prop)
- **To:** `css` from `@gild-ui/react`: one style made once, from styles or a tagged template; "a function is a TypeError: there are no props"
- **How:** Report each `css` call/tagged template (file:line). Static ones keep working; any with `${(props) => ...}` or `${theme => ...}` must move into `styled` callbacks or `useStyle`.
- **2.2.0 fixtures:** 1 occurrence(s) in 1 file(s) - docs-app 1; e.g. 2.2.0:apps/docs/src/theme/GlobalStyles.tsx:10
- **Evidence:** `2.2.0:packages/design-system/src/index.ts:6`, `HEAD:packages/react/src/entries/css.ts:1`

#### STY-003 - manual

- **From:** `keyframes`...`` (Emotion: a template returning an object with `.name`, usable in `animation:` strings and `css`)
- **To:** `keyframes(steps | (theme) => steps | template)` returning the engine's `Keyframes`
- **How:** Template usage is supported; the step reports each call so the user checks that the value is used as `animation: ${spin} 1s`-style interpolation in `styled`/`css`, not read for `.name`.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/index.ts:6`, `HEAD:packages/react/src/entries/keyframes.ts:1`

#### STY-004 - manual

- **From:** `css` JSX prop (works in 2.2.0 only when the app sets `jsxImportSource: "@emotion/react"` or the Emotion Babel preset; one README example shows it)
- **To:** no `css` prop in the engine: use `styled`, `useStyle` or `css()` + `className`
- **How:** Report `css={...}` attributes, `/** @jsxImportSource @emotion/react */` pragmas and `jsxImportSource` in tsconfig/Babel/Vite config (remove it). Also: `packages/react/docs/style.md` still shows `<View css={styles}>` - see the question in the report.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/Paper/README.md:39`, `HEAD:packages/react/docs/style.md:26`, `HEAD:packages/react/src/Paper/README.md:41`

#### STY-005 - manual

- **From:** default DOM-prop filtering of Emotion's `styled` for tags (`@emotion/is-prop-valid`)
- **To:** the engine's own filter (`@umber-style/is-prop-valid`); `createShouldForwardProp([...props, ...])` from styled-system is unchanged
- **How:** Report `styled(` roots with custom props and no `shouldForwardProp`; verify no unknown attribute reaches the DOM (React warns in development). styled-system 6.0.2+ also dropped its peer `@emotion/is-prop-valid`.
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:732`, `HEAD:packages/react/package.json:944`

#### STY-006 - mechanical

- **From:** `useStyle`, `withStyles`, `StylesConsumer` and `Global` + `globalStyles`
- **To:** same API (`Global`'s `styles` is an object or `(theme) => object`; `<Global styles={globalStyles} />` unchanged); `Global` must be inside `ThemeProvider` as before
- **How:** Only the import changes (IMP-STYLE, IMP-ENGINE-GLOBAL, IMP-ENGINE). Nothing else to edit.
- **2.2.0 fixtures:** 2 occurrence(s) in 2 file(s) - docs-app 1, mcp + plugin 1; e.g. 2.2.0:apps/docs/src/theme/GlobalStyles.tsx:36, 2.2.0:plugins/soroush-design-system/skills/soroush-design-system/references/providers.tsx:52
- **Evidence:** `2.2.0:packages/design-system/src/theme/emotion.ts:20`, `HEAD:packages/react/docs/engine.md:3`

#### STY-011 - manual

- **From:** tests, CSS and e2e that select Emotion's output: `css-<hash>-<Label>` classes, `[class^="css-"]`, `style[data-emotion]`, helpers that read `data-emotion` ids
- **To:** classes `soroush-<hash>` (prefix = cache key); style elements `<style data-style="soroush">` (client), `<style data-precedence="soroush" data-href=...>` or `data-umber-registry` (server); tokens as `--soroush-<scale>-<key>` on `:root`
- **How:** Report matching selectors/strings (file:line). The user rewrites them to the new prefix or to roles/test ids.
- **2.2.0 fixtures:** 3 occurrence(s) in 2 file(s) - docs-app 2, mcp + plugin 1; e.g. 2.2.0:apps/docs/src/renderer/+onRenderHtml.test.tsx:6, 2.2.0:apps/docs/src/renderer/+onRenderHtml.test.tsx:28, 2.2.0:plugins/soroush-design-system/skills/soroush-design-system/references/providers.tsx:38
- **Evidence:** `2.2.0:packages/design-system/docs/consumer/providers.tsx:38`, `HEAD:packages/react/src/index.server.test.tsx:23`, `HEAD:packages/react/src/style/noValueRepair.spec.tsx:19`

#### STY-012 - manual

- **From:** string/number math on theme values inside style functions: `${theme.palette.primary.main}33` (hex alpha), `-${theme.space[2]}`, `${theme.fontSizes[2]}px`, `theme.space[2] * 2`
- **To:** the `theme` of a style function holds CSS variable references: use `alpha(color, 0.2)`, `negate(length)`, `subtract`, `useStyleValue` from `@gild-ui/react`; arithmetic on a reference is not valid CSS (`useTheme()` outside a style function still returns real values)
- **How:** The step greps template literals that glue a token to a hex pair, a unit or a minus, and arithmetic on `theme.space`/`fontSizes` (heuristic, so it reports; it does not edit). In 2.2.0 the library itself wrote `${main}1F`; 0.1.0 writes `alpha(main, 0.12)` (hex `1F` = 12.2%).
- **2.2.0 fixtures:** 2 occurrence(s) in 2 file(s) - docs-app 2; e.g. 2.2.0:apps/docs/src/common/Footer/Footer.tsx:34, 2.2.0:apps/docs/src/common/Search/SearchDialog.tsx:44
- **Evidence:** `2.2.0:packages/design-system/src/MenuItem/MenuItem.tsx:169`, `HEAD:packages/react/src/MenuItem/MenuItem.tsx:175`, `HEAD:packages/react/docs/style.md:40`, `HEAD:packages/react/src/style/engine.ts:19`

#### STY-013 - manual

- **From:** `CSSObject` of Emotion (`label`, any selector key, loose values)
- **To:** `CSSObject` = the engine's `WebStyleObject`: no `label`, selectors typed, values may be `AlphaColor`
- **How:** Type-level: report compile errors (e.g. `label` keys).
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/theme/themes.ts:3`, `HEAD:packages/react/src/theme/themes.ts:15`

#### STY-014 - manual

- **From:** direct use of Emotion APIs in the app: `jsx`, `ClassNames`, `Interpolation`, `SerializedStyles`, `useTheme`/`ThemeProvider`/`Global`/`css`/`keyframes` from `@emotion/react`, `styled` from `@emotion/styled`, `createCache`
- **To:** replacements: `styled`, `css`, `keyframes`, `Global`, `useTheme`, `ThemeProvider` from `@gild-ui/react`; `createCache`/`CacheProvider` from `@gild-ui/react/engine`; no equivalent for `jsx`/`ClassNames`/`SerializedStyles`
- **How:** Same detection as IMP-EMOTION; the step prints the replacement table per imported name.
- **2.2.0 fixtures:** 7 occurrence(s) in 5 file(s) - docs-app 1, story-demo 5, mcp + plugin 1; e.g. 2.2.0:apps/docs/src/demos/scope.ts:2, 2.2.0:packages/story-demo/src/utils/buildDemoModule.test.ts:134, 2.2.0:packages/story-demo/src/utils/buildDemoModule.test.ts:149
- **Evidence:** `2.2.0:packages/design-system/src/theme/emotion.ts:15`, `HEAD:packages/react/src/theme/engine.ts:21`

#### STY-015 - manual (report-only)

- **From:** every style is a class of one stylesheet, per-render values written as inline `style` in some components
- **To:** live values: `useStyleValue` writes one class and changes a CSS variable; the library no longer renders a `style` attribute for them (RangeInput thumbs, LinearProgress bar, Tooltip arrow)
- **How:** Report-only: code or tests asserting `style="left: 40%"` on those elements must assert the CSS variable / computed style instead.
- **Evidence:** `2.2.0:packages/design-system/src/RangeInput/RangeInput.tsx:488`, `HEAD:packages/react/src/RangeInput/RangeInput.tsx:337`, `2.2.0:packages/design-system/src/LinearProgress/LinearProgress.tsx:280`, `HEAD:packages/react/src/LinearProgress/LinearProgress.tsx:279`

### ssr

#### STY-007 - manual

- **From:** Next.js App Router setup of 2.2.0: `Providers` client component with an Emotion registry (`createCache({ key }) ; cache.compat = true ; useServerInsertedHTML`) wrapping `<CacheProvider value={cache}><ThemeProvider theme>`
- **To:** no registry ("no style registry is needed"): root layout is a server component, `ThemeProvider` from `@gild-ui/react/ThemeProvider`, `providers.tsx` only imports the theme module, which ends with `registerBaseTheme(light)`
- **How:** The step reports the registry hook (file:line of `useServerInsertedHTML`/`createCache`) and the `Providers` file, and prints the new setup guide (`packages/react/docs/consumer/setup.md`). Deleting the registry is not safe to automate: the file also holds the app's Global styles and layout wiring.
- **2.2.0 fixtures:** 21 occurrence(s) in 7 file(s) - docs-app 9, mcp + plugin 12; e.g. 2.2.0:apps/docs/src/common/Bootstrap.test.tsx:13, 2.2.0:apps/docs/src/common/Bootstrap.tsx:2, 2.2.0:apps/docs/src/common/Bootstrap.tsx:9
- **Evidence:** `2.2.0:packages/design-system/docs/consumer/providers.tsx:3`, `2.2.0:packages/design-system/docs/consumer/setup.md:34`, `HEAD:packages/react/docs/consumer/providers.tsx:3`, `HEAD:packages/react/docs/consumer/setup.md:32`

#### STY-008 - manual

- **From:** critical-CSS extraction with `@emotion/server` (`createEmotionServer(cache).extractCritical`/`createInstance`) over `styleCache`/`CacheProvider` from `/engine` (Vike docs app, Astro, SSG)
- **To:** `@umber-style/server`: render under `<CacheProvider value={styleCache}>` and extract with `createInstance(styleCache)`
- **How:** Report `@emotion/server` imports and `extractCritical*`/`renderStylesToString` calls; the new dependency `@umber-style/server` (^0.8.0) is added by the user (DEP-007).
- **2.2.0 fixtures:** 2 occurrence(s) in 2 file(s) - docs-app 2; e.g. 2.2.0:apps/docs/src/renderer/+onRenderHtml.test.tsx:20, 2.2.0:apps/docs/src/renderer/+onRenderHtml.tsx:3
- **Evidence:** `2.2.0:packages/design-system/src/engine/index.ts:3`, `2.2.0:apps/docs/src/renderer/+onRenderHtml.tsx:3`, `HEAD:packages/react/docs/engine.md:29`

#### STY-009 - manual

- **From:** `createCache({ key, nonce, speedy, container, prepend, stylisPlugins })` (Emotion) from `/engine`, with `cache.compat`, `cache.insert` patching
- **To:** `createCache` from `@umber-style/cache` (options `key`, `nonce`, `hasStyleMemo`, `hasColorFallbacks`, ...); the library's own `styleCache` has key `soroush`
- **How:** Report each `createCache(` call and any use of `cache.insert/inserted/compat/registered`. Most apps need none of it any more (STY-007). The library's cache also reads the page's script nonce itself, so a custom `nonce` option is usually deletable (STY-010).
- **2.2.0 fixtures:** 21 occurrence(s) in 7 file(s) - docs-app 9, mcp + plugin 12; e.g. 2.2.0:apps/docs/src/common/Bootstrap.test.tsx:13, 2.2.0:apps/docs/src/common/Bootstrap.tsx:2, 2.2.0:apps/docs/src/common/Bootstrap.tsx:9
- **Evidence:** `2.2.0:packages/design-system/src/engine/styleCache.ts:1`, `HEAD:packages/react/src/engine/styleCache.ts:22`, `2.2.0:packages/design-system/docs/consumer/providers.tsx:5`

#### STY-010 - manual

- **From:** CSP nonce: `createCache({ key, nonce })`
- **To:** the engine reads the page's `script[nonce]` property and puts it on its style element
- **How:** Report `nonce` options on `createCache`; remove them once the page's scripts carry the nonce.
- **Evidence:** `2.2.0:packages/design-system/docs/consumer/setup.md:41`, `HEAD:packages/react/src/engine/styleCache.ts:26`

### dependencies

#### DEP-001 - mechanical

- **From:** `@soroush.tech/design-system` `^2.2.0` in dependencies / devDependencies / peerDependencies
- **To:** `@gild-ui/react` `^0.1.0` and `@gild-ui/core` `^0.1.0` (core is needed by any app that imports `createTheme`, `baseTheme`, `defineThemes` or the `Theme` types)
- **How:** package.json edit in every workspace package that imports the old name (the step adds `@gild-ui/core` only when an import resolves to it); lockfile left to the user's package manager.
- **2.2.0 fixtures:** 7 occurrence(s) in 4 file(s) - docs-app 1, lab 2, story-demo 2, markdown package 2; e.g. 2.2.0:apps/docs/package.json, 2.2.0:packages/lab/package.json, 2.2.0:packages/story-demo/package.json
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:2`, `HEAD:packages/react/package.json:939`

#### DEP-002 - mechanical

- **From:** `@emotion/react`, `@emotion/styled`, `@emotion/cache`, `@emotion/css`, `@emotion/server` (direct dependencies of the app, or transitive through 2.2.0: `@emotion/cache`, `@emotion/react`, `@emotion/styled`)
- **To:** removed; the engine is `@umber-style/*` (a dependency of `@gild-ui/react`, not added by the app)
- **How:** package.json edit: remove each `@emotion/*` entry once no import of it remains (IMP-EMOTION/STY-014 must be empty, else the step reports and leaves it).
- **2.2.0 fixtures:** 3 occurrence(s) in 2 file(s) - docs-app 2, story-demo 1; e.g. 2.2.0:apps/docs/package.json, 2.2.0:packages/story-demo/package.json
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:730`, `HEAD:packages/react/package.json:942`

#### DEP-003 - mechanical

- **From:** `@soroush.tech/markdown` `^1.3.0` (peer: `@soroush.tech/design-system ^1.3.3 || ^2.0.0`, `react ^18 || ^19`)
- **To:** `@gild-ui/react-markdown` `^0.1.0` (peer: `@gild-ui/react`, `react ^19.2.8`, `react-dom ^19.2.8`)
- **How:** package.json edit (dependency name + version; peers of a library that wraps it).
- **2.2.0 fixtures:** 3 occurrence(s) in 2 file(s) - docs-app 1, story-demo 2; e.g. 2.2.0:apps/docs/package.json, 2.2.0:packages/story-demo/package.json
- **Evidence:** `npm @soroush.tech/markdown@1.3.0:package.json:68`, `HEAD:packages/react-markdown/package.json:159`

#### DEP-004 - mechanical

- **From:** `@soroush.tech/hooks` (private workspace package)
- **To:** `@gild-ui/hooks` `^0.1.0`
- **How:** package.json edit; workspace consumers only.
- **2.2.0 fixtures:** 4 occurrence(s) in 3 file(s) - docs-app 1, story-demo 2, markdown package 1; e.g. 2.2.0:apps/docs/package.json, 2.2.0:packages/story-demo/package.json, 2.2.0:packages/markdown/package.json
- **Evidence:** `2.2.0:packages/hooks/package.json:3`, `HEAD:packages/react-hooks/package.json:2`

#### DEP-005 - mechanical

- **From:** `@soroush.tech/styled-system` as a transitive dependency (`^6.0.1`), reached through the design system's root re-export
- **To:** a direct dependency `^6.0.3` of any app that imports style-prop functions or `should-forward-prop` (the new root re-exports nothing); styled-system 6.0.2+ replaced its `@emotion/is-prop-valid` peer with a dependency on `@umber-style/is-prop-valid`
- **How:** package.json edit, added when IMP-ROOT-SS or IMP-ROOT-SP rewrote an import.
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:4`, `HEAD:packages/react/package.json:941`

#### DEP-006 - manual

- **From:** peers `react ^18.0.0 || ^19.0.0`, `react-dom ^18.0.0 || ^19.0.0`
- **To:** peers `react ^19.2.8`, `react-dom ^19.2.8` (also core: none; hooks: `react ^19.2.8`)
- **How:** The step reads the app's `react` range and reports below 19.2.8; upgrading React is the user's change (then the version range in package.json is a mechanical edit).
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:7`, `HEAD:packages/react/package.json:947`

#### DEP-007 - manual

- **From:** (none) server-side style extraction used `@emotion/server`
- **To:** add `@umber-style/server` `^0.8.0` for extraction (non-Next SSR/SSG); Next App Router needs nothing
- **How:** Reported together with STY-008; the user adds it.
- **Evidence:** `HEAD:packages/react/docs/engine.md:29`

#### DEP-008 - manual

- **From:** the `design-system` command of the 2.2.0 package (`bin: { "design-system": "./dist/bin.mjs" }`, `npx @soroush.tech/design-system init`; and its dependency `@soroush.design/cli 0.1.0`)
- **To:** the package has no command and installs none; `npx @soroush.design/cli init` / `create` (bin `soroush-design`)
- **How:** Report package.json scripts and docs that call `design-system init`. Init-written files carry the marker `// Set up by @soroush.tech/design-system init.` (the step can find them by it) and use the old imports, so IMP-* and STY-007 apply to them.
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `npm @soroush.tech/design-system@2.2.0:package.json:30`, `2.2.0:packages/design-system/src/bin.ts:2`, `2.2.0:packages/cli/src/templates/templates.ts:2`, `HEAD:packages/react/release-notes/0.1.0.md:98`

#### DEP-009 - manual

- **From:** tsconfig/Babel/Vite settings for Emotion (`jsxImportSource: "@emotion/react"`, `@emotion/babel-plugin`, `@emotion/babel-preset-css-prop`)
- **To:** removed (a React 19 app with the standard `react-jsx` runtime)
- **How:** Report each config file and line (same detection as STY-004).
- **2.2.0 fixtures:** 0 occurrence(s) in 0 file(s)
- **Evidence:** `2.2.0:packages/design-system/src/Paper/README.md:39`

### output

#### OUT-001 - manual (report-only)

- **From:** class names `css-<hash>` (Emotion's default cache) or `<key>-<hash>` under a custom cache (`dc-` in the init starter)
- **To:** `soroush-<hash>` (+ the theme/scope classes `soroush-theme-*`, `soroush-scope`)
- **How:** Report-only: the step cannot edit a rendered result; it lists the files that assert on it. Same detection as STY-011.
- **2.2.0 fixtures:** 3 occurrence(s) in 2 file(s) - docs-app 2, mcp + plugin 1; e.g. 2.2.0:apps/docs/src/renderer/+onRenderHtml.test.tsx:6, 2.2.0:apps/docs/src/renderer/+onRenderHtml.test.tsx:28, 2.2.0:plugins/soroush-design-system/skills/soroush-design-system/references/providers.tsx:38
- **Evidence:** `HEAD:packages/react/src/index.server.test.tsx:23`, `HEAD:packages/react/src/style/configuredOnImport.test.tsx:43`

#### OUT-002 - manual (report-only)

- **From:** `<style data-emotion="css <ids>">` elements (inserted at runtime, or by the Next registry / `@emotion/server`)
- **To:** `<style data-style="soroush">` on the client; on the server `<style data-precedence="soroush" data-href="...">` (React 19 hoisting) or, from a `StyleRegistry`, `<style data-umber="soroush ..." data-umber-registry>`; the style element carries the page's nonce
- **How:** Report-only: the step cannot edit a rendered result; it lists the files that assert on it.
- **2.2.0 fixtures:** 3 occurrence(s) in 2 file(s) - docs-app 2, mcp + plugin 1; e.g. 2.2.0:apps/docs/src/renderer/+onRenderHtml.test.tsx:6, 2.2.0:apps/docs/src/renderer/+onRenderHtml.test.tsx:28, 2.2.0:plugins/soroush-design-system/skills/soroush-design-system/references/providers.tsx:38
- **Evidence:** `HEAD:packages/react/src/style/noValueRepair.spec.tsx:19`, `2.2.0:packages/design-system/docs/consumer/providers.tsx:38`

#### OUT-003 - manual (report-only)

- **From:** theme values inlined as literals in every rule (hex, rem), switching theme = new classes
- **To:** every token a CSS variable `--soroush-<scale>-<key>`, declared on `:root` by the outermost `ThemeProvider` (which renders no element); a theme switch rewrites that one rule
- **How:** Report-only: the step cannot edit a rendered result; it lists the files that assert on it.
- **Evidence:** `HEAD:packages/react/src/ButtonGroup/ButtonGroup.test.tsx:155`, `HEAD:packages/react/release-notes/0.1.0.md:80`

#### OUT-004 - manual (report-only)

- **From:** a nested `ThemeProvider` / `LayoutProvider` rendered no element
- **To:** a nested provider renders a wrapper (`div` by default) with the theme class and the scope class (`display: contents`); `LayoutProvider` is one of them
- **How:** Report-only: the step cannot edit a rendered result; it lists the files that assert on it. Selectors like `parent > child` across a nested provider, and `:nth-child` counts, can change.
- **Evidence:** `2.2.0:packages/design-system/src/theme/LayoutProvider.tsx:3`, `HEAD:packages/react/src/theme/LayoutProvider.tsx:4`

#### OUT-005 - manual (report-only)

- **From:** `Portal` children rendered as given
- **To:** `Portal` children are wrapped in `ThemeScope`, which re-renders the nested provider's wrapper around content moved to `document.body` (nothing under the outermost provider)
- **How:** Report-only: the step cannot edit a rendered result; it lists the files that assert on it.
- **Evidence:** `2.2.0:packages/design-system/src/Portal/Portal.tsx:2`, `HEAD:packages/react/src/Portal/Portal.tsx:3`

#### OUT-006 - manual (report-only)

- **From:** opacity as a hex suffix (`${main}1F`, `#RRGGBBAA`), computed in JS
- **To:** `alpha(color, opacity)` written as `color-mix(in srgb, <color> N%, transparent)`, no solid fallback
- **How:** Report-only: the step cannot edit a rendered result; it lists the files that assert on it. Colours of hovers, outlines and selected states in Tabs, Menu, MenuItem, NumberInput, Breadcrumbs, RangeInput match to the nearest percent; a browser without `color-mix()` drops the tint.
- **Evidence:** `2.2.0:packages/design-system/src/Tabs/Tab/Tab.tsx:344`, `HEAD:packages/react/src/Tabs/Tab/Tab.tsx:350`, `HEAD:packages/react/src/engine/styleCache.ts:10`

#### OUT-007 - manual (report-only)

- **From:** `theme.text.inherit` = `inherit` written as a CSS variable (took the parent's variable: nothing; only `color` worked, by inheritance)
- **To:** the engine writes the keyword itself (`modes: { 'text.inherit': 'raw' }`): `background-color: inherit` etc. now work
- **How:** Report-only: the step cannot edit a rendered result; it lists the files that assert on it.
- **Evidence:** `HEAD:packages/react/src/style/engine.ts:16`, `HEAD:packages/react/release-notes/0.1.0.md:91`

#### OUT-008 - manual (report-only)

- **From:** bundles without module directives
- **To:** `'use client'` is on the interactive components (162 source files under packages/react/src), the static ones have none, so a server component can import any of them
- **How:** Report-only: the step cannot edit a rendered result; it lists the files that assert on it. An app that imported a component into a server component and relied on it failing is not a case; a class component that extended a design-system component is.
- **Evidence:** `HEAD:packages/react/src/Tooltip/Tooltip.tsx:1`, `HEAD:packages/react/release-notes/0.1.0.md:99`

## 8. Sanity pass: what the 2.2.0 consumers touch

At the 2.2.0 tag the repository holds no "starters" as such: the CLI's `init` wrote files from `packages/cli/src/templates/templates.ts` (a themes module, a providers module; marker `// Set up by @soroush.tech/design-system init.`), and `packages/cli/type-tests/init` is the app that compiles them. The three starters (`astro`, `react-router`, `vike` under `packages/cli/templates`) exist only on HEAD, written against the new packages, so they are not fixtures for this step. Consumers scanned at the tag:

| Scope                                        | Files scanned | Imports from the 3 old packages (specifiers) | Import declarations touched |
| -------------------------------------------- | ------------: | -------------------------------------------: | --------------------------: |
| docs-app (apps/docs, code)                   |           282 |                                          154 |                         118 |
| docs content (md/mdx fences)                 |             2 |                                           10 |                           6 |
| cli init templates + type-test app           |             8 |                                           13 |                           9 |
| lab                                          |             9 |                                            4 |                           3 |
| story-demo                                   |            65 |                                          131 |                          60 |
| mcp + plugin                                 |            46 |                                          197 |                          23 |
| markdown package (consumer of design-system) |            62 |                                          108 |                          63 |
| hooks package                                |             6 |                                            0 |                           0 |

Occurrences per item (scope columns: docs-app / docs content / cli / lab / story-demo / mcp+plugin / markdown / hooks):

| Item               | Total | Files | By scope                                                             |
| ------------------ | ----: | ----: | -------------------------------------------------------------------- |
| IMP-COMP           |   196 |    59 | docs-app 94, docs 3, cli 1, lab 2, story-demo 29, mcp 7, markdown 60 |
| IMP-ROOT-SS        |     6 |     6 | docs-app 6                                                           |
| IMP-ROOT-SP        |     1 |     1 | docs-app 1                                                           |
| IMP-ROOT-STYLING   |    27 |    16 | docs-app 8, docs 2, lab 1, story-demo 1, mcp 9, markdown 6           |
| IMP-ROOT-TYPES     |     9 |     8 | docs-app 3, mcp 3, markdown 3                                        |
| IMP-THEME-CORE     |    43 |    23 | docs-app 2, docs 4, cli 6, story-demo 16, mcp 2, markdown 13         |
| IMP-THEME-REACT    |    32 |    31 | docs-app 9, docs 1, cli 2, story-demo 10, mcp 1, markdown 9          |
| IMP-ENGINE-GLOBAL  |     4 |     4 | docs-app 1, cli 2, mcp 1                                             |
| IMP-ENGINE         |     7 |     6 | docs-app 4, cli 2, mcp 1                                             |
| IMP-UTILS          |     9 |     7 | docs-app 6, mcp 3                                                    |
| IMP-MD             |    12 |    12 | docs-app 4, story-demo 8                                             |
| IMP-HOOKS          |     2 |     2 | story-demo 1, markdown 1                                             |
| IMP-UNTESTED-PATHS |    11 |    10 | docs-app 2, lab 1, story-demo 1, markdown 7                          |
| IMP-DYNAMIC        |     1 |     1 | docs-app 1                                                           |
| IMP-EMOTION        |     9 |     7 | docs-app 3, story-demo 5, mcp 1                                      |
| THM-001            |     5 |     3 | docs-app 2, mcp 2, markdown 1                                        |
| THM-002            |     1 |     1 | mcp 1                                                                |
| THM-003            |     4 |     2 | docs-app 2, mcp 2                                                    |
| THM-004            |     5 |     5 | cli 3, markdown 2                                                    |
| THM-005            |     9 |     3 | markdown 9                                                           |
| THM-011            |     2 |     2 | docs-app 2                                                           |
| STY-002            |     1 |     1 | docs-app 1                                                           |
| STY-006            |     2 |     2 | docs-app 1, mcp 1                                                    |
| STY-007            |    21 |     7 | docs-app 9, mcp 12                                                   |
| STY-008            |     2 |     2 | docs-app 2                                                           |
| STY-009            |    21 |     7 | docs-app 9, mcp 12                                                   |
| STY-011            |     3 |     2 | docs-app 2, mcp 1                                                    |
| STY-012            |     2 |     2 | docs-app 2                                                           |
| STY-014            |     7 |     5 | docs-app 1, story-demo 5, mcp 1                                      |
| DEP-001            |     7 |     4 | docs-app 1, lab 2, story-demo 2, markdown 2                          |
| DEP-002            |     3 |     2 | docs-app 2, story-demo 1                                             |
| DEP-003            |     3 |     2 | docs-app 1, story-demo 2                                             |
| DEP-004            |     4 |     3 | docs-app 1, story-demo 2, markdown 1                                 |
| OUT-001            |     3 |     2 | docs-app 2, mcp 1                                                    |
| OUT-002            |     3 |     2 | docs-app 2, mcp 1                                                    |

Items detectable by the scan with **no occurrence** in any fixture (so the step's tests need a synthetic fixture for them): IMP-THEME-OWNERSTATE, IMP-THEME-BREAKPOINTS, IMP-STYLE, IMP-TESTING, IMP-CATALOG, IMP-MD-CONTEXT, EXP-001, EXP-002, EXP-003, EXP-004, CMP-001, CMP-005, STY-001, STY-003, STY-004, STY-013, DEP-008, DEP-009. Items with no scan rule (type-level or not detectable in source): CMP-002, CMP-003, CMP-004, CMP-006, THM-006, THM-007, THM-008, THM-009, THM-010, STY-005, STY-010, STY-015, DEP-005, DEP-006, DEP-007, OUT-003, OUT-004, OUT-005, OUT-006, OUT-007, OUT-008.

Notable fixtures: `apps/docs/src/theme/themes.ts` (two `createTheme` calls with `components`, annotated `: Theme`), `apps/docs/src/renderer/+onRenderHtml.tsx` (+ test: `@emotion/server/create-instance`, `data-emotion`, `styleCache`), `apps/docs/src/theme/GlobalStyles.tsx` (`Global`, `css`), `apps/docs/src/common/Bootstrap.tsx` (`CacheProvider`), `packages/design-system/docs/consumer/providers.tsx` and `theme.ts` (the Next registry and the brand themes: also copied under `plugins/soroush-design-system/skills/.../references/`), `packages/markdown` (a library augmenting `ThemeComponents` and `Theme` with `declare module`), `packages/cli/src/templates/templates.ts` (the init output).

## 9. Method and limits

- Names and prop types come from the compiler over published declarations (old) and sources (new), with `@types/react`, `@umber-style/*` 0.8.0 and `@soroush.tech/styled-system` 6.0.3 resolved from the repo's store; "own" props are those declared in the package itself, so React/HTML attribute sets and style-prop sets are compared by name only (no difference found).
- Defaults come from the catalogs (declarative) and from parameter-destructuring initializers; a default computed elsewhere (`themeDefault(theme, key, fallback)`) is the same function on both sides.
- Behaviour is read from the diff of the component sources (imports and engine mechanics aside). Runtime/visual differences (pixel output) belong to the deferred measurement part and are not claimed here.
- The scan is lexical/AST on the tag's files, not a type-check; template-glue and arithmetic detections are heuristics.
