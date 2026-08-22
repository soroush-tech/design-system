---
description: How this repo runs tests and coverage - the test tiers and their placement, design-system's vitest projects (unit/browser/storybook), the recursive and per-package coverage commands, where coverage output lands (packages/<pkg>/coverage/lcov.info), and how 100% is enforced. Use when running tests or coverage, checking per-file coverage, or verifying 100% on touched files.
---

## Test tiers (all co-located next to source)

| Tier        | File suffix            | Runner            | Notes                                               |
| ----------- | ---------------------- | ----------------- | --------------------------------------------------- |
| Unit        | `*.test.ts(x)`         | vitest            | jsdom; wrap renders in `renderWithTheme`            |
| Integration | `*.spec.ts(x)`         | vitest            | same `unit` project as unit tests                   |
| Browser     | `*.browser.test.ts(x)` | vitest (Chromium) | only for code jsdom can't run (real layout/pointer) |

## Vitest projects

Only **design-system** splits into projects (`packages/design-system/vitest.config.ts`):

- `unit` - jsdom, runs `**/*.{test,spec}.*` (excludes `*.browser.test.*`)
- `browser` - headless Chromium (Playwright provider), runs only `*.browser.test.*`
- `storybook` - runs `*.stories.tsx` via the Storybook addon

Scope a run with `--project=unit` (etc.) and pass path filters:
`pnpm --filter @soroush.tech/design-system exec vitest run --project=unit src/Button`.
The other packages have a single flat vitest config.

## Commands

| Command                                           | Runs                                      |
| ------------------------------------------------- | ----------------------------------------- |
| `pnpm test`                                       | every package, recursively                |
| `pnpm test:coverage`                              | the same, with coverage - **CI's run**    |
| `pnpm --filter @soroush.tech/<pkg> test:coverage` | one package                               |
| `pnpm --filter ... run --if-present test:types`   | d.ts check of the built dist (CI runs it) |

## Where coverage output lands

Each package writes to its **own** `packages/<pkg>/coverage/` (reporters: `text` + `lcov`):

- `packages/<pkg>/coverage/lcov.info` - the file CI uploads to Codecov under the package's flag
  (after prefixing `SF:` paths with the package directory - see the `ci-cd` skill).
- The `text` reporter prints the summary to stdout - no file. `coverage/` is gitignored.

## The 100% gate

**Every package must hold 100% coverage** (CLAUDE/AGENTS guideline 6 and packages.md). It is
enforced where the tests run: each package's `vitest.config` sets coverage
`thresholds: { 100: true }`, so `pnpm test:coverage` exits non-zero below 100% - CI and the
pre-commit hook both inherit the gate from that. Codecov is reporting only. No
v8/c8/istanbul ignore pragmas - reach 100% with real tests or by removing dead code.
