import { useRef, type ReactNode, type RefObject } from 'react'
import type { LayoutProps, SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, system, type Theme } from '../index'
import { useDefaultProps } from '../theme'
import { useScrollThumb, type ScrollAxis } from './hooks/useScrollThumb'

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
  /**
   * `0` puts the scrolling box in the tab order, so the keys scroll it - for content with nothing
   * focusable in it. Default: none.
   */
  tabIndex?: 0
  /** Names the scrolling box, as a `region`. */
  'aria-label'?: string
  'aria-labelledby'?: string
  className?: string
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
  shouldForwardProp: createShouldForwardProp(['isShown', 'axis']),
})<{ isShown: boolean; axis: ScrollAxis }>(({ theme, isShown, axis }) => {
  // Centred in the track, whose inner edge is a line.
  const inset = `calc((${theme.space[1.25]} - ${theme.space[0.75]}) / 2 - ${theme.borderWidths.thin})`
  return {
    position: 'absolute',
    ...(axis === 'y'
      ? { left: inset, width: theme.space[0.75] }
      : { top: inset, height: theme.space[0.75] }),
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
}: Readonly<{ box: RefObject<HTMLDivElement | null>; axis: ScrollAxis }>) {
  const { thumb, onTrackPointerDown, isDragging } = useScrollThumb(box, axis)
  if (thumb === null) return null
  const place =
    axis === 'y'
      ? { top: `${thumb.start}%`, height: `${thumb.size}%` }
      : { left: `${thumb.start}%`, width: `${thumb.size}%` }
  return (
    <ScrollAreaTrack
      aria-hidden
      data-scroll-track={axis}
      axis={axis}
      isDragging={isDragging}
      onPointerDown={onTrackPointerDown}
    >
      <ScrollAreaThumb data-scroll-thumb axis={axis} isShown={isDragging} style={place} />
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
  tabIndex,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className,
  'data-testid': dataTestid,
  ...rest
}: Readonly<ScrollAreaProps>) {
  const dp = useDefaultProps('ScrollArea')
  const axes = axesProp ?? dp.axes ?? 'y'
  const box = useRef<HTMLDivElement>(null)
  return (
    <ScrollAreaRoot className={className} data-testid={dataTestid} {...rest}>
      <ScrollAreaViewport
        ref={box}
        axes={axes}
        data-scroll-viewport
        tabIndex={tabIndex}
        role={ariaLabel || ariaLabelledby ? 'region' : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        {children}
      </ScrollAreaViewport>
      {axes !== 'x' && <ScrollBar box={box} axis="y" />}
      {axes !== 'y' && <ScrollBar box={box} axis="x" />}
    </ScrollAreaRoot>
  )
}
