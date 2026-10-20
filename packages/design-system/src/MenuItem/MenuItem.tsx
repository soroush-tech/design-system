import {
  Children,
  useEffect,
  useId,
  useRef,
  useState,
  type ElementType,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { Icon } from '../Icon'
import { styled, type Theme, createShouldForwardProp, get } from '../index'
import { useDefaultProps, useTheme } from '../theme'
import { themeDefault } from '../theme/utils/themeDefault'
import {
  useMenuListContext,
  type MenuItemValue,
  type MenuListContextValue,
} from '../Menu/MenuListContext'
import { Submenu } from './Submenu'
import { useSubmenu } from './useSubmenu'

export type MenuItemColor = keyof Theme['palette']
export type MenuItemSize = keyof Theme['sizes']
export type MenuItemTextColor = keyof Theme['text']
/** A menu row's role: a command, the current choice of a group, or an on/off setting. */
export type MenuItemRole = 'menuitem' | 'menuitemradio' | 'menuitemcheckbox'

export interface MenuItemProps {
  /** The value this row represents - reported to `Select`'s `onChange`, or `MenuList`'s `onSelect`. Required inside a `Select`. */
  value?: MenuItemValue
  /** The row label. */
  children: ReactNode
  /** The element used for the root node - a tag name or a component. Default: `'li'`. */
  as?: ElementType
  /** Disables the row - it cannot be highlighted or chosen. In a menu the keys skip it. */
  disabled?: boolean
  /** Marks the row as the current selection. Injected by `Select`; in a menu it sets `aria-checked` on `menuitemradio` / `menuitemcheckbox` rows. */
  selected?: boolean
  /** Marks the option as the keyboard-highlighted row. Injected by `Select`. */
  highlighted?: boolean
  /** Reserves a leading checkmark slot for multi-select menus. Injected by `Select`. */
  multiple?: boolean
  /** Accent color - resolves to `theme.palette[color]`. Injected by `Select` or `MenuList`; the item's own value wins. Default: 'primary', overridable via `theme.defaults.color`. */
  color?: MenuItemColor
  /** Base text color of the row - resolves against `theme.text`. When unset, falls back to the accent color's `main`. Injected by `Select` or `MenuList`; the item's own value wins. */
  textColor?: MenuItemTextColor
  /** Density token - resolves against `theme.sizes`. Injected by `Select` or `MenuList`. Default: 'md', overridable via `theme.defaults.size`. */
  size?: MenuItemSize
  /** Compact vertical padding, independent of `size`. Default: `false`. */
  dense?: boolean
  /** Remove the left and right padding. Default: `false`. */
  disableGutters?: boolean
  /** Add a 1px bottom border to separate the row. Default: `false`. */
  divider?: boolean
  /** Focus the row on first mount, and whenever `autoFocus` flips from `false` to `true`. Default: `false`. */
  autoFocus?: boolean
  /** Class applied only while the row has keyboard focus - a `:focus-visible` hook. */
  focusVisibleClassName?: string
  /** Fired with `value` when the option is chosen. Injected by `Select`. */
  onSelect?: (value: MenuItemValue) => void
  /** Menu only: the row's role. Default: `'menuitem'`. */
  role?: MenuItemRole
  /** Menu only: an icon in the leading column. Every row keeps the column, so labels line up; a selected checkable row shows a tick there. */
  startIcon?: ReactNode
  /** Menu only: the row's keyboard shortcut, shown at its end. A string is also given to the row as `aria-keyshortcuts`. */
  shortcut?: ReactNode
  /** Menu only: why the row is off - its tooltip and accessible description. */
  note?: string
  /** Menu only: fired when the row is chosen, by a click, Enter or Space. */
  onClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void
  /** Menu only: the rows of a submenu this row opens. `null` or `[]` is a submenu with nothing in it yet - see `emptyLabel`. */
  submenu?: ReactNode
  /** Menu only: shown as one disabled row in an empty submenu ("Coming soon"). Without it, the submenu stays empty. */
  emptyLabel?: ReactNode
  /** Menu only: a control of the row's own beside it - a close button. It sits in the row's `role="none"` entry, out of the arrow keys and hidden from assistive technology (a menu owns rows alone), so it is the pointer's: give it `tabIndex={-1}`, and the row a key of its own through `MenuList`'s `onKeyDown`. */
  secondaryAction?: ReactNode
  id?: string
  className?: string
  'data-testid'?: string
}

interface MenuItemRootProps {
  color: MenuItemColor
  textColor?: MenuItemTextColor
  sizeToken: MenuItemSize
  selected: boolean
  highlighted: boolean
  disabled: boolean
  dense: boolean
  disableGutters: boolean
  divider: boolean
  isMenu: boolean
}

const shouldForwardProp = createShouldForwardProp([
  'color',
  'textColor',
  'sizeToken',
  'selected',
  'highlighted',
  'disabled',
  'dense',
  'disableGutters',
  'divider',
  'isMenu',
])

const baseStyle = ({ theme }: MenuItemRootProps & { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1],
  cursor: 'pointer',
  fontFamily: theme.fonts.body,
  lineHeight: theme.lineHeights.base,
  listStyle: 'none',
  userSelect: 'none' as const,
  whiteSpace: 'nowrap' as const,
  transition: 'background-color 0.12s ease',
  outline: 'none',
})

