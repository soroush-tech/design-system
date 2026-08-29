# @soroush.tech/mcp

MCP server for the [`@soroush.tech`](https://docs.soroush.tech) design system. It
gives AI coding tools - Claude Code, Claude, Cursor, or anything else that speaks the
[Model Context Protocol](https://modelcontextprotocol.io) - the component inventory,
every component's README, and the theme token contract, so they write UI that matches
the library instead of guessing at it.

## Use it

The hosted server needs no install:

```sh
claude mcp add --transport http soroush https://mcp.soroush.tech/mcp
```

Or run it locally over stdio - useful offline, or to pin a version:

```sh
npx -y @soroush.tech/mcp
```

For a client configured by file:

```jsonc
{
  "mcpServers": {
    "soroush": { "command": "npx", "args": ["-y", "@soroush.tech/mcp"] },
  },
}
```

## Tools

| Tool              | Arguments                                        | Returns                                                                     |
| ----------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| `list_components` | `package?`                                       | Every component with its category, summary, and exact subpath import        |
| `get_component`   | `name`, `part?` (`all`/`intro`/`api`/`examples`) | The component's README - `api` is its props with token values and defaults  |
| `get_tokens`      | `scale?`                                         | The token contract from `baseTheme`: space, palette, radii, typography, ... |
| `list_docs`       | -                                                | The guide index: installation, usage, theming, layout kit, styled-system    |
| `get_doc`         | `id`                                             | One guide or reference in full                                              |
| `search_docs`     | `query`                                          | Best matches across components and guides, with snippets                    |

A typical run starts with `list_components`, then `get_component` with `part: "api"`
before writing markup, and `get_tokens` instead of hardcoding a value.

## Programmatic use

```ts
import { createMcpServer } from '@soroush.tech/mcp'

const server = createMcpServer()
await server.connect(myTransport)
```

`content`, `findComponent`, `findDoc`, and `search` are exported too, for reading the
bundle without going through MCP.

## How the content stays current

Nothing here is hand-written documentation. At build time the package reads the
component registry and README splitter from the workspace, pulls each component's
`README.md`, and serializes the live `baseTheme` object. The docs site at
docs.soroush.tech renders the same sources, so the two cannot drift.

## License

MIT
