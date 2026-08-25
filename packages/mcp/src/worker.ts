import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { content } from './content'
import { createMcpServer } from './server'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, MCP-Protocol-Version, MCP-Session-Id',
  'Access-Control-Expose-Headers': 'MCP-Session-Id',
}

const withCors = (response: Response): Response => {
  const headers = new Headers(response.headers)
  for (const [key, value] of Object.entries(CORS)) headers.set(key, value)
  return new Response(response.body, { status: response.status, headers })
}

const LANDING = [
  'soroush design system - MCP server',
  '',
  `Serving ${content.components.length} components and ${content.docs.length} guides`,
  `from @soroush.tech/design-system ${content.version}.`,
  '',
  'Connect (Claude Code):',
  '  claude mcp add --transport http soroush https://mcp.soroush.design/mcp',
  '',
  'Or run it locally over stdio:',
  '  npx -y @soroush.tech/mcp',
  '',
  `Docs: https://docs.soroush.design`,
  '',
].join('\n')

/**
 * Handles one MCP request. A fresh server and transport per request keeps the Worker
 * stateless - nothing survives between requests, so a reused isolate cannot leak one
 * caller's session into another's.
 */
export const handleMcp = async (request: Request): Promise<Response> => {
  const transport = new WebStandardStreamableHTTPServerTransport({
    // Stateless: no session ids, no in-memory session table.
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })
  const server = createMcpServer()
  await server.connect(transport)
  return transport.handleRequest(request)
}

export const handleRequest = async (request: Request): Promise<Response> => {
  const { pathname } = new URL(request.url)

  if (request.method === 'OPTIONS') return withCors(new Response(null, { status: 204 }))

  if (pathname === '/mcp') return withCors(await handleMcp(request))

  if (pathname === '/' || pathname === '/index.txt') {
    return withCors(
      new Response(LANDING, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
    )
  }

  return withCors(new Response('Not found\n', { status: 404 }))
}

export default { fetch: handleRequest }
