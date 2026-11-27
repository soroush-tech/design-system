// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'

const StyleRegistry = vi.hoisted(() => () => null)
vi.mock('@umber-style/react/next', () => ({ StyleRegistry }))
const configure = vi.hoisted(() => vi.fn())
vi.mock('@umber-style/react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@umber-style/react')>()),
  configure,
}))

describe('next', () => {
  it('is the registry of the engine, with the engine configured with the one cache', async () => {
    const next = await import('./index')
    expect(next.StyleRegistry).toBe(StyleRegistry)
    expect(configure).toHaveBeenCalledWith(
      expect.objectContaining({ cache: expect.objectContaining({ key: 'soroush' }) })
    )
  })
})
