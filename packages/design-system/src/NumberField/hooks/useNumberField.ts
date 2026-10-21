import { useMemo, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { clamp } from '../../utils/clamp'
import { useControlled } from '../../utils/useControlled'
import { addExact, formatNumber, getNumberSyntax, parseNumber, snapToStep } from '../utils/number'

export interface UseNumberFieldParams {
  /** The number - `null` for none, `undefined` leaves it uncontrolled. */
  value?: number | null
  defaultValue?: number | null
  onChange?: (value: number | null) => void
  onChangeCommitted?: (value: number | null) => void
  min?: number
  max?: number
  step: number
  smallStep: number
  largeStep: number
  format?: Intl.NumberFormatOptions
  locale?: string
  shouldSnapOnStep: boolean
  /** A field that takes no change: read-only, or disabled. */
  isFrozen: boolean
}

const clampTo = (value: number, min?: number, max?: number) =>
  clamp(value, min ?? Number.NEGATIVE_INFINITY, max ?? Number.POSITIVE_INFINITY)

/**
 * A number field's state: the number (controlled or not), the text the user is typing - which
 * is theirs until it is committed on blur or Enter - and the steps by key and by button. A
 * number typed is told at once; one outside the range is clamped when it is committed.
 */
export function useNumberField({
  value: valueProp,
  defaultValue,
  onChange,
  onChangeCommitted,
  min,
  max,
  step,
  smallStep,
  largeStep,
  format,
  locale,
  shouldSnapOnStep,
  isFrozen,
}: UseNumberFieldParams) {
  const [value, setValue] = useControlled<number | null>({
    controlled: valueProp,
    default: defaultValue ?? null,
  })
  const [draft, setDraft] = useState<string | null>(null)
  const syntax = useMemo(() => getNumberSyntax(locale, format), [locale, format])
  const text = draft ?? (value === null ? '' : formatNumber(value, locale, format))

  const update = (next: number | null) => {
    if (next === value) return
    setValue(next)
    onChange?.(next)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const typed = event.currentTarget.value
    setDraft(typed)
    if (typed.trim() === '') return update(null)
    const parsed = parseNumber(typed, syntax)
    // Text that isn't a number yet - a lone minus - is left to be finished.
    if (parsed !== null) update(parsed)
  }

  // What the draft stands for: its number, none when empty, or - when it isn't one - the last number.
  const settle = () => {
    if (draft === null) return value
    if (draft.trim() === '') return null
    const parsed = parseNumber(draft, syntax)
    return parsed === null ? value : clampTo(parsed, min, max)
  }

  const commit = (next: number | null) => {
    setDraft(null)
    update(next)
    onChangeCommitted?.(next)
  }

  const handleBlur = () => {
    if (draft !== null) commit(settle())
  }

  const stepBy = (direction: 1 | -1, size = step) => {
    if (isFrozen) return
    const base = settle() ?? 0
    let next = addExact(base, direction * size)
    if (shouldSnapOnStep) next = snapToStep(next, step, min ?? 0)
    commit(clampTo(next, min, max))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isFrozen) return
    const { key, altKey, shiftKey } = event
    if (key === 'Enter') return commit(settle())
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      event.preventDefault()
      let size = step
      if (altKey) size = smallStep
      if (shiftKey) size = largeStep
      return stepBy(key === 'ArrowUp' ? 1 : -1, size)
    }
    const edge = key === 'Home' ? min : max
    if ((key === 'Home' || key === 'End') && edge !== undefined) {
      event.preventDefault()
      commit(edge)
    }
  }

  return {
    text,
    value,
    canIncrement: !isFrozen && (max === undefined || (value ?? Number.NEGATIVE_INFINITY) < max),
    canDecrement: !isFrozen && (min === undefined || (value ?? Number.POSITIVE_INFINITY) > min),
    handleChange,
    handleBlur,
    handleKeyDown,
    stepBy,
  }
}
