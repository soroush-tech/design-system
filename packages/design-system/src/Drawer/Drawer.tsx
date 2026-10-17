import { useEffect, useRef, useState, type ReactNode } from 'react'
import { styled, keyframes, createShouldForwardProp } from '../index'
import { Paper, type PaperElevation } from '../Paper'
import { FocusTrap } from '../FocusTrap'

export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom'

/** Why the drawer closed: the Escape key, or any other dismissal (a click outside, its toggle). */
export type DrawerCloseReason = 'escapeKey' | 'dismiss'

export interface DrawerProps {
  /** The element id a `DrawerToggle`'s `drawer` names. */
  id: string
  /** The content of the drawer. */
  children: ReactNode
  /**
   * Open state, for controlled use with JavaScript. Leave it out and the drawer opens and
   * closes from its `DrawerToggle` alone - which also works with JavaScript disabled.
   */
  isOpen?: boolean
  /** Fired when the drawer closes by itself: Escape, a click outside, or its toggle. */
  onClose?: (event: Event, reason: DrawerCloseReason) => void
  /** Edge the drawer slides in from. Default: 'left'. */
  anchor?: DrawerAnchor
  /** Shadow depth of the panel (0-24), forwarded to Paper. Default: 16. */
  elevation?: PaperElevation
  /** Slide duration in milliseconds. Default: 225. */
  transitionDuration?: number
  /** Dim the page behind the open drawer. Default: true. */
  hasBackdrop?: boolean
  /** With JavaScript: lock body scroll while open. Default: true. */
  shouldLockScroll?: boolean
  /** With JavaScript: move focus into the drawer when it opens. Default: true. */
  shouldAutoFocus?: boolean
  /** With JavaScript: keep Tab cycling within the open drawer. Default: true. */
  shouldTrapFocus?: boolean
  /** With JavaScript: return focus to where it was when the drawer closes. Default: true. */
  shouldRestoreFocus?: boolean
}

const slideIn: Record<DrawerAnchor, ReturnType<typeof keyframes>> = {
  left: keyframes`from { transform: translateX(-100%); } to { transform: translateX(0); }`,
  right: keyframes`from { transform: translateX(100%); } to { transform: translateX(0); }`,
  top: keyframes`from { transform: translateY(-100%); } to { transform: translateY(0); }`,
  bottom: keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`,
}

const anchorPosition: Record<DrawerAnchor, Record<string, string | number>> = {
  left: { top: 0, left: 0, bottom: 0, height: '100%' },
  right: { top: 0, right: 0, bottom: 0, height: '100%' },
  top: { top: 0, left: 0, right: 0, width: '100%' },
  bottom: { bottom: 0, left: 0, right: 0, width: '100%' },
}

interface DrawerPanelProps {
  anchor: DrawerAnchor
  duration: number
  hasBackdrop: boolean
}

const shouldForwardProp = createShouldForwardProp(['anchor', 'duration', 'hasBackdrop'])

// The `popover` element: the browser shows it in the top layer, closes it on Escape or a click
// outside, and hides it while closed - no JavaScript needed. These styles replace the user-agent
// popover box (centred, bordered, padded) with a frame pinned to one edge that slides in when it
// opens; the Paper inside is the visible surface.
const DrawerPanel = styled('div', {
  name: 'Drawer',
  label: 'Drawer',
  shouldForwardProp,
})<DrawerPanelProps>(({ theme, anchor, duration, hasBackdrop }) => ({
  position: 'fixed',
  inset: 'auto',
  margin: 0,
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'visible',
  ...anchorPosition[anchor],
  '&:popover-open': {
    animation: `${slideIn[anchor]} ${duration}ms ease-out`,
  },
  '&::backdrop': {
    backgroundColor: hasBackdrop ? theme.background.backdrop : 'transparent',
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&:popover-open': { animation: 'none' },
  },
}))

/**
 * @description A panel that slides in from a screen edge. It is an HTML `popover`: a
 * `DrawerToggle` opens it, and Escape or a click outside closes it - all without JavaScript,
 * so it works on a prerendered page with scripts off. With JavaScript it can be controlled with
 * `isOpen` / `onClose`, and it moves focus in, traps Tab and locks scroll while open.
 */
export function Drawer({
  id,
  children,
  isOpen,
  onClose,
  anchor = 'left',
  elevation = 16,
  transitionDuration = 225,
  hasBackdrop = true,
  shouldLockScroll = true,
  shouldAutoFocus = true,
  shouldTrapFocus = true,
  shouldRestoreFocus = true,
}: Readonly<DrawerProps>) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [isShown, setIsShown] = useState(false)
  const isShownRef = useRef(false)
  const closingByProp = useRef(false)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Follow the browser's own open state: the toggle button, Escape and light dismiss change it.
  useEffect(() => {
    const panel = panelRef.current!
    let escaped = false
    const handleKeyDown = (event: KeyboardEvent) => {
      escaped = event.key === 'Escape' && isShownRef.current
    }
    const handleToggle = (event: Event) => {
      const open = (event as ToggleEvent).newState === 'open'
      isShownRef.current = open
      setIsShown(open)
      if (!open && !closingByProp.current) {
        onCloseRef.current?.(event, escaped ? 'escapeKey' : 'dismiss')
      }
      closingByProp.current = false
      escaped = false
    }
    const doc = panel.ownerDocument
    doc.addEventListener('keydown', handleKeyDown, true)
    panel.addEventListener('toggle', handleToggle)
    return () => {
      doc.removeEventListener('keydown', handleKeyDown, true)
      panel.removeEventListener('toggle', handleToggle)
    }
  }, [])

  // Controlled use: `isOpen` shows or hides the popover. The browser fires `toggle` after the
  // call returns, so the new state is recorded here at once - a quick change back is not lost.
  useEffect(() => {
    if (isOpen === undefined || isOpen === isShownRef.current) return
    const panel = panelRef.current!
    isShownRef.current = isOpen
    if (isOpen) {
      panel.showPopover()
    } else {
      closingByProp.current = true
      panel.hidePopover()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isShown || !shouldLockScroll) return
    const { body } = panelRef.current!.ownerDocument
    const previous = body.style.overflow
    body.style.overflow = 'hidden'
    return () => {
      body.style.overflow = previous
    }
  }, [isShown, shouldLockScroll])

  return (
    <DrawerPanel
      ref={panelRef}
      id={id}
      popover="auto"
      anchor={anchor}
      duration={transitionDuration}
      hasBackdrop={hasBackdrop}
    >
      <Paper elevation={elevation} width="100%" height="100%" overflow="auto">
        <FocusTrap
          isEnabled={isShown}
          shouldAutoFocus={shouldAutoFocus}
          shouldTrapFocus={shouldTrapFocus}
          shouldEnforceFocus={false}
          shouldRestoreFocus={shouldRestoreFocus}
        >
          {children}
        </FocusTrap>
      </Paper>
    </DrawerPanel>
  )
}
