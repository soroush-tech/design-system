import type { PopoverOrigin } from '../../Popover/utils/computePopoverPosition'
import type { PlacementContext } from '../../utils/useAnchoredPlacement'

/** A side of its child a tooltip sits on - and, after the dash, which end of that side it lines up with. */
export type FixedTooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

/** A fixed placement, or `auto` - the side with the most room, chosen as it is placed. */
export type TooltipPlacement = FixedTooltipPlacement | 'auto' | 'auto-start' | 'auto-end'

export const tooltipPlacementValues = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'auto',
  'auto-start',
  'auto-end',
] satisfies TooltipPlacement[]

interface TooltipOrigins {
  anchorOrigin: PopoverOrigin
  transformOrigin: PopoverOrigin
}

const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' } as const

/**
 * The origins `computePopoverPosition` places a tooltip with: its edge against the child's edge on
 * its side, and - for `-start` and `-end` - the two lined up on the same end. `start` is logical:
 * the right edge in a right-to-left page, and `left` and `right` swap there too. The placement
 * flips to the other side on its own where the window has no room.
 */
export function getTooltipOrigins(
  placement: FixedTooltipPlacement,
  isRtl: boolean
): TooltipOrigins {
  const [side, end] = placement.split('-') as [keyof typeof opposite, 'start' | 'end' | undefined]
  const isVertical = side === 'top' || side === 'bottom'
  if (isVertical) {
    // Along the side: the child's start or end edge, or the middle.
    let edge: 'left' | 'right' | 'center' = 'center'
    if (end !== undefined) edge = (end === 'start') !== isRtl ? 'left' : 'right'
    return {
      anchorOrigin: { vertical: side, horizontal: edge },
      transformOrigin: { vertical: opposite[side], horizontal: edge },
    }
  }
  // The sides that are the page's left and right swap right to left; the vertical ones do not.
  const toward = (isRtl ? opposite[side] : side) as 'left' | 'right'
  // Along the side: the child's top or bottom edge, or the middle.
  let edge: 'top' | 'bottom' | 'center' = 'center'
  if (end !== undefined) edge = end === 'start' ? 'top' : 'bottom'
  return {
    anchorOrigin: { vertical: edge, horizontal: toward },
    transformOrigin: { vertical: edge, horizontal: opposite[toward] },
  }
}

const AUTO_SIDES = ['top', 'bottom', 'right', 'left'] as const

/**
 * The fixed placement a placement stands for. `auto` is the side of the child with the most room
 * left once the tooltip is on it - above, below, then beside, on a tie - and `auto-start` and
 * `auto-end` line it up with that end of the side. The window is measured, so a tooltip next to
 * the window edge goes to the other side.
 */
export function resolveTooltipPlacement(
  placement: TooltipPlacement,
  { anchorRect, surfaceSize, viewport, isRtl }: PlacementContext
): FixedTooltipPlacement {
  if (!placement.startsWith('auto')) return placement as FixedTooltipPlacement
  const room = {
    top: anchorRect.top - surfaceSize.height,
    bottom: viewport.height - anchorRect.bottom - surfaceSize.height,
    left: anchorRect.left - surfaceSize.width,
    right: viewport.width - anchorRect.right - surfaceSize.width,
  }
  const side = AUTO_SIDES.reduce((best, next) => (room[next] > room[best] ? next : best), 'top')
  // The sides here are the window's; the placements' left and right are the page's start and end.
  const isBeside = side === 'left' || side === 'right'
  const logical = isBeside && isRtl ? opposite[side] : side
  const end = placement.split('-')[1]
  return (end ? `${logical}-${end}` : logical) as FixedTooltipPlacement
}
