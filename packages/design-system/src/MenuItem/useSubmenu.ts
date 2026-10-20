import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type RefObject,
} from 'react'
import { getNextRow } from '../Menu/MenuList/utils/getNextRow'
import { getOwnRows } from '../Menu/MenuList/utils/getOwnRows'
import { isRtl } from '../utils/isRtl'

export interface UseSubmenuResult {
  isOpen: boolean
  /** The row's `role="none"` entry, which holds the row and its submenu. */
  entryRef: RefObject<HTMLLIElement | null>
  listId: string
  /** The row took focus: its submenu opens - focus decides the submenu. */
  handleRowFocus: () => void
  /** Keys on the row: the inward key, Enter or Space go into the submenu. `true` when handled. */
  handleRowKeyDown: (event: KeyboardEvent<HTMLElement>) => boolean
  /** Keys bubbling from the submenu: the outward key or Escape come back to the row. */
  handleEntryKeyDown: (event: KeyboardEvent<HTMLElement>) => void
  /** Focus left the row and its submenu: the submenu closes. */
  handleEntryBlur: (event: FocusEvent<HTMLElement>) => void
}

/**
 * A row's submenu, opened while the row or anything in its submenu has focus. The pointer
 * moves focus as it goes, so hovering a row opens its submenu and hovering a sibling closes
 * it - the pointer and the keys never disagree. Right goes in and Left comes back, swapped
 * in a right-to-left page.
 */
export function useSubmenu(
  rowRef: RefObject<HTMLElement | null>,
  isEnabled: boolean
): UseSubmenuResult {
  const [isOpen, setIsOpen] = useState(false)
  const entryRef = useRef<HTMLLIElement>(null)
  const listId = useId()
  // Set when a key goes in before the submenu is open: its first row is focused once it is.
  const isEnteringRef = useRef(false)

  // Only ever called while the submenu is open, so its list is there.
  const focusFirstRow = () => {
    const list = document.getElementById(listId) as HTMLElement
    getNextRow(getOwnRows(list), null, 'first', false)?.focus()
  }

  useEffect(() => {
    if (isOpen && isEnteringRef.current) {
      isEnteringRef.current = false
      focusFirstRow()
    }
  })

  const handleRowFocus = () => {
    if (isEnabled) setIsOpen(true)
  }

  const handleRowKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const inward = isRtl(event.currentTarget) ? 'ArrowLeft' : 'ArrowRight'
    if (!isEnabled || ![inward, 'Enter', ' '].includes(event.key)) return false
    event.preventDefault()
    event.stopPropagation()
    if (isOpen) {
      focusFirstRow()
    } else {
      isEnteringRef.current = true
      setIsOpen(true)
    }
    return true
  }

  const handleEntryKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const list = document.getElementById(listId)
    if ((event.target as HTMLElement).closest('[role="menu"]') !== list) return
    const outward = isRtl(event.currentTarget) ? 'ArrowRight' : 'ArrowLeft'
    if (event.key !== outward && event.key !== 'Escape') return
    event.preventDefault()
    event.stopPropagation()
    // Focusing the row would reopen the submenu; closing it after keeps it closed.
    ;(rowRef.current as HTMLElement).focus()
    setIsOpen(false)
  }

  const handleEntryBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false)
  }

  return {
    isOpen,
    entryRef,
    listId,
    handleRowFocus,
    handleRowKeyDown,
    handleEntryKeyDown,
    handleEntryBlur,
  }
}
