import { createCache as createEngineCache } from '@umber-style/cache'
import { describe, expect, it } from 'vitest'
import { createCache } from './index'

describe('engine', () => {
  it('re-exports createCache, so an app needs no engine package of its own', () => {
    expect(createCache).toBe(createEngineCache)
  })
})
