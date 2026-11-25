import { beforeEach, describe, expect, it, vi } from 'vitest'

const configure = vi.fn()
vi.mock('@umber-style/react', () => ({ configure }))

const load = async () => ({
  configureEngine: (await import('./engine')).configureEngine,
  styleCache: (await import('../engine/styleCache')).default,
})

describe('configureEngine', () => {
  beforeEach(() => {
    vi.resetModules()
    configure.mockClear()
  })

  it('gives the engine the library cache, so a page holds one cache and each rule once', async () => {
    const { configureEngine, styleCache } = await load()
    configureEngine()
    expect(configure.mock.calls[0][0].cache).toBe(styleCache)
    expect(configure.mock.calls[0][0]).not.toHaveProperty('prefix')
    expect(configure.mock.calls[0][0]).not.toHaveProperty('nonce')
  })

  it('writes text.inherit, the keyword inherit, as itself and not as a variable', async () => {
    const { configureEngine } = await load()
    configureEngine()
    expect(configure.mock.calls[0][0].modes).toEqual({ 'text.inherit': 'raw' })
  })

  it('configures once', async () => {
    const { configureEngine } = await load()
    configureEngine()
    configureEngine()
    expect(configure).toHaveBeenCalledTimes(1)
  })
})
