# design-system

Monorepo for the `@soroush.tech` UI libraries, extracted from [`soroush-tech/core`](https://github.com/soroush-tech/core) with full git history.

## Packages

| Package                                                 | Description                                                                   |
| ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [`@soroush.tech/styled-system`](packages/styled-system) | Style-prop system: responsive style functions, `system()`, theme-aware scales |
| [`@soroush.tech/design-system`](packages/design-system) | Token-driven React component library built on styled-system                   |
| [`@soroush.tech/markdown`](packages/markdown)           | Markdown companion component library for the design system                    |
| [`@soroush.tech/hooks`](packages/hooks)                 | Shared React hooks (private, internal)                                        |
| [`@soroush.tech/eslint-config`](packages/eslint-config) | Shared oxlint config and custom lint plugins (private, internal)              |

See [`packages/packages.md`](packages/packages.md) for workspace-package conventions.

## Development

```sh
pnpm install
pnpm lint          # oxlint, warnings are errors
pnpm typecheck
pnpm test          # vitest, all packages
pnpm test:coverage # 100% coverage required on all packages
pnpm build         # tsdown
pnpm storybook     # design-system storybook
```
