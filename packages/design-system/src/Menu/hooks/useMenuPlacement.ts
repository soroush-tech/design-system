import { useCallback, useState, type RefObject } from 'react'
import type { PopoverPosition } from '../../Popover/utils/computePopoverPosition'
import {
  useAnchoredPlacement,
  type AnchoredPlacement,
  type PlacementContext,
} from '../../utils/useAnchoredPlacement'
import { getMenuOrigins, type MenuAlign, type MenuPlacement } from '../utils/getMenuOrigins'
import { hasRoomBeside } from '../utils/hasRoomBeside'

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
 * Places a menu's `position: fixed` surface in the window, next to its anchor, with the shared
 * `useAnchoredPlacement`. A submenu with room on neither side of its row opens under it (or over
 * it) instead, so it never covers the row it came from. Returns whether a list beside its row
 * opened on the other side for want of room.
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

  const isCramped = useCallback(
    ({ anchorRect, surfaceSize, viewport }: PlacementContext) =>
      placement === 'beside' &&
      !hasRoomBeside(anchorRect, surfaceSize.width, viewport.width, margin),
    [placement, margin]
  )

  const getOrigins = useCallback(
    (context: PlacementContext) =>
      getMenuOrigins(isCramped(context) ? 'below' : placement, align, context.isRtl),
    [isCramped, placement, align]
  )

  const onPlaced = useCallback(
    (placed: AnchoredPlacement) => {
      if (placement !== 'beside') return
      const { anchorRect, surfaceSize, left, isRtl } = placed
      const isOpeningRight = left + surfaceSize.width / 2 > anchorRect.left + anchorRect.width / 2
      const isRightPreferred = (align === 'start') !== isRtl
      setIsFlipped(!isCramped(placed) && isOpeningRight !== isRightPreferred)
    },
    [placement, align, isCramped]
  )

  useAnchoredPlacement({
    isOpen,
    anchorRef,
    surfaceRef,
    anchorPosition,
    getOrigins,
    margin,
    onPlaced,
  })

  return isFlipped
}
