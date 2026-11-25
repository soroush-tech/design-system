import type { TabValue } from '../TabsContext'

/** A tab's DOM id - what its panel's `aria-labelledby` names. */
export const getTabId = (baseId: string, value: TabValue): string => `${baseId}-tab-${value}`

/** A panel's DOM id - what its tab's `aria-controls` names. */
export const getPanelId = (baseId: string, value: TabValue): string => `${baseId}-panel-${value}`
