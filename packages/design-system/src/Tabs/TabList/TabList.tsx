import { useMemo } from 'react'
import { Tabs, type TabsProps } from '../Tabs'
import { TabListContext } from '../TabListContext'
import type { TabValue } from '../TabsContext'
import { useTabsValue } from '../TabsValueContext'

export type TabListProps = Omit<TabsProps, 'value' | 'defaultValue'>

/**
 * @description The `Tabs` of a `TabContext`: it shows the context's value and chooses through it,
 * and links each tab to its `TabPanel` - the tab `aria-controls` its panel, which is named by
 * the tab. Everything else is a `Tabs`'.
 */
export function TabList({ onChange, ...rest }: Readonly<TabListProps>) {
  const context = useTabsValue()
  if (!context) throw new Error('A TabList must be inside a TabContext.')
  const { baseId, value, select } = context
  const link = useMemo(() => ({ baseId }), [baseId])
  const handleChange = (next: TabValue) => {
    select(next)
    onChange?.(next)
  }
  return (
    <TabListContext.Provider value={link}>
      <Tabs {...rest} value={value} onChange={handleChange} />
    </TabListContext.Provider>
  )
}
