import type { PopoverOrigin } from '../../Popover/utils/computePopoverPosition'

/** The side of its child a tooltip sits on - and, after the dash, which end of that side it lines up with. */
export type TooltipPlacement =
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
export function getTooltipOrigins(placement: TooltipPlacement, isRtl: boolean): TooltipOrigins {
  const [side, end] = placement.split('-') as [keyof typeof opposite, 'start' | 'end' | undefined]
  const isVertical = side === 'top' || side === 'bottom'
  if (isVertical) {
    // Along the side: the child's start or end edge, or the middle.
    const edge = end === undefined ? 'center' : (end === 'start') !== isRtl ? 'left' : 'right'
    return {
      anchorOrigin: { vertical: side, horizontal: edge },
      transformOrigin: { vertical: opposite[side], horizontal: edge },
    }
  }
  // The sides that are the page's left and right swap right to left; the vertical ones do not.
  const toward = (isRtl ? opposite[side] : side) as 'left' | 'right'
  // Along the side: the child's top or bottom edge, or the middle.
  const edge = end === undefined ? 'center' : end === 'start' ? 'top' : 'bottom'
  return {
    anchorOrigin: { vertical: edge, horizontal: toward },
    transformOrigin: { vertical: edge, horizontal: opposite[toward] },
  }
}
