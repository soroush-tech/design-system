import { useState } from 'react'

export interface UseControlledParams<T> {
  /** The controlled value - `undefined` leaves the control uncontrolled (`null` is a value). */
  controlled: T | undefined
  /** The value at first, when uncontrolled. */
  default: T
}

/**
 * A value a control owns until its owner takes it over: the controlled value when there is one,
 * otherwise its own state. The setter keeps that state moving either way, so a control that
 * stays uncontrolled needs no branch.
 */
export function useControlled<T>({
  controlled,
  default: defaultValue,
}: UseControlledParams<T>): [T, (value: T) => void] {
  const [state, setState] = useState(defaultValue)
  return [controlled === undefined ? state : controlled, setState]
}
