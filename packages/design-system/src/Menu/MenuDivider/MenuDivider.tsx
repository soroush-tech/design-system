import { styled, get } from '../../index'

export interface MenuDividerProps {
  className?: string
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
export function MenuDivider({ className, 'data-testid': dataTestid }: Readonly<MenuDividerProps>) {
  return <MenuDividerRoot role="separator" className={className} data-testid={dataTestid} />
}
