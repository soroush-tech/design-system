import { describe, it, expect, vi, beforeEach } from 'vitest'

const styleServer = vi.hoisted(() => ({
  extractCriticalToChunks: vi.fn(() => ({ html: '<div />', styles: [] })),
  constructStyleTagsFromChunks: vi.fn(() => '<style data-umber="soroush"></style>'),
}))
vi.mock('@gild-ui/react/server', () => ({ styleServer }))
vi.mock('react-dom/server', () => ({ renderToString: vi.fn(() => '<div id="app" />') }))
vi.mock('vike/server', () => ({
  escapeInject: (_strings: TemplateStringsArray, ...values: unknown[]) => ({
    __html: String(values[0]),
  }),
  dangerouslySkipEscape: (s: string) => s,
}))
vi.mock('../common/Bootstrap', () => ({ Bootstrap: () => null }))

import { onRenderHtml } from './+onRenderHtml'
import { renderToString } from 'react-dom/server'

describe('+onRenderHtml', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls renderToString with Bootstrap', async () => {
    await onRenderHtml({} as never)
    expect(renderToString).toHaveBeenCalled()
  })

  it('extracts critical chunks from the rendered HTML', async () => {
    await onRenderHtml({} as never)
    expect(styleServer.extractCriticalToChunks).toHaveBeenCalledWith('<div id="app" />')
  })

  it('constructs style tags from chunks', async () => {
    await onRenderHtml({} as never)
    expect(styleServer.constructStyleTagsFromChunks).toHaveBeenCalled()
  })

  it('returns a defined result from escapeInject', async () => {
    const result = await onRenderHtml({} as never)
    expect(result).toBeDefined()
  })

  it('injects the default site title when there is no page meta', async () => {
    const result = (await onRenderHtml({} as never)) as unknown as { __html: string }
    expect(result.__html).toContain('<title data-mh>Gild UI</title>')
  })

  it('injects page SEO meta from pageContext config and url', async () => {
    const pageContext = {
      config: { title: 'About', description: 'Who I am.' },
      urlPathname: '/about',
    }
    const result = (await onRenderHtml(pageContext as never)) as unknown as { __html: string }
    expect(result.__html).toContain('<title data-mh>About · Gild UI</title>')
    expect(result.__html).toContain(
      '<link rel="canonical" href="https://gild-ui.soroush.design/about/" data-mh />'
    )
  })
})
