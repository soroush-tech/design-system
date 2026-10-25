import { describe, it, expect } from 'vitest'
import worker, { handleRequest } from './worker'

const rpc = (body: unknown, init: RequestInit = {}): Request =>
  new Request('https://mcp.soroush.design/mcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      ...((init.headers as Record<string, string>) ?? {}),
    },
    body: JSON.stringify(body),
  })

const INITIALIZE = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'test', version: '0.0.0' },
  },
}

describe('worker routing', () => {
  it('serves a plain-text landing page at the root', async () => {
    const response = await handleRequest(new Request('https://mcp.soroush.design/'))
    expect(response.status).toBe(200)
    expect(await response.text()).toContain('claude mcp add --transport http')
  })

  it('answers CORS preflight', async () => {
    const response = await handleRequest(
      new Request('https://mcp.soroush.design/mcp', { method: 'OPTIONS' })
    )
    expect(response.status).toBe(204)
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*')
  })

  it('404s an unknown path', async () => {
    const response = await handleRequest(new Request('https://mcp.soroush.design/nope'))
    expect(response.status).toBe(404)
  })

  it('handles an MCP initialize over Streamable HTTP', async () => {
    const response = await worker.fetch(rpc(INITIALIZE))
    expect(response.status).toBe(200)
    const body = await response.text()
    expect(body).toContain('soroush-design-system')
  })

  it('serves a tools/list over the same transport', async () => {
    // The stateless transport takes each request on a fresh server, so a tools/list
    // needs its own initialize handshake first.
    await worker.fetch(rpc(INITIALIZE))
    const response = await worker.fetch(
      rpc(
        { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} },
        { headers: { 'MCP-Protocol-Version': '2025-06-18' } }
      )
    )
    expect(response.status).toBe(200)
    expect(await response.text()).toContain('list_components')
  })
})
