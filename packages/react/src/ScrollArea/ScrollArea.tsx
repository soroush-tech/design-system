'use client'

import { useRef, type ReactNode, type Ref, type RefObject } from 'react'
import type { LayoutProps, SpaceProps } from '@soroush.tech/styled-system'
import { styled, type LiveValue } from '../style/styled'
import { useLiveValue } from '../style/hooks/useLiveValue'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../style/overrides'
import { type Theme } from '../theme/themes'
import { createShouldForwardProp, props } from '@soroush.tech/styled-system/should-forward-prop'
import { get, system, space } from '@soroush.tech/styled-system'
import { useDefaultProps } from '../theme/hooks/useDefaultProps'
import { useMergedRefs } from '@gild-ui/hooks/useMergedRefs'
import { useScrollThumb, type ScrollAxis } from './hooks/useScrollThumb'
import type { ScrollAreaSlot } from './ScrollArea.types'

/** Which ways it scrolls. */
export type ScrollAxes = ScrollAxis | 'both'

export interface ScrollAreaProps
  extends
    SpaceProps<Theme>,
    Pick<
      LayoutProps<Theme>,
      'width' | 'minWidth' | 'maxWidth' | 'height' | 'minHeight' | 'maxHeight'
    > {
  /** What scrolls. */
  children: ReactNode
  /** Which ways it scrolls. Default: `'y'`. */
  axes?: ScrollAxes
  /** The scrolling element - for code that reads or sets its scroll. */
  viewportRef?: Ref<HTMLDivElement>
  /**
   * `0` puts the scrolling box in the tab order, so the keys scroll it - for content with nothing
   * focusable in it. Default: none.
   */
  tabIndex?: 0
  /** Names the scrolling box, as a `region`. */
  'aria-label'?: string
  'aria-labelledby'?: string
  className?: string
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<ScrollAreaSlot>
  'data-testid'?: string
}

const layoutSystem = system({
  width: true,
  minWidth: true,
  maxWidth: true,
  height: true,
  minHeight: true,
  maxHeight: true,
})

// The thumbs show while the pointer is anywhere over the area, or focus is inside it.
const ScrollAreaRoot = styled('div', {
  name: 'ScrollArea',
  label: 'ScrollArea',
  shouldForwardProp: createShouldForwardProp([...props]),
  systemProps: [space, layoutSystem],
})({
  position: 'relative',
  display: 'flex',
  flex: '1 1 auto',
  minWidth: 0,
  minHeight: 0,
  '&:hover > [data-scroll-track] > [data-scroll-thumb], &:focus-within > [data-scroll-track] > [data-scroll-thumb]':
    { opacity: 1 },
})

// The box that scrolls, with the native scrollbar off: the overlay draws one instead.
const ScrollAreaViewport = styled('div', {
  name: 'ScrollArea',
  slot: 'viewport',
  label: 'ScrollAreaViewport',
  shouldForwardProp: createShouldForwardProp(['axes']),
})<{ axes: ScrollAxes }>(({ axes }) => ({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflowX: axes === 'y' ? 'hidden' : 'auto',
  overflowY: axes === 'x' ? 'hidden' : 'auto',
  // An axis it scrolls stops there; one it does not passes the wheel on to the area around it.
  overscrollBehaviorX: axes === 'y' ? 'auto' : 'none',
  overscrollBehaviorY: axes === 'x' ? 'auto' : 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}))

// A track along the right edge or the bottom: faint until it is hovered or dragged.
const ScrollAreaTrack = styled('div', {
  name: 'ScrollArea',
  slot: 'track',
  label: 'ScrollAreaTrack',
  shouldForwardProp: createShouldForwardProp(['isDragging', 'axis']),
})<{ isDragging: boolean; axis: ScrollAxis }>(({ theme, isDragging, axis }) => {
  const line = `${theme.borderWidths.thin} solid ${isDragging ? get(theme, 'border.default') : 'transparent'}`
  return {
    position: 'absolute',
    ...(axis === 'y'
      ? { top: 0, right: 0, bottom: 0, width: theme.space[1.25], borderLeft: line }
      : { left: 0, right: 0, bottom: 0, height: theme.space[1.25], borderTop: line }),
    backgroundColor: isDragging ? get(theme, 'background.scrollbarTrack') : 'transparent',
    '&:hover': {
      borderColor: get(theme, 'border.default'),
      backgroundColor: get(theme, 'background.scrollbarTrack'),
    },
  }
})

