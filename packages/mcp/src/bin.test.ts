import { describe, it, expect, vi } from 'vitest'

const connect = vi.fn()

vi.mock('@modelcontextprotocol/sdk/server/stdio.js', () => ({
  StdioServerTransport: class {},
}))

vi.mock('./server', () => ({
  createMcpServer: () => ({ connect }),
}))

describe('stdio entry', () => {
  it('connects the server to a stdio transport on import', async () => {
    await import('./bin')
    expect(connect).toHaveBeenCalledOnce()
    expect(connect.mock.calls[0][0]).toBeInstanceOf(Object)
  })
})
