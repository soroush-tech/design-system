import { useMemo } from 'react'
import { styled, type Theme } from '../../index'
import { Flex, type FlexProps } from '../../Flex'
import { NavTreeContext } from '../NavTreeContext'

export interface NavTreeProps extends FlexProps {
  /** Palette color of the current page's pill, a hovered link and the focus ring - resolves to `theme.palette`. Default: `'primary'`. */
  color?: keyof Theme['palette']
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
export function NavTree({ color = 'primary', ...rest }: Readonly<NavTreeProps>) {
  const context = useMemo(() => ({ color }), [color])
  return (
    <NavTreeContext.Provider value={context}>
      <NavTreeRoot {...rest} />
    </NavTreeContext.Provider>
  )
}