// The thumb: hidden until the pointer is over the area or it has the keyboard focus.
const ScrollAreaThumb = styled('div', {
  name: 'ScrollArea',
  slot: 'thumb',
  label: 'ScrollAreaThumb',
  shouldForwardProp: createShouldForwardProp(['isShown', 'axis', 'start', 'size']),
})<{ isShown: boolean; axis: ScrollAxis; start: LiveValue; size: LiveValue }>(({
  theme,
  isShown,
  axis,
  start,
  size,
}) => {
  // Centred in the track, whose inner edge is a line.
  const inset = `calc((${theme.space[1.25]} - ${theme.space[0.75]}) / 2 - ${theme.borderWidths.thin})`
  return {
    position: 'absolute',
    ...(axis === 'y'
      ? { left: inset, width: theme.space[0.75], top: `${start}`, height: `${size}` }
      : { top: inset, height: theme.space[0.75], left: `${start}`, width: `${size}` }),
    borderRadius: '9999px',
    backgroundColor: get(theme, 'background.scrollbar'),
    opacity: isShown ? 1 : 0,
    transition: `opacity ${theme.transitions.duration.short}ms`,
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  }
})

// One axis's track and thumb, drawn only while that axis overflows.
function ScrollBar({
  box,
  axis,
  slotProps,
}: Readonly<{
  box: RefObject<HTMLDivElement | null>
  axis: ScrollAxis
  slotProps?: SlotProps<ScrollAreaSlot>
}>) {
  const { thumb, onTrackPointerDown, isDragging } = useScrollThumb(box, axis)
  // The thumb's place follows the scroll: live values, so a scroll writes no rule.
  const start = useLiveValue(thumb?.start ?? 0, '%')
  const size = useLiveValue(thumb?.size ?? 0, '%')
  if (thumb === null) return null
  return (
    <ScrollAreaTrack
      aria-hidden
      data-scroll-track={axis}
      axis={axis}
      isDragging={isDragging}
      onPointerDown={onTrackPointerDown}
      {...slotProps?.track}
    >
      <ScrollAreaThumb
        data-scroll-thumb
        axis={axis}
        isShown={isDragging}
        start={start}
        size={size}
        {...slotProps?.thumb}
      />
    </ScrollAreaTrack>
  )
}

/**
 * @description A scrolling area whose scrollbars are drawn over its content rather than beside
 * it - so a rounded panel keeps its corner clean - and show only while the pointer is over it or
 * focus is inside. Scrolling itself stays native: the wheel, the keyboard and touch work as they
 * do anywhere. Each axis that overflows gets a track, down the right edge or along the bottom,
 * whose thumb drags and whose track pages. It grows to its content and no further than its
 * container, or `maxHeight`, allows. Colors come from `theme.background.scrollbar` and
 * `scrollbarTrack`, its size from `theme.space`.
 */
export function ScrollArea({
  children,
  axes: axesProp,
  viewportRef,
  tabIndex,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className,
  style,
  slotProps,
  'data-testid': dataTestid,
  ...rest
}: Readonly<ScrollAreaProps>) {
  const dp = useDefaultProps('ScrollArea')
  const axes = axesProp ?? dp.axes ?? 'y'
  const box = useRef<HTMLDivElement>(null)
  const mergedRef = useMergedRefs(box, viewportRef)
  return (
    <ScrollAreaRoot
      {...mergeOverrides(slotProps?.root, { style, className })}
      data-testid={dataTestid}
      {...rest}
    >
      <ScrollAreaViewport
        {...slotProps?.viewport}
        ref={mergedRef}
        axes={axes}
        data-scroll-viewport
        tabIndex={tabIndex}
        role={ariaLabel || ariaLabelledby ? 'region' : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        {children}
      </ScrollAreaViewport>
      {axes !== 'x' && <ScrollBar box={box} axis="y" slotProps={slotProps} />}
      {axes !== 'y' && <ScrollBar box={box} axis="x" slotProps={slotProps} />}
    </ScrollAreaRoot>
  )
}
