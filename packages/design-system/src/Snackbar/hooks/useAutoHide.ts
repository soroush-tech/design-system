import { useCallback, useEffect, useRef } from 'react'

export interface UseAutoHideParams {
  isOpen: boolean
  /** How long it stays, in milliseconds - nothing keeps it open. */
  duration?: number
  /** How long it stays once the pointer or focus has left. Default: half of `duration`. */
  resumeDuration?: number
  /** Called when the time is up. */
  onHide: () => void
}

/**
 * The clock of a message that hides itself: it runs while the message is open, stops while the
 * pointer or the focus is on it, and starts again - for `resumeDuration` - once they leave.
 */
export function useAutoHide({ isOpen, duration, resumeDuration, onHide }: UseAutoHideParams) {
  const timer = useRef<number | undefined>(undefined)
  const hide = useRef(onHide)
  useEffect(() => {
    hide.current = onHide
  })

  const stop = useCallback(() => window.clearTimeout(timer.current), [])
  const start = useCallback(
    (ms: number | undefined) => {
      stop()
      if (ms !== undefined) timer.current = window.setTimeout(() => hide.current(), ms)
    },
    [stop]
  )

  useEffect(() => {
    if (!isOpen) return undefined
    start(duration)
    return stop
  }, [isOpen, duration, start, stop])

  const resume = useCallback(() => {
    if (!isOpen || duration === undefined) return
    start(resumeDuration ?? duration / 2)
  }, [isOpen, duration, resumeDuration, start])

  return { pause: stop, resume }
}
