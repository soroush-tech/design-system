import { setNonceSource as engineSetNonceSource } from '@umber-style/react'
import { describe, expect, it } from 'vitest'
import * as engine from './index'
import styleCache from './styleCache'

describe('engine', () => {
  it('re-exports setNonceSource, so an app needs no engine package of its own', () => {
    expect(engine.setNonceSource).toBe(engineSetNonceSource)
  })

  it('has one cache and no way to make a second', () => {
    expect(engine.styleCache).toBe(styleCache)
    expect(engine).not.toHaveProperty('createCache')
  })
})
