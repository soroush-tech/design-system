import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import type { RefObject } from 'react'
import { useAnchoredPlacement, type UseAnchoredPlacementParams } from './useAnchoredPlacement'

const rect = (left: number, top: number, width: number, height: number) =>
  ({
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
  }) as DOMRect

// An element jsdom could lay out: the sizes and rects it is given.
const element = (box: DOMRect, size?: { width: number; height: number }) => {
  const node = document.createElement('div')
  vi.spyOn(node, 'getBoundingClientRect').mockReturnValue(box)
  if (size) {
    Object.defineProperty(node, 'offsetWidth', { value: size.width })
    Object.defineProperty(node, 'offsetHeight', { value: size.height })
  }
  return node
}
// A fixed surface lands where it is placed: its rect follows its own top and left.
const fixedSurface = (size: { width: number; height: number }) => {
  const node = element(rect(0, 0, size.width, size.height), size)
  vi.spyOn(node, 'getBoundingClientRect').mockImplementation(() =>
    rect(
      Number.parseFloat(node.style.left) || 0,
      Number.parseFloat(node.style.top) || 0,
      size.width,
      size.height
    )
  )
  return node
}
const ref = (node: HTMLElement | null): RefObject<HTMLElement | null> => ({ current: node })

// Below the anchor, on its left edge.
const below = () => ({
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' } as const,
  transformOrigin: { vertical: 'top', horizontal: 'left' } as const,
})

const place = (overrides: Partial<UseAnchoredPlacementParams> = {}) => {
  const anchor = element(rect(100, 50, 80, 20))
  const surface = fixedSurface({ width: 60, height: 30 })
  const hook = renderHook(
    (props: Partial<UseAnchoredPlacementParams>) =>
      useAnchoredPlacement({
        isOpen: true,
        anchorRef: ref(anchor),
        surfaceRef: ref(surface),
        getOrigins: below,
        margin: 0,
        ...props,
      }),
    { initialProps: overrides }
  )
  return { anchor, surface, ...hook }
}

afterEach(() => vi.restoreAllMocks())

