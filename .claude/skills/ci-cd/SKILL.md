---
description: GitHub Actions CI/CD conventions for this repo - the single CI entry workflow (prepare → lint → packages matrix + bench → ci-ok), the action-pinning rule (version tags for `actions/*`, commit SHAs for everything else including our own org), per-package Codecov flags with tokenless-OIDC uploads, the gen:publish-options marker blocks, and manual npm publishing via cd-packages.yml. Use when adding, editing, or debugging any workflow under .github/workflows/.
paths: .github/workflows/**
---

# CI/CD (GitHub Actions)

## Workflow files

| File              | Name                  | Trigger                              |
| ----------------- | --------------------- | ------------------------------------ |
| `ci.yml`          | `CI`                  | `push` to `main`, all `pull_request` |
| `cd-packages.yml` | `CD · Packages (npm)` | manual `workflow_dispatch` only      |
| `label-area.yml`  | `Label Affected Area` | `issues: opened`                     |

One CI entry workflow holding every job; CD is separate and **manual only** - a release is a
deliberate act with required, human-written notes, never triggered by a push or merge.

## Action pinning convention - the load-bearing rule

Pin every `uses:` by the action's **origin**:

- **GitHub's own** - `actions/*` (checkout, setup-node, cache, github-script) → **version tag**:
  `actions/checkout@v7`.
- **Everything else, our own org included** (`soroush-tech/bench-action`, `pnpm/action-setup`,
  `codecov/codecov-action`) → **commit SHA** + `# vX` comment. What SHA-pinning defends against
  is a tag being moved, and our own tags move like anyone's. The SHA is bumped when the action
  releases - the upgrade is a reviewed line, not a silent one.

## CI job shape

`prepare` → `lint` → `packages` (matrix) + `bench` → `ci-ok`.

- **Detect once in `prepare`** (node version from `.nvmrc`, package manager, runner, the package
  matrix), reuse via `needs.prepare.outputs.*`. Never hard-code the node version.
- **The package matrix is discovered from `packages/` at run time** - one row per directory with
  a `package.json`, with `dir` / `filter` (scoped name) / `flag` (unscoped name) / `browsers`
  (true when the package declares `playwright` itself and has no `test:e2e` script). **Adding a
  package must need no edit to `ci.yml`.**
- **Every job that installs starts from `./.github/actions/setup`** - the composite action
  holding pnpm, Node and the install. **Never re-inline those steps**: the `pnpm/action-setup`
  pin and the store cache stay a one-file edit. A new job is a checkout (the action cannot carry
  it - a local action is resolved from the working tree it checks out) plus a call with
  `node_version`/`manager`/`command`. Per-row caches (Playwright binaries) stay in the job,
  just after the call.
- Every install runs `--ignore-scripts`: no lifecycle script at install time, anywhere in CI -
  the packages build with tsdown, which needs none.
- **`bench`** is the styled-system performance gate: builds the package, then
  `soroush-tech/bench-action` compares against the last npm release; a case below the minimum
  speed ratio fails the PR via ci-ok. The bot-token mint step is optional - without the
  `BENCH_BOT_APP_ID` var it falls back to `GITHUB_TOKEN`.
- **`ci-ok`** is the single branch-protection check: `if: always()`, fails only on a needed
  job's `failure`/`cancelled`. **Add every new job to its `needs`.**
- Set `timeout-minutes` on every job; matrices use `fail-fast: false`. CI concurrency cancels
  superseded runs; CD does not (`cancel-in-progress: false`).

## Coverage → Codecov

- Each package's matrix row uploads its `coverage/lcov.info` under its **own flag** (the
  unscoped package name), after a `sed` that prefixes `SF:` paths with `packages/<dir>/` so
  they are repo-relative and unique.
- Uploads are **tokenless via OIDC** (`use_oidc: true` + job `permissions: { id-token: write }`,
  works on this public repo) - no `CODECOV_TOKEN` secret.
- 100% is enforced in each package's `vitest.config` (`thresholds: { 100: true }`); Codecov is
  reporting only. Flags and components live in `.codecov.yml` between `# gen:...` markers.

## Generated blocks - never edit by hand

`pnpm gen:publish-options` regenerates, from `packages/` on disk:

- the `workflow_dispatch` package choice list in `cd-packages.yml` (non-private packages),
- the `.codecov.yml` patch-flag / flag / component entries (all packages),
- the "Affected area" dropdown in every `.github/ISSUE_TEMPLATE` form and the allowlist in
  `label-area.yml` (all packages).

Each block sits between `# gen:... start` / `# gen:... end` marker comments. The pre-commit
hook runs it with `--check`, so drift fails the commit - after adding or renaming a package,
run `pnpm gen:publish-options` and commit the result.

## Publishing (cd-packages.yml)

Manual dispatch, main-ref only, npm **Trusted Publishing** (OIDC id-token per run, no
NPM_TOKEN; `NODE_AUTH_TOKEN` must stay unset). Requires the `cd-packages` environment and the
npm trusted-publisher config for this repo. Notes come from
`packages/<pkg>/release-notes/<version>.md` - the run refuses to publish without the file, and
the same guard runs earlier in `lint` (`pnpm check:release-notes`). A version already on the
registry is skipped, so `all` publishes exactly the packages whose version is new. The GitHub
Release step is idempotent and re-runnable (see the `release-notes` skill).
