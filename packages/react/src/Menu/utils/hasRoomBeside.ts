import type { AnchorRect } from '../../Popover/utils/computePopoverPosition'

/**
 * Whether a list `width` wide fits on either side of its row and still keeps `margin` from
 * the window's edges - so a submenu can open beside the row at all.
 */
export function hasRoomBeside(
  anchorRect: AnchorRect,
  width: number,
  viewportWidth: number,
  margin: number
): boolean {
  const roomBefore = anchorRect.left - margin
  const roomAfter = viewportWidth - margin - (anchorRect.left + anchorRect.width)
  return width <= Math.max(roomBefore, roomAfter)
}
