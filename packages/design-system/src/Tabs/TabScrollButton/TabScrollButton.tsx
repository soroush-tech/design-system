import { useContext, type MouseEvent, type ReactNode } from 'react'
import { styled, createShouldForwardProp, get, type Theme } from '../../index'
import { useDefaultProps, useTheme } from '../../theme'
import { Icon } from '../../Icon'
import { TabsContext } from '../TabsContext'
import { getEnclosedPieceStyle } from '../utils/dividerLine'

/** Which way a scroll button scrolls a row of tabs: towards its start, or its end. */
export type TabScrollDirection = 'start' | 'end'

export interface TabScrollButtonProps {
  /** Which way it scrolls the row: towards its start, or its end. */
  direction: TabScrollDirection
  /** The row's orientation. Default: its `Tabs`', else `'horizontal'`. */
  orientation?: 'horizontal' | 'vertical'
  /** There is nowhere further to scroll this way - kept, but off. */
  disabled?: boolean
  /** There is nowhere further to scroll this way - hidden, keeping its room. */
  isHidden?: boolean
  /** Its stretch of an enclosed row's divider - resolves to `theme.palette`. Default: the row's line, the selected tab's color. */
  color?: keyof Theme['palette']
  /** The chevron's color - resolves against `theme.text`. Default: its `Tabs`' `textColor`, else `'primary'`. */
  textColor?: keyof Theme['text']
  /** Fired when it is pressed. In a `Tabs`, it scrolls the row by its visible size. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  /** What it shows. Default: a chevron pointing the way it scrolls. */
  children?: ReactNode
  className?: string
  'data-testid'?: string
}

interface TabScrollButtonStyleProps {
  isVertical: boolean
  textColor: keyof Theme['text']
  isHidden: boolean
  shouldShowOnMobile: boolean
  divider: object
}

const TabScrollButtonRoot = styled('button', {
  name: 'Tabs',
  slot: 'scrollButton',
  label: 'TabsScrollButton',
  shouldForwardProp: createShouldForwardProp([
    'isVertical',
    'textColor',
    'isHidden',
    'shouldShowOnMobile',
    'divider',
  ]),
})<TabScrollButtonStyleProps>(
  ({ theme, isVertical, textColor, isHidden, shouldShowOnMobile, divider }) => ({
    ...divider,
    appearance: 'none' as const,
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
    alignSelf: 'stretch',
    // Beside a row, a column as wide as an icon; above and below a column, a strip across it as tall
    // as a tab - never as tall as the column is wide.
    ...(isVertical ? { minHeight: theme.space[5] } : { minWidth: theme.icon.lg }),
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    color: get(theme, `text.${textColor}`),
    cursor: 'pointer',
    visibility: isHidden ? ('hidden' as const) : ('visible' as const),
    '&:disabled': { color: get(theme, 'text.disabled'), cursor: 'default' },
    // The chevron points the way the row scrolls.
    ...(!isVertical && { '[dir="rtl"] & svg': { transform: 'scaleX(-1)' } }),
    // Where swiping does the job, the buttons give their room to the tabs.
    ...(!shouldShowOnMobile && { [theme.breakpoints.down('sm')]: { display: 'none' } }),
  })
)

const CHEVRONS = {
  horizontal: { start: 'chevron_left', end: 'chevron_right' },
  vertical: { start: 'expand_less', end: 'expand_more' },
} as const

/**
 * @description The button that scrolls a row of tabs - a `Tabs` shows one at each end while its
 * tabs overflow (`overflowBehavior="scroll"`). Out of the tab order and hidden from assistive
 * technology: the arrow keys already reach every tab. A `Tabs` takes another in its place with
 * `slots={{ scrollButton }}`, given these same props.
 */
export function TabScrollButton({
  direction,
  orientation,
  disabled,
  isHidden = false,
  color: colorProp,
  textColor: textColorProp,
  onClick,
  children,
  className,
  'data-testid': dataTestid,
}: Readonly<TabScrollButtonProps>) {
  const theme = useTheme()
  const dp = useDefaultProps('TabScrollButton')
  // Inside a Tabs it takes the row's look; alone, a plain button. As a tab's, its own value wins:
  // its stretch of the divider follows the row's line, the chevron the row's text color.
  const tabs = useContext(TabsContext)
  const color = colorProp ?? dp.color ?? tabs?.selectedColor
  const textColor =
    textColorProp ?? tabs?.rowProps.textColor ?? dp.textColor ?? tabs?.textColor ?? 'primary'
  const resolvedOrientation = orientation ?? (tabs?.isVertical ? 'vertical' : 'horizontal')
  const divider = tabs
    ? getEnclosedPieceStyle(theme, {
        variant: tabs.variant,
        color: color!,
        orientation: resolvedOrientation,
        hasDivider: tabs.hasDivider,
      })
    : {}
  return (
    <TabScrollButtonRoot
      type="button"
      aria-hidden
      tabIndex={-1}
      disabled={disabled}
      isVertical={resolvedOrientation === 'vertical'}
      textColor={textColor}
      isHidden={isHidden}
      shouldShowOnMobile={tabs?.shouldShowScrollButtonsOnMobile ?? false}
      divider={divider}
      data-scroll-direction={direction}
      className={className}
      data-testid={dataTestid}
      onClick={onClick}
    >
      {children ?? (
        <Icon name={CHEVRONS[resolvedOrientation][direction]} size="sm" color="inherit" />
      )}
    </TabScrollButtonRoot>
  )
}
