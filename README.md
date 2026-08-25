# design-system

Monorepo for the `@soroush.tech` UI libraries, extracted from [`soroush-tech/core`](https://github.com/soroush-tech/core) with full git history.

## Packages

| Package                                                 | Description                                                                   |
| ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [`@soroush.tech/styled-system`](packages/styled-system) | Style-prop system: responsive style functions, `system()`, theme-aware scales |
| [`@soroush.tech/design-system`](packages/design-system) | Token-driven React component library built on styled-system                   |
| [`@soroush.tech/markdown`](packages/markdown)           | Markdown companion component library for the design system                    |
| [`@soroush.tech/mcp`](packages/mcp)                     | MCP server exposing the components, READMEs, and tokens to AI coding tools    |
| [`@soroush.tech/hooks`](packages/hooks)                 | Shared React hooks (private, internal)                                        |
| [`@soroush.tech/lab`](packages/lab)                     | Incubator for components heading into the design system (private, internal)   |
| [`@soroush.tech/story-demo`](packages/story-demo)       | Renders CSF3 stories as interactive docs demos (private, internal)            |
| [`@soroush.tech/docs-content`](packages/docs-content)   | Component registry and README parsing shared by the docs app and MCP server   |
| [`@soroush.tech/eslint-config`](packages/eslint-config) | Shared oxlint config and custom lint plugins (private, internal)              |

See [`packages/packages.md`](packages/packages.md) for workspace-package conventions.

## Use it with AI tools

The design system is readable by AI coding tools, from the same sources the docs site
renders - component READMEs, the live token contract, and the guides:

```sh
# The hosted MCP server (no install)
claude mcp add --transport http soroush https://mcp.soroush.design/mcp

# Or the Claude Code plugin: MCP server + house-style skill + UI review agent
claude plugin marketplace add soroush-tech/design-system
```

`npx -y @soroush.tech/mcp` runs the same server locally over stdio, and
[docs.soroush.design/llms.txt](https://docs.soroush.design/llms.txt) serves a
machine-readable index. See [`packages/mcp/mcp.md`](packages/mcp/mcp.md) for how it is
built and kept in sync.

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
