import { useEffect, useState } from 'react'

/** How long the value must stay unchanged before `useDebounce` returns it, in ms. */
export const DEBOUNCE_DELAY_MS = 500

/**
 * A value that follows `value` once it has stayed unchanged for `delayMs`: a search box can
 * type fast and query on the pause. The first render returns `value` as it is, and a change
 * during the delay restarts it. Needs no browser: it renders on the server as `value`.
 */
export function useDebounce<T>(value: T, delayMs: number = DEBOUNCE_DELAY_MS): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
