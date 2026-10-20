import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { styled, type Theme, createShouldForwardProp, props, space, get } from '../../index'
import { useDefaultProps, useTheme, type TabsVariants } from '../../theme'
import { themeDefault } from '../../theme/utils/themeDefault'
import { Icon } from '../../Icon'
import { View } from '../../View'
import { Menu } from '../../Menu/Menu'
import { MenuItem } from '../../MenuItem'
import { isRtl } from '../../utils/isRtl'
import { TabScrollButton, type TabScrollButtonProps } from '../TabScrollButton'
import { useTabsOverflow } from '../hooks/useTabsOverflow'
import { useTabsScroll } from '../hooks/useTabsScroll'
import {
  TabIndexContext,
  TabsContext,
  type TabRowProps,
  type TabValue,
  type TabsContextValue,
} from '../TabsContext'
import { useTabList } from '../TabListContext'
import { getNextTab, type TabStep } from '../utils/getNextTab'
import { getPanelId, getTabId } from '../utils/tabIds'
import { getDividerColor, getDividerShadow, getEnclosedPieceStyle } from '../utils/dividerLine'
import { surfaceSystem } from '../utils/surfaceSystem'

export type { TabValue } from '../TabsContext'
export type TabsVariant = keyof TabsVariants
export type TabsOrientation = 'horizontal' | 'vertical'
/** What the row does when its tabs don't fit: scroll, list the rest in a menu, or nothing. */
export type TabsOverflowBehavior = 'scroll' | 'menu' | 'none'
/** When a scrolling row shows its scroll buttons. */
export type TabsScrollButtons = 'auto' | 'always' | 'never'

/** What `action` exposes. */
export interface TabsActions {
  /** Re-measures the selected tab for the indicator - after a font loads or a label changes. */
  updateIndicator: () => void
  /** Re-reads whether the tabs overflow - for the scroll buttons, or which tabs go to the menu. */
  updateOverflow: () => void
}

export interface TabsProps extends SpaceProps<Theme> {
  /** `Tab`s. */
  children?: ReactNode
  /** The selected tab's value - `null` for none. Controlled with `onChange`. */
  value?: TabValue | null
  /** The selected tab's value at first, when uncontrolled. */
  defaultValue?: TabValue | null
  /** Fired with a tab's value when it is chosen. */
  onChange?: (value: TabValue) => void
  /** Fired with a closable tab's value when its close button, a middle click or Delete closes it. Removing the tab, and picking the next selection, are the app's. */
  onTabClose?: (value: TabValue) => void
  /** `'nav'` makes it a navigation of links or buttons (`aria-current="page"`) rather than a `tablist`. Default: `'div'`. */
  as?: 'div' | 'nav'
  /** Default: `'horizontal'`. */
  orientation?: TabsOrientation
  /** The look: an indicator under the selected tab, or the selected tab boxed. Default: `'underline'`, overridable via `theme.components.Tabs.defaultProps`. */
  variant?: TabsVariant
  /** The indicator's or outline's color - resolves to `theme.palette[color]`. Default: `'primary'`. */
  color?: keyof Theme['palette']
  /** The labels' color - resolves against `theme.text`. Default: `'primary'`. */
  textColor?: keyof Theme['text']
  /** Density token - resolves against `theme.sizes`. Default: `'md'`. */
  size?: keyof Theme['sizes']
  /** The tabs share the row's width equally. Default: `false`. */
  fullWidth?: boolean
  /** The tabs sit in the middle of the row. Default: `false`. */
  isCentered?: boolean
  /** Moving focus with the arrow keys selects as it goes. Default: `false` - Enter or Space selects. */
  shouldSelectOnFocus?: boolean
  /** What the row does when its tabs don't fit: `'scroll'` - it scrolls, with scroll buttons; `'menu'` - it shows the tabs that fit whole and lists the rest in a menu. Default: `'none'`. */
  overflowBehavior?: TabsOverflowBehavior
  /** With `overflowBehavior="menu"`: names the button that opens the menu of the tabs that don't fit ("More tabs"). */
  overflowLabel?: string
  /** With `overflowBehavior="scroll"`: `'auto'` shows them while the tabs overflow, each only while tabs are out of view its way; `'always'` keeps both, disabled at an end; `'never'` hides them. Default: `'auto'`. */
  scrollButtons?: TabsScrollButtons
  /** Show the scroll buttons on narrow screens too, where swiping does the job. Default: `false`. */
  shouldShowScrollButtonsOnMobile?: boolean
  /** Show the list's scrollbar. Default: `false`. */
  hasVisibleScrollbar?: boolean
  /**
   * A line along the row's foot (a column's end side), under its own content too. In the
   * enclosed look it runs round the selected tab. Default: `true`, but `false` in the boxed look.
   */
  hasDivider?: boolean
  /** The tab strip's ground - resolves against `theme.background`. */
  bg?: keyof Theme['background']
  /**
   * The selected tab's ground - resolves against `theme.background`. Give its `TabPanel` the same
   * `bg` and the two read as one. Default: `'paper'` in the boxed look, and in the enclosed look
   * without a divider; none otherwise.
   */
  selectedBg?: keyof Theme['background']
  /** Components in place of its own: `scrollButton` - a button that takes `TabScrollButton`'s props. */
  slots?: { scrollButton?: ComponentType<TabScrollButtonProps> }
  /** Before the tabs - an icon, a button, any component. The arrow keys don't reach it. */
  startContent?: ReactNode
  /** After the tabs - a toolbar, a "+" button, any component. The arrow keys don't reach it. */
  endContent?: ReactNode
  /** Imperative handle - see `TabsActions`. */
  action?: Ref<TabsActions>
  'aria-label'?: string
  'aria-labelledby'?: string
  id?: string
  className?: string
  'data-testid'?: string
}

