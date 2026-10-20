import { useCallback, useEffect, useLayoutEffect, useState, type RefObject } from 'react'
import {
  computePopoverPosition,
  type PopoverPosition,
} from '../../Popover/utils/computePopoverPosition'
import { getMenuOrigins, type MenuAlign, type MenuPlacement } from '../utils/getMenuOrigins'
import { hasRoomBeside } from '../utils/hasRoomBeside'
import { isRtl } from '../../utils/isRtl'

export interface UseMenuPlacementParams {
  isOpen: boolean
  /** The element the list opens against: its trigger, or its row. With `anchorPosition`, only its direction (left to right or right to left) is read. */
  anchorRef: RefObject<HTMLElement | null>
  /** A point in the window to open at instead - a context menu opens where it was asked for. */
  anchorPosition?: PopoverPosition | null
  /** The `position: fixed` surface to place. */
  surfaceRef: RefObject<HTMLElement | null>
  placement: MenuPlacement
  align: MenuAlign
  /** The least room between the list and the window's edge, in pixels. */
  margin: number
}

/**
 * Places a menu's `position: fixed` surface in the window, next to its anchor - so a
 * scrolling panel's overflow never clips it, while it stays in the menu's own box in the
 * DOM. Placed before paint on every render while open, and again on resize and on any
 * scroll. The surface starts `visibility: hidden` and is shown here, as it is placed - in
 * the same layout pass, so it is visible by the time anything inside it takes focus.
 * Returns whether a list beside its row opened on the other side for want of room.
 */
export function useMenuPlacement({
  isOpen,
  anchorRef,
  surfaceRef,
  placement,
  align,
  margin,
  anchorPosition = null,
}: UseMenuPlacementParams): boolean {
  const [isFlipped, setIsFlipped] = useState(false)
  // Read as numbers, so a caller's new object for the same point doesn't re-place the list.
  const pointTop = anchorPosition?.top
  const pointLeft = anchorPosition?.left ?? 0
  const place = useCallback(() => {
    const anchor = anchorRef.current
    const surface = surfaceRef.current
    // A resize or scroll can land between the list's removal and its listeners'.
    if (!anchor || !surface) return
    const isPoint = pointTop !== undefined
    const anchorRect = anchor.getBoundingClientRect()
    const paperRect = { width: surface.offsetWidth, height: surface.offsetHeight }
    const viewport = { width: window.innerWidth, height: window.innerHeight }
    // A submenu with room on neither side of its row opens under it (or over it) instead,
    // so it never covers the row it came from.
    const isCramped =
      placement === 'beside' && !hasRoomBeside(anchorRect, paperRect.width, viewport.width, margin)
    const { top, left } = computePopoverPosition({
      anchorReference: isPoint ? 'anchorPosition' : 'anchorEl',
      anchorPosition: isPoint ? { top: pointTop, left: pointLeft } : undefined,
      anchorRect,
      paperRect,
      ...getMenuOrigins(isCramped ? 'below' : placement, align, isRtl(anchor)),
      viewport,
      marginThreshold: margin,
    })
    surface.style.top = `${top}px`
    surface.style.left = `${left}px`
    // An ancestor with a transform, a filter or containment - a zoom wrapper, a sliding drawer -
    // makes itself the list's containing block, so `fixed` no longer measures from the window.
    // Where the list landed tells by how much, and it is moved back by that - when the box
    // measured is the list's own laid-out one: unlaid out (jsdom) it has no size, and scaled its
    // size differs, and either way it stays.
    const landed = surface.getBoundingClientRect()
    const isOwnBox = paperRect.width > 0 && Math.round(landed.width) === paperRect.width
    const shiftTop = Math.round(landed.top - top!)
    const shiftLeft = Math.round(landed.left - left!)
    if (isOwnBox && (shiftTop !== 0 || shiftLeft !== 0)) {
      surface.style.top = `${top! - shiftTop}px`
      surface.style.left = `${left! - shiftLeft}px`
    }
    surface.style.visibility = 'visible'
    if (placement === 'beside') {
      // A list is always placed against its anchor here, so it always has a left.
      const isOpeningRight = left! + paperRect.width / 2 > anchorRect.left + anchorRect.width / 2
      const isRightPreferred = (align === 'start') !== isRtl(anchor)
      setIsFlipped(!isCramped && isOpeningRight !== isRightPreferred)
    }
  }, [anchorRef, surfaceRef, placement, align, margin, pointTop, pointLeft])

  // Every render while open: rows added, removed or relabelled change the list's size.
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

  return isFlipped
}
