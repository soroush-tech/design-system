import { useCallback, useEffect, useRef } from 'react'
import { DEBOUNCE_DELAY_MS } from './useDebounce'
import { useEventCallback } from './useEventCallback'

/**
 * A function that calls `callback` with the arguments of its last call, once `delayMs` has
 * passed with no other call. Its identity changes only with `delayMs`, the call always reaches
 * the latest `callback`, and a call still waiting when the component unmounts never runs.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number = DEBOUNCE_DELAY_MS
): (...args: Args) => void {
  const latest = useEventCallback(callback)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  return useCallback(
    (...args: Args) => {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => latest(...args), delayMs)
    },
    [latest, delayMs]
  )
}