const sizeVariants = ({
  theme,
  sizeToken,
  dense,
  disableGutters,
}: MenuItemRootProps & { theme: Theme }) => {
  const s = theme.sizes[sizeToken]
  const verticalPadding = dense ? theme.space[0.5] : undefined
  return {
    paddingTop: verticalPadding ?? theme.space[s.paddingTop],
    paddingBottom: verticalPadding ?? theme.space[s.paddingBottom],
    paddingLeft: disableGutters ? 0 : theme.space[s.paddingLeft],
    paddingRight: disableGutters ? 0 : theme.space[s.paddingRight],
    fontSize: theme.fontSizes[s.fontSize],
  }
}

const dividerStyle = ({ theme, divider }: MenuItemRootProps & { theme: Theme }) =>
  divider
    ? {
        borderBottomWidth: theme.borderWidths.thin,
        borderBottomStyle: 'solid' as const,
        borderBottomColor: get(theme, 'border.light'),
      }
    : {}

// A menu row is highlighted while it has focus - the pointer moves focus as it goes, so
// the row under the pointer and the row the keys move are one. A checked row shows its
// tick, not a fill. A disabled row keeps pointer events so its `note` tooltip shows.
const menuStyles = ({
  theme,
  color,
  textColor,
  disabled,
}: MenuItemRootProps & { theme: Theme }) => {
  if (disabled) {
    return { color: get(theme, 'text.disabled'), cursor: 'default' }
  }
  const main = get(theme, `palette.${color}.main`)
  const highlight = { backgroundColor: `${main}1F` }
  return {
    color: textColor ? get(theme, `text.${textColor}`) : main,
    '&:focus': highlight,
    // The keys' focus is outlined too - the fill alone is too faint to find. Inset, so the
    // scrolling surface never clips it.
    '&:focus-visible': {
      outline: `${theme.borderWidths.base} solid ${main}`,
      outlineOffset: `-${theme.borderWidths.base}`,
    },
    // A row stays highlighted while its submenu is open.
    '&[aria-expanded="true"]': highlight,
  }
}