interface TabsStyleProps {
  variant: TabsVariant
  color: keyof Theme['palette']
  size: keyof Theme['sizes']
  orientation: TabsOrientation
  fullWidth: boolean
  hasDivider: boolean
}

const shouldForwardProp = createShouldForwardProp([
  ...props,
  'variant',
  'color',
  'size',
  'orientation',
  'fullWidth',
  'hasDivider',
  'isCentered',
])

const TabsRoot = styled('div', {
  name: 'Tabs',
  label: 'Tabs',
  shouldForwardProp,
  systemProps: [space, surfaceSystem],
})<TabsStyleProps & SpaceProps<Theme> & { bg?: keyof Theme['background'] }>(({
  theme,
  orientation,
  variant,
  color,
  hasDivider,
}) => {
  const isVertical = orientation === 'vertical'
  return {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: 'stretch',
    minWidth: 0,
    // The divider runs the row's whole length, under its own content too.
    ...(hasDivider &&
      variant !== 'enclosed' && {
        boxShadow: getDividerShadow(theme, isVertical, getDividerColor(theme, variant, color)),
      }),
  }
})

interface TabsListProps {
  isCentered: boolean
  isScrolling: boolean
  /** The tabs that don't fit go to a menu: what's left is clipped, never scrolled. */
  isFitting: boolean
  hasVisibleScrollbar: boolean
}

const TabsList = styled('div', {
  name: 'Tabs',
  slot: 'list',
  label: 'TabsList',
  shouldForwardProp: createShouldForwardProp([
    ...props,
    'variant',
    'color',
    'size',
    'orientation',
    'fullWidth',
    'hasDivider',
    'isCentered',
    'isScrolling',
    'isFitting',
    'hasVisibleScrollbar',
  ]),
})<TabsStyleProps & TabsListProps>((styleProps) => {
  const {
    theme,
    orientation,
    isCentered,
    variant,
    fullWidth,
    isScrolling,
    isFitting,
    hasVisibleScrollbar,
  } = styleProps
  const isVertical = orientation === 'vertical'
  // Enclosed tabs draw the divider under themselves; these two empty ends draw it on through the
  // rest of the list - the end one taking the room the tabs leave, both when they are centred.
  const enclosedEnds = {
    '&::before, &::after': {
      content: '""',
      flexShrink: 0,
      ...getEnclosedPieceStyle(theme, styleProps),
    },
    '&::before': { flexGrow: isCentered ? 1 : 0 },
    '&::after': { flexGrow: isCentered || !fullWidth ? 1 : 0 },
  }
  return {
    position: 'relative' as const,
    display: 'flex',
    flexDirection: isVertical ? ('column' as const) : ('row' as const),
    justifyContent: isCentered ? 'center' : 'flex-start',
    gap: variant === 'boxed' ? theme.space[0.5] : 0,
    flex: 1,
    minWidth: 0,
    ...(variant === 'enclosed' && enclosedEnds),
    // A selected tab larger than the room alone is cut by the list rather than put away.
    ...(isFitting && { overflow: 'hidden' }),
    ...(isScrolling && {
      [isVertical ? 'overflowY' : 'overflowX']: 'auto',
      [isVertical ? 'overflowX' : 'overflowY']: 'hidden',
      ...(!hasVisibleScrollbar && {
        scrollbarWidth: 'none' as const,
        '&::-webkit-scrollbar': { display: 'none' },
      }),
    }),
  }
})

