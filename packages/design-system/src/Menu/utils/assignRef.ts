import type { Ref } from 'react'

/** Hands `value` to a ref of either kind - a callback, or an object - when there is one. */
export function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (typeof ref === 'function') ref(value)
  else if (ref) ref.current = value
}
