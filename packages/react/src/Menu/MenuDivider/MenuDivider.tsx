'use client'

import { styled } from '../../style/styled'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../../style/overrides'
import type { MenuDividerSlot } from './MenuDivider.types'
import { get } from '@soroush.tech/styled-system'

export interface MenuDividerProps {
  className?: string
  /** Overrides the CSS of the divider: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<MenuDividerSlot>
  'data-testid'?: string
}

const MenuDividerRoot = styled('li', { name: 'MenuDivider', label: 'MenuDivider' })(
  ({ theme }) => ({
    listStyle: 'none',
    height: 0,
    marginTop: theme.space[0.5],
    marginBottom: theme.space[0.5],
    borderTopWidth: theme.borderWidths.thin,
    borderTopStyle: 'solid' as const,
    borderTopColor: get(theme, 'border.light'),
  })
)

/**
 * @description A `role="separator"` line between groups of rows in a `MenuList`. The
 * arrow keys pass over it.
 */
export function MenuDivider({
  className,
  style,
  slotProps,
  'data-testid': dataTestid,
}: Readonly<MenuDividerProps>) {
  return (
    <MenuDividerRoot
      role="separator"
      {...mergeOverrides(slotProps?.root, { style, className })}
      data-testid={dataTestid}
    />
  )
}
