import { useCallback, useId, useMemo, useState, type ReactNode } from 'react'
import type { TabValue } from '../TabsContext'
import { TabsValueContext } from '../TabsValueContext'

export interface TabContextProps {
  children?: ReactNode
  /** The selected tab's value - `null` for none. Controlled with `onChange`. */
  value?: TabValue | null
  /** The selected tab's value at first, when uncontrolled. */
  defaultValue?: TabValue | null
  /** Fired with a tab's value when it is chosen. */
  onChange?: (value: TabValue) => void
}

/**
 * @description Holds which tab is selected for a `Tabs` and the `TabPanel`s beside it, so
 * the two can sit apart in the tree - the tabs in a header, the panels in the body - and
 * still be linked (`aria-controls`, `aria-labelledby`).
 */
export function TabContext({
  children,
  value: valueProp,
  defaultValue = null,
  onChange,
}: Readonly<TabContextProps>) {
  const [valueState, setValueState] = useState(defaultValue)
  const value = valueProp === undefined ? valueState : valueProp
  const baseId = useId()

  const select = useCallback(
    (next: TabValue) => {
      setValueState(next)
      onChange?.(next)
    },
    [onChange]
  )

  const context = useMemo(() => ({ value, select, baseId }), [value, select, baseId])
  return <TabsValueContext.Provider value={context}>{children}</TabsValueContext.Provider>
}
