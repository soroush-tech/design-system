import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'
import { getScrollForDrag, getThumb, type ScrollMetrics, type Thumb } from '../utils/scrollThumb'

/** Which way a thumb runs: down the right edge, or along the bottom. */
export type ScrollAxis = 'y' | 'x'

/** The thumb of a scrolling box on one axis, and the pointer-down that drags it or pages. */
export interface ScrollThumb {
  /** `null` while nothing overflows on this axis: no track is drawn. */
  thumb: Thumb | null
  /** For the track: on the thumb it drags; elsewhere it pages one view toward the pointer. */
  onTrackPointerDown: (event: ReactPointerEvent<HTMLElement>) => void
  /** Whether the thumb is being dragged, which holds it shown while the pointer leaves. */
  isDragging: boolean
}

const getMetrics = (box: HTMLElement, axis: ScrollAxis): ScrollMetrics =>
  axis === 'y'
    ? { offset: box.scrollTop, content: box.scrollHeight, view: box.clientHeight }
    : { offset: box.scrollLeft, content: box.scrollWidth, view: box.clientWidth }

const scrollTo = (box: HTMLElement, axis: ScrollAxis, offset: number) => {
  if (axis === 'y') box.scrollTop = offset
  else box.scrollLeft = offset
}

/**
 * Follows the box `ref` holds along `axis`: its thumb is measured again when it scrolls and when
 * it or its content changes size. A press on the thumb drags it, with the pointer captured so the
 * drag goes on wherever the pointer goes; a press on the track pages toward it, as a native track.
 */
export function useScrollThumb(ref: RefObject<HTMLElement | null>, axis: ScrollAxis): ScrollThumb {
  const [thumb, setThumb] = useState<Thumb | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const box = ref.current as HTMLElement
    const measure = () => setThumb(getThumb(getMetrics(box, axis)))
    measure()
    box.addEventListener('scroll', measure, { passive: true })
    // Where there is no observer - a test DOM - it is measured on mount and on scroll only.
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(box)
    for (const child of box.children) observer?.observe(child)
    return () => {
      box.removeEventListener('scroll', measure)
      observer?.disconnect()
    }
  }, [ref, axis])

  // The end of a drag in progress, so unmounting ends it.
  const stopDrag = useRef<(() => void) | null>(null)
  useEffect(() => () => stopDrag.current?.(), [])

  const startDrag = (event: ReactPointerEvent<HTMLElement>, box: HTMLElement) => {
    const target = event.currentTarget
    const origin = axis === 'y' ? event.clientY : event.clientX
    const from = getMetrics(box, axis).offset
    const handleMove = (moved: PointerEvent) => {
      const by = (axis === 'y' ? moved.clientY : moved.clientX) - origin
      scrollTo(box, axis, getScrollForDrag(from, by, getMetrics(box, axis)))
    }
    const end = () => {
      target.removeEventListener('pointermove', handleMove)
      target.removeEventListener('pointerup', end)
      target.removeEventListener('pointercancel', end)
      stopDrag.current = null
      setIsDragging(false)
    }
    target.setPointerCapture(event.pointerId)
    target.addEventListener('pointermove', handleMove)
    target.addEventListener('pointerup', end)
    target.addEventListener('pointercancel', end)
    stopDrag.current = end
    setIsDragging(true)
  }

  const onTrackPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    const box = ref.current as HTMLElement
    if (thumb === null || event.button !== 0) return
    // No compatibility mouse events follow, so dragging the thumb selects no text on the way.
    event.preventDefault()
    const track = event.currentTarget.getBoundingClientRect()
    const at =
      axis === 'y'
        ? ((event.clientY - track.top) / track.height) * 100
        : ((event.clientX - track.left) / track.width) * 100
    if (at >= thumb.start && at <= thumb.start + thumb.size) {
      startDrag(event, box)
      return
    }
    // Off the thumb: one view toward the pointer, as a native track does.
    const page = getMetrics(box, axis).view * (at < thumb.start ? -1 : 1)
    box.scrollBy(axis === 'y' ? { top: page } : { left: page })
  }

  return { thumb, onTrackPointerDown, isDragging }
}