describe('useAnchoredPlacement', () => {
  it('places the surface where its origin meets the anchor, and shows it', () => {
    const { surface } = place()
    expect(surface.style.top).toBe('70px')
    expect(surface.style.left).toBe('100px')
    expect(surface.style.visibility).toBe('visible')
  })

  it('keeps clear of the anchor by the gap on the side it sits on, and lines up with its edge along it', () => {
    const { surface } = place({ gap: 8 })
    // Below the anchor: 8 further down; on the anchor's own left edge, not 8 beyond it.
    expect(surface.style.top).toBe('78px')
    expect(surface.style.left).toBe('100px')
  })

  it('keeps the gap beside the anchor too, lined up with its top edge', () => {
    const { surface } = place({
      gap: 8,
      getOrigins: () => ({
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      }),
    })
    // The anchor spans 100-180 across and 50-70 down: the surface starts 8 past its right edge.
    expect(surface.style.left).toBe('188px')
    expect(surface.style.top).toBe('50px')
  })

  it('keeps the gap on both axes where the surface sits on neither side of the anchor', () => {
    const { surface } = place({
      gap: 8,
      getOrigins: () => ({
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      }),
    })
    expect(surface.style.top).toBe('42px')
    expect(surface.style.left).toBe('92px')
  })

  it('places at a point in the window when it is given one', () => {
    const { surface } = place({ anchorPosition: { top: 200, left: 300 } })
    expect(surface.style.top).toBe('200px')
    expect(surface.style.left).toBe('300px')
  })

  it('places at a point with no anchor element, as at an anchor of no size', () => {
    const { surface } = place({ anchorRef: ref(null), anchorPosition: { top: 200, left: 300 } })
    expect(surface.style.top).toBe('200px')
    expect(surface.style.left).toBe('300px')
    expect(surface.style.visibility).toBe('visible')
  })

  it('places nothing without an anchor element or a point', () => {
    const { surface } = place({ anchorRef: ref(null) })
    expect(surface.style.top).toBe('')
  })

  it('places at a point of zero left and top', () => {
    const { surface } = place({ anchorPosition: { top: 0, left: 0 } })
    expect(surface.style.top).toBe('0px')
    expect(surface.style.left).toBe('0px')
  })

  it('places nothing while it is closed', () => {
    const { surface } = place({ isOpen: false })
    expect(surface.style.top).toBe('')
    expect(surface.style.visibility).toBe('')
  })

  it('places nothing, and breaks nothing, when its anchor or its surface is gone', () => {
    const surface = element(rect(0, 0, 60, 30), { width: 60, height: 30 })
    const noAnchor = renderHook(() =>
      useAnchoredPlacement({
        isOpen: true,
        anchorRef: ref(null),
        surfaceRef: ref(surface),
        getOrigins: below,
        margin: 0,
      })
    )
    expect(surface.style.top).toBe('')
    noAnchor.unmount()
    const anchor = element(rect(100, 50, 80, 20))
    expect(() =>
      renderHook(() =>
        useAnchoredPlacement({
          isOpen: true,
          anchorRef: ref(anchor),
          surfaceRef: ref(null),
          getOrigins: below,
          margin: 0,
        })
      )
    ).not.toThrow()
  })

  it('tells where it landed, with what it was placed from', () => {
    const onPlaced = vi.fn()
    place({ onPlaced })
    expect(onPlaced).toHaveBeenCalledWith(
      expect.objectContaining({
        top: 70,
        left: 100,
        isRtl: false,
        surfaceSize: { width: 60, height: 30 },
        viewport: { width: window.innerWidth, height: window.innerHeight },
      })
    )
  })

  it('chooses its origins from the anchor, the surface and the window', () => {
    const getOrigins = vi.fn(below)
    place({ getOrigins })
    expect(getOrigins).toHaveBeenCalledWith(
      expect.objectContaining({ surfaceSize: { width: 60, height: 30 }, isRtl: false })
    )
  })

  it('reads a right-to-left page from the anchor', () => {
    const getOrigins = vi.fn(below)
    const host = document.createElement('div')
    host.setAttribute('dir', 'rtl')
    const anchor = element(rect(100, 50, 80, 20))
    host.append(anchor)
    const surface = element(rect(0, 0, 60, 30), { width: 60, height: 30 })
    renderHook(() =>
      useAnchoredPlacement({
        isOpen: true,
        anchorRef: ref(anchor),
        surfaceRef: ref(surface),
        getOrigins,
        margin: 0,
      })
    )
    expect(getOrigins).toHaveBeenCalledWith(expect.objectContaining({ isRtl: true }))
  })

  describe('a transformed ancestor', () => {
    it('moves it back by how far it landed from where it was placed', () => {
      const anchor = element(rect(100, 50, 80, 20))
      // Placed at 70, 100 - but the containing block is offset by 5 and 7: it landed there.
      const surface = element(rect(107, 75, 60, 30), { width: 60, height: 30 })
      renderHook(() =>
        useAnchoredPlacement({
          isOpen: true,
          anchorRef: ref(anchor),
          surfaceRef: ref(surface),
          getOrigins: below,
          margin: 0,
        })
      )
      expect(surface.style.top).toBe('65px')
      expect(surface.style.left).toBe('93px')
    })

    it('leaves it where it is when the box measured is not its own', () => {
      const anchor = element(rect(100, 50, 80, 20))
      // Scaled: its laid-out width differs from its own.
      const surface = element(rect(107, 75, 30, 15), { width: 60, height: 30 })
      renderHook(() =>
        useAnchoredPlacement({
          isOpen: true,
          anchorRef: ref(anchor),
          surfaceRef: ref(surface),
          getOrigins: below,
          margin: 0,
        })
      )
      expect(surface.style.top).toBe('70px')
      expect(surface.style.left).toBe('100px')
    })
  })

  describe('following', () => {
    it('places again on a resize and on a scroll, and stops when it closes', () => {
      const onPlaced = vi.fn()
      const { rerender } = place({ onPlaced })
      const placed = onPlaced.mock.calls.length
      window.dispatchEvent(new Event('resize'))
      expect(onPlaced.mock.calls).toHaveLength(placed + 1)
      window.dispatchEvent(new Event('scroll'))
      expect(onPlaced.mock.calls).toHaveLength(placed + 2)
      rerender({ onPlaced, isOpen: false })
      const closed = onPlaced.mock.calls.length
      window.dispatchEvent(new Event('resize'))
      window.dispatchEvent(new Event('scroll'))
      expect(onPlaced.mock.calls).toHaveLength(closed)
    })

    it('places again on every render while open', () => {
      const onPlaced = vi.fn()
      const { rerender } = place({ onPlaced })
      const first = onPlaced.mock.calls.length
      rerender({ onPlaced })
      expect(onPlaced.mock.calls.length).toBeGreaterThan(first)
    })

    it('works with no onPlaced', () => {
      const { surface } = place()
      window.dispatchEvent(new Event('resize'))
      expect(surface.style.visibility).toBe('visible')
    })
  })
})
