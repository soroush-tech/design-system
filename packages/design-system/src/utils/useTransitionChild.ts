import { cloneElement, useRef, type CSSProperties, type ReactElement, type Ref } from 'react'
import { useMergedRefs } from '../Modal/hooks/useMergedRefs'
import { useTheme } from '../theme'
import {
  useTransition,
  type TransitionCallbacks,
  type TransitionProps,
  type TransitionStatus,
} from './useTransition'

/** What a transition's style is drawn from: where it is, and how long and how smoothly it moves. */
export interface TransitionStyleContext {
  status: TransitionStatus
  /** Milliseconds, for this way - nil for a user who asked for less motion. */
  duration: number
  /** The CSS timing function. */
  easing: string
}

const chain =
  (
    own: TransitionCallbacks[keyof TransitionCallbacks],
    given: TransitionCallbacks[keyof TransitionCallbacks]
  ) =>
  (node: HTMLElement) => {
    own?.(node)
    given?.(node)
  }

/**
 * The part every transition that wraps one child shares: the status, the child's ref, and the
 * child cloned with the transition's style over its own. `own` are the transition's callbacks (a
 * `Slide` measures on enter); the callbacks given in the props follow them. Null while unmounted.
 */
export function useTransitionChild(
  props: TransitionProps,
  getStyle: (context: TransitionStyleContext) => CSSProperties,
  own: TransitionCallbacks = {}
): ReactElement | null {
  const theme = useTheme()
  const {
    children,
    isShown = false,
    shouldAppear = true,
    shouldMountOnEnter = false,
    shouldUnmountOnExit = false,
    timeout = theme.transitions.duration.standard,
    easing = 'standard',
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  } = props
  const nodeRef = useRef<HTMLElement | null>(null)
  const ref = useMergedRefs(nodeRef, (children.props as { ref?: Ref<HTMLElement> }).ref)
  const { status, duration } = useTransition({
    isShown,
    shouldAppear,
    shouldMountOnEnter,
    shouldUnmountOnExit,
    timeout,
    nodeRef,
    onEnter: chain(own.onEnter, onEnter),
    onEntering: chain(own.onEntering, onEntering),
    onEntered: chain(own.onEntered, onEntered),
    onExit: chain(own.onExit, onExit),
    onExiting: chain(own.onExiting, onExiting),
    onExited: chain(own.onExited, onExited),
  })
  if (status === 'unmounted') return null
  const style = getStyle({ status, duration, easing: theme.transitions.easing[easing] })
  return cloneElement(children as ReactElement<{ style?: CSSProperties; ref?: Ref<HTMLElement> }>, {
    ref: ref as Ref<HTMLElement>,
    style: { ...(children.props as { style?: CSSProperties }).style, ...style },
  })
}
