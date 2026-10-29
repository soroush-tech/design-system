import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  type PointerEvent,
  type SyntheticEvent,
} from 'react'
import { useControlled } from '../../utils/useControlled'
import { TooltipGroupContext } from '../TooltipGroupContext'

export interface UseTooltipParams {
  /** Whether it is shown - `undefined` leaves it to the hook. */
  isOpen?: boolean
  defaultOpen: boolean
  /** At a point, a request to open is not honored - `isOpen` alone opens it. */
  isAtPoint?: boolean
  onOpen?: (event: Event | SyntheticEvent) => void
  onClose?: (event: Event | SyntheticEvent) => void
  /** How long the pointer or the focus rests on the child before it opens, in milliseconds. */
  enterDelay: number
  /** How long after they leave before it closes. */
  leaveDelay: number
  /** How long a touch is held before it opens. */
  enterTouchDelay: number
  /** How long after a touch ends before it closes. */
  leaveTouchDelay: number
  shouldOpenOnHover: boolean
  shouldOpenOnFocus: boolean
  shouldOpenOnTouch: boolean
}

type Handler = (event: SyntheticEvent) => void

// Keyboard focus - not a press with the pointer - is what a tooltip answers.
const isKeyboardFocus = (event: SyntheticEvent) => {
  try {
    return (event.target as Element).matches(':focus-visible')
  } catch {
    // A browser with no :focus-visible takes every focus as keyboard focus.
    return true
  }
}

/**
 * The state of a tooltip: whether it is open (its own, or its owner's), the timers that open and
 * close it, and the handlers its child and the tooltip itself take. Opening and closing are
 * delayed; moving from the child onto the tooltip does not close it, so its text can be read and
 * selected (WCAG 1.4.13); Escape closes it at once.
 */
export function useTooltip({
  isOpen: isOpenProp,
  defaultOpen,
  isAtPoint = false,
  onOpen,
  onClose,
  enterDelay,
  leaveDelay,
  enterTouchDelay,
  leaveTouchDelay,
  shouldOpenOnHover,
  shouldOpenOnFocus,
  shouldOpenOnTouch,
}: Readonly<UseTooltipParams>) {
  const [isOpen, setIsOpen] = useControlled({ controlled: isOpenProp, default: defaultOpen })
  const timer = useRef<number | undefined>(undefined)
  // In a group, one that opens just after another closed - or while one is open - needs no
  // delay, and the one still showing closes. A tooltip the app controls is left out of it.
  const group = useContext(TooltipGroupContext)
  const latest = useRef({ isOpen, isOpenProp, isAtPoint, onOpen, onClose, group })
  useEffect(() => {
    latest.current = { isOpen, isOpenProp, isAtPoint, onOpen, onClose, group }
  })

  const clear = useCallback(() => window.clearTimeout(timer.current), [])

  // Closes it now, for the group when another tooltip of it opens.
  const closeNow = useCallback(
    (event: Event | SyntheticEvent) => {
      clear()
      const current = latest.current
      setIsOpen(false)
      current.onClose?.(event)
    },
    [clear, setIsOpen]
  )
  const isInGroup = group !== null && isOpenProp === undefined
  useEffect(() => {
    if (!isInGroup || !isOpen) return undefined
    group.open(closeNow)
    return () => group.release(closeNow)
  }, [group, isInGroup, isOpen, closeNow])
  const getEnterDelay = () => (isInGroup && group.shouldSkipDelay() ? 0 : enterDelay)

  // Asks to open or close after a delay; the last ask wins.
  const ask = useCallback(
    (next: boolean, event: Event | SyntheticEvent, delay: number) => {
      clear()
      timer.current = window.setTimeout(() => {
        const current = latest.current
        if (current.isOpen === next) return
        // An open asked for before the tooltip was put at a point is dropped; a close is not.
        if (next && current.isAtPoint) return
        if (current.isOpenProp === undefined) {
          if (next) current.group?.closeActive(event)
          else current.group?.release(closeNow)
          setIsOpen(next)
        }
        const notify = next ? current.onOpen : current.onClose
        notify?.(event)
      }, delay)
    },
    [clear, setIsOpen, closeNow]
  )

  useEffect(() => clear, [clear])

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') ask(false, event, 0)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, ask])

  const childHandlers: Record<
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onFocus'
    | 'onBlur'
    | 'onTouchStart'
    | 'onTouchEnd'
    | 'onTouchCancel'
    | 'onPointerDown',
    Handler
  > = {
    onMouseEnter: (event) => {
      if (shouldOpenOnHover) ask(true, event, getEnterDelay())
    },
    onMouseLeave: (event) => {
      if (shouldOpenOnHover) ask(false, event, leaveDelay)
    },
    onFocus: (event) => {
      if (shouldOpenOnFocus && isKeyboardFocus(event)) ask(true, event, getEnterDelay())
    },
    onBlur: (event) => {
      if (shouldOpenOnFocus) ask(false, event, leaveDelay)
    },
    onTouchStart: (event) => {
      if (shouldOpenOnTouch) ask(true, event, enterTouchDelay)
    },
    onTouchEnd: (event) => {
      if (shouldOpenOnTouch) ask(false, event, leaveTouchDelay)
    },
    onTouchCancel: (event) => {
      if (shouldOpenOnTouch) ask(false, event, leaveTouchDelay)
    },
    // A press of the child closes it, as a native `title` goes away. A touch is left to its long
    // press, which would otherwise be closed as it starts.
    onPointerDown: (event) => {
      if ((event as PointerEvent<Element>).pointerType !== 'touch') ask(false, event, 0)
    },
  }

  // On the tooltip: a pointer that has moved onto it keeps it open, and closes it as it leaves.
  const surfaceHandlers = {
    onMouseEnter: () => {
      if (shouldOpenOnHover) clear()
    },
    onMouseLeave: (event: SyntheticEvent) => {
      if (shouldOpenOnHover) ask(false, event, leaveDelay)
    },
  }

  return { isOpen, childHandlers, surfaceHandlers }
}