const TabsIndicator = styled('span', {
  name: 'Tabs',
  slot: 'indicator',
  label: 'TabsIndicator',
  shouldForwardProp,
})<TabsStyleProps>(({ theme, color, orientation }) => {
  const isVertical = orientation === 'vertical'
  return {
    position: 'absolute' as const,
    backgroundColor: get(theme, `palette.${color}.main`),
    pointerEvents: 'none' as const,
    transition: 'left 0.15s ease, width 0.15s ease, top 0.15s ease, height 0.15s ease',
    ...(isVertical
      ? { insetInlineEnd: 0, width: theme.borderWidths.base }
      : { bottom: 0, height: theme.borderWidths.base }),
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  }
})

// The row's own content keeps a space between itself and the tabs - before them, after them -
// along the row, or down a column. Padding, not margin, so the divider runs on under the space.
const StartContent = styled('div', {
  name: 'Tabs',
  slot: 'startContent',
  label: 'TabsStart',
  shouldForwardProp,
})<TabsStyleProps>(({ theme, ...styleProps }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  [styleProps.orientation === 'vertical' ? 'paddingBlockEnd' : 'paddingInlineEnd']: theme.space[2],
  ...getEnclosedPieceStyle(theme, styleProps),
}))

const EndContent = styled('div', {
  name: 'Tabs',
  slot: 'endContent',
  label: 'TabsEnd',
  shouldForwardProp,
})<TabsStyleProps>(({ theme, ...styleProps }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  [styleProps.orientation === 'vertical' ? 'paddingBlockStart' : 'paddingInlineStart']:
    theme.space[2],
  ...getEnclosedPieceStyle(theme, styleProps),
}))

// The button that opens the menu of the tabs that don't fit: at the list's end, as wide as an
// icon beside a row and a strip across a column, drawing its stretch of an enclosed divider.
const OverflowButton = styled('button', {
  name: 'Tabs',
  slot: 'overflowButton',
  label: 'TabsOverflowButton',
  shouldForwardProp,
})<TabsStyleProps>(({ theme, ...styleProps }) => ({
  ...getEnclosedPieceStyle(theme, styleProps),
  appearance: 'none' as const,
  display: 'grid',
  placeItems: 'center',
  flex: '1 1 auto',
  ...(styleProps.orientation === 'vertical'
    ? { minHeight: theme.space[5] }
    : { minWidth: theme.icon.lg }),
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  color: get(theme, 'text.primary'),
  cursor: 'pointer',
  outline: 'none',
  '&:focus-visible': {
    outline: `${theme.borderWidths.base} solid ${get(theme, `palette.${styleProps.color}.main`)}`,
    outlineOffset: `-${theme.borderWidths.base}`,
  },
}))

// A closable tab's close button, beside its row in the menu.
const OverflowClose = styled('button', {
  name: 'Tabs',
  slot: 'overflowClose',
  label: 'TabsOverflowClose',
  shouldForwardProp,
})<Pick<TabsStyleProps, 'color'>>(({ theme, color }) => ({
  appearance: 'none' as const,
  display: 'grid',
  placeItems: 'center',
  width: theme.icon.sm,
  height: theme.icon.sm,
  padding: 0,
  border: 'none',
  borderRadius: theme.radii.sm,
  backgroundColor: 'transparent',
  color: get(theme, 'text.secondary'),
  cursor: 'pointer',
  '&:hover': { backgroundColor: `${get(theme, `palette.${color}.main`)}1F` },
}))

