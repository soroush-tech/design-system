#!/usr/bin/env node
// The stdio entry: `npx -y @soroush.tech/mcp`, or a local server in an MCP client's
// config. Same tools and same bundled content as the hosted Worker.
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createMcpServer } from './server'

const server = createMcpServer()
await server.connect(new StdioServerTransport())
