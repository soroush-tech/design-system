import {
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  type SyntheticEvent,
} from 'react'
import { clamp } from '../../utils/clamp'
import { isRtl } from '../../utils/isRtl'
import { useControlled } from '../../utils/useControlled'
import {
  areValuesEqual,
  findClosest,
  getKeyValue,
  getValueAtPoint,
  isRangeKey,
  moveThumb,
  normalizeValues,
  type Mark,
  type MovedThumb,
  type Orientation,
} from '../utils/range'

export type RangeInputValue = number | number[]

export interface UseRangeInputParams {
  /** The value - a number for one thumb, an array for more. `undefined` leaves it uncontrolled. */
  value?: number | readonly number[]
  defaultValue?: number | readonly number[]
  min: number
  max: number
  /** The step, or `null` for the marks alone. */
  step: number | null
  shiftStep: number
  marks: readonly Mark[]
  orientation: Orientation
  shouldSwapThumbs: boolean
  isDisabled: boolean
  name?: string
  rootRef: RefObject<HTMLElement | null>
  /** `event.target` is `{ value, name }`, so form libraries can read them. */
  onChange?: (event: Event, value: RangeInputValue, activeThumb: number) => void
  onChangeCommitted?: (event: Event | SyntheticEvent, value: RangeInputValue) => void
}

// No thumb pressed, hovered or focused; no pointer down.
const NONE = -1

// An event of the same kind whose `target` is the slider's value and name: what a form library
// reads - without touching the original event's own target.
function withTarget(event: SyntheticEvent, target: { value: RangeInputValue; name?: string }) {
  const native = event.nativeEvent
  const clone = new (native.constructor as typeof Event)(native.type, native)
  Object.defineProperty(clone, 'target', { writable: true, value: target })
  return clone
}

/**
 * A slider's state: its value (controlled or not) as the thumbs' sorted values, which thumb is
 * pressed, hovered or focused, and the handlers - the pointer's on the root, which keeps the
 * pointer while it drags, and the keys' and the native input's on each thumb's own input.
 */
export function useRangeInput({
  value: valueProp,
  defaultValue,
  min,
  max,
  step,
  shiftStep,
  marks,
  orientation,
  shouldSwapThumbs,
  isDisabled,
  name,
  rootRef,
  onChange,
  onChangeCommitted,
}: UseRangeInputParams) {
  const [value, setValue] = useControlled<number | readonly number[]>({
    controlled: valueProp,
    default: defaultValue ?? min,
  })
  const isRange = typeof value !== 'number'
  const values = normalizeValues(value, min, max)
  const [active, setActive] = useState(NONE)
  const [hovered, setHovered] = useState(NONE)
  const [focused, setFocused] = useState(NONE)
  const [lastUsed, setLastUsed] = useState(NONE)
  // The thumb a drag holds, and the pointer that holds it.
  const dragIndex = useRef(NONE)
  const pointerId = useRef(NONE)
  // What was last told, so a release with no move commits the value it began with.
  const lastChanged = useRef<RangeInputValue>(0)

  const toOutput = (list: readonly number[]): RangeInputValue => (isRange ? [...list] : list[0])

  const emit = (event: SyntheticEvent, list: number[], index: number) => {
    const next = toOutput(list)
    setValue(next)
    if (areValuesEqual(list, values)) return
    lastChanged.current = next
    onChange?.(withTarget(event, { value: next, name }), next, index)
  }

  const focusThumb = (index: number) => {
    const input = rootRef.current?.querySelector<HTMLInputElement>(`input[data-index="${index}"]`)
    input?.focus({ preventScroll: true })
  }

  // Where a point puts the value, and which thumb takes it: the nearest on a press, the one held
  // on a drag.
  const resolveAt = (event: PointerEvent, held: number): MovedThumb | null => {
    const target = getValueAtPoint({
      x: event.clientX,
      y: event.clientY,
      rect: rootRef.current!.getBoundingClientRect(),
      orientation,
      isRtl: isRtl(rootRef.current!),
      min,
      max,
      step,
      marks,
    })
    if (target === null) return null
    const index = held === NONE ? findClosest(values, target, lastUsed) : held
    return moveThumb(values, index, target, shouldSwapThumbs)
  }

  const hold = (event: PointerEvent, moved: MovedThumb) => {
    dragIndex.current = moved.index
    setActive(moved.index)
    setLastUsed(moved.index)
    focusThumb(moved.index)
    emit(event, moved.values, moved.index)
  }

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (isDisabled || event.defaultPrevented || event.button !== 0) return
    const moved = resolveAt(event, NONE)
    if (moved === null) return
    // The press focuses the thumb itself, and selects no text.
    event.preventDefault()
    pointerId.current = event.pointerId
    lastChanged.current = toOutput(values)
    hold(event, moved)
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // A pointer that is gone - a synthetic event's - can't be captured; the slider still follows it.
    }
  }

  const release = (event: PointerEvent<HTMLElement>) => {
    setActive(NONE)
    pointerId.current = NONE
    dragIndex.current = NONE
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    onChangeCommitted?.(event, lastChanged.current)
  }

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerId !== pointerId.current) return
    // The button is up: a release that never came - taken by another element - ends the drag.
    if (event.buttons === 0) return release(event)
    const moved = resolveAt(event, dragIndex.current)
    if (moved !== null) hold(event, moved)
  }

  const handlePointerEnd = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerId === pointerId.current) release(event)
  }

  // A key or the native input moves one thumb: to a value it may have passed a neighbour with.
  const change = (event: SyntheticEvent, index: number, target: number) => {
    const moved = moveThumb(values, index, clamp(target, min, max), shouldSwapThumbs)
    if (moved.index !== index) focusThumb(moved.index)
    setFocused(moved.index)
    emit(event, moved.values, moved.index)
    onChangeCommitted?.(event, toOutput(moved.values))
  }

  const getInputProps = (index: number) => ({
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (!isRangeKey(event.key)) return
      event.preventDefault()
      const next = getKeyValue({
        key: event.key,
        shiftKey: event.shiftKey,
        value: values[index],
        step,
        shiftStep,
        min,
        max,
        isRtl: isRtl(event.currentTarget),
        marks,
      })
      if (next !== null) change(event, index, next)
    },
    // The native input reports a change too - assistive technology sets it directly.
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      const typed = event.currentTarget.valueAsNumber
      const markValues = marks.map((mark) => mark.value)
      const target =
        step === null && markValues.length > 0 ? markValues[findClosest(markValues, typed)] : typed
      change(event, index, target)
    },
    onFocus: () => setFocused(index),
    onBlur: () => setFocused(NONE),
  })

  const getThumbProps = (index: number) => ({
    onMouseEnter: () => setHovered(index),
    onMouseLeave: () => setHovered(NONE),
  })

  return {
    values,
    isRange,
    active: isDisabled ? NONE : active,
    hovered,
    focused,
    lastUsed,
    rootProps: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
      onLostPointerCapture: handlePointerEnd,
    },
    getInputProps,
    getThumbProps,
  }
}
