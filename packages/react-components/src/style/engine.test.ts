import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const configure = vi.fn()
vi.mock('@umber-style/react', () => ({ configure }))

const load = async () => (await import('./engine')).configureEngine

describe('configureEngine', () => {
  beforeEach(() => {
    vi.resetModules()
    configure.mockClear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    document.head.innerHTML = ''
  })

  it('gives the engine the nonce of the first script that has one', async () => {
    const script = document.createElement('script')
    script.nonce = 'abc123'
    document.head.append(script)
    ;(await load())()
    expect(configure).toHaveBeenCalledWith(expect.objectContaining({ nonce: 'abc123' }))
  })

  it('gives no nonce when no script has one', async () => {
    document.head.append(document.createElement('script'))
    ;(await load())()
    expect(configure.mock.calls[0][0].nonce).toBeUndefined()
  })

  it('gives no nonce when the script holds an empty one', async () => {
    const script = document.createElement('script')
    script.setAttribute('nonce', '')
    document.head.append(script)
    ;(await load())()
    expect(configure.mock.calls[0][0].nonce).toBeUndefined()
  })

  it('gives no nonce, and does not throw, where there is no document', async () => {
    vi.stubGlobal('document', undefined)
    ;(await load())()
    expect(configure.mock.calls[0][0].nonce).toBeUndefined()
  })

  it('configures once', async () => {
    const configureEngine = await load()
    configureEngine()
    configureEngine()
    expect(configure).toHaveBeenCalledTimes(1)
  })
})
