import {
  useContext,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { Icon } from '../../Icon'
import { styled, type Theme, createShouldForwardProp, get } from '../../index'
import { useDefaultProps, type TabsVariants } from '../../theme'
import { TabIndexContext, useTabsContext, type TabValue } from '../TabsContext'
import { getDividerShadow } from '../utils/dividerLine'

/** Where `icon` sits around a tab's label. */
export type TabIconPosition = 'start' | 'end' | 'top' | 'bottom'

export interface TabProps {
  /** What the tab is chosen as. Default: its position among the tabs. */
  value?: TabValue
  /** The tab's label. */
  label?: ReactNode
  /** The tab's icon, as given - its size is the icon's own (`<Icon size="sm" />`). */
  icon?: ReactNode
  /** Where `icon` sits around the label. Default: `'top'`. */
  iconPosition?: TabIconPosition
  /**
   * The tab's ground while it isn't selected - resolves against `theme.background`. Selected, it
   * takes its `Tabs`' `selectedBg`.
   */
  bg?: keyof Theme['background']
  /**
   * The tab's corner radius - resolves against `theme.radii`. In the enclosed look it rounds the
   * corners away from the divider; elsewhere, all four. Default: `'sm'` boxed or enclosed, none
   * otherwise.
   */
  borderRadius?: keyof Theme['radii']
  /** The tab's accent - its selected label, outline and indicator - resolves to `theme.palette[color]`. Default: its `Tabs`'. */
  color?: keyof Theme['palette']
  /** The label's color - resolves against `theme.text`. Default: its `Tabs`'. */
  textColor?: keyof Theme['text']
  /** Density token - resolves against `theme.sizes`. Default: its `Tabs`'. */
  size?: keyof Theme['sizes']
  /** The tab's ground while it is selected - resolves against `theme.background`. Default: its `Tabs`' `selectedBg`. */
  selectedBg?: keyof Theme['background']
  /** The label may take two lines rather than one. Default: `false`. */
  isWrapped?: boolean
  /** The tab can't be chosen, and the arrow keys pass it. Default: `false`. */
  disabled?: boolean
  /** A link, for a navigation of pages. */
  href?: string
  /** The element the tab is rendered as. Default: `'button'`, or `'a'` with `href`. */
  as?: ElementType
  /** Fired when the tab is pressed. */
  onClick?: (event: MouseEvent<HTMLElement>) => void
  /** Hover text. */
  title?: string
  /** Makes the tab closable: its close button's tooltip (`Close Button`). The button is the pointer's - a tablist owns tabs alone, so it is hidden from assistive technology - and Delete closes the focused tab. `Tabs`' `onTabClose` hears either. */
  closeLabel?: string
  /** A control of the tab's own after its label - a kebab menu, a badge. */
  secondaryAction?: ReactNode
  className?: string
  'data-testid'?: string
}

interface TabStyleProps {
  variant: keyof TabsVariants
  color: keyof Theme['palette']
  textColor?: keyof Theme['text']
  sizeToken: keyof Theme['sizes']
  isSelected: boolean
  isDisabled: boolean
  /** Where the tab's icon sits - none when it has no icon. */
  iconPlacement?: TabIconPosition
  isWrapped: boolean
  fullWidth: boolean
  isVertical: boolean
  hasDivider: boolean
  /** The selected tab's ground, a `theme.background` key. */
  selectedBg?: keyof Theme['background']
  /** The tab's own ground while unselected. */
  bg?: keyof Theme['background']
  borderRadius?: keyof Theme['radii']
  /** The row's line color - the selected tab's - which an unselected tab's stretch of it takes. */
  lineColor: keyof Theme['palette']
  /** The row's tallest top and bottom padding, in place of the tab's own across a row. */
  rowPaddingTop: Theme['sizes'][keyof Theme['sizes']]['paddingTop']
  rowPaddingBottom: Theme['sizes'][keyof Theme['sizes']]['paddingBottom']
}

const shouldForwardProp = createShouldForwardProp([
  'variant',
  'color',
  'textColor',
  'sizeToken',
  'isSelected',
  'isDisabled',
  'iconPlacement',
  'isWrapped',
  'fullWidth',
  'isVertical',
  'hasDivider',
  'selectedBg',
  'bg',
  'borderRadius',
  'lineColor',
  'rowPaddingTop',
  'rowPaddingBottom',
])

// The enclosed look: the selected tab outlined, its corners away from the divider rounded - open
// on the divider's side, so it reads as part of what lies below. Every other tab draws its own
// stretch of the line; the selected one leaves its stretch out, so the opening needs no
// background to paint over it. Drawn as inset shadows, not borders: they span the tab's full
// width and follow its rounded corners, so the line runs unbroken from tab to tab and meets the
// outline without a notch - a border would hold them inside it. A padding as wide as the other
// looks' border takes its room, so switching looks moves nothing. Without a divider there is no
// line and no outline: the selected tab stands out by its ground alone (`selectedBg`), the same
// as its panel's.
const getEnclosedEdgeStyle = (
  theme: Theme,
  main: string,
  lineMain: string,
  isSelected: boolean,
  isVertical: boolean,
  hasDivider: boolean,
  radius: string
) => {
  const thin = theme.borderWidths.thin
  // The inset shadow on each side but the divider's: top, end (right), foot, start (left).
  const top = `inset 0 ${thin} 0 ${main}`
  const right = `inset -${thin} 0 0 ${main}`
  const foot = `inset 0 -${thin} 0 ${main}`
  const left = `inset ${thin} 0 0 ${main}`
  const outline = isVertical ? [top, foot, left] : [top, right, left]
  let edges = 'none'
  if (hasDivider)
    edges = isSelected ? outline.join(', ') : getDividerShadow(theme, isVertical, lineMain)
  return {
    border: 'none',
    padding: thin,
    boxShadow: edges,
    borderRadius: 0,
    ...(isVertical
      ? { borderStartStartRadius: radius, borderEndStartRadius: radius }
      : { borderTopLeftRadius: radius, borderTopRightRadius: radius }),
  }
}

// The tab's box: the tab itself and its own controls beside it - a secondary action and
// the close button - inside one outline. Every tab keeps its border, transparent until
// selected, so selecting one moves nothing.
const TabRoot = styled('div', {
  name: 'Tab',
  label: 'Tab',
  shouldForwardProp,
})<TabStyleProps>(({
  theme,
  variant,
  color,
  isSelected,
  isDisabled,
  fullWidth,
  isVertical,
  hasDivider,
  selectedBg,
  bg,
  borderRadius,
  lineColor,
}) => {
  const main = get(theme, `palette.${color}.main`)
  const isBoxed = variant === 'boxed'
  const raised = get(theme, 'background.paper')
  // Selected, the Tabs' selectedBg; otherwise the tab's own bg.
  const groundKey = isSelected && selectedBg ? selectedBg : bg
  const ground = groundKey ? get(theme, `background.${groundKey}`) : 'transparent'
  // The boxed and enclosed looks round their tabs a little unless told otherwise.
  const isRounded = isBoxed || variant === 'enclosed'
  let radius: string | number = 0
  if (borderRadius) radius = theme.radii[borderRadius]
  else if (isRounded) radius = theme.radii.sm
  return {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'stretch',
    flexGrow: fullWidth ? 1 : 0,
    flexShrink: fullWidth ? 1 : 0,
    flexBasis: fullWidth ? 0 : 'auto',
    minWidth: 0,
    backgroundColor: ground,
    border: `${theme.borderWidths.thin} solid ${isBoxed && isSelected ? `${main}59` : 'transparent'}`,
    borderRadius: radius,
    ...(variant === 'enclosed' &&
      getEnclosedEdgeStyle(
        theme,
        main,
        get(theme, `palette.${lineColor}.main`),
        isSelected,
        isVertical,
        hasDivider,
        String(radius)
      )),
    transition: 'background-color 0.12s ease',
    ...(isDisabled ? {} : { '&:hover': { backgroundColor: isBoxed ? raised : `${main}14` } }),
    // The close button shows on the selected tab and under the pointer, keeping its room.
    '&:hover [data-tab-close]': { visibility: 'visible' as const },
  }
})

const TabLabel = styled('button', {
  name: 'Tab',
  slot: 'label',
  label: 'TabLabel',
  shouldForwardProp,
})<TabStyleProps & { href?: string }>(({
  theme,
  variant,
  color,
  textColor,
  sizeToken,
  isSelected,
  isDisabled,
  iconPlacement,
  isWrapped,
  isVertical,
  rowPaddingTop,
  rowPaddingBottom,
}) => {
  const { paddingTop, paddingBottom, paddingLeft, paddingRight, fontSize } = theme.sizes[sizeToken]
  const main = get(theme, `palette.${color}.main`)
  const idleColor = get(theme, `text.${textColor ?? 'primary'}`)
  const selectedColor = variant === 'boxed' ? idleColor : main
  const isBeside = iconPlacement === 'start' || iconPlacement === 'end'
  return {
    appearance: 'none' as const,
    // A grid, so the icon and label move as one block: a neighbour's icon above its label
    // makes the row taller, and every label still sits on the row's last line - at the
    // foot of the tab, or at its head when the icon is below the label. An icon beside the
    // label stays centred on it.
    display: 'grid',
    gridAutoFlow: isBeside ? ('column' as const) : ('row' as const),
    alignContent: iconPlacement === 'bottom' ? 'start' : 'end',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    gap: theme.space[1],
    flex: 1,
    minWidth: 0,
    margin: 0,
    // Across a row, the row's: its labels share a line whatever each tab's size.
    paddingTop: theme.space[isVertical ? paddingTop : rowPaddingTop],
    paddingBottom: theme.space[isVertical ? paddingBottom : rowPaddingBottom],
    paddingLeft: theme.space[paddingLeft],
    paddingRight: theme.space[paddingRight],
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes[fontSize],
    lineHeight: theme.lineHeights.base,
    whiteSpace: isWrapped ? ('normal' as const) : ('nowrap' as const),
    textAlign: 'center' as const,
    textDecoration: 'none',
    color: isDisabled ? get(theme, 'text.disabled') : isSelected ? selectedColor : idleColor,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 'inherit',
    cursor: isDisabled ? 'default' : 'pointer',
    outline: 'none',
    '&:focus-visible': {
      outline: `${theme.borderWidths.base} solid ${main}`,
      outlineOffset: `-${theme.borderWidths.base}`,
    },
  }
})

const SecondaryActionSlot = styled('div', {
  name: 'Tab',
  slot: 'secondaryAction',
  label: 'TabSecondaryAction',
})({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
})

const TabClose = styled('button', {
  name: 'Tab',
  slot: 'close',
  label: 'TabClose',
  shouldForwardProp,
})<Pick<TabStyleProps, 'color' | 'isSelected'>>(({ theme, color, isSelected }) => ({
  appearance: 'none' as const,
  display: 'grid',
  placeItems: 'center',
  alignSelf: 'center',
  flexShrink: 0,
  width: theme.icon.sm,
  height: theme.icon.sm,
  padding: 0,
  marginInlineEnd: theme.space[0.5],
  border: 'none',
  borderRadius: theme.radii.sm,
  backgroundColor: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  visibility: isSelected ? ('visible' as const) : ('hidden' as const),
  '&:hover': { backgroundColor: `${get(theme, `palette.${color}.main`)}1F` },
}))

const IconSlot = styled('span', { name: 'Tab', slot: 'icon', label: 'TabIcon' })({
  display: 'inline-flex',
  flexShrink: 0,
})

/**
 * @description One tab of a `Tabs`. In a `tablist` it is a `tab` with `aria-selected` and
 * `aria-controls`, the selected one alone in the page's tab order; in a navigation
 * (`Tabs as="nav"`) a button or link marked `aria-current="page"` when it is the current
 * one. It takes one `icon`, which `iconPosition` places on a side of its label.
 */
export function Tab({
  value: valueProp,
  label,
  icon,
  iconPosition = 'top',
  isWrapped: isWrappedProp,
  bg: bgProp,
  borderRadius: borderRadiusProp,
  color: colorProp,
  textColor: textColorProp,
  size: sizeProp,
  selectedBg: selectedBgProp,
  disabled = false,
  href,
  as,
  onClick,
  title,
  closeLabel,
  secondaryAction,
  className,
  'data-testid': dataTestid,
}: Readonly<TabProps>) {
  const dp = useDefaultProps('Tab')
  const iconPlacement = icon == null ? undefined : iconPosition
  // Before the label above it or at its start, after it below it or at its end.
  const isIconFirst = iconPlacement === 'top' || iconPlacement === 'start'
  const iconSlot = icon == null ? null : <IconSlot aria-hidden>{icon}</IconSlot>
  const isWrapped = isWrappedProp ?? dp.isWrapped ?? false
  const bg = bgProp ?? dp.bg
  const borderRadius = borderRadiusProp ?? dp.borderRadius
  const tabs = useTabsContext()
  const index = useContext(TabIndexContext)
  const value = valueProp ?? index
  const isSelected = tabs.selectedValue === value
  const { isNavigation, select, rowProps } = tabs
  // As a table cell's: the tab's own value, then its row's, then the theme's for every tab, then
  // the row's resolved one.
  const color = colorProp ?? rowProps.color ?? dp.color ?? tabs.color
  const textColor = textColorProp ?? rowProps.textColor ?? dp.textColor ?? tabs.textColor
  const size = sizeProp ?? rowProps.size ?? dp.size ?? tabs.size
  const selectedBg = selectedBgProp ?? rowProps.selectedBg ?? dp.selectedBg ?? tabs.selectedBg

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    onClick?.(event)
    select(value)
  }

  const handleFocus = () => {
    if (tabs.shouldSelectOnFocus && !disabled && !isSelected) select(value)
  }

  const isClosable = closeLabel !== undefined
  const close = () => tabs.onTabClose?.(value)

  // A middle click closes a closable tab, as an editor's does - and doesn't start autoscroll.
  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    if (isClosable && event.button === 1) event.preventDefault()
  }

  const handleAuxClick = (event: MouseEvent<HTMLElement>) => {
    if (isClosable && event.button === 1) close()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (isClosable && event.key === 'Delete') {
      event.preventDefault()
      close()
    }
  }

  const element = as ?? (href === undefined ? 'button' : 'a')
  const semantics = isNavigation
    ? { 'aria-current': isSelected ? ('page' as const) : undefined }
    : {
        role: 'tab',
        'aria-selected': isSelected,
        'aria-controls': tabs.getPanelId(value),
        tabIndex: value === tabs.focusableValue ? 0 : -1,
      }

  const styleProps = {
    variant: tabs.variant,
    color,
    textColor,
    sizeToken: size,
    isSelected,
    isDisabled: disabled,
    iconPlacement,
    isWrapped,
    fullWidth: tabs.fullWidth,
    isVertical: tabs.isVertical,
    hasDivider: tabs.hasDivider,
    selectedBg,
    bg,
    borderRadius,
    lineColor: tabs.selectedColor,
    rowPaddingTop: tabs.rowPaddingTop,
    rowPaddingBottom: tabs.rowPaddingBottom,
  }
  return (
    <TabRoot
      {...styleProps}
      role="presentation"
      className={className}
      data-tab-value={String(value)}
      data-tab-selected={isSelected || undefined}
    >
      <TabLabel
        {...semantics}
        as={element}
        id={tabs.getTabId(value)}
        type={element === 'button' ? 'button' : undefined}
        href={href}
        title={title}
        aria-disabled={disabled || undefined}
        aria-keyshortcuts={isClosable ? 'Delete' : undefined}
        data-tab
        data-testid={dataTestid}
        {...styleProps}
        onClick={handleClick}
        onFocus={handleFocus}
        onMouseDown={handleMouseDown}
        onAuxClick={handleAuxClick}
        onKeyDown={handleKeyDown}
      >
        {isIconFirst && iconSlot}
        {label}
        {!isIconFirst && iconSlot}
      </TabLabel>
      {secondaryAction != null && <SecondaryActionSlot>{secondaryAction}</SecondaryActionSlot>}
      {isClosable && (
        // The pointer's: out of the tab order and hidden from assistive technology - a tablist
        // owns tabs alone, and Delete closes the focused tab (`aria-keyshortcuts`).
        <TabClose
          type="button"
          aria-hidden
          title={closeLabel}
          tabIndex={-1}
          data-tab-close
          color={color}
          isSelected={isSelected}
          onClick={close}
        >
          <Icon name="close" size="0.75rem" color="inherit" />
        </TabClose>
      )}
    </TabRoot>
  )
}
