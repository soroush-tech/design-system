import type { MouseEvent, ReactNode } from 'react'
import { Fab, type FabProps } from '../../Fab'
import { useFabMenu } from '../FabMenuContext'

export interface FabMenuItemProps extends Omit<
  FabProps,
  'variant' | 'size' | 'isCollapsed' | 'startIcon' | 'children'
> {
  /** An icon before the label. */
  icon?: ReactNode
  /** What the item says, and does: its name. */
  children: ReactNode
  /** Fired when it is pressed - the menu closes after it. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

/**
 * @description One action of a `FabMenu`: an extended `Fab` of the menu's size - a pill with an
 * icon and a label. Pressing it runs `onClick` and closes the menu, and focus goes back to the
 * trigger. It takes any `Fab` prop but its shape.
 */
export function FabMenuItem({
  icon,
  children,
  color,
  onClick,
  ...rest
}: Readonly<FabMenuItemProps>) {
  const menu = useFabMenu('FabMenuItem')
  return (
    <Fab
      {...rest}
      data-fab-menu-item=""
      variant="extended"
      size={menu.size}
      color={color ?? 'secondary'}
      startIcon={icon}
      onClick={(event) => {
        onClick?.(event)
        menu.close(event)
      }}
    >
      {children}
    </Fab>
  )
}
