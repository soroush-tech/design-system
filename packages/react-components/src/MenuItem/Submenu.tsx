import { useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { MenuList } from '../Menu/MenuList'
import { MenuPaper } from '../Menu/MenuPaper'
import { MenuContext, useMenuContext } from '../Menu/MenuContext'
import { useMenuPlacement } from '../Menu/hooks/useMenuPlacement'

export interface SubmenuProps {
  /** The row's entry - the submenu opens beside it. */
  anchorRef: RefObject<HTMLElement | null>
  listId: string
  /** The row's id - it names the submenu. */
  labelledBy: string
  children: ReactNode
}

/**
 * A row's submenu: a `MenuList` on its own surface, placed beside the row the way its menu
 * places its list (`align`, the window margin), and drawn on the menu's layer.
 */
export function Submenu({ anchorRef, listId, labelledBy, children }: Readonly<SubmenuProps>) {
  const menu = useMenuContext()
  const { align, margin, elevation, layer, listProps } = menu
  const surfaceRef = useRef<HTMLDivElement>(null)
  const isFlipped = useMenuPlacement({
    isOpen: true,
    anchorRef,
    surfaceRef,
    placement: 'beside',
    align,
    margin,
  })
  // Opened the other way for want of room, its own submenus go on that way - away from the
  // menu, not back over it.
  const flippedAlign = align === 'start' ? 'end' : 'start'
  const context = useMemo(
    () => ({ ...menu, align: isFlipped ? flippedAlign : align }),
    [menu, isFlipped, flippedAlign, align]
  )
  return (
    <MenuPaper ref={surfaceRef} elevation={elevation} layer={layer} margin={margin}>
      <MenuContext.Provider value={context}>
        <MenuList {...listProps} id={listId} aria-labelledby={labelledBy} width="100%">
          {children}
        </MenuList>
      </MenuContext.Provider>
    </MenuPaper>
  )
}
