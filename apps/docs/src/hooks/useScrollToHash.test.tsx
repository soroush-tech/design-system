import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useScrollToHash } from './useScrollToHash'

const scrollIntoView = vi.fn()

// jsdom lays nothing out: the observer is driven by hand.
let resize: () => void
const disconnect = vi.fn()
class FakeResizeObserver {
  constructor(callback: () => void) {
    resize = callback
  }
  observe = vi.fn()
  disconnect = disconnect
}

const withSection = (id: string) => {
  const section = document.createElement('h2')
  section.id = id
  section.scrollIntoView = scrollIntoView
  document.body.append(section)
}

beforeEach(() => {
  // Cleared here, not after: the last test's hook is unmounted - and lets go - after afterEach.
  scrollIntoView.mockClear()
  disconnect.mockClear()
  vi.useFakeTimers()
  vi.stubGlobal('ResizeObserver', FakeResizeObserver)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  document.body.replaceChildren()
  document.documentElement.style.scrollPaddingTop = ''
  window.history.replaceState(null, '', '/')
})

describe('useScrollToHash', () => {
  it("brings the URL's section into view once the page has rendered", () => {
    withSection('rows-from-data')
    window.history.replaceState(null, '', '/design-system/api/menu-item/#rows-from-data')
    renderHook(() => useScrollToHash('/design-system/api/menu-item/'))
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })

  it('holds it in view while the page resizes, then lets go once the page has settled', () => {
    withSection('menulist')
    window.history.replaceState(null, '', '/design-system/components/menu/#menulist')
    renderHook(() => useScrollToHash('/design-system/components/menu/'))
    resize()
    resize()
    expect(scrollIntoView).toHaveBeenCalledTimes(3)
    vi.advanceTimersByTime(3000)
    expect(disconnect).toHaveBeenCalledTimes(1)
  })

  it('lets go as soon as the reader scrolls, so it never fights them', () => {
    withSection('menulist')
    window.history.replaceState(null, '', '/#menulist')
    renderHook(() => useScrollToHash('/'))
    window.dispatchEvent(new Event('wheel'))
    expect(disconnect).toHaveBeenCalledTimes(1)
    window.dispatchEvent(new Event('keydown'))
    expect(disconnect).toHaveBeenCalledTimes(1)
  })

  it('lands the section below the sticky top bar, by its height', () => {
    const bar = document.createElement('header')
    vi.spyOn(bar, 'getBoundingClientRect').mockReturnValue({ height: 136 } as DOMRect)
    document.body.append(bar)
    withSection('submenus')
    window.history.replaceState(null, '', '/design-system/api/menu-item/#submenus')
    renderHook(() => useScrollToHash('/design-system/api/menu-item/'))
    expect(document.documentElement.style.scrollPaddingTop).toBe('136px')
  })

  it('needs no top bar to bring the section into view', () => {
    withSection('props')
    window.history.replaceState(null, '', '/#props')
    renderHook(() => useScrollToHash('/'))
    expect(document.documentElement.style.scrollPaddingTop).toBe('0px')
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })

  it('does it again after a navigation to another page, letting go of the last one', () => {
    withSection('menulist')
    window.history.replaceState(null, '', '/design-system/components/menu/#menulist')
    const { rerender } = renderHook(({ url }) => useScrollToHash(url), {
      initialProps: { url: '/design-system/components/menu/' },
    })
    rerender({ url: '/design-system/components/menu/' })
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    rerender({ url: '/design-system/components/tabs/' })
    expect(disconnect).toHaveBeenCalledTimes(1)
    expect(scrollIntoView).toHaveBeenCalledTimes(2)
  })

  it('reads an encoded section name', () => {
    withSection('größe')
    window.history.replaceState(null, '', `/#${encodeURIComponent('größe')}`)
    renderHook(() => useScrollToHash('/'))
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })

  it('does nothing without a section, or for one the page lacks', () => {
    withSection('props')
    renderHook(() => useScrollToHash('/'))
    window.history.replaceState(null, '', '/#missing')
    renderHook(() => useScrollToHash('/other/'))
    expect(scrollIntoView).not.toHaveBeenCalled()
  })
})
