import { beforeEach, describe, expect, it, vi } from 'vitest'

const configure = vi.fn()
vi.mock('@umber-style/react', () => ({ configure }))

const load = async () => ({
  configureEngine: (await import('./engine')).configureEngine,
  styleCache: (await import('../engine/styleCache')).default,
})

// Each test imports the engine afresh after resetModules; under a loaded machine (the commit hook
// runs every package at once) that import alone can take more than the default 5 seconds.
const IMPORT_TIMEOUT_MS = 30_000

describe('configureEngine', { timeout: IMPORT_TIMEOUT_MS }, () => {
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
