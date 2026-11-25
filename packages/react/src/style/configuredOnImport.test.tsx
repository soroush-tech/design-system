// @vitest-environment node
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// An app that imports only `styled` - no theme provider module, no component of a library - must
// still get the engine configured: the package is free of side effects, so what configures it is a
// function its own styled module calls.
const configure = vi.hoisted(() => vi.fn())
vi.mock('@umber-style/react', async (importOriginal) => {
  const engine = await importOriginal<typeof import('@umber-style/react')>()
  return { ...engine, configure: configure.mockImplementation(engine.configure) }
})

describe('importing only styled', () => {
  beforeEach(() => {
    vi.resetModules()
    configure.mockClear()
  })

  it('configures the engine with the prefix, value repair and raw keys, once', async () => {
    const { styled, css, keyframes } = await import('./styled')
    await import('./styled')
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith(
      expect.objectContaining({
        prefix: 'soroush',
        hasValueRepair: true,
        rawKeys: expect.arrayContaining(['components', 'defaults', 'breakpoints']),
      })
    )
    // `css` and `keyframes` come through the same module, so they are configured with `styled`.
    expect([typeof styled, typeof css, typeof keyframes]).toEqual([
      'function',
      'function',
      'function',
    ])
  })

  // Last: rendering uses the engine's default style, which can no longer be configured after.
  it('renders with the soroush class prefix on the server', async () => {
    const { styled } = await import('./styled')
    const Box = styled('div')({ color: 'red' })
    expect(renderToString(createElement(Box))).toMatch(/class="soroush-[a-z0-9]+"/)
  })
})
