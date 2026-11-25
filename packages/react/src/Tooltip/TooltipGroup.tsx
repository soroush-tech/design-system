import { useMemo, type ReactNode } from 'react'
import { TooltipGroupContext, createTooltipGroupState } from './TooltipGroupContext'

export interface TooltipGroupProps {
  children?: ReactNode
  /**
   * How long after a tooltip of the group closes the next one opens with no enter delay, in
   * milliseconds - and for as long as one is open. After it, the tooltip's own `enterDelay`
   * applies again. A tooltip that opens closes the one still showing, at once. It wins over
   * `skipDelayDuration` in `theme.components.Tooltip.defaultProps`.
   */
  skipDelayDuration?: number
}

/**
 * Lets the tooltips inside it open at once, with no enter delay, when the pointer or the focus
 * moves to the next one just after another closed - a toolbar or a rail read from one icon to the
 * next. It renders nothing of its own. Tooltips outside a group are unchanged, a touch keeps its
 * own delay, and a tooltip whose `isOpen` the app controls is left alone: the group neither opens
 * nor closes it, and it does not start the window.
 */
export function TooltipGroup({ children, skipDelayDuration = 300 }: Readonly<TooltipGroupProps>) {
  const state = useMemo(() => createTooltipGroupState(skipDelayDuration), [skipDelayDuration])
  return <TooltipGroupContext.Provider value={state}>{children}</TooltipGroupContext.Provider>
}
