import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAutoHide } from './useAutoHide'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('useAutoHide', () => {
  it('hides after the duration while open', () => {
    const onHide = vi.fn()
    renderHook(() => useAutoHide({ isOpen: true, duration: 1000, onHide }))
    act(() => vi.advanceTimersByTime(999))
    expect(onHide).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(onHide).toHaveBeenCalledTimes(1)
  })

  it('keeps nothing running when closed or with no duration', () => {
    const onHide = vi.fn()
    renderHook(() => useAutoHide({ isOpen: false, duration: 10, onHide }))
    renderHook(() => useAutoHide({ isOpen: true, onHide }))
    act(() => vi.advanceTimersByTime(10_000))
    expect(onHide).not.toHaveBeenCalled()
  })

  it('stops on pause and resumes for half the duration, or resumeDuration', () => {
    const onHide = vi.fn()
    const { result } = renderHook(() => useAutoHide({ isOpen: true, duration: 1000, onHide }))
    act(() => result.current.pause())
    act(() => vi.advanceTimersByTime(5000))
    expect(onHide).not.toHaveBeenCalled()
    act(() => result.current.resume())
    act(() => vi.advanceTimersByTime(499))
    expect(onHide).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(onHide).toHaveBeenCalledTimes(1)

    const timed = renderHook(() =>
      useAutoHide({ isOpen: true, duration: 1000, resumeDuration: 100, onHide })
    )
    act(() => timed.result.current.pause())
    act(() => timed.result.current.resume())
    act(() => vi.advanceTimersByTime(100))
    expect(onHide).toHaveBeenCalledTimes(2)
  })

  it('does not resume when closed or with no duration', () => {
    const onHide = vi.fn()
    const closed = renderHook(() => useAutoHide({ isOpen: false, duration: 10, onHide }))
    const none = renderHook(() => useAutoHide({ isOpen: true, onHide }))
    act(() => closed.result.current.resume())
    act(() => none.result.current.resume())
    act(() => vi.advanceTimersByTime(10_000))
    expect(onHide).not.toHaveBeenCalled()
  })

  it('calls the latest onHide', () => {
    const first = vi.fn()
    const second = vi.fn()
    const { rerender } = renderHook(
      ({ onHide }) => useAutoHide({ isOpen: true, duration: 100, onHide }),
      { initialProps: { onHide: first } }
    )
    rerender({ onHide: second })
    act(() => vi.advanceTimersByTime(100))
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })
})
