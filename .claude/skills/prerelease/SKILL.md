---
description: How to ship an @soroush.tech/* package through alpha -> rc -> stable on npm with the `channel` dropdown of CD · Packages, so a change is tried in our own apps before it reaches `latest`. Use when releasing a package, publishing an alpha or release candidate from a branch, promoting to stable, or pointing a consumer app at a prerelease.
paths: packages/**
---

# Prerelease channel: alpha -> rc -> stable

A release that changes behaviour or API goes alpha -> rc -> stable. Only a maintenance or
docs-only PATCH may go straight to stable.

`package.json` always holds the **target** version (`2.0.0`) - never a prerelease. The
**CD · Packages (npm)** dispatch has a `channel` dropdown, and the workflow
(`scripts/prerelease-versions.mjs`) turns the target into the published version in its own
checkout:

| channel  | Published as    | npm dist-tag | Run from                        | GitHub Release |
| -------- | --------------- | ------------ | ------------------------------- | -------------- |
| `alpha`  | `X.Y.Z-alpha.N` | `alpha`      | any branch whose `ci-ok` passed | none           |
| `rc`     | `X.Y.Z-rc.N`    | `rc`         | `main`                          | pre-release    |
| `stable` | `X.Y.Z`         | `latest`     | `main`                          | release        |

`N` is one above the highest `X.Y.Z-<channel>.N` already on npm, `0` when there is none -
nobody edits it.

## Rules

- Pick the target by the semver rule in the [`release-notes`](../release-notes/SKILL.md) skill
  and bump `package.json` to it once, before the first alpha. It stays there through every alpha
  and rc.

  ```jsonc
  // ✗ a prerelease in package.json - the workflow refuses it
  "version": "2.0.0-alpha.1"
  // ✓ the target; the dispatch adds the suffix
  "version": "2.0.0"
  ```

- One notes file per target: `release-notes/X.Y.Z.md`. Alphas need none; an rc's GitHub
  pre-release shows the target's notes, so write them before the first rc.
- A prerelease never lands on `latest` - the workflow publishes with `--tag <channel>` and fails
  the run if `latest` ever points at a prerelease. That is also why the
  `check:release-notes` gate keeps passing: it compares `package.json` with `latest` only.
- Publish dependencies first (`styled-system` before `design-system`): `workspace:^` publishes
  as `^<sibling's version>`, so a prerelease run points each workspace dependency at its newest
  prerelease on the same channel, and stops with "publish X first" when there is none. `all`
  orders the run itself.
- A target already released can't get a prerelease: a named package fails, `all` skips it.
- Consumers never get a prerelease by accident: `^1.3.4`, `^2.0.0` and `@latest` skip
  prereleases. An app opts in by tag or exact version.

## Publish an alpha (test a PR before it merges)

1. Bump `package.json` to the target on the feature branch (once), commit; the user pushes and
   opens the PR.
2. Wait for CI: `ci-ok` must be green on the branch's latest commit.
3. The user dispatches **CD · Packages (npm)**: _Use workflow from_ the branch, `package`
   (dependencies first), `channel: alpha`.
4. In each consumer app: `pnpm add @soroush.tech/<pkg>@alpha`, then test there.
5. Something wrong: fix, push, wait for green CI, dispatch again - the next `alpha.N` follows.

## Publish a release candidate

1. Merge the PR (the target and `release-notes/X.Y.Z.md` in it).
2. Dispatch from `main` with `channel: rc`, dependencies first.
3. Consumers: `pnpm add @soroush.tech/<pkg>@rc`. A fix is a PR to `main`, then another `rc`.

## Promote to stable

1. Dispatch from `main` with `channel: stable`, dependencies first - same `package.json`, no
   commit needed.
2. `npm view @soroush.tech/<pkg> dist-tags`: `latest` is `X.Y.Z`.
3. Consumers move from the tag to `^X.Y.Z`. The next change needs a new target.

## Once per repo

The `cd-packages` environment (repo Settings -> Environments -> Deployment branches) must allow
the branches alphas come from (e.g. `feat/*`, `fix/*`, `chore/*`); `main` alone blocks every
branch alpha before it starts.
