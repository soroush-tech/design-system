import { act, renderHook } from '@testing-library/react'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DEBOUNCE_DELAY_MS } from './useDebounce'
import { useDebouncedCallback } from './useDebouncedCallback'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('useDebouncedCallback', () => {
  it('calls once after the default delay, with the arguments of the last call', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback))
    result.current('a', 1)
    result.current('b', 2)
    act(() => vi.advanceTimersByTime(DEBOUNCE_DELAY_MS - 1))
    expect(callback).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(callback).toHaveBeenCalledOnce()
    expect(callback).toHaveBeenCalledWith('b', 2)
  })

  it('reaches the latest callback, and keeps its identity while the delay is the same', () => {
    const first = vi.fn()
    const second = vi.fn()
    const { result, rerender } = renderHook(({ fn }) => useDebouncedCallback(fn, 100), {
      initialProps: { fn: first },
    })
    const debounced = result.current
    debounced()
    rerender({ fn: second })
    expect(result.current).toBe(debounced)
    act(() => vi.advanceTimersByTime(100))
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledOnce()
  })

  it('takes a new delay with a new identity', () => {
    const { result, rerender } = renderHook(({ delay }) => useDebouncedCallback(vi.fn(), delay), {
      initialProps: { delay: 100 },
    })
    const first = result.current
    rerender({ delay: 200 })
    expect(result.current).not.toBe(first)
  })

  it('never runs a call still waiting when it unmounts', () => {
    const callback = vi.fn()
    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 100))
    result.current()
    unmount()
    act(() => vi.advanceTimersByTime(100))
    expect(callback).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('renders on the server', () => {
    const Probe = () => {
      useDebouncedCallback(() => undefined)
      return createElement('span', null, 'ok')
    }
    expect(renderToString(createElement(Probe))).toContain('ok')
  })
})
