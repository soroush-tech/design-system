import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTabsOverflow } from './useTabsOverflow'

// jsdom lays nothing out: the list and its tabs are measured by hand.
const listOf = (room: number, sizes: Record<string, number>, isVertical = false) => {
  const list = document.createElement('div')
  Object.defineProperty(list, isVertical ? 'clientHeight' : 'clientWidth', {
    value: room,
    configurable: true,
  })
  for (const [value, size] of Object.entries(sizes)) {
    const tab = document.createElement('div')
    tab.dataset.tabValue = value
    tab.getBoundingClientRect = () => ({ width: size, height: size }) as DOMRect
    list.append(tab)
  }
  document.body.append(list)
  return list
}

let resize: () => void
const disconnect = vi.fn()
class FakeResizeObserver {
  constructor(callback: () => void) {
    resize = callback
  }
  observe = vi.fn()
  disconnect = disconnect
}

afterEach(() => {
  vi.unstubAllGlobals()
  disconnect.mockClear()
  document.body.replaceChildren()
})

describe('useTabsOverflow', () => {
  it('lists the tabs that do not fit whole, the selected one kept', () => {
    const ref = { current: listOf(250, { a: 100, b: 100, c: 100 }) }
    const { result } = renderHook(() => useTabsOverflow(ref, true, false, ['a', 'b', 'c'], 'c'))
    expect(result.current.hidden).toEqual(['b'])
  })

  it('measures a column by its height, and numeric values by their own', () => {
    const ref = { current: listOf(150, { 0: 100, 1: 100 }, true) }
    const { result } = renderHook(() => useTabsOverflow(ref, true, true, [0, 1], 0))
    expect(result.current.hidden).toEqual([1])
  })

  it('takes the padding and the gap from the list', () => {
    const list = listOf(300, { a: 100, b: 100, c: 100 })
    list.style.paddingLeft = '20px'
    list.style.columnGap = '10px'
    const { result } = renderHook(() =>
      useTabsOverflow({ current: list }, true, false, ['a', 'b', 'c'], 'a')
    )
    expect(result.current.hidden).toEqual(['c'])
  })

  it('re-measures when the list resizes, and lets go when unmounted', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver)
    const list = listOf(400, { a: 100, b: 100, c: 100 })
    const ref = { current: list }
    const { result, unmount } = renderHook(() =>
      useTabsOverflow(ref, true, false, ['a', 'b', 'c'], 'a')
    )
    expect(result.current.hidden).toEqual([])
    Object.defineProperty(list, 'clientWidth', { value: 150 })
    act(() => resize())
    expect(result.current.hidden).toEqual(['b', 'c'])
    // And on demand.
    Object.defineProperty(list, 'clientWidth', { value: 400 })
    act(() => result.current.update())
    expect(result.current.hidden).toEqual([])
    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
  })

  it('keeps the same list when a measurement changes nothing', () => {
    const ref = { current: listOf(150, { a: 100, b: 100 }) }
    const { result, rerender } = renderHook(() =>
      useTabsOverflow(ref, true, false, ['a', 'b'], 'a')
    )
    const first = result.current.hidden
    rerender()
    expect(result.current.hidden).toBe(first)
  })

  it('lists nothing when off, with no list, or with no room laid out', () => {
    const ref = { current: listOf(100, { a: 100, b: 100 }) }
    expect(
      renderHook(() => useTabsOverflow(ref, false, false, ['a', 'b'], 'a')).result.current.hidden
    ).toEqual([])
    expect(
      renderHook(() => useTabsOverflow({ current: null }, true, false, ['a'], 'a')).result.current
        .hidden
    ).toEqual([])
    const unlaid = { current: listOf(0, { a: 100, b: 100 }) }
    expect(
      renderHook(() => useTabsOverflow(unlaid, true, false, ['a', 'b'], 'a')).result.current.hidden
    ).toEqual([])
  })
})
