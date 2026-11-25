import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useLiveValue } from './useLiveValue'

describe('useLiveValue', () => {
  it('holds the number it is given, and the number it is given next, with no render of its own', () => {
    let renders = 0
    const { result, rerender } = renderHook(
      ({ value }) => {
        renders += 1
        return useLiveValue(value, 'px')
      },
      { initialProps: { value: 10 } }
    )
    expect(result.current.get()).toBe(10)
    const reference = String(result.current)
    expect(reference).toContain('var(--')
    rerender({ value: 25 })
    expect(result.current.get()).toBe(25)
    expect(String(result.current)).toBe(reference)
    expect(renders).toBe(2)
  })
})
