import type { ReactNode } from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { styled, type Theme, createShouldForwardProp, props, space } from '../../index'
import { useDefaultProps } from '../../theme'
import { surfaceSystem } from '../utils/surfaceSystem'
import type { TabValue } from '../TabsContext'
import { useTabsValue } from '../TabsValueContext'
import { getPanelId, getTabId } from '../utils/tabIds'

export interface TabPanelProps extends SpaceProps<Theme> {
  /** The value of the tab this panel belongs to. */
  value: TabValue
  /** The panel's content. */
  children?: ReactNode
  /** Keep the content mounted while the panel is hidden. Default: `false`. */
  shouldKeepMounted?: boolean
  /** The panel's ground - resolves against `theme.background`. Match its tab's `selectedBg`. */
  bg?: keyof Theme['background']
  /** The panel's corner radius - resolves against `theme.radii`. */
  borderRadius?: keyof Theme['radii']
  className?: string
  'data-testid'?: string
}

const TabPanelRoot = styled('div', {
  name: 'TabPanel',
  label: 'TabPanel',
  shouldForwardProp: createShouldForwardProp([...props]),
  systemProps: [space, surfaceSystem],
})<SpaceProps<Theme> & { bg?: keyof Theme['background']; borderRadius?: keyof Theme['radii'] }>({
  outline: 'none',
})

/**
 * @description The content a tab shows: a `role="tabpanel"` named by its tab, which in
 * turn `aria-controls` it. Shown only while its tab is selected. It sits in a
 * `TabContext` beside the `Tabs`, which links the two.
 */
export function TabPanel({
  value,
  children,
  shouldKeepMounted: shouldKeepMountedProp,
  className,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<TabPanelProps>) {
  const dp = useDefaultProps('TabPanel')
  const shouldKeepMounted = shouldKeepMountedProp ?? dp.shouldKeepMounted ?? false
  const tabs = useTabsValue()
  if (!tabs) throw new Error('A TabPanel must be inside a TabContext.')
  const { baseId } = tabs
  const isSelected = tabs.value === value
  return (
    <TabPanelRoot
      {...spaceProps}
      role="tabpanel"
      id={getPanelId(baseId, value)}
      aria-labelledby={getTabId(baseId, value)}
      tabIndex={0}
      hidden={!isSelected}
      className={className}
      data-testid={dataTestid}
    >
      {isSelected || shouldKeepMounted ? children : null}
    </TabPanelRoot>
  )
}