// Hover/selected shading is derived from the accent palette so menus stay on-theme
// in both color schemes. Opacity is expressed with a hex suffix, never `rgba()`.
const interactionStyles = (props: MenuItemRootProps & { theme: Theme }) => {
  const { theme, color, textColor, selected, highlighted, disabled, isMenu } = props
  if (isMenu) return menuStyles(props)

  const main = get(theme, `palette.${color}.main`)
  const hoverBg = `${main}1F`
  const selectedBg = `${main}29`
  const activeSelectedBg = `${main}3D`

  if (disabled) {
    return {
      color: get(theme, 'text.disabled'),
      cursor: 'not-allowed',
      pointerEvents: 'none' as const,
    }
  }

  const baseColor = textColor ? get(theme, `text.${textColor}`) : main
  const selectedBackground = highlighted ? activeSelectedBg : selectedBg
  const idleBackground = highlighted ? hoverBg : 'transparent'
  return {
    color: selected ? main : baseColor,
    backgroundColor: selected ? selectedBackground : idleBackground,
    '&:hover': {
      backgroundColor: selected ? activeSelectedBg : hoverBg,
    },
  }
}

const MenuItemRoot = styled('li', {
  name: 'MenuItem',
  label: 'MenuItem',
  shouldForwardProp,
})<MenuItemRootProps>(baseStyle, sizeVariants, dividerStyle, interactionStyles)

// A fixed-width slot keeps labels aligned whether or not the checkmark is shown.
const CheckSlot = styled('span', { name: 'MenuItem', slot: 'check', label: 'MenuItemCheck' })({
  display: 'inline-flex',
  width: '1.125rem',
  flexShrink: 0,
})

// The menu row's leading column - kept on every row, empty or not, so labels line up.
const StartIconSlot = styled('span', {
  name: 'MenuItem',
  slot: 'startIcon',
  label: 'MenuItemStartIcon',
})(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.icon.sm,
  height: theme.icon.sm,
  flexShrink: 0,
}))

const LabelSlot = styled('span', { name: 'MenuItem', slot: 'label', label: 'MenuItemLabel' })({
  flex: 1,
  minWidth: 0,
})

const ShortcutSlot = styled('span', {
  name: 'MenuItem',
  slot: 'shortcut',
  label: 'MenuItemShortcut',
})(({ theme }) => ({
  marginLeft: theme.space[3],
  color: get(theme, 'text.secondary'),
  fontSize: '0.875em',
}))

const SubmenuIconSlot = styled('span', {
  name: 'MenuItem',
  slot: 'submenuIcon',
  label: 'MenuItemSubmenuIcon',
})(({ theme }) => ({
  display: 'inline-flex',
  marginLeft: theme.space[2],
  // The chevron points the way the submenu opens.
  '[dir="rtl"] &': { transform: 'scaleX(-1)' },
}))

// A row and its submenu sit side by side in a `role="none"` entry - a row can't hold rows - and
// so do a row and its own control, the row taking the room the control leaves.
const EntrySlot = styled('li', {
  name: 'MenuItem',
  slot: 'entry',
  label: 'MenuItemEntry',
  shouldForwardProp: createShouldForwardProp(['hasSecondaryAction']),
})<{ hasSecondaryAction: boolean }>(({ hasSecondaryAction }) => ({
  listStyle: 'none',
  ...(hasSecondaryAction && {
    display: 'flex',
    alignItems: 'center',
    '& > [role^="menuitem"]': { flex: '1 1 auto', minWidth: 0 },
  }),
}))

const SecondaryActionSlot = styled('span', {
  name: 'MenuItem',
  slot: 'secondaryAction',
  label: 'MenuItemSecondaryAction',
})(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  paddingInlineEnd: theme.space[1],
}))

// `:focus-visible` isn't universally supported by `matches()` (older jsdom throws),
// so treat an unsupported environment as "not keyboard focus".
function isKeyboardFocus(element: Element): boolean {
  try {
    return element.matches(':focus-visible')
  } catch {
    return false
  }
}

type RowLook = Pick<MenuItemProps, 'color' | 'textColor' | 'size' | 'dense'>

// A row's look: its own prop, then its list's, then theme.components.MenuItem.defaultProps,
// then theme.defaults, then the literal.
function useRowLook(own: RowLook, menu: MenuListContextValue | null) {
  const theme = useTheme()
  const dp = useDefaultProps('MenuItem')
  return {
    color: own.color ?? menu?.color ?? dp.color ?? themeDefault(theme, 'color', 'primary'),
    size: own.size ?? menu?.size ?? dp.size ?? themeDefault(theme, 'size', 'md'),
    textColor: own.textColor ?? menu?.textColor ?? dp.textColor,
    dense: own.dense ?? menu?.dense ?? dp.dense ?? false,
  }
}

