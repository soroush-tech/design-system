import {
  useState,
  type FocusEvent,
  type MouseEvent,
  type RefObject,
  type SyntheticEvent,
} from 'react'
import { isRtl } from '../../utils/isRtl'
import { useControlled } from '../../utils/useControlled'
import { roundToPrecision } from '../../utils/precision'
import { getHoverValue } from '../utils/precision'

export interface UseRatingParams {
  /** The controlled rating - `null` for none, `undefined` leaves it uncontrolled. */
  value?: number | null
  defaultValue?: number | null
  precision: number
  max: number
  rootRef: RefObject<HTMLElement | null>
  onChange?: (event: SyntheticEvent<HTMLInputElement>, value: number | null) => void
  onChangeActive?: (event: MouseEvent<HTMLElement>, value: number) => void
}

// Nothing hovered or focused.
const NONE = -1

// The rating a radio stands for: none for the "no rating" radio, whose value is empty.
const parseRating = (raw: string) => (raw === '' ? null : Number.parseFloat(raw))

// What shows: the focused item, else the rating. A hover moves the focus to its value too, so
// the pointer's item is the one shown while it is on the rating.
const getDisplayValue = (focus: number, rounded: number | null) =>
  focus === NONE ? rounded : focus

/**
 * A rating's state: the rating itself (controlled or not, rounded to its precision), what the
 * pointer and the focus are on, and the handlers that move them. The pointer takes priority over
 * the keys when both change at once, and pressing the chosen item again clears it.
 */
export function useRating({
  value: valueProp,
  defaultValue,
  precision,
  max,
  rootRef,
  onChange,
  onChangeActive,
}: UseRatingParams) {
  const [value, setValue] = useControlled<number | null>({
    controlled: valueProp,
    default: defaultValue ?? null,
  })
  const rounded = roundToPrecision(value, precision)
  const [{ hover, focus }, setActive] = useState({ hover: NONE, focus: NONE })

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const { left, right, width } = rootRef.current!.getBoundingClientRect()
    // A box with no width - not laid out - has no place for the pointer to be.
    if (width === 0) return
    const offset = isRtl(rootRef.current!) ? right - event.clientX : event.clientX - left
    const next = getHoverValue({ offset, width, max, precision })
    setActive({ hover: next, focus: next })
    if (hover !== next) onChangeActive?.(event, next)
  }

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    setActive({ hover: NONE, focus: NONE })
    if (hover !== NONE) onChangeActive?.(event, NONE)
  }

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    // The pointer's value wins over the key's: a press and a key at once is the press.
    const next = hover === NONE ? parseRating(event.currentTarget.value) : hover
    setValue(next)
    onChange?.(event, next)
  }

  // A press on the chosen item clears it. A key's click has no position, so it isn't one.
  const handleClear = (event: MouseEvent<HTMLInputElement>) => {
    if (event.clientX === 0 && event.clientY === 0) return
    setActive({ hover: NONE, focus: NONE })
    setValue(null)
    if (Number.parseFloat(event.currentTarget.value) === rounded) onChange?.(event, null)
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const next = Number.parseFloat(event.currentTarget.value)
    setActive((previous) => ({ hover: previous.hover, focus: next }))
  }

  const handleBlur = () => {
    if (hover !== NONE) return
    setActive((previous) => ({ hover: previous.hover, focus: NONE }))
  }

  return {
    rounded,
    displayValue: getDisplayValue(focus, rounded),
    isActive: hover !== NONE || focus !== NONE,
    handleMouseMove,
    handleMouseLeave,
    handleChange,
    handleClear,
    handleFocus,
    handleBlur,
  }
}
