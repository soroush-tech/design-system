import { describe, it, expect } from 'vitest'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { content } from './content'
import {
  createMcpServer,
  renderComponent,
  renderDocIndex,
  renderInventory,
  renderTokens,
} from './server'
import type { ComponentRecord } from './types'

const connect = async (): Promise<Client> => {
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  const client = new Client({ name: 'test', version: '0.0.0' })
  await Promise.all([createMcpServer().connect(serverTransport), client.connect(clientTransport)])
  return client
}

const textOf = (result: unknown): string =>
  (result as { content: Array<{ type: string; text: string }> }).content
    .map((part) => part.text)
    .join('\n')

const call = async (client: Client, name: string, args: Record<string, unknown> = {}) =>
  textOf(await client.callTool({ name, arguments: args }))

describe('MCP protocol surface', () => {
  it('advertises every tool', async () => {
    const client = await connect()
    const names = (await client.listTools()).tools.map((tool) => tool.name).sort()
    expect(names).toEqual([
      'get_component',
      'get_doc',
      'get_tokens',
      'list_components',
      'list_docs',
      'search_docs',
    ])
  })

  it('lists components, and filters to one package', async () => {
    const client = await connect()
    const all = await call(client, 'list_components')
    expect(all).toContain('Button')
    expect(all).toContain('Preview')

    const markdown = await call(client, 'list_components', { package: 'markdown' })
    expect(markdown).toContain('Preview')
    expect(markdown).not.toContain('**Button**')
  })

  it('serves a component README, sliced by part', async () => {
    const client = await connect()
    const all = await call(client, 'get_component', { name: 'Button' })
    expect(all).toContain("import { Button } from '@soroush.tech/design-system/Button'")

    const api = await call(client, 'get_component', { name: 'button', part: 'api' })
    expect(api).toContain('variant')
    expect(api).not.toContain('## Examples')
  })

  it('reports unknown components and docs with the valid options', async () => {
    const client = await connect()
    expect(await call(client, 'get_component', { name: 'Nope' })).toContain('Unknown component')
    expect(await call(client, 'get_doc', { id: 'nope' })).toContain('Unknown doc')
  })

  it('serves the token contract and a single scale', async () => {
    const client = await connect()
    expect(await call(client, 'get_tokens')).toContain('## space')
    const palette = await call(client, 'get_tokens', { scale: 'palette' })
    expect(palette).toContain('primary.main')
    expect(palette).not.toContain('## space')
  })

  it('lists and serves docs', async () => {
    const client = await connect()
    expect(await call(client, 'list_docs')).toContain('`theming`')
    expect(await call(client, 'get_doc', { id: 'theming' })).toContain('Theming')
  })

  it('searches across components and docs', async () => {
    const client = await connect()
    const hits = await call(client, 'search_docs', { query: 'button variant' })
    expect(hits).toContain('Button')
    expect(await call(client, 'search_docs', { query: 'zzzznomatch' })).toContain('No matches')
  })
})

describe('renderers', () => {
  const component = content.components.find((item) => item.name === 'Button')!

  it('reports an empty package filter with the available packages', () => {
    expect(renderInventory(content, 'nope')).toContain('Available packages')
  })

  it('falls back to the intro when a README has no such section', () => {
    const sparse: ComponentRecord = { ...component, api: '', examples: '' }
    const rendered = renderComponent(sparse, 'api')
    expect(rendered).toContain('no separate props reference section')
    expect(rendered).toContain(sparse.intro.slice(0, 40))
  })

  it('renders each individual part', () => {
    expect(renderComponent(component, 'intro')).toContain(component.intro.slice(0, 30))
    expect(renderComponent(component, 'examples')).toContain('## Examples')
  })

  it('reports an unknown token scale with the available ones', () => {
    expect(renderTokens(content, 'nope')).toContain('Unknown scale')
  })

  it('indexes every doc', () => {
    const index = renderDocIndex(content)
    for (const doc of content.docs) expect(index).toContain(`\`${doc.id}\``)
  })
})
