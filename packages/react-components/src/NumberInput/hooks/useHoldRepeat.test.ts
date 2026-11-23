import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useHoldRepeat } from './useHoldRepeat'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('useHoldRepeat', () => {
  it('runs the action at once, and again every interval after the delay', () => {
    const action = vi.fn()
    const { result } = renderHook(() => useHoldRepeat(action, { delay: 100, interval: 10 }))
    act(() => result.current.start())
    expect(action).toHaveBeenCalledTimes(1)
    act(() => vi.advanceTimersByTime(99))
    expect(action).toHaveBeenCalledTimes(1)
    act(() => vi.advanceTimersByTime(1 + 30))
    expect(action).toHaveBeenCalledTimes(4)
  })

  it('is one step for a tap, and stop ends the repeat', () => {
    const action = vi.fn()
    const { result } = renderHook(() => useHoldRepeat(action))
    act(() => result.current.start())
    act(() => result.current.stop())
    act(() => vi.advanceTimersByTime(1000))
    expect(action).toHaveBeenCalledTimes(1)

    act(() => result.current.start())
    act(() => vi.advanceTimersByTime(400 + 60 * 2))
    act(() => result.current.stop())
    act(() => vi.advanceTimersByTime(1000))
    expect(action).toHaveBeenCalledTimes(4)
  })

  it('calls the latest action', () => {
    const first = vi.fn()
    const second = vi.fn()
    const { result, rerender } = renderHook(({ action }) => useHoldRepeat(action), {
      initialProps: { action: first },
    })
    rerender({ action: second })
    act(() => result.current.start())
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('ends by itself when the component goes', () => {
    const action = vi.fn()
    const { result, unmount } = renderHook(() => useHoldRepeat(action))
    act(() => result.current.start())
    unmount()
    vi.advanceTimersByTime(1000)
    expect(action).toHaveBeenCalledTimes(1)
  })
})
