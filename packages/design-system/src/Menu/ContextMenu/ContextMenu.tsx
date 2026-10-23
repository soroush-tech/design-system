import {
  Children,
  cloneElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
} from 'react'
import { styled, type Theme } from '../../index'
import { useDefaultProps, useTheme } from '../../theme'
import type { PaperElevation } from '../../Paper'
import type { PopoverPosition } from '../../Popover/utils/computePopoverPosition'
import { MenuList } from '../MenuList'
import { MenuItem } from '../../MenuItem'
import { MenuItems, type MenuItemData } from '../MenuItems'
import { MenuActivationContext } from '../MenuActivationContext'
import type { MenuItemValue } from '../MenuListContext'
import { MenuContext, type MenuContextValue } from '../MenuContext'
import { MenuPaper, type MenuPaperProps } from '../MenuPaper'
import { useMenuPlacement } from '../hooks/useMenuPlacement'
import type { MenuCloseReason } from '../Menu'

interface TargetProps {
  onContextMenu?: (event: MouseEvent<HTMLElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
}

export interface ContextMenuProps {
  /** The element whose right-click opens the menu - the canvas, a row, a card. Its own `onContextMenu` / `onKeyDown` still run. */
  target: ReactElement<TargetProps>
  /** `MenuItem` rows and `MenuDivider`s. */
  children?: ReactNode
  /** The rows as data, in place of `children`. */
  items?: readonly MenuItemData[]
  /** Fired when the menu asks to close, with why. */
  onClose?: (event: SyntheticEvent, reason: MenuCloseReason) => void
  /** Fired with a row's `value` when a row that has one is chosen. */
  onSelect?: (value: MenuItemValue) => void
  /** The least room between the list and the window's edge - a `theme.space` key. Default: `2`. */
  marginThreshold?: keyof Theme['space']
  /** Shadow depth of the surface. Default: `8`. */
  /** Corner radius of the list, resolves against `theme.radii`. Default: `theme.defaults.surfaceRadius`, else square. */
  borderRadius?: keyof Theme['radii']
  elevation?: PaperElevation
  /** Stacking layer from `theme.zOrder`. Default: `'modal'`. */
  layer?: keyof Theme['zOrder']
  /** Shown as one disabled row when the menu has no rows. Without it, the list stays empty. */
  emptyLabel?: ReactNode
  /** Accent color for every row - resolves to `theme.palette[color]`. */
  color?: keyof Theme['palette']
  /** Base text color for every row - resolves against `theme.text`. */
  textColor?: keyof Theme['text']
  /** Density token for every row - resolves against `theme.sizes`. */
  size?: keyof Theme['sizes']
  /** Compact vertical padding for every row. */
  dense?: boolean
  /** Names the list. */
  'aria-label'?: string
  className?: string
  'data-testid'?: string
}

// Lays nothing out of its own: the target keeps its place, and the list is fixed in the window.
// The menu surface, under a slot of its own: `theme.components.Menu.styleOverrides.paper`
// styles every menu's surface, `ContextMenu`'s this one's alone.
const ContextMenuPaper = styled(MenuPaper, {
  name: 'ContextMenu',
  slot: 'paper',
  label: 'ContextMenuPaper',
})<MenuPaperProps>()

const ContextMenuRoot = styled('div', { name: 'ContextMenu', label: 'ContextMenu' })({
  display: 'contents',
})

const isMenuKey = (event: KeyboardEvent) =>
  event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey)

