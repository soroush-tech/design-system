import { useCallback, useEffect, useLayoutEffect, useState, type RefObject } from 'react'
import { isRtl } from '../../utils/isRtl'

export interface TabsScrollState {
  /** Some tabs don't fit - the list scrolls. */
  isOverflowing: boolean
  /** Tabs are out of view before the start edge. */
  canScrollStart: boolean
  /** Tabs are out of view past the end edge. */
  canScrollEnd: boolean
}

const AT_REST: TabsScrollState = {
  isOverflowing: false,
  canScrollStart: false,
  canScrollEnd: false,
}

/** Where a scrolling list stands, its start edge first whatever the direction. */
export function readScroll(list: HTMLElement, isVertical: boolean): TabsScrollState {
  const size = isVertical ? list.clientHeight : list.clientWidth
  const total = isVertical ? list.scrollHeight : list.scrollWidth
  // Right to left, the scroll offset counts down from 0 at the start edge.
  const offset = Math.abs(isVertical ? list.scrollTop : list.scrollLeft)
  return {
    isOverflowing: total > size,
    canScrollStart: offset > 0,
    // A pixel of slack: zoom and fractional sizes leave the end a hair short.
    canScrollEnd: offset + size < total - 1,
  }
}

export interface UseTabsScrollResult extends TabsScrollState {
  /** Re-reads where the list stands - after its tabs change size from outside. */
  update: () => void
  /** Scrolls the list a view's worth toward its start (`-1`) or end (`1`). */
  scrollByView: (direction: -1 | 1) => void
}

/**
 * Keeps track of a scrolling tab list - whether its tabs overflow, and on which side some
 * are out of view - as it scrolls, resizes and re-renders.
 */
export function useTabsScroll(
  listRef: RefObject<HTMLElement | null>,
  isEnabled: boolean,
  isVertical: boolean
): UseTabsScrollResult {
  const [state, setState] = useState(AT_REST)

  const update = useCallback(() => {
    if (!isEnabled) return
    const next = readScroll(listRef.current as HTMLElement, isVertical)
    setState((previous) =>
      previous.isOverflowing === next.isOverflowing &&
      previous.canScrollStart === next.canScrollStart &&
      previous.canScrollEnd === next.canScrollEnd
        ? previous
        : next
    )
  }, [listRef, isEnabled, isVertical])

  // Every render: a tab added, removed or relabelled changes the answer.
  useLayoutEffect(update)

  useEffect(() => {
    if (!isEnabled) return undefined
    const list = listRef.current as HTMLElement
    list.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(list)
    return () => {
      list.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer?.disconnect()
    }
  }, [listRef, isEnabled, update])

  const scrollByView = (direction: -1 | 1) => {
    const list = listRef.current as HTMLElement
    const isReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    // Toward the end is leftward right to left.
    const sign = !isVertical && isRtl(list) ? -direction : direction
    const distance = sign * (isVertical ? list.clientHeight : list.clientWidth)
    list.scrollBy({
      [isVertical ? 'top' : 'left']: distance,
      behavior: isReduced ? 'auto' : 'smooth',
    })
  }

  return { ...state, update, scrollByView }
}
