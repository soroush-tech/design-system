/** What a scrolling box reports about itself along one axis, in pixels. */
export interface ScrollMetrics {
  /** How far it is scrolled: `scrollTop` or `scrollLeft`. */
  offset: number
  /** The length of its content: `scrollHeight` or `scrollWidth`. */
  content: number
  /** The length of its view: `clientHeight` or `clientWidth`. */
  view: number
}

/** Where the thumb sits on its track, in percent of the track. */
export interface Thumb {
  start: number
  size: number
}

/** The shortest the thumb gets, so a long list still leaves something to grab. */
export const MIN_THUMB_PX = 24

/**
 * The thumb for a box scrolled to `offset`, or `null` when nothing overflows. Its size is the
 * share of the content in view, never under `MIN_THUMB_PX`; it travels the rest of the track as
 * the box travels its scroll range, so the thumb end meets the track end at the end.
 */
export const getThumb = ({ offset, content, view }: ScrollMetrics): Thumb | null => {
  const range = content - view
  if (range <= 0 || view <= 0) return null
  const size = Math.min(100, Math.max(view / content, MIN_THUMB_PX / view) * 100)
  const travelled = Math.min(1, Math.max(0, offset / range))
  return { start: travelled * (100 - size), size }
}

/**
 * The scroll offset a thumb dragged `by` pixels from `from` asks for: the drag covers the thumb
 * travel, which maps onto the whole scroll range of the box.
 */
export const getScrollForDrag = (from: number, by: number, metrics: ScrollMetrics): number => {
  const thumb = getThumb(metrics)
  if (thumb === null) return from
  const travel = metrics.view * (1 - thumb.size / 100)
  const range = metrics.content - metrics.view
  return Math.min(range, Math.max(0, from + (by * range) / travel))
}
