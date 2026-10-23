import { useState, type ChangeEvent, type KeyboardEvent, type SyntheticEvent } from 'react'
import { useControlled } from '../../utils/useControlled'

/** One value for a single field, a list for `multiple`. */
export type AutocompleteValue<T, Multiple extends boolean | undefined> = Multiple extends true
  ? T[]
  : T | null

/** Why the value changes. */
export type AutocompleteChangeReason = 'selectOption' | 'removeOption' | 'createOption' | 'clear'

/** Why the text changes: it was typed, set to match a choice, or emptied. */
export type AutocompleteInputReason = 'input' | 'reset' | 'clear'

export interface UseAutocompleteParams<T, Multiple extends boolean | undefined> {
  options: readonly T[]
  multiple?: Multiple
  value?: AutocompleteValue<T, Multiple>
  defaultValue?: AutocompleteValue<T, Multiple>
  onChange?: (
    event: SyntheticEvent,
    value: AutocompleteValue<T, Multiple>,
    reason: AutocompleteChangeReason
  ) => void
  inputValue?: string
  onInputChange?: (event: SyntheticEvent, value: string, reason: AutocompleteInputReason) => void
  getOptionLabel: (option: T) => string
  isOptionEqualToValue: (option: T, value: T) => boolean
  /** The options that match what is typed. Called only while something is typed. */
  filterOptions: (options: readonly T[], state: { inputValue: string }) => readonly T[]
  shouldAllowFreeText: boolean
  disabled: boolean
}

// Round the ends: past the last option is the first, and the other way.
const getStepped = (highlight: number, step: 1 | -1, length: number) => {
  if (highlight !== -1) return (highlight + step + length) % length
  return step === 1 ? 0 : length - 1
}

const toList = <T>(value: T | T[] | null, isMultiple: boolean): T[] => {
  if (isMultiple) return value as T[]
  return value === null ? [] : [value as T]
}

/**
 * The state of an autocomplete: its value (single or several, its own or its owner's), the text
 * in the field, whether the list is open, which option is highlighted, and the handlers that move
 * them. The text shows the chosen option's label until something is typed; typing opens the list
 * and narrows it; choosing, clearing and leaving the field put the text back.
 */
export function useAutocomplete<T, Multiple extends boolean | undefined = false>({
  options,
  multiple,
  value: valueProp,
  defaultValue,
  onChange,
  inputValue: inputValueProp,
  onInputChange,
  getOptionLabel,
  isOptionEqualToValue,
  filterOptions,
  shouldAllowFreeText,
  disabled,
}: Readonly<UseAutocompleteParams<T, Multiple>>) {
  const isMultiple = multiple === true
  const [value, setValue] = useControlled<AutocompleteValue<T, Multiple> | undefined>({
    controlled: valueProp,
    default: defaultValue ?? ((isMultiple ? [] : null) as AutocompleteValue<T, Multiple>),
  })
  const selected = toList<T>(value as T | T[] | null, isMultiple)

  // What was typed - `null` while the field shows the chosen option's label instead.
  const [typed, setTyped] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)

  const chosenLabel = !isMultiple && selected.length > 0 ? getOptionLabel(selected[0]) : ''
  const inputValue = inputValueProp ?? typed ?? chosenLabel
  // Nothing typed - or only the label of what is chosen - is no narrowing: the whole list shows.
  const filtered = inputValue === chosenLabel ? options : filterOptions(options, { inputValue })

  const isSelected = (option: T) => selected.some((entry) => isOptionEqualToValue(option, entry))

  // `text` is what was typed - `null` to show the chosen option again; `shown` is what the field says.
  const setText = (
    event: SyntheticEvent,
    text: string | null,
    shown: string,
    reason: AutocompleteInputReason
  ) => {
    setTyped(text)
    onInputChange?.(event, shown, reason)
  }

  const commit = (event: SyntheticEvent, next: T[], reason: AutocompleteChangeReason) => {
    const out = (isMultiple ? next : (next[0] ?? null)) as AutocompleteValue<T, Multiple>
    setValue(out)
    onChange?.(event, out, reason)
  }

  const open = () => {
    if (!disabled) setIsOpen(true)
  }
  const close = () => {
    setIsOpen(false)
    setHighlight(-1)
  }

  const selectOption = (event: SyntheticEvent, option: T) => {
    if (isMultiple) {
      const isChosen = isSelected(option)
      commit(
        event,
        isChosen
          ? selected.filter((entry) => !isOptionEqualToValue(option, entry))
          : [...selected, option],
        isChosen ? 'removeOption' : 'selectOption'
      )
      setText(event, null, '', 'reset')
      setHighlight(-1)
      return
    }
    commit(event, [option], 'selectOption')
    setText(event, null, getOptionLabel(option), 'reset')
    close()
  }

  const removeOption = (event: SyntheticEvent, option: T) => {
    commit(
      event,
      selected.filter((entry) => !isOptionEqualToValue(option, entry)),
      'removeOption'
    )
  }

  const clear = (event: SyntheticEvent) => {
    commit(event, [], 'clear')
    setText(event, '', '', 'clear')
    close()
  }

  // A typed text that is no option, taken as the value: a string, where the options are not.
  const createOption = (event: SyntheticEvent, text: string) => {
    const created = text as unknown as T
    if (isMultiple) {
      commit(event, [...selected, created], 'createOption')
      setText(event, null, '', 'reset')
    } else {
      commit(event, [created], 'createOption')
      setText(event, null, text, 'reset')
      close()
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event, event.target.value, event.target.value, 'input')
    setHighlight(-1)
    open()
  }

  const moveHighlight = (next: number) => setHighlight(next)

  const handleArrow = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (!isOpen) {
      open()
      return
    }
    moveHighlight(getStepped(highlight, event.key === 'ArrowDown' ? 1 : -1, filtered.length))
  }

  // Only while the keys are walking the list: otherwise they are the caret's.
  const handleEdge = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || highlight === -1) return
    event.preventDefault()
    moveHighlight(event.key === 'Home' ? 0 : filtered.length - 1)
  }

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isOpen && highlight !== -1) {
      event.preventDefault()
      selectOption(event, filtered[highlight])
    } else if (shouldAllowFreeText && typed) {
      event.preventDefault()
      createOption(event, typed)
    }
  }

  const handleEscape = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return
    event.preventDefault()
    close()
  }

  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isMultiple && inputValue === '' && selected.length > 0) {
      removeOption(event, selected.at(-1) as T)
    }
  }

  const keyHandlers: Record<string, (event: KeyboardEvent<HTMLInputElement>) => void> = {
    ArrowDown: handleArrow,
    ArrowUp: handleArrow,
    Home: handleEdge,
    End: handleEdge,
    Enter: handleEnter,
    Escape: handleEscape,
    Backspace: handleBackspace,
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => keyHandlers[event.key]?.(event)

  const handleBlur = (event: SyntheticEvent) => {
    close()
    if (typed === null) return
    // What was typed and not chosen is put back - or, free, kept as the value.
    if (shouldAllowFreeText && typed !== '' && typed !== chosenLabel) createOption(event, typed)
    else setText(event, null, chosenLabel, 'reset')
  }

  const toggle = () => {
    if (isOpen) close()
    else open()
  }

  return {
    selected,
    inputValue,
    isOpen,
    highlight,
    filtered,
    hasClearable: selected.length > 0 || inputValue !== '',
    isSelected,
    setHighlight: moveHighlight,
    open,
    close,
    toggle,
    selectOption,
    removeOption,
    clear,
    handlers: { onChange: handleInputChange, onKeyDown: handleKeyDown, onBlur: handleBlur },
  }
}
