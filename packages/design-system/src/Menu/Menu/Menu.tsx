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
  type Ref,
  type SyntheticEvent,
} from 'react'
import { styled, type Theme } from '../../index'
import { useDefaultProps, useTheme } from '../../theme'
import type { PaperElevation } from '../../Paper'
import { MenuList } from '../MenuList'
import { MenuItem } from '../../MenuItem'
import { MenuItems, type MenuItemData } from '../MenuItems'
import { MenuActivationContext } from '../MenuActivationContext'
import type { MenuItemValue } from '../MenuListContext'
import { useMenuPlacement } from '../hooks/useMenuPlacement'
import { MenuContext, type MenuContextValue } from '../MenuContext'
import { MenuPaper } from '../MenuPaper'
import type { MenuAlign } from '../utils/getMenuOrigins'
import { isRtl } from '../../utils/isRtl'
import { assignRef } from '../utils/assignRef'

export type { MenuAlign } from '../utils/getMenuOrigins'

/** Why a menu closed: Escape, a chosen row, its trigger pressed again, or focus leaving it. */
export type MenuCloseReason = 'escapeKey' | 'select' | 'triggerClick' | 'blur'

/** A step a menu bar takes from this menu to the previous (`-1`) or next (`1`) one. */
export type MenuStep = -1 | 1

interface TriggerProps {
  id?: string
  ref?: Ref<HTMLElement>
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
}

export interface MenuProps {
  /** The element that opens the menu - a `Button`, a `Pressable`... It is given `aria-haspopup`, `aria-expanded` and `aria-controls`, and must take a `ref` for focus to return to it. */
  trigger: ReactElement<TriggerProps>
  /** `MenuItem` rows and `MenuDivider`s. */
  children?: ReactNode
  /** The rows as data, in place of `children`. */
  items?: readonly MenuItemData[]
  /** Controlled open state. When set, the menu never opens or closes on its own - it asks through `onOpen` / `onClose`. */
  isOpen?: boolean
  /** Uncontrolled initial open state. Default: `false`. */
  defaultOpen?: boolean
  /** Fired when the menu asks to open. */
  onOpen?: () => void
  /** Fired when the menu asks to close, with why. */
  onClose?: (event: SyntheticEvent, reason: MenuCloseReason) => void
  /** Fired when Left or Right has nowhere further to go inside the menu - so an owner such as a menu bar can step to the next menu. Swapped in right-to-left pages. */
  onStep?: (step: MenuStep) => void
  /** Fired with a row's `value` when a row that has one is chosen. */
  onSelect?: (value: MenuItemValue) => void
  /** Which edge of the trigger the list lines up with. Mirrored in right-to-left pages. Default: `'start'`. */
  align?: MenuAlign
  /** The least room between the list and the window's edge - a `theme.space` key. Default: `2`. */
  marginThreshold?: keyof Theme['space']
  /** Shadow depth of the surface. Default: `8`. */
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
  /** Names the list. Default: the trigger names it (`aria-labelledby`). */
  'aria-label'?: string
  className?: string
  'data-testid'?: string
}

// Shrink-wraps the trigger, so its box is the trigger's - the list is placed against it.
const MenuRoot = styled('div', { name: 'Menu', label: 'Menu' })({
  display: 'inline-flex',
})

