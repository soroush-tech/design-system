import { createContext, type SyntheticEvent } from 'react'

type CloseTooltip = (event: Event | SyntheticEvent) => void

/** What the tooltips of a group share: the one that is open, and when one last closed. */
export interface TooltipGroupState {
  /** Whether a tooltip opening now needs no enter delay. */
  shouldSkipDelay: () => boolean
  /** A tooltip of the group is open: the one before it, still showing, is closed at once. */
  open: (close: CloseTooltip) => void
  /** Closes the tooltip of the group that is open, if one is. */
  closeActive: (event: Event | SyntheticEvent) => void
  /** A tooltip closed: the window starts, if it was the one open. */
  release: (close: CloseTooltip) => void
}

export const TooltipGroupContext = createContext<TooltipGroupState | null>(null)
