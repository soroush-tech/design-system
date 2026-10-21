import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useControlled } from './useControlled'

describe('useControlled', () => {
  it('owns its value until it is given one, starting at the default', () => {
    const { result } = renderHook(() => useControlled({ controlled: undefined, default: 2 }))
    expect(result.current[0]).toBe(2)
    act(() => result.current[1](4))
    expect(result.current[0]).toBe(4)
  })

  it("follows the controlled value, and a setter call doesn't move it", () => {
    const { result, rerender } = renderHook(
      ({ controlled }) => useControlled<number | null>({ controlled, default: 2 }),
      { initialProps: { controlled: 3 as number | null } }
    )
    expect(result.current[0]).toBe(3)
    act(() => result.current[1](9))
    expect(result.current[0]).toBe(3)
    rerender({ controlled: 5 })
    expect(result.current[0]).toBe(5)
  })

  it('takes null as a controlled value', () => {
    const { result } = renderHook(() =>
      useControlled<number | null>({ controlled: null, default: 2 })
    )
    expect(result.current[0]).toBeNull()
  })
})
