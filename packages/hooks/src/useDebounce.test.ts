import { act, renderHook } from '@testing-library/react'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DEBOUNCE_DELAY_MS, useDebounce } from './useDebounce'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('useDebounce', () => {
  it('returns the value as it is on the first render', () => {
    const { result } = renderHook(() => useDebounce('a'))
    expect(result.current).toBe('a')
  })

  it('follows a change only after the default delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'a' },
    })
    rerender({ value: 'b' })
    act(() => vi.advanceTimersByTime(DEBOUNCE_DELAY_MS - 1))
    expect(result.current).toBe('a')
    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe('b')
  })

  it('restarts the delay on every change, so only the last value arrives', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: 1 },
    })
    rerender({ value: 2 })
    act(() => vi.advanceTimersByTime(60))
    rerender({ value: 3 })
    act(() => vi.advanceTimersByTime(60))
    expect(result.current).toBe(1)
    act(() => vi.advanceTimersByTime(40))
    expect(result.current).toBe(3)
  })

  it('takes a new delay', () => {
    const { result, rerender } = renderHook(({ delay }) => useDebounce('x', delay), {
      initialProps: { delay: 1000 },
    })
    rerender({ delay: 10 })
    act(() => vi.advanceTimersByTime(10))
    expect(result.current).toBe('x')
  })

  it('leaves no timer behind when it unmounts', () => {
    const { rerender, unmount } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: 1 },
    })
    rerender({ value: 2 })
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('renders on the server as the value', () => {
    const Probe = () => createElement('span', null, useDebounce('server'))
    expect(renderToString(createElement(Probe))).toContain('server')
  })
})