interface TabEntry {
  value: TabValue
  disabled: boolean
  label?: ReactNode
  icon?: ReactNode
  closeLabel?: string
  color?: keyof Theme['palette']
}

type TabEntryProps = Partial<Omit<TabEntry, 'disabled'>> & { disabled?: boolean }

// What the tabs are, read from the children: each tab's value (its position when it has
// none), whether it can be reached, and what its menu row shows. Positions count every child,
// as `TabIndexContext` does.
const readTabs = (children: ReactNode): TabEntry[] =>
  Children.toArray(children).flatMap((child, index) => {
    if (!isValidElement(child)) return []
    const { value, disabled, label, icon, closeLabel, color } = (
      child as ReactElement<TabEntryProps>
    ).props
    return [{ value: value ?? index, disabled: disabled ?? false, label, icon, closeLabel, color }]
  })

// The one tab in the page's tab order: the selected tab, or else the first enabled one.
const getFocusableValue = (children: ReactNode, selectedValue: TabValue | null) => {
  const enabled = readTabs(children).filter((tab) => !tab.disabled)
  return enabled.find((tab) => tab.value === selectedValue)?.value ?? enabled[0]?.value ?? null
}

const STEP_BY_KEY: Record<string, TabStep> = { Home: 'first', End: 'last' }

/**
 * @description A row of tabs. By default a `tablist`: one tab in the page's tab order, the
 * arrow keys of its orientation moving between tabs, Enter or Space selecting (or moving
 * focus selecting, with `shouldSelectOnFocus`). With `as="nav"`, the same look as a
 * navigation, its current tab marked `aria-current="page"`. Content of the row's own sits
 * before and after the tabs.
 */
