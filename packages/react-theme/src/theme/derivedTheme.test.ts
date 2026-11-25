import { describe, expect, it, vi } from 'vitest'
import { derivedBy } from './derivedTheme'

describe('derivedBy', () => {
  it('derives once for the same two objects and again for another of either', () => {
    const derive = vi.fn((first: object, second: object) => ({ first, second }))
    const derived = derivedBy(derive)
    const [a, b, c] = [{}, {}, {}]
    expect(derived(a, b)).toBe(derived(a, b))
    expect(derive).toHaveBeenCalledTimes(1)
    expect(derived(a, c)).not.toBe(derived(a, b))
    expect(derived(b, b)).not.toBe(derived(a, b))
    expect(derive).toHaveBeenCalledTimes(3)
  })
})
