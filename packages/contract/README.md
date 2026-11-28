# @gild-ui/contract

Private. The final public shape of the Gild UI React family, written as data and type tests **before** the packages are restructured behind it (epic #157). Nothing here is published.

## What it holds

- `exports/<package>.json` - every entry point of `@gild-ui/core`, `hooks`, `react` and `react-markdown`, and the exact names each exports, values and types apart. A name that is both (a class, or a const with an interface of the same name) is in both lists. `react.json` is written by hand from the decided shape and today's component entries; the other three are today's built surface, edited (`defineThemes` in core's `/theme`).
- `type-tests/<program>/` - one `tsc` program per case, each with its own `tsconfig.json` (extending `type-tests/tsconfig.base.json`: `strict`, `skipLibCheck: false`, the four package names mapped to their built `dist` declarations). One program per case, because a `declare module` in one program leaks into every file of it. `type-tests/shared/themes.ts` is the app's theme file, imported by the programs that need a registered theme.
- `expected-failures.json` - the checks that fail today, each with the task that makes it pass.
- `src/` - the checker (`exportsOf` reads declarations with the compiler API; `lists`, `programs`, `expected`, `build`, `check`), with its own tests at 100% coverage.

| Program                  | Holds                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `paths`                  | every root name and every subpath of `@gild-ui/react` resolves                                        |
| `define-themes`          | `color="brand"` and `variant="pill"` accepted, misspellings rejected, `chart.grid` typed              |
| `define-themes-mismatch` | a theme missing a key another has fails at `defineThemes`                                             |
| `define-themes-message`  | the same, with no suppression: the output says `missing palette.brand`                                |
| `satisfies-errors`       | a misspelt owner-state field, slot or default prop fails `satisfies ThemeComponents`                  |
| `overrides`              | `style` takes entries of `StyleSheet.create` only, `slotProps` is keyed by the slots of the component |
| `provider`               | `ThemeProvider` takes a registered theme and rejects an unknown key                                   |
| `with-theme`             | `withTheme` hands a class component the registered theme type                                         |
| `markdown-present`       | with a markdown entry imported, its slots and `theme.syntax` are typed                                |
| `markdown-absent`        | without one, `theme.syntax` is an error                                                               |
| `no-register`            | without the registration, the colors are the built-in ones                                            |

A program with an `expect-errors.txt` must fail, and its `tsc` output must hold each line of the file: it checks a message that `@ts-expect-error` cannot read.

## The expected-failure list

`pnpm --filter @gild-ui/contract test` (and `pnpm check`, which prints the report) runs every export-list check and every program, then compares the set of **failing** checks with `expected-failures.json`. It fails when

1. a check fails that is **not** listed: a regression, or a new check nobody listed; or
2. a check is listed and **passes**: the task landed, and the entry must go; or
3. an entry names a check that does not exist.

So the list shrinks as the restructure lands and is empty when the family has its final shape. Checks are named `exports/<package>` and `types/<program>`; an entry is `{ "task": "#162", "reason": "..." }`.

**The rule: the task that makes a check pass removes its entry, in the same commit.** Adding an entry is for a new check that cannot pass yet, and says which task will fix it.

The checks read the packages' **built** declarations. The test builds a package first when its `dist` is missing or older than its `src`, so a fresh checkout runs it as is.

## Adding to the contract

A new entry point or name: edit `exports/<package>.json` (sorted, as the tests demand) and, for `@gild-ui/react`, add its import to `type-tests/paths/index.ts`. A new case: a folder under `type-tests/` with a `tsconfig.json` that extends the base, and its line in `expected-failures.json` if it cannot pass yet.
