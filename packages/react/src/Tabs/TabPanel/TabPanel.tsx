'use client'

import type { ReactNode } from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { styled } from '../../style/styled'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../../style/overrides'
import type { TabPanelSlot } from './TabPanel.types'
import { type Theme } from '../../theme/themes'
import { createShouldForwardProp, props } from '@soroush.tech/styled-system/should-forward-prop'
import { space } from '@soroush.tech/styled-system'
import { useDefaultProps } from '../../theme/hooks/useDefaultProps'
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
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<TabPanelSlot>
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
  style,
  slotProps,
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
      {...mergeOverrides(slotProps?.root, { style, className })}
      data-testid={dataTestid}
    >
      {isSelected || shouldKeepMounted ? children : null}
    </TabPanelRoot>
  )
}
