---
name: migrations
description: How to write a `migrate` step of the command line (packages/cli/src/migrate/steps/gild-ui-<version>/) - the MigrationStep interface and registry, data files, the parser-and-range-edits approach of source.ts, mechanical edits versus report items, report ids and messages, fixtures with UPDATE_FIXTURES=1, the second-run no-op test, type-checking an after - and the release rule that a breaking release of the Gild UI family ships its step, enforced by `pnpm check:migrations`. Use when preparing a breaking release (a major bump, or a minor bump below 1.0.0) or writing or changing a migration step.
paths: packages/cli/src/migrate/**
metadata:
  internal: true
---

# Migration steps

`npx @soroush.design/cli migrate` moves an app from the version it is on to the latest, one step
after another. The runner, the detection and the rules it keeps are in
[`packages/cli/cli.md`](../../../packages/cli/cli.md) (the Migrate section); this skill is how to
write a step and when one is required. The model of a large step is
`packages/cli/src/migrate/steps/gild-ui-0.1.0/` and its `README.md`.

## The rule

A **breaking** release of the Gild UI family ships a `migrate` step named `gild-ui-<version>`
that ends on it, with fixtures. **The CLI is released with it**: `@soroush.design/cli` is not in
the lockstep set, so it has a version and release notes of its own, and an app only gets the
step when that release is on npm.

Breaking, for the check, compares the family's shared version (the `lockstep` set) with npm's
`latest` of `@gild-ui/react`:

| Release                                       | Breaking?                                                    |
| --------------------------------------------- | ------------------------------------------------------------ |
| Major grows (`1.4.0` -> `2.0.0`)              | yes                                                          |
| Below 1.0.0, minor grows (`0.1.x` -> `0.2.0`) | yes                                                          |
| Patch, or a minor from 1.0.0 on               | no                                                           |
| First release (nothing on npm)                | yes, for apps on `@soroush.tech/design-system` 2.x (`0.1.0`) |

`pnpm check:migrations` (`scripts/check-migrations.mjs`, logic and tests in
`packages/contract/src/migrations.ts`; the pre-commit hook and the CI lint job run it) fails a
breaking version that lacks, and names exactly what is missing:

1. `steps/gild-ui-<version>/index.ts`, whose `to.version` is `<version>`;
2. its registration in `steps/index.ts` (an import of `./gild-ui-<version>`);
3. a fixture: `fixtures/<name>/` with `before/`, `after/` and `reports.json`;
4. in `packages/react/release-notes/<version>.md`, a Breaking section (a heading with
   "Breaking", as `### BREAKING CHANGES` in the [`release-notes`](../release-notes/SKILL.md)
   skill) in which **every bullet says `migrate` (the step handles it) or `by hand` (what to
   do)**. The check is text only: it looks for those words in each bullet, wrapped lines
   included. The first release (`0.1.0`) has nothing to break inside Gild UI, so the notes are
   exempt; items 1 to 3 still apply to it.

Offline, the check warns and passes, as `check:release-notes` does. Non-breaking bumps pass
without a step.

## Writing a step

1. **The folder and the interface.** `steps/gild-ui-<version>/index.ts` exports
   `step: MigrationStep` (`src/migrate/step.ts`): `{ id, from: { package, range }, to: { package, version }, summary, plan(app) }`.
   `id` is the folder name; `range` is a version with `x` (`2.x`, `0.1.x`); `plan` only reads
   `app` (`packageJson`, `readFile`, `listFiles`) and answers with `Change`s - `create`, `edit`
   (the whole new text), `dependency` (`add`, `update`, `remove`; package.json is changed only
   this way) and `report`. A step never writes.
2. **The registry.** Import it in `steps/index.ts` and add it to `STEPS`. The order does not
   matter (the runner orders by `to.version`), but ids and ending versions must be unique
   (`steps/index.test.ts`).
3. **The data.** What differs between the two versions is data, not code scattered through the
   step: `inventory/inventory.json` (an `id`, a `kind` of `mechanical` or the rest, and a `how`)
   and an import map such as `imports.json`, read by `data.ts`. A test checks that every module
   the map names exists in the workspace, so the map cannot drift from the packages.
4. **Read files with a parser, edit ranges.** `source.ts` parses with `@babel/parser` (a
   development dependency that `tsdown` bundles, so the CLI has nothing to install) and every
   edit replaces a range of the original text, so nothing the step does not touch changes by a
   byte; `applyEdits` applies them. A regular expression cannot tell an `import` in a string or a
   comment from one in code, nor read a JSX attribute. Keep the file's quotes, semicolons and
   line endings. A file that does not parse is reported (`[PARSE]`) and left as it is.
5. **Mechanical or reported.** Edit only what has one right answer in every app (an import path,
   a renamed prop, a dependency). Everything that needs a person - a call whose meaning changed,
   token math, output that differs - is a `report` with the file and line, never a guess.
6. **Report ids and messages.** A message starts with `[ID]`, the inventory item, then the
   item's `how` text, so a message cannot drift from the inventory
   (`fixtures.test.ts` checks it); a check with no item reports as `CHECK`. Every `report` change also carries a `code`, a
   field and not parsed from the message: the item's id, or the check's (`IMP-SPLIT`), which
   `migrate --json` prints. Say what changed,
   where, and what to do.
7. **Idempotent.** The step's output, planned again, must be empty, and the runner moves the
   app's package to `to.version`, so a second `migrate` says it is already there.

## Fixtures and tests

- `fixtures/<name>/before` is an app on the old version, `after` what the step must make of it,
  `reports.json` what it must leave to a person (path, line, id). Use a trimmed real app and a
  synthetic one with every shape the real one lacks.
- A `fixtures.test.ts` over `NAMES` (see the first step) checks exactly the files of `after`,
  exactly the reports, **nothing left to edit** in the result, and that `runMigrate` over a
  copy, run **a second time, changes nothing** (output `Already on ... nothing to do`, no
  commands, equal files and modification times).
- After changing the step, `UPDATE_FIXTURES=1 pnpm vitest run` (in `packages/cli`) writes
  `after` and `reports.json`: **read the diff** before keeping it.
- Type-check an `after`: a `tsconfig.after.json` in the fixture, with `paths` to the built
  packages and `files` listing the `after` files that need nothing the fixture lacks, added to
  `test:types` in `packages/cli/package.json` (`pnpm test:types` builds the packages first).
  The fixtures are excluded from lint, format, type check and coverage of the package; the step
  itself is covered at 100%.
- Third-party UI and styling libraries are named only in the step's `data.ts` and fixtures,
  never in docs or release notes.

## Releasing

1. Write the step and its fixtures with the code that breaks the API.
2. In the release notes, list each breaking item with `migrate` or `by hand`.
3. `pnpm check:migrations`, with the other checks, passes.
4. Release the CLI **with** the family: bump `@soroush.design/cli`, add its notes, and publish
   it (see the [`prerelease`](../prerelease/SKILL.md) skill) so `latest` of the CLI carries the
   step before apps are told to run `migrate`.
