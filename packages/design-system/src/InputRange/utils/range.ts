import type { ReactNode } from 'react'
import { clamp } from '../../utils/clamp'
import { addExact, snapToStep } from '../../utils/precision'

/** A tick on the rail, with a label under it when it has one. */
export interface Mark {
  value: number
  label?: ReactNode
}

export type Orientation = 'horizontal' | 'vertical'

/** How far along the range a value is, as a percent. */
export function valueToPercent(value: number, min: number, max: number): number {
  return max === min ? 0 : ((value - min) * 100) / (max - min)
}

/** The value a fraction of the way along the range is. */
export function fractionToValue(fraction: number, min: number, max: number): number {
  return (max - min) * fraction + min
}

const ascending = (a: number, b: number) => a - b

/** The thumbs' values, sorted and clamped to the range - one for a number, each for an array. */
export function normalizeValues(value: number | readonly number[], min: number, max: number) {
  const list = typeof value === 'number' ? [value] : [...value].sort(ascending)
  return list.map((entry) => clamp(entry, min, max))
}

/** The marks: one at every step for `true`, the ones given, or none. */
export function getMarks(
  marks: boolean | readonly Mark[] | undefined,
  step: number | null,
  min: number,
  max: number
): readonly Mark[] {
  if (marks === true && step !== null) {
    // The count is rounded to 12 digits first: 0.3 / 0.1 is 2.9999999999999996, not 3.
    const steps = Math.floor(Number(((max - min) / step).toPrecision(12)))
    return Array.from({ length: steps + 1 }, (_, index) => ({
      value: snapToStep(min + step * index, step, min),
    }))
  }
  return Array.isArray(marks) ? marks : []
}

/** The index of the value nearest `target` - the preferred one when it is as near as the nearest. */
export function findClosest(values: readonly number[], target: number, preferredIndex = -1) {
  let closest = 0
  values.forEach((value, index) => {
    if (Math.abs(target - value) <= Math.abs(target - values[closest])) closest = index
  })
  return preferredIndex >= 0 && values[preferredIndex] === values[closest]
    ? preferredIndex
    : closest
}

export interface MovedThumb {
  values: number[]
  /** Where the moved thumb is now - another place when it passed a neighbour. */
  index: number
}

/**
 * Moves one thumb to a value. Passing a neighbour swaps their places, the values staying sorted;
 * without `shouldSwap` the thumb stops at its neighbour instead.
 */
export function moveThumb(
  values: readonly number[],
  index: number,
  target: number,
  shouldSwap: boolean
): MovedThumb {
  const bounded = shouldSwap
    ? target
    : clamp(
        target,
        values[index - 1] ?? Number.NEGATIVE_INFINITY,
        values[index + 1] ?? Number.POSITIVE_INFINITY
      )
  const moved = values.map((value, place) => (place === index ? bounded : value)).sort(ascending)
  return { values: moved, index: shouldSwap ? moved.indexOf(bounded) : index }
}

export function areValuesEqual(a: readonly number[], b: readonly number[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index])
}

const KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PageUp',
  'PageDown',
  'Home',
  'End',
])

/** Whether the slider takes the key. */
export const isRangeKey = (key: string) => KEYS.has(key)

export interface KeyParams {
  key: string
  shiftKey: boolean
  value: number
  /** The step, or `null` for the marks alone. */
  step: number | null
  shiftStep: number
  min: number
  max: number
  isRtl: boolean
  marks: readonly Mark[]
}

// The keys that go up - to a greater value - and down, the arrows' horizontal ones by direction.
const upKeys = (isRtl: boolean) => ['ArrowUp', isRtl ? 'ArrowLeft' : 'ArrowRight', 'PageUp', 'End']
const downKeys = (isRtl: boolean) => [
  'ArrowDown',
  isRtl ? 'ArrowRight' : 'ArrowLeft',
  'PageDown',
  'Home',
]

// With no step, a key goes to the next mark the way it points, and stops at the last: Home and
// End go to the first and the last.
function getMarkValue({ key, value, isRtl, marks }: KeyParams): number | null {
  const values = marks.map((mark) => mark.value)
  if (values.length === 0) return null
  if (key === 'Home') return values[0]
  if (key === 'End') return values.at(-1)!
  if (downKeys(isRtl).includes(key))
    return [...values].reverse().find((mark) => mark < value) ?? values[0]
  return values.find((mark) => mark > value) ?? values.at(-1)!
}

/** The value a key moves a thumb to - `null` when the key moves nothing. */
export function getKeyValue(params: KeyParams): number | null {
  const { key, shiftKey, value, step, shiftStep, min, max, isRtl } = params
  if (!isRangeKey(key)) return null
  if (step === null) return getMarkValue(params)
  if (key === 'Home') return min
  if (key === 'End') return max
  // The page keys step by the large step; the arrows by the step, or the large one with Shift.
  const isPage = key === 'PageUp' || key === 'PageDown'
  const size = isPage || shiftKey ? shiftStep : step
  const direction = upKeys(isRtl).includes(key) ? 1 : -1
  return clamp(addExact(value, direction * size), min, max)
}

export interface PointParams {
  x: number
  y: number
  rect: Pick<DOMRect, 'left' | 'bottom' | 'width' | 'height'>
  orientation: Orientation
  isRtl: boolean
  min: number
  max: number
  step: number | null
  marks: readonly Mark[]
}

/** The value under a point - along the box, snapped to the step or the nearest mark. */
export function getValueAtPoint({
  x,
  y,
  rect,
  orientation,
  isRtl,
  min,
  max,
  step,
  marks,
}: PointParams): number | null {
  const length = orientation === 'vertical' ? rect.height : rect.width
  // A box with no size - not laid out - has no place for the point to be.
  if (length === 0) return null
  let fraction = orientation === 'vertical' ? (rect.bottom - y) / length : (x - rect.left) / length
  if (orientation === 'horizontal' && isRtl) fraction = 1 - fraction
  const raw = fractionToValue(fraction, min, max)
  if (step !== null) return clamp(snapToStep(raw, step, min), min, max)
  const markValues = marks.map((mark) => mark.value)
  if (markValues.length === 0) return clamp(raw, min, max)
  return clamp(markValues[findClosest(markValues, raw)], min, max)
}
