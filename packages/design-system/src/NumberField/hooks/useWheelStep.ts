import { useEffect, useRef, type RefObject } from 'react'

/**
 * Steps a focused field by the mouse wheel - up for a wheel up. A native listener, since the
 * page must not scroll as it turns, and a React one can't prevent that.
 */
export function useWheelStep(
  ref: RefObject<HTMLElement | null>,
  isEnabled: boolean,
  onStep: (direction: 1 | -1) => void
) {
  const stepRef = useRef(onStep)
  useEffect(() => {
    stepRef.current = onStep
  })

  useEffect(() => {
    const element = ref.current
    if (!isEnabled || !element) return undefined
    const handleWheel = (event: WheelEvent) => {
      if (element.ownerDocument.activeElement !== element) return
      event.preventDefault()
      stepRef.current(event.deltaY < 0 ? 1 : -1)
    }
    element.addEventListener('wheel', handleWheel, { passive: false })
    return () => element.removeEventListener('wheel', handleWheel)
  }, [ref, isEnabled])
}
