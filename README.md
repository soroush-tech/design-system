# design-system

Monorepo for the `@soroush.tech` UI libraries, extracted from [`soroush-tech/core`](https://github.com/soroush-tech/core) with full git history.

## Packages

| Package                                                     | Description                                                                      |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`@soroush.design/styled-system`](packages/styled-system)   | Style-prop system: responsive style functions, `system()`, theme-aware scales    |
| [`@soroush.design/react`](packages/react)                   | The React design system: the components, the theme provider and hooks, `styled`  |
| [`@soroush.design/core`](packages/core)                     | What the platforms share and that needs no framework: the theme and the catalog  |
| [`@soroush.design/react-markdown`](packages/react-markdown) | Markdown editor and renderer for the React design system, with its own libraries |
| [`@soroush.design/cli`](packages/cli)                       | The command line: `init` sets the design system up in an existing React app      |
| [`@soroush.design/mcp`](packages/mcp)                       | MCP server exposing the components, READMEs, and tokens to AI coding tools       |
| [`@soroush.tech/ui-spec`](packages/ui-spec)                 | Generative-UI spec on A2UI v1.0: catalogs, a behavior schema, and validators     |
| [`@soroush.design/react-hooks`](packages/react-hooks)       | React hooks that belong to no component and no theme                             |
| [`@soroush.design/lab`](packages/lab)                       | Incubator for components heading into the design system (private, internal)      |
| [`@soroush.design/story-demo`](packages/story-demo)         | Renders CSF3 stories as interactive docs demos (private, internal)               |
| [`@soroush.design/docs-content`](packages/docs-content)     | Component registry and README parsing shared by the docs app and MCP server      |
| [`@soroush.design/contract`](packages/contract)             | The final public shape as export lists and type tests (private, internal)        |
| [`@soroush.tech/eslint-config`](packages/eslint-config)     | Shared oxlint config and custom lint plugins (private, internal)                 |

See [`packages/packages.md`](packages/packages.md) for workspace-package conventions.

## Use it with AI tools

The design system is readable by AI coding tools, from the same sources the docs site
renders - component READMEs, the live token contract, and the guides. Both routes below work
with any coding agent:

```sh
# The house-style and accessibility (WCAG) skills, installed for the agents you use
npx skills add soroush-tech/design-system
```

and the hosted MCP server at `https://mcp.soroush.design/mcp` (no install), added to any MCP
client. In Claude Code that is
`claude mcp add --transport http soroush https://mcp.soroush.design/mcp`.

Claude Code users can install both at once as a plugin, with a UI review agent on top:

```sh
claude plugin marketplace add soroush-tech/design-system
claude plugin install soroush-design-system@soroush-tech
```

`npx -y @soroush.design/mcp` runs the same server locally over stdio, and
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
