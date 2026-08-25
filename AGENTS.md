# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Behavioral guidelines

### 1. Think before coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.

### 2. Propose before implementing

**Always present a plan and wait for confirmation before writing code.**

Cover: which files change, what changes in each, why. Then wait for explicit approval.

Exception: self-evident one-liners (typo fix, missing import).

### 3. Simplicity first

**Minimum code that solves the problem. Nothing speculative.**

- No features, abstractions, or error handling beyond what was asked.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 4. Surgical changes

**Touch only what you must. Clean up only your own mess.**

- Don't refactor, reformat, or "improve" adjacent code.
- Remove imports/variables/functions that YOUR changes made unused.
- Match existing style.
- If you notice unrelated dead code, mention it - don't delete it.

### 5. Goal-driven execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals: "Fix the bug" → "Write a test that reproduces it, then make it pass."

- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

### 6. Test coverage after implementation

**After any implementation, run `pnpm test:coverage` and verify 100% on all touched files.**

## Critical conventions

- **Design-system imports:** Consumers - `@soroush.tech/markdown` included - import UI primitives from the subpath `@soroush.tech/design-system/X` (barrel `@soroush.tech/design-system` for `styled`, `css`, `Theme`, etc.).
- **Theme tokens:** The design-system ships a single hex-inlined `baseTheme` - the **only** place hex values are allowed in the package - for its tests, stories, and npm consumers. Everything else styles through theme tokens; consumers build brand themes with `createTheme(baseTheme, ...)`.
- **SSR guard:** Never import browser-only APIs at module top level - guard with `typeof window !== 'undefined'` or move into effects. These packages are consumed by SSR apps.
- **Styled-system:** Use `Flex`, `View`, `Typography` from `@soroush.tech/design-system` over raw `div`/`p` for layout.
- **Test placement:** Co-located next to source. Unit → `*.test.ts(x)` (vitest). Integration → `*.spec.ts(x)` (vitest). Real-browser tier → `*.browser.test.ts(x)` (vitest + Chromium, only for what jsdom can't run).
- **Lint:** `pnpm lint` runs `oxlint --deny-warnings` - any warning fails. Formatting is not
  linted; `oxfmt` owns it, via `pnpm format` and the `format:check` gate in CI.
- **Packages:** Everything under `packages/` is a scoped `@soroush.tech/*` workspace package. `packages/packages.md` is the **standard** for packages - read it first, and follow it when creating or changing any package (structure, exports, publishing, registration chores). Every package must have **100% test coverage**, and any publishable (non-`private`) package must declare a license and ship a `LICENSE` file.
- **Issue artifacts:** Any epic, task, RFC, bug report, user story, feature request, or documentation-feedback item you draft - whether as a `docs/` file or for GitHub - must follow the matching template in `.github/ISSUE_TEMPLATE/` (`4.epic.yml`, `6.task.yml`, `3.rfc.yml`, `1.bug_report.yml`, `5.user_story.yml`, `2.feature_request.yml`, `7.documentation_feedback.yml`). Use that template's exact section headings, order, and title prefix (e.g. `[Epic]`, `[Task]`). Read the template before drafting.

## Layer conventions

Read the relevant doc before working in that area:

| Layer                 | Convention doc                            | What it covers                                                                                                           |
| --------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Design system         | `packages/design-system/design-system.md` | Styled components, `system()`, `shouldForwardProp`, Storybook argTypes, token rules                                      |
| Markdown package      | `packages/markdown/markdown.md`           | Companion component library - **follows design-system.md verbatim** + packages.md; theme-slot augmentation, lazy mermaid |
| Theming/customization | `packages/design-system/docs/`            | `theming.md` (createTheme, defaults, augmentation) · `customization.md` (`theme.components`)                             |
| Packages              | `packages/packages.md`                    | Workspace packages: structure, default-export, tsdown + `publishConfig` publishing, 100% coverage, licensing             |
| Docs app              | `apps/docs/docs-app.md`                   | The docs.soroush.design Vike SSG app: content pipeline, demos, versioned sections, e2e-only pages                        |
| AI surface            | `packages/mcp/mcp.md`                     | The MCP server, llms.txt, and the Claude Code plugin: what they serve, and the generated files that must not drift       |

## Quick checklist before pushing

1. `pnpm lint`
2. `pnpm test:coverage` - verify 100% on all touched files
3. `pnpm build`
