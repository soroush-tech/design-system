'use client'

import { useLayoutEffect } from 'react'
import { useStyleValue, type LiveValue } from '../styled'

/**
 * A number a style reads through a CSS variable, kept at `value`: a style that holds it is one
 * class whatever `value` is, so a value that follows a gesture or a measure (a thumb, an offset)
 * writes no rule and renders no attribute. The variable changes before the browser paints.
 */
export function useLiveValue(value: number, unit?: string): LiveValue {
  const [live, setLive] = useStyleValue(value, unit)
  useLayoutEffect(() => setLive(value), [value, setLive])
  return live
}
