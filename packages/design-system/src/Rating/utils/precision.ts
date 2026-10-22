import { clamp } from '../../utils/clamp'
import { roundToPrecision } from '../../utils/precision'

export interface HoverValueParams {
  /** How far along the rating's width the pointer is, in pixels - from its start edge. */
  offset: number
  width: number
  max: number
  precision: number
}

/** The value under the pointer: along the width, rounded to a step, between one step and `max`. */
export function getHoverValue({ offset, width, max, precision }: HoverValueParams): number {
  const raw = max * (offset / width) + precision / 2
  return clamp(roundToPrecision(raw, precision)!, precision, max)
}