interface RowAriaState {
  role: MenuItemRole
  selected: boolean
  hasSubmenu: boolean
  isSubmenuOpen: boolean
  submenuId: string
  shortcut: ReactNode
  note?: string
  noteId: string
}

// What a menu row announces: the submenu it opens and whether it's open, whether it's checked,
// its keys, and why it is off.
const getRowAria = (state: RowAriaState) => ({
  'aria-haspopup': state.hasSubmenu ? ('menu' as const) : undefined,
  'aria-expanded': state.hasSubmenu ? state.isSubmenuOpen : undefined,
  'aria-controls': state.isSubmenuOpen ? state.submenuId : undefined,
  'aria-checked': state.role === 'menuitem' ? undefined : state.selected,
  'aria-keyshortcuts': typeof state.shortcut === 'string' ? state.shortcut : undefined,
  'aria-describedby': state.note ? state.noteId : undefined,
})

// The class names given, without the ones left out - none at all when every one is.
const joinClassNames = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(' ') || undefined

/**
 * @description A row of a list. Inside a `MenuList` it is a menu row - a `menuitem`
 * (or `menuitemradio` / `menuitemcheckbox`) with a leading icon column, its label and a
 * trailing shortcut, chosen by a click, Enter or Space. Anywhere else it is `Select`'s
 * `<li role="option">` (override via `as`), whose selection, highlight and density props
 * `Select` injects; used on its own it renders a static, styled row.
 */
