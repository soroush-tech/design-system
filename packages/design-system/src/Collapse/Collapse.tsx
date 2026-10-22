import { useRef, type ReactNode } from 'react'
import { createShouldForwardProp, styled, type Theme } from '../index'
import { useDefaultProps, useTheme } from '../theme'
import {
  useTransition,
  type TransitionCallbacks,
  type TransitionStatus,
  type TransitionTimeout,
} from '../utils/useTransition'

export type CollapseOrientation = 'vertical' | 'horizontal'

export interface CollapseProps extends TransitionCallbacks {
  /** What opens and closes. */
  children?: ReactNode
  /** Whether it is open. Default: `false`. */
  isShown?: boolean
  /** Moves on the first render too, when open. Default: `true`. */
  shouldAppear?: boolean
  /** Keeps the content out of the tree until it is first opened. Default: `false`. */
  shouldMountOnEnter?: boolean
  /** Takes the content out of the tree once it is closed. Default: `false`. */
  shouldUnmountOnExit?: boolean
  /** How long it takes in milliseconds, open or closed. Default: `theme.transitions.duration.standard`. */
  timeout?: TransitionTimeout
  /** Which of `theme.transitions.easing` it moves by. Default: `'standard'`. */
  easing?: keyof Theme['transitions']['easing']
  /** The height - or, horizontal, the width - it keeps when closed. Default: `0`. */
  collapsedSize?: string | number
  /** Which way it opens. Default: `'vertical'`. */
  orientation?: CollapseOrientation
  className?: string
  'data-testid'?: string
}

interface RootStyle {
  status: TransitionStatus
  duration: number
  easing: string
  orientation: CollapseOrientation
  collapsedSize: string
}

const CollapseRoot = styled('div', {
  name: 'Collapse',
  label: 'Collapse',
  shouldForwardProp: createShouldForwardProp([
    'status',
    'duration',
    'easing',
    'orientation',
    'collapsedSize',
  ]),
})<RootStyle>(({ status, duration, easing, orientation, collapsedSize }) => {
  const size = orientation === 'horizontal' ? 'width' : 'height'
  return {
    overflow: 'hidden',
    transition: `${size} ${duration}ms ${easing}`,
    // Closed, it keeps its collapsed size; the move between is set on the node as it goes.
    // Open, a horizontal root is as wide as its content, not as its container.
    ...(orientation === 'horizontal' && status !== 'exited' && { width: 'max-content' }),
    ...(status === 'exited' && {
      [size]: collapsedSize,
      ...(Number.parseFloat(collapsedSize) === 0 && { visibility: 'hidden' as const }),
    }),
  }
})

const CollapseWrapper = styled('div', {
  name: 'Collapse',
  slot: 'wrapper',
  label: 'CollapseWrapper',
  shouldForwardProp: createShouldForwardProp(['orientation']),
})<{ orientation: CollapseOrientation }>(({ orientation }) =>
  orientation === 'horizontal'
    ? // As wide as its content, whatever the root's width is while it moves: that is what is measured.
      { display: 'flex', height: '100%', width: 'max-content' }
    : { display: 'flex', width: '100%' }
)

const CollapseInner = styled('div', {
  name: 'Collapse',
  slot: 'inner',
  label: 'CollapseInner',
  shouldForwardProp: createShouldForwardProp(['orientation']),
})<{ orientation: CollapseOrientation }>(({ orientation }) =>
  orientation === 'horizontal' ? { height: '100%' } : { width: '100%' }
)

/**
 * @description Opens and closes its content by its height - or, horizontal, its width. The size
 * it moves to is measured from the content, and left to the content once it is open, so content
 * that grows keeps showing. Closed, it keeps `collapsedSize` and is hidden when that is nothing.
 * A user who asked for less motion sees it change at once.
 */
export function Collapse({
  children,
  isShown = false,
  shouldAppear: shouldAppearProp,
  shouldMountOnEnter = false,
  shouldUnmountOnExit = false,
  timeout: timeoutProp,
  easing: easingProp,
  collapsedSize: collapsedSizeProp,
  orientation: orientationProp,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  className,
  'data-testid': dataTestid,
}: Readonly<CollapseProps>) {
  const theme = useTheme()
  const dp = useDefaultProps('Collapse')
  const shouldAppear = shouldAppearProp ?? dp.shouldAppear ?? true
  const timeout = timeoutProp ?? dp.timeout ?? theme.transitions.duration.standard
  const easing = easingProp ?? dp.easing ?? 'standard'
  const collapsedSize = collapsedSizeProp ?? dp.collapsedSize ?? 0
  const orientation = orientationProp ?? dp.orientation ?? 'vertical'
  const size = orientation === 'horizontal' ? 'width' : 'height'
  const collapsed = typeof collapsedSize === 'number' ? `${collapsedSize}px` : collapsedSize

  const rootRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  // The content's size now - what the root moves to or from.
  const measure = () => {
    const wrapper = wrapperRef.current!
    return `${orientation === 'horizontal' ? wrapper.clientWidth : wrapper.clientHeight}px`
  }

  const { status, duration } = useTransition({
    isShown,
    shouldAppear,
    shouldMountOnEnter,
    shouldUnmountOnExit,
    timeout,
    nodeRef: rootRef,
    onEnter: (node) => {
      // The closed size is drawn before it opens, so the browser has a size to move from.
      void node.offsetHeight
      onEnter?.(node)
    },
    onEntering: (node) => {
      node.style[size] = measure()
      onEntering?.(node)
    },
    onEntered: (node) => {
      node.style[size] = ''
      onEntered?.(node)
    },
    onExit: (node) => {
      node.style[size] = measure()
      void node.offsetHeight
      onExit?.(node)
    },
    onExiting: (node) => {
      node.style[size] = collapsed
      onExiting?.(node)
    },
    onExited: (node) => {
      node.style[size] = ''
      onExited?.(node)
    },
  })
  if (status === 'unmounted') return null

  return (
    <CollapseRoot
      ref={rootRef}
      status={status}
      duration={duration}
      easing={theme.transitions.easing[easing]}
      orientation={orientation}
      collapsedSize={collapsed}
      className={className}
      data-testid={dataTestid}
    >
      <CollapseWrapper ref={wrapperRef} orientation={orientation}>
        <CollapseInner orientation={orientation}>{children}</CollapseInner>
      </CollapseWrapper>
    </CollapseRoot>
  )
}