export function Tabs({
  children,
  value: valueProp,
  defaultValue,
  onChange,
  onTabClose,
  as = 'div',
  orientation = 'horizontal',
  variant: variantProp,
  color: colorProp,
  textColor,
  size: sizeProp,
  fullWidth = false,
  isCentered = false,
  shouldSelectOnFocus = false,
  overflowBehavior = 'none',
  overflowLabel,
  scrollButtons = 'auto',
  shouldShowScrollButtonsOnMobile = false,
  hasVisibleScrollbar = false,
  hasDivider: hasDividerProp,
  bg,
  selectedBg: selectedBgProp,
  slots,
  startContent,
  endContent,
  action,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  id,
  className,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<TabsProps>) {
  const theme = useTheme()
  const dp = useDefaultProps('Tabs')
  const variant = variantProp ?? dp.variant ?? 'underline'
  const color = colorProp ?? dp.color ?? themeDefault(theme, 'color', 'primary')
  const size = sizeProp ?? dp.size ?? themeDefault(theme, 'size', 'md')
  const hasDivider = hasDividerProp ?? dp.hasDivider ?? variant !== 'boxed'
  // A boxed tab, and an enclosed one with no divider to outline it, stands out by its ground.
  const isFilled = variant === 'boxed' || (variant === 'enclosed' && !hasDivider)
  const selectedBg = selectedBgProp ?? dp.selectedBg ?? (isFilled ? 'paper' : undefined)

  // Rendered by a TabList, these tabs share its TabContext's ids - and so link to its panels.
  const tabList = useTabList()
  const isControlled = valueProp !== undefined
  const [ownValue, setOwnValue] = useState<TabValue | null>(defaultValue ?? null)
  const selectedValue = isControlled ? valueProp : ownValue
  const ownId = useId()
  const baseId = tabList?.baseId ?? ownId

  const listRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const isNavigation = as === 'nav'
  const isVertical = orientation === 'vertical'

  const select = useCallback(
    (next: TabValue) => {
      if (!isControlled) setOwnValue(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  const focusableValue = getFocusableValue(children, selectedValue)
  // The row's line - the indicator, the enclosed divider and every piece that draws it - is in
  // the selected tab's color, so it stays one line when that tab has a color of its own.
  const tabDp = useDefaultProps('Tab')
  const selectedTab = readTabs(children).find((tab) => tab.value === selectedValue)
  const selectedColor = selectedTab?.color ?? colorProp ?? tabDp.color ?? color
  // What was set on the row itself, for its tabs - it beats the theme's defaults for every tab.
  const rowProps = useMemo<TabRowProps>(
    () => ({ color: colorProp, textColor, size: sizeProp, selectedBg: selectedBgProp }),
    [colorProp, textColor, sizeProp, selectedBgProp]
  )

  const context = useMemo<TabsContextValue>(
    () => ({
      selectedValue,
      focusableValue,
      select,
      onTabClose,
      getTabId: (value) => getTabId(baseId, value),
      // Only a TabList's TabContext holds TabPanels: without one, there is no panel to point at.
      getPanelId: (value) => (tabList ? getPanelId(baseId, value) : undefined),
      isNavigation,
      isVertical,
      variant,
      color,
      textColor,
      size,
      fullWidth,
      hasDivider,
      selectedBg,
      selectedColor,
      rowProps,
      shouldSelectOnFocus,
      shouldShowScrollButtonsOnMobile,
    }),
    [
      selectedValue,
      focusableValue,
      select,
      onTabClose,
      baseId,
      tabList,
      isNavigation,
      isVertical,
      variant,
      color,
      textColor,
      size,
      fullWidth,
      hasDivider,
      selectedBg,
      selectedColor,
      rowProps,
      shouldSelectOnFocus,
      shouldShowScrollButtonsOnMobile,
    ]
  )

  // The indicator sits under (or beside) the selected tab, measured after layout.
  const updateIndicator = useCallback(() => {
    const indicator = indicatorRef.current
    if (!indicator) return
    const selected = (listRef.current as HTMLDivElement).querySelector<HTMLElement>(
      '[data-tab-selected]'
    )
    if (!selected) {
      indicator.style.display = 'none'
      return
    }
    indicator.style.display = 'block'
    if (isVertical) {
      indicator.style.top = `${selected.offsetTop}px`
      indicator.style.height = `${selected.offsetHeight}px`
    } else {
      indicator.style.left = `${selected.offsetLeft}px`
      indicator.style.width = `${selected.offsetWidth}px`
    }
  }, [isVertical])

  useLayoutEffect(updateIndicator)

  const isScrolling = overflowBehavior === 'scroll'
  const scroll = useTabsScroll(listRef, isScrolling, isVertical)
  // The tabs that don't fit whole go to a menu at the list's end. The one in the page's tab
  // order - the selected tab, or the first enabled one - always stays in the row.
  const isFitting = overflowBehavior === 'menu'
  const tabs = readTabs(children)
  const overflow = useTabsOverflow(
    listRef,
    isFitting,
    isVertical,
    tabs.map((tab) => tab.value),
    focusableValue
  )
  const hiddenTabs = tabs.filter((tab) => overflow.hidden.includes(tab.value))
  // Delete closes a closable tab's menu row, as it closes the tab in the row.
  const handleOverflowKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Delete') return
    const row = (event.target as HTMLElement).dataset.value
    const tab = hiddenTabs.find((hidden) => String(hidden.value) === row)
    if (tab?.closeLabel === undefined) return
    event.preventDefault()
    onTabClose?.(tab.value)
  }
  const updateOverflow = isFitting ? overflow.update : scroll.update
  useImperativeHandle(action, () => ({ updateIndicator, updateOverflow }), [
    updateIndicator,
    updateOverflow,
  ])

  // A scrolling row brings the selected tab fully into view whenever the selection changes.
  useEffect(() => {
    if (!isScrolling) return
    const selected = (listRef.current as HTMLDivElement).querySelector<HTMLElement>(
      '[data-tab-selected]'
    )
    if (typeof selected?.scrollIntoView === 'function') {
      selected.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }, [isScrolling, selectedValue])

  const hasScrollButtons =
    isScrolling &&
    (scrollButtons === 'always' || (scrollButtons === 'auto' && scroll.isOverflowing))
  const ScrollButton = slots?.scrollButton ?? TabScrollButton
  const renderScrollButton = (direction: -1 | 1) => {
    const canScroll = direction === -1 ? scroll.canScrollStart : scroll.canScrollEnd
    return (
      <ScrollButton
        direction={direction === -1 ? 'start' : 'end'}
        orientation={orientation}
        disabled={scrollButtons === 'always' && !canScroll}
        isHidden={scrollButtons === 'auto' && !canScroll}
        onClick={() => scroll.scrollByView(direction)}
      />
    )
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // The keys are a tab's: a tab's secondary action - a menu, a field - keeps its own.
    if (isNavigation || !(event.target as HTMLElement).hasAttribute('data-tab')) return
    const list = event.currentTarget
    const forward = isRtl(list) ? 'ArrowLeft' : 'ArrowRight'
    const backward = isRtl(list) ? 'ArrowRight' : 'ArrowLeft'
    const nextKey = isVertical ? 'ArrowDown' : forward
    const previousKey = isVertical ? 'ArrowUp' : backward
    let step = STEP_BY_KEY[event.key]
    if (event.key === nextKey) step = 'next'
    if (event.key === previousKey) step = 'previous'
    if (!step) return
    const target = getNextTab(
      Array.from(list.querySelectorAll<HTMLElement>('[data-tab]')),
      list.ownerDocument.activeElement,
      step
    )
    event.preventDefault()
    target?.focus()
  }

  const styleProps = { variant, color: selectedColor, size, orientation, fullWidth, hasDivider }
  return (
    <TabsContext.Provider value={context}>
      <TabsRoot
        {...spaceProps}
        {...styleProps}
        bg={bg}
        as={as}
        id={id}
        className={className}
        data-testid={dataTestid}
        aria-label={isNavigation ? ariaLabel : undefined}
        aria-labelledby={isNavigation ? ariaLabelledBy : undefined}
      >
        {startContent != null && <StartContent {...styleProps}>{startContent}</StartContent>}
        {hasScrollButtons && renderScrollButton(-1)}
        <TabsList
          {...styleProps}
          ref={listRef}
          isCentered={isCentered}
          isScrolling={isScrolling}
          isFitting={isFitting}
          hasVisibleScrollbar={hasVisibleScrollbar}
          role={isNavigation ? undefined : 'tablist'}
          aria-orientation={isNavigation ? undefined : orientation}
          aria-label={isNavigation ? undefined : ariaLabel}
          aria-labelledby={isNavigation ? undefined : ariaLabelledBy}
          onKeyDown={handleKeyDown}
        >
          {Children.toArray(children).map((child, index) => {
            const value = isValidElement(child)
              ? ((child.props as TabEntryProps).value ?? index)
              : index
            if (overflow.hidden.includes(value)) return null
            return (
              <TabIndexContext.Provider
                key={isValidElement(child) ? child.key : index}
                value={index}
              >
                {child}
              </TabIndexContext.Provider>
            )
          })}
          {variant === 'underline' && (
            <TabsIndicator {...styleProps} ref={indicatorRef} aria-hidden />
          )}
        </TabsList>
        {hasScrollButtons && renderScrollButton(1)}
        {hiddenTabs.length > 0 && (
          <View display="contents" onKeyDown={handleOverflowKeyDown}>
            <Menu
              align="end"
              onSelect={select}
              trigger={
                <OverflowButton
                  type="button"
                  {...styleProps}
                  aria-label={overflowLabel}
                  title={overflowLabel}
                >
                  <Icon name="expand_more" size="sm" color="inherit" />
                </OverflowButton>
              }
            >
              {hiddenTabs.map((tab) => (
                <MenuItem
                  key={tab.value}
                  value={tab.value}
                  disabled={tab.disabled}
                  secondaryAction={
                    tab.closeLabel === undefined ? undefined : (
                      // The pointer's, as a tab's is: a menu owns rows alone, and Delete closes it.
                      <OverflowClose
                        type="button"
                        color={selectedColor}
                        aria-hidden
                        title={tab.closeLabel}
                        tabIndex={-1}
                        onClick={() => onTabClose?.(tab.value)}
                      >
                        <Icon name="close" size="0.75rem" color="inherit" />
                      </OverflowClose>
                    )
                  }
                >
                  {tab.label ?? tab.icon}
                </MenuItem>
              ))}
            </Menu>
          </View>
        )}
        {endContent != null && <EndContent {...styleProps}>{endContent}</EndContent>}
      </TabsRoot>
    </TabsContext.Provider>
  )
}
