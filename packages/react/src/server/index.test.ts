// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'

const createInstance = vi.hoisted(() => vi.fn((cache: unknown) => ({ cache })))
vi.mock('@umber-style/server/create-instance', () => ({ createInstance }))

describe('server', () => {
  it('is the extraction of the one style cache, made once', async () => {
    const { default: styleCache } = await import('../engine/styleCache')
    const { styleServer } = await import('./index')
    expect(createInstance).toHaveBeenCalledTimes(1)
    expect(createInstance).toHaveBeenCalledWith(styleCache)
    expect(styleServer).toEqual({ cache: styleCache })
  })
})
