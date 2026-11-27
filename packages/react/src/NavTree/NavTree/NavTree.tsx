'use client'

import { useMemo } from 'react'
import { styled } from '../../style/styled'
import { type Theme } from '../../theme/themes'
import { Flex, type FlexProps } from '../../Flex'
import { mergeOverrides, type SlotProps } from '../../style/overrides'
import type { NavTreeSlot } from './NavTree.types'
import { NavTreeContext } from '../NavTreeContext'

export interface NavTreeProps extends FlexProps {
  /** Palette color of the current page's pill, a hovered link and the focus ring - resolves to `theme.palette`. Default: `'primary'`. */
  color?: keyof Theme['palette']
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<NavTreeSlot>
}

const NavTreeRoot = styled(Flex, { name: 'NavTree', label: 'NavTree' })(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.space[1],
}))

/**
 * @description A tree of links to the pages of a site: its `NavGroup`s, each with its `NavLink`s,
 * and any link of its own. It is a column of plain markup - links and lists, nothing that needs
 * JavaScript - so it is in the server-rendered page and works with scripts off; a group that
 * folds is a native `details`. Put it in a landmark of your own - a `nav`, or the panel of a
 * `Sidebar`. Any `Flex` prop applies.
 */
export function NavTree({
  color = 'primary',
  style,
  className,
  slotProps,
  ...rest
}: Readonly<NavTreeProps>) {
  const context = useMemo(() => ({ color }), [color])
  return (
    <NavTreeContext.Provider value={context}>
      <NavTreeRoot {...rest} {...mergeOverrides(slotProps?.root, { style, className })} />
    </NavTreeContext.Provider>
  )
}
