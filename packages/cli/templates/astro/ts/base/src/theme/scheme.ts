// @if !ssg
import { useSyncExternalStore } from 'react'

type Scheme = 'light' | 'dark'

let current: Scheme = '__SCHEME__'
const listeners = new Set<() => void>()

/** Switches the color scheme of every island, on this page and the pages the app moves to. */
export function setScheme(scheme: Scheme) {
  current = scheme
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/**
 * The color scheme every island draws in. Each island is a React root of its own, so they share
 * it here, not through context. An island first draws the default, as the server did, so it
 * hydrates on the HTML it was given, then the scheme picked.
 */
export function useScheme(): Scheme {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => '__SCHEME__'
  )
}
// @endif
