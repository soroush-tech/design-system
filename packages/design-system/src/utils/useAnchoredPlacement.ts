import { useCallback, useEffect, useLayoutEffect, type RefObject } from 'react'
import {
  computePopoverPosition,
  type PopoverOrigin,
  type PopoverPosition,
} from '../Popover/utils/computePopoverPosition'
import { isRtl } from './isRtl'

/** What the origins of a placement are chosen from: the anchor, the surface and the window. */
export interface PlacementContext {
  anchorRect: DOMRect
  surfaceSize: { width: number; height: number }
  viewport: { width: number; height: number }
  /** Whether the anchor sits in a right-to-left page. */
  isRtl: boolean
}

export interface AnchoredPlacement extends PlacementContext {
  /** Where the surface landed in the window, after flipping and keeping inside the margin. */
  top: number
  left: number
}

export interface UseAnchoredPlacementParams {
  isOpen: boolean
  /** The element the surface is placed against. With `anchorPosition`, only its direction is read. */
  anchorRef: RefObject<HTMLElement | null>
  /** A point in the window to place at instead - a context menu opens where it was asked for. */
  anchorPosition?: PopoverPosition | null
  /** The `position: fixed` surface to place. */
  surfaceRef: RefObject<HTMLElement | null>
  /** The point of the anchor the surface meets, and the point of the surface that meets it. */
  getOrigins: (context: PlacementContext) => {
    anchorOrigin: PopoverOrigin
    transformOrigin: PopoverOrigin
  }
  /** The least room between the surface and the window's edge, in pixels. */
  margin: number
  /** Room kept between the surface and the anchor itself, in pixels. Default: `0`. */
  gap?: number
  /** Told where the surface landed, each time it is placed. */
  onPlaced?: (placement: AnchoredPlacement) => void
}

/**
 * Places a `position: fixed` surface in the window next to its anchor - so a scrolling panel's
 * overflow never clips it, while it stays in its owner's box in the DOM. It is placed before
 * paint on every render while open, and again on resize and on any scroll. The surface starts
 * `visibility: hidden` and is shown here, as it is placed - in the same layout pass, so it is
 * visible by the time anything inside it takes focus. Where it flips to the other side for want
 * of room, and how it is kept inside the margin, is `computePopoverPosition`'s.
 */
export function useAnchoredPlacement({
  isOpen,
  anchorRef,
  surfaceRef,
  getOrigins,
  margin,
  gap = 0,
  anchorPosition = null,
  onPlaced,
}: UseAnchoredPlacementParams) {
  // Read as numbers, so a caller's new object for the same point doesn't re-place the surface.
  const pointTop = anchorPosition?.top
  const pointLeft = anchorPosition?.left ?? 0
  const place = useCallback(() => {
    const anchor = anchorRef.current
    const surface = surfaceRef.current
    // A resize or scroll can land between the surface's removal and its listeners'.
    if (!anchor || !surface) return
    const isPoint = pointTop !== undefined
    const rect = anchor.getBoundingClientRect()
    const surfaceSize = { width: surface.offsetWidth, height: surface.offsetHeight }
    const viewport = { width: window.innerWidth, height: window.innerHeight }
    const context = { anchorRect: rect, surfaceSize, viewport, isRtl: isRtl(anchor) }
    // The anchor grown by the gap on every side: the surface keeps clear of the real one.
    const anchorRect = {
      top: rect.top - gap,
      left: rect.left - gap,
      width: rect.width + 2 * gap,
      height: rect.height + 2 * gap,
    }
    const { top, left } = computePopoverPosition({
      anchorReference: isPoint ? 'anchorPosition' : 'anchorEl',
      anchorPosition: isPoint ? { top: pointTop, left: pointLeft } : undefined,
      anchorRect,
      paperRect: surfaceSize,
      ...getOrigins(context),
      viewport,
      marginThreshold: margin,
    })
    surface.style.top = `${top}px`
    surface.style.left = `${left}px`
    // An ancestor with a transform, a filter or containment - a zoom wrapper, a sliding drawer -
    // makes itself the surface's containing block, so `fixed` no longer measures from the window.
    // Where the surface landed tells by how much, and it is moved back by that - when the box
    // measured is its own laid-out one: unlaid out (jsdom) it has no size, and scaled its size
    // differs, and either way it stays.
    const landed = surface.getBoundingClientRect()
    const isOwnBox = surfaceSize.width > 0 && Math.round(landed.width) === surfaceSize.width
    const shiftTop = Math.round(landed.top - top!)
    const shiftLeft = Math.round(landed.left - left!)
    if (isOwnBox && (shiftTop !== 0 || shiftLeft !== 0)) {
      surface.style.top = `${top! - shiftTop}px`
      surface.style.left = `${left! - shiftLeft}px`
    }
    surface.style.visibility = 'visible'
    // A surface is always placed against an anchor here, so it always has a left and a top.
    onPlaced?.({ ...context, top: top!, left: left! })
  }, [anchorRef, surfaceRef, getOrigins, margin, gap, pointTop, pointLeft, onPlaced])

  // Every render while open: content added, removed or relabelled changes the surface's size.
  useLayoutEffect(() => {
    if (isOpen) place()
  })

  useEffect(() => {
    if (!isOpen) return undefined
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [isOpen, place])
}
