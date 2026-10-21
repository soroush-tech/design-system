import { useCallback, useEffect, useRef } from 'react'

export interface UseHoldRepeatOptions {
  /** How long a press is held before it starts to repeat, in milliseconds. Default: `400`. */
  delay?: number
  /** The time between repeats once it has started, in milliseconds. Default: `60`. */
  interval?: number
}

/**
 * Runs `action` at once on a press, then again and again while it is held - after a pause, so a
 * tap is one step. `start` begins it, `stop` ends it, and it ends by itself when the component
 * goes.
 */
export function useHoldRepeat(
  action: () => void,
  { delay = 400, interval = 60 }: UseHoldRepeatOptions = {}
) {
  const actionRef = useRef(action)
  useEffect(() => {
    actionRef.current = action
  })
  const timers = useRef<{ pause?: number; repeat?: number }>({})

  const stop = useCallback(() => {
    window.clearTimeout(timers.current.pause)
    window.clearInterval(timers.current.repeat)
    timers.current = {}
  }, [])

  const start = useCallback(() => {
    stop()
    actionRef.current()
    timers.current.pause = window.setTimeout(() => {
      timers.current.repeat = window.setInterval(() => actionRef.current(), interval)
    }, delay)
  }, [stop, delay, interval])

  useEffect(() => stop, [stop])

  return { start, stop }
}