interface ContextMenuTargetProps {
  element: ReactElement<TargetProps>
  onContextMenu: (event: MouseEvent<HTMLElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
}

/** The element given, listening for a right-click and the context-menu keys. */
function ContextMenuTarget({ element, onContextMenu, onKeyDown }: ContextMenuTargetProps) {
  return cloneElement(element, { onContextMenu, onKeyDown })
}

/**
 * @description A `MenuList` opened at the pointer by a right-click over its target, or at
 * the focused element by the context-menu key or Shift+F10. It is placed and closes as
 * `Menu` does - Escape, a chosen row or focus leaving - and gives focus back to where it
 * was. The browser's own menu is held back only when this one opens.
 */
export function ContextMenu({
  target,
  children,
  items,
  onClose,
  onSelect,
  marginThreshold: marginThresholdProp,
  elevation: elevationProp,
  layer: layerProp,
  borderRadius: borderRadiusProp,
  emptyLabel,
  color: colorProp,
  textColor: textColorProp,
  size: sizeProp,
  dense: denseProp,
  'aria-label': ariaLabel,
  className,
  'data-testid': dataTestid,
}: Readonly<ContextMenuProps>) {
  // Resolution: explicit prop → theme.components.ContextMenu.defaultProps → literal fallback.
  const dp = useDefaultProps('ContextMenu')
  const marginThreshold = marginThresholdProp ?? dp.marginThreshold ?? 2
  const elevation = elevationProp ?? dp.elevation ?? 8
  const layer = layerProp ?? dp.layer ?? 'modal'
  const borderRadius = borderRadiusProp ?? dp.borderRadius
  const color = colorProp ?? dp.color
  const textColor = textColorProp ?? dp.textColor
  const size = sizeProp ?? dp.size
  const dense = denseProp ?? dp.dense
  const theme = useTheme()
  const [point, setPoint] = useState<PopoverPosition | null>(null)
  const isOpen = point !== null
  const rootRef = useRef<HTMLDivElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  // Where focus was when the menu opened - it goes back there.
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const listId = useId()

  const margin = Number.parseFloat(String(theme.space[marginThreshold]))
  const menuContext = useMemo<MenuContextValue>(
    () => ({ align: 'start', margin, elevation, layer }),
    [margin, elevation, layer]
  )
  useMenuPlacement({
    isOpen,
    anchorRef: rootRef,
    anchorPosition: point,
    surfaceRef,
    placement: 'below',
    align: 'start',
    margin,
  })

  const openAt = (top: number, left: number) => {
    returnFocusRef.current = document.activeElement as HTMLElement
    setPoint({ top, left })
  }

  const close = useCallback(
    (event: SyntheticEvent, reason: MenuCloseReason) => {
      setPoint(null)
      onClose?.(event, reason)
      if (reason !== 'blur') (returnFocusRef.current as HTMLElement).focus()
    },
    [onClose]
  )

  const handleActivate = useCallback(
    (_value: MenuItemValue | undefined, event: SyntheticEvent) => close(event, 'select'),
    [close]
  )

  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    target.props.onContextMenu?.(event)
    event.preventDefault()
    openAt(event.clientY, event.clientX)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    target.props.onKeyDown?.(event)
    if (!isMenuKey(event)) return
    event.preventDefault()
    // From the keyboard it opens at the focused element's start corner.
    const { bottom, left } = (event.target as HTMLElement).getBoundingClientRect()
    openAt(bottom, left)
  }

  const handleSurfaceKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close(event, 'escapeKey')
    }
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null
    if (isOpen && !event.currentTarget.contains(next)) close(event, 'blur')
  }

  const hasRows = items ? items.length > 0 : Children.toArray(children).length > 0
  const rows = items ? <MenuItems items={items} /> : children

  return (
    <ContextMenuRoot
      ref={rootRef}
      className={className}
      data-testid={dataTestid}
      onBlur={handleBlur}
    >
      <ContextMenuTarget
        element={target}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
      />
      {isOpen && (
        <ContextMenuPaper
          ref={surfaceRef}
          elevation={elevation}
          layer={layer}
          margin={margin}
          borderRadius={borderRadius}
          onKeyDown={handleSurfaceKeyDown}
        >
          <MenuContext.Provider value={menuContext}>
            <MenuActivationContext.Provider value={handleActivate}>
              <MenuList
                id={listId}
                aria-label={ariaLabel}
                shouldAutoFocus
                onSelect={onSelect}
                color={color}
                textColor={textColor}
                size={size}
                dense={dense}
                width="100%"
              >
                {hasRows ? rows : emptyLabel != null && <MenuItem disabled>{emptyLabel}</MenuItem>}
              </MenuList>
            </MenuActivationContext.Provider>
          </MenuContext.Provider>
        </ContextMenuPaper>
      )}
    </ContextMenuRoot>
  )
}
