import type { PopoverOrigin } from '../../Popover/utils/computePopoverPosition'

/** Which edge of its trigger a menu lines up with: the start edge, or the end edge. */
export type MenuAlign = 'start' | 'end'

/** Where a list opens: under its trigger, or beside its row (a submenu). */
export type MenuPlacement = 'below' | 'beside'

interface MenuOrigins {
  anchorOrigin: PopoverOrigin
  transformOrigin: PopoverOrigin
}

/**
 * The anchor and transform origins `computePopoverPosition` places a list with. `align`
 * is logical - in a right-to-left page `start` is the right edge. Below its trigger, the
 * list lines up with that edge; beside its row, it opens past the row's other edge (to
 * the right for a start-aligned menu in a left-to-right page). The placement flips to the
 * other side on its own where the window has no room.
 */
export function getMenuOrigins(
  placement: MenuPlacement,
  align: MenuAlign,
  isRtl: boolean
): MenuOrigins {
  const isStartLeft = (align === 'start') !== isRtl
  const edge = isStartLeft ? 'left' : 'right'
  if (placement === 'below') {
    return {
      anchorOrigin: { vertical: 'bottom', horizontal: edge },
      transformOrigin: { vertical: 'top', horizontal: edge },
    }
  }
  return {
    anchorOrigin: { vertical: 'top', horizontal: isStartLeft ? 'right' : 'left' },
    transformOrigin: { vertical: 'top', horizontal: edge },
  }
}