interface MenuTriggerProps {
  element: ReactElement<TriggerProps>
  id: string
  elementRef: (element: HTMLElement | null) => void
  isOpen: boolean
  listId: string
  onClick: (event: MouseEvent<HTMLElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
}

/** The menu's trigger: the element given, as the button that opens the list. */
function MenuTrigger({
  element,
  id,
  elementRef,
  isOpen,
  listId,
  onClick,
  onKeyDown,
}: Readonly<MenuTriggerProps>) {
  return cloneElement(element, {
    id,
    ref: elementRef,
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
    'aria-controls': isOpen ? listId : undefined,
    onClick,
    onKeyDown,
  } as TriggerProps)
}

/**
 * @description A trigger and the `MenuList` it opens. Not modal: no focus trap, no scroll
 * lock, nothing laid over the page, so the pointer passes over it freely. The list is
 * placed `position: fixed` in the window next to the trigger, so a panel's overflow
 * can't clip it, but stays inside the menu's own box in the DOM. Escape or a chosen row
 * closes it and returns focus to the trigger; focus leaving it closes it where it went.
 */
export function Menu({
  trigger,
  children,
  items,
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpen,
  onClose,
  onStep,
  onSelect,
  align: alignProp,
  marginThreshold: marginThresholdProp,
  elevation: elevationProp,
  layer: layerProp,
  emptyLabel,
  color: colorProp,
  textColor: textColorProp,
  size: sizeProp,
  dense: denseProp,
  'aria-label': ariaLabel,
  className,
  'data-testid': dataTestid,
}: Readonly<MenuProps>) {
  // Resolution: explicit prop → theme.components.Menu.defaultProps → literal fallback.
  const dp = useDefaultProps('Menu')
  const align = alignProp ?? dp.align ?? 'start'
  const marginThreshold = marginThresholdProp ?? dp.marginThreshold ?? 2
  const elevation = elevationProp ?? dp.elevation ?? 8
  const layer = layerProp ?? dp.layer ?? 'modal'
  const color = colorProp ?? dp.color
  const textColor = textColorProp ?? dp.textColor
  const size = sizeProp ?? dp.size
  const dense = denseProp ?? dp.dense
  const theme = useTheme()
  const isControlled = isOpenProp !== undefined
  const [isOpenState, setIsOpenState] = useState(defaultOpen)
  const isOpen = isControlled ? isOpenProp : isOpenState
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const fallbackTriggerId = useId()
  const triggerId = trigger.props.id ?? fallbackTriggerId

  const margin = Number.parseFloat(String(theme.space[marginThreshold]))
  const menuContext = useMemo<MenuContextValue>(
    () => ({ align, margin, elevation, layer }),
    [align, margin, elevation, layer]
  )
  useMenuPlacement({
    isOpen,
    anchorRef: rootRef,
    surfaceRef,
    placement: 'below',
    align,
    margin,
  })

  const open = () => {
    if (!isControlled) setIsOpenState(true)
    onOpen?.()
  }

  const close = useCallback(
    (event: SyntheticEvent, reason: MenuCloseReason) => {
      if (!isControlled) setIsOpenState(false)
      onClose?.(event, reason)
      // Focus goes back to the trigger, unless it left the menu - then it stays where it went.
      if (reason !== 'blur') triggerRef.current?.focus()
    },
    [isControlled, onClose]
  )

  // The menu needs the trigger's element to hand focus back; the trigger's own ref still gets it.
  const triggerProps = trigger.props
  const setTriggerRef = useCallback(
    (element: HTMLElement | null) => {
      triggerRef.current = element
      assignRef(triggerProps.ref, element)
    },
    [triggerProps]
  )

  const handleActivate = useCallback(
    (_value: MenuItemValue | undefined, event: SyntheticEvent) => close(event, 'select'),
    [close]
  )

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    trigger.props.onClick?.(event)
    if (isOpen) close(event, 'triggerClick')
    else open()
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    trigger.props.onKeyDown?.(event)
    if (!isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault()
      open()
    }
  }

  const handleSurfaceKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close(event, 'escapeKey')
    } else if (onStep && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault()
      const step: MenuStep = event.key === 'ArrowRight' ? 1 : -1
      onStep(isRtl(event.currentTarget) ? (-step as MenuStep) : step)
    }
  }

  // Focus moving to anywhere outside the menu - a click elsewhere, Tab - closes it.
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null
    if (isOpen && !event.currentTarget.contains(next)) close(event, 'blur')
  }

  const hasRows = items ? items.length > 0 : Children.toArray(children).length > 0
  const rows = items ? <MenuItems items={items} /> : children

  return (
    <MenuRoot ref={rootRef} className={className} data-testid={dataTestid} onBlur={handleBlur}>
      <MenuTrigger
        element={trigger}
        id={triggerId}
        elementRef={setTriggerRef}
        isOpen={isOpen}
        listId={listId}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      />
      {isOpen && (
        <MenuPaper
          ref={surfaceRef}
          elevation={elevation}
          layer={layer}
          margin={margin}
          onKeyDown={handleSurfaceKeyDown}
        >
          <MenuContext.Provider value={menuContext}>
            <MenuActivationContext.Provider value={handleActivate}>
              <MenuList
                id={listId}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabel ? undefined : triggerId}
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
        </MenuPaper>
      )}
    </MenuRoot>
  )
}
