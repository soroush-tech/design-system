import createEmotionCache from '@emotion/cache'
import { describe, expect, it } from 'vitest'
import { createCache } from './index'

describe('engine', () => {
  it('re-exports createCache, so an app needs no Emotion package of its own', () => {
    expect(createCache).toBe(createEmotionCache)
  })
})
