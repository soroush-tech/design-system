import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import styleCache from './styleCache'

const load = async () => (await import('./styleCache')).default

describe('styleCache', () => {
  it('has key "soroush"', () => {
    expect(styleCache.key).toBe('soroush')
  })

  it('exposes an inserted map and a sheet', () => {
    expect(styleCache).toHaveProperty('inserted')
    expect(styleCache).toHaveProperty('sheet')
  })
})

describe('the nonce of styleCache', () => {
  beforeEach(() => vi.resetModules())

  afterEach(() => {
    vi.unstubAllGlobals()
    document.head.innerHTML = ''
  })

  it('is the nonce of the first script that has one', async () => {
    const script = document.createElement('script')
    script.nonce = 'abc123'
    document.head.append(script)
    expect((await load()).nonce).toBe('abc123')
  })

  it('is none when no script has one', async () => {
    document.head.append(document.createElement('script'))
    expect((await load()).nonce).toBeUndefined()
  })

  it('is none when the script holds an empty one', async () => {
    const script = document.createElement('script')
    script.setAttribute('nonce', '')
    document.head.append(script)
    expect((await load()).nonce).toBeUndefined()
  })

  it('is none, and nothing throws, where there is no document', async () => {
    vi.stubGlobal('document', undefined)
    expect((await load()).nonce).toBeUndefined()
  })
})
