import { createContext, useContext } from 'react'
import type { Theme, TabsVariants } from '../theme'

/** A tab's value: what it is chosen as. A `Tab` without one takes its position. */
export type TabValue = string | number

/** The look a row and each of its tabs both take - a tab's own value wins, as a table cell's does. */
export interface TabRowProps {
  color?: keyof Theme['palette']
  textColor?: keyof Theme['text']
  size?: keyof Theme['sizes']
  selectedBg?: keyof Theme['background']
}

/** What a `Tab` reads from the `Tabs` it sits in. */
export interface TabsContextValue {
  selectedValue: TabValue | null
  /** The one tab in the page's tab order - the selected tab, or the first enabled one. */
  focusableValue: TabValue | null
  select: (value: TabValue) => void
  /** Asked to close a closable tab. */
  onTabClose?: (value: TabValue) => void
  getTabId: (value: TabValue) => string
  /** The id of the tab's panel - none when these tabs aren't linked to a `TabContext`. */
  getPanelId: (value: TabValue) => string | undefined
  /** A navigation of links or buttons (`aria-current`), not a `tablist` (`aria-selected`). */
  isNavigation: boolean
  isVertical: boolean
  variant: keyof TabsVariants
  color: keyof Theme['palette']
  textColor?: keyof Theme['text']
  size: keyof Theme['sizes']
  fullWidth: boolean
  /** The row has a divider - an enclosed tab draws its own stretch of it. */
  hasDivider: boolean
  /** The selected tab's ground, a `theme.background` key - none when it has none. */
  selectedBg?: keyof Theme['background']
  /** The selected tab's color - the row's line (indicator, enclosed divider) is drawn in it. */
  selectedColor: keyof Theme['palette']
  /** What was set on the row itself - it beats the theme's defaults for every tab. */
  rowProps: TabRowProps
  shouldSelectOnFocus: boolean
  /** The scroll buttons show on narrow screens too. */
  shouldShowScrollButtonsOnMobile: boolean
}

export const TabsContext = createContext<TabsContextValue | null>(null)

/** Each tab's position among its siblings - its value when it has none of its own. */
export const TabIndexContext = createContext(0)

export function useTabsContext(): TabsContextValue {
  const tabs = useContext(TabsContext)
  if (!tabs) throw new Error('A Tab must be inside Tabs.')
  return tabs
}
