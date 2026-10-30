import { createContext, type SyntheticEvent } from 'react'

export type CloseTooltip = (event: Event | SyntheticEvent) => void

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

/** The state of a group whose window is `skipDelayDuration` milliseconds long. */
export const createTooltipGroupState = (skipDelayDuration: number): TooltipGroupState => {
  let active: CloseTooltip | null = null
  let closedAt = Number.NEGATIVE_INFINITY
  return {
    shouldSkipDelay: () => active !== null || Date.now() - closedAt < skipDelayDuration,
    open: (close) => {
      active = close
    },
    closeActive: (event) => active?.(event),
    release: (close) => {
      if (active !== close) return
      active = null
      closedAt = Date.now()
    },
  }
}

// The group a theme's `skipDelayDuration` makes of every tooltip under it: one per theme and window.
const themeGroups = new WeakMap<object, Map<number, TooltipGroupState>>()

export const getThemeTooltipGroup = (theme: object, skipDelayDuration: number) => {
  const byDuration = themeGroups.get(theme) ?? new Map<number, TooltipGroupState>()
  themeGroups.set(theme, byDuration)
  const group = byDuration.get(skipDelayDuration) ?? createTooltipGroupState(skipDelayDuration)
  byDuration.set(skipDelayDuration, group)
  return group
}
