import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  type AriaAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import type { LayoutProps, SpaceProps } from '@soroush.tech/styled-system'
import { styled, type Theme, createShouldForwardProp, props, space, layout } from '../../index'
import { useDefaultProps } from '../../theme'
import { themeDefault } from '../../theme/utils/themeDefault'
import { MenuActivationContext } from '../MenuActivationContext'
import {
  MenuListContext,
  useMenuListContext,
  type MenuItemValue,
  type MenuListContextValue,
} from '../MenuListContext'
import { getNextRow, type RowStep } from './utils/getNextRow'
import { getOwnRows, isRowEnabled } from './utils/getOwnRows'
import { findRowByText } from './utils/findRowByText'

export type { MenuItemValue } from '../MenuListContext'

export interface MenuListProps extends SpaceProps<Theme>, LayoutProps<Theme> {
  /** `MenuItem` rows and `MenuDivider`s. */
  children?: ReactNode
  /** Fired with a row's `value` when a row that has one is chosen. */
  onSelect?: (value: MenuItemValue) => void
  /** Carry the arrow keys past the last row to the first, and back. Default: `true`. */
  shouldWrap?: boolean
  /** Focus the selected row, or the first enabled one, on mount. Default: `false`. */
  shouldAutoFocus?: boolean
  /** Accent color for every row - resolves to `theme.palette[color]`. A row's own value wins. */
  color?: keyof Theme['palette']
  /** Base text color for every row - resolves against `theme.text`. A row's own value wins. */
  textColor?: keyof Theme['text']
  /** Density token for every row - resolves against `theme.sizes`. A row's own value wins. */
  size?: keyof Theme['sizes']
  /** Compact vertical padding for every row. */
  dense?: boolean
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
  id?: string
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}

/**
 * What an app may put on the `role="menu"` list a `Menu` or a `ContextMenu` renders, through
 * `slotProps.list`: its marks (`data-*`), class, `aria-*` and an `onKeyDown`, which runs before the
 * list's own. The list's `role`, `id` and name are the menu's, and win.
 */
export type MenuListSlotProps = Pick<MenuListProps, 'className' | 'data-testid' | 'onKeyDown'> &
  Omit<AriaAttributes, 'aria-label' | 'aria-labelledby'> & {
    [name: `data-${string}`]: string | number | boolean | undefined
  }

const STEP_BY_KEY: Record<string, RowStep> = {
  ArrowDown: 'next',
  ArrowUp: 'previous',
  Home: 'first',
  End: 'last',
}

// Keys typed within this many milliseconds build one type-ahead query.
const TYPEAHEAD_TIMEOUT = 500

const shouldForwardProp = createShouldForwardProp([...props])

// `size` names the rows' density here, not layout's width-and-height shorthand.
const layoutWithoutSize = (styleProps: MenuListProps & { theme?: Theme }) =>
  layout({ ...styleProps, size: undefined })

// The space and layout props come after the list's own styles, so an instance's `p` or
// `m` wins over the defaults below.
const MenuListRoot = styled('ul', {
  name: 'MenuList',
  label: 'MenuList',
  shouldForwardProp,
  systemProps: [space, layoutWithoutSize],
})<MenuListProps>(({ theme }) => ({
  listStyle: 'none',
  margin: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: theme.space[0.5],
  paddingBottom: theme.space[0.5],
  outline: 'none',
  // A list with no row to focus takes focus itself - outlined for the keys, the way a row is.
  '&:focus-visible': {
    outline: `${theme.borderWidths.base} solid ${theme.palette[themeDefault(theme, 'color', 'primary')].main}`,
    outlineOffset: `-${theme.borderWidths.base}`,
  },
}))

const isPrintableKey = (event: KeyboardEvent) =>
  event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey

/**
 * @description A `role="menu"` list that owns the keyboard: the arrow keys, Home and End
 * move focus between its own rows, skipping disabled ones; typing jumps to a row by its
 * label. Rows are found in the DOM by their nearest `role="menu"`, so a nested submenu's
 * rows are never this list's. Renders in place - `Menu` floats one next to a trigger.
 */
export function MenuList({
  children,
  onSelect,
  shouldWrap: shouldWrapProp,
  shouldAutoFocus = false,
  color,
  textColor,
  size,
  dense,
  onKeyDown,
  ...rest
}: Readonly<MenuListProps>) {
  const listRef = useRef<HTMLUListElement>(null)
  const typed = useRef({ keys: '', time: 0 })
  const onMenuActivate = useContext(MenuActivationContext)
  // A submenu's list sits inside its parent's: a choice there is the parent's choice too, and
  // its rows take the parent's look unless it sets its own.
  const parent = useMenuListContext()
  // Resolution: explicit prop → the parent list's → theme.components.MenuList.defaultProps.
  const dp = useDefaultProps('MenuList')
  const shouldWrap = shouldWrapProp ?? dp.shouldWrap ?? true
  const rowColor = color ?? parent?.color ?? dp.color
  const rowTextColor = textColor ?? parent?.textColor ?? dp.textColor
  const rowSize = size ?? parent?.size ?? dp.size
  const rowDense = dense ?? parent?.dense ?? dp.dense

  useEffect(() => {
    const list = listRef.current
    if (!shouldAutoFocus || !list) return
    const rows = getOwnRows(list).filter(isRowEnabled)
    const target = rows.find((row) => row.getAttribute('aria-checked') === 'true') ?? rows[0]
    ;(target ?? list).focus()
  }, [shouldAutoFocus])

  const context = useMemo<MenuListContextValue>(
    () => ({
      onActivate: (value, event) => {
        if (value !== undefined) onSelect?.(value)
        if (parent) parent.onActivate(value, event)
        else onMenuActivate?.(value, event)
      },
      color: rowColor,
      textColor: rowTextColor,
      size: rowSize,
      dense: rowDense,
    }),
    [onSelect, onMenuActivate, parent, rowColor, rowTextColor, rowSize, rowDense]
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const list = event.currentTarget
    // A key pressed in a nested submenu bubbles through here; that list handles its own.
    if ((event.target as HTMLElement).closest('[role="menu"]') !== list) return

    // The app's handler goes first and can keep the key from the list by preventing it.
    onKeyDown?.(event)
    if (event.defaultPrevented) return

    const rows = getOwnRows(list)
    const current = list.ownerDocument.activeElement
    const step = STEP_BY_KEY[event.key]
    let target: HTMLElement | undefined
    if (step) {
      target = getNextRow(rows, current, step, shouldWrap)
    } else if (isPrintableKey(event)) {
      const now = Date.now()
      const isFresh = now - typed.current.time > TYPEAHEAD_TIMEOUT
      typed.current = { keys: (isFresh ? '' : typed.current.keys) + event.key, time: now }
      target = findRowByText(rows, current, typed.current.keys)
    }
    if (step || target) event.preventDefault()
    target?.focus()
  }

  return (
    <MenuListContext.Provider value={context}>
      <MenuListRoot {...rest} ref={listRef} role="menu" tabIndex={-1} onKeyDown={handleKeyDown}>
        {children}
      </MenuListRoot>
    </MenuListContext.Provider>
  )
}