export function MenuItem({
  value,
  children,
  as,
  disabled = false,
  selected = false,
  highlighted = false,
  multiple = false,
  color: colorProp,
  textColor: textColorProp,
  size: sizeProp,
  dense: denseProp,
  disableGutters = false,
  divider = false,
  autoFocus = false,
  focusVisibleClassName,
  onSelect,
  role = 'menuitem',
  startIcon,
  shortcut,
  note,
  onClick,
  submenu,
  emptyLabel,
  secondaryAction,
  id,
  className,
  'data-testid': dataTestid,
}: Readonly<MenuItemProps>) {
  const menu = useMenuListContext()
  const isMenu = menu !== null
  const { color, size, textColor, dense } = useRowLook(
    { color: colorProp, size: sizeProp, textColor: textColorProp, dense: denseProp },
    menu
  )
  const rootRef = useRef<HTMLLIElement>(null)
  const [isFocusVisible, setIsFocusVisible] = useState(false)
  const noteId = useId()
  const fallbackId = useId()
  const hasSubmenu = isMenu && submenu !== undefined
  const {
    isOpen: isSubmenuOpen,
    entryRef,
    listId: submenuId,
    handleRowFocus,
    handleRowKeyDown,
    handleEntryKeyDown,
    handleEntryBlur,
  } = useSubmenu(rootRef, hasSubmenu && !disabled)

  useEffect(() => {
    if (autoFocus) {
      rootRef.current?.focus()
    }
  }, [autoFocus])

  const choose = (event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>) => {
    // A row with a submenu opens it rather than being chosen.
    if (disabled || hasSubmenu) return
    if (menu) {
      onClick?.(event)
      menu.onActivate(value, event)
    } else if (value !== undefined) {
      onSelect?.(value)
    }
  }

  // Keep focus on the combobox trigger so its `aria-activedescendant` model holds.
  // A menu row takes focus itself, so it lets the press through.
  const handleMouseDown = (event: MouseEvent<HTMLLIElement>) => {
    if (!isMenu) event.preventDefault()
  }

  // Enter chooses on press and Space on release, as a native button does.
  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (handleRowKeyDown(event)) return
    if (event.key === 'Enter') {
      event.preventDefault()
      choose(event)
    } else if (event.key === ' ') {
      event.preventDefault()
    }
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === ' ') choose(event)
  }

  // The pointer moves focus as it goes, so hover and the keys never disagree.
  const handlePointerMove = (event: MouseEvent<HTMLLIElement>) => {
    const row = event.currentTarget
    if (!disabled && row.ownerDocument.activeElement !== row) row.focus()
  }

  const handleFocus = (event: FocusEvent<HTMLLIElement>) => {
    handleRowFocus()
    if (focusVisibleClassName && isKeyboardFocus(event.currentTarget)) {
      setIsFocusVisible(true)
    }
  }

  const handleBlur = () => {
    setIsFocusVisible(false)
  }

  const rootClassName = joinClassNames(className, isFocusVisible && focusVisibleClassName)

  const rootProps = {
    as,
    ref: rootRef,
    id,
    tabIndex: -1,
    'aria-disabled': disabled || undefined,
    'data-value': value,
    color,
    textColor,
    sizeToken: size,
    selected,
    highlighted,
    disabled,
    dense,
    disableGutters,
    divider,
    isMenu,
    className: rootClassName,
    'data-testid': dataTestid,
    onMouseDown: handleMouseDown,
    onClick: choose,
    onFocus: handleFocus,
    onBlur: handleBlur,
  }

  if (!isMenu) {
    return (
      <MenuItemRoot {...rootProps} role="option" aria-selected={selected}>
        {multiple && (
          <CheckSlot aria-hidden>
            {selected && <Icon name="check" size="1.125rem" color="inherit" />}
          </CheckSlot>
        )}
        {children}
      </MenuItemRoot>
    )
  }

  const tick =
    role !== 'menuitem' && selected ? <Icon name="check" size="sm" color="inherit" /> : null
  const rowId = id ?? fallbackId
  const hasSecondaryAction = secondaryAction != null
  // In an entry - beside its submenu or its own control - the row is a div: the entry is the li.
  const row = (
    <MenuItemRoot
      {...rootProps}
      as={hasSubmenu || hasSecondaryAction ? 'div' : as}
      id={rowId}
      role={role}
      {...getRowAria({
        role,
        selected,
        hasSubmenu,
        isSubmenuOpen,
        submenuId,
        shortcut,
        note,
        noteId,
      })}
      title={note}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onPointerMove={handlePointerMove}
    >
      <StartIconSlot aria-hidden>{startIcon ?? tick}</StartIconSlot>
      <LabelSlot data-menu-label>{children}</LabelSlot>
      {shortcut != null && <ShortcutSlot aria-hidden>{shortcut}</ShortcutSlot>}
      {hasSubmenu && (
        <SubmenuIconSlot aria-hidden>
          <Icon name="chevron_right" size="sm" color="inherit" />
        </SubmenuIconSlot>
      )}
      {note && (
        <span id={noteId} hidden>
          {note}
        </span>
      )}
    </MenuItemRoot>
  )
  if (!hasSubmenu && !hasSecondaryAction) return row
  if (!hasSubmenu) {
    return (
      <EntrySlot role="none" hasSecondaryAction>
        {row}
        <SecondaryActionSlot aria-hidden>{secondaryAction}</SecondaryActionSlot>
      </EntrySlot>
    )
  }

  const hasRows = Children.toArray(submenu).length > 0
  return (
    <EntrySlot
      ref={entryRef}
      role="none"
      hasSecondaryAction={hasSecondaryAction}
      onKeyDown={handleEntryKeyDown}
      onBlur={handleEntryBlur}
    >
      {row}
      {hasSecondaryAction && (
        <SecondaryActionSlot aria-hidden>{secondaryAction}</SecondaryActionSlot>
      )}
      {isSubmenuOpen && (
        <Submenu anchorRef={entryRef} listId={submenuId} labelledBy={rowId}>
          {hasRows ? submenu : emptyLabel != null && <MenuItem disabled>{emptyLabel}</MenuItem>}
        </Submenu>
      )}
    </EntrySlot>
  )
}
