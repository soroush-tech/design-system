import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactElement,
  type RefObject,
} from 'react'
import type { Theme } from '../theme/themes'

/** Where a transition is: out, going in, in, or going out - or not in the tree at all. */
export type TransitionStatus = 'unmounted' | 'exited' | 'entering' | 'entered' | 'exiting'

/** How long a transition takes in milliseconds - one for both ways, or one for each. */
export type TransitionTimeout = number | { enter: number; exit: number }

/** The lifecycle callbacks every transition component takes, each told the node it moves. */
export interface TransitionCallbacks {
  /** Fired before it starts to enter - the node is still in its out state. */
  onEnter?: (node: HTMLElement) => void
  /** Fired as it starts to enter. */
  onEntering?: (node: HTMLElement) => void
  /** Fired when it is in. */
  onEntered?: (node: HTMLElement) => void
  /** Fired before it starts to exit - the node is still in its in state. */
  onExit?: (node: HTMLElement) => void
  /** Fired as it starts to exit. */
  onExiting?: (node: HTMLElement) => void
  /** Fired when it is out. */
  onExited?: (node: HTMLElement) => void
}

export interface UseTransitionParams extends TransitionCallbacks {
  isShown: boolean
  shouldAppear: boolean
  shouldMountOnEnter: boolean
  shouldUnmountOnExit: boolean
  timeout: TransitionTimeout
  /** The node that moves - handed to the callbacks. */
  nodeRef: RefObject<HTMLElement | null>
}

const getInitialStatus = ({
  isShown,
  shouldAppear,
  shouldMountOnEnter,
  shouldUnmountOnExit,
}: UseTransitionParams): TransitionStatus => {
  if (isShown) return shouldAppear ? 'exited' : 'entered'
  return shouldMountOnEnter || shouldUnmountOnExit ? 'unmounted' : 'exited'
}

// A user who asked for less motion gets none: the transition ends at once.
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION).matches

const subscribeToReducedMotion = (notify: () => void) => {
  if (typeof window.matchMedia !== 'function') return () => {}
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', notify)
  return () => query.removeEventListener('change', notify)
}

// What a server renders, and the first client render with it, is motion; the query follows.
const getServerReducedMotion = () => false

const getDuration = (timeout: TransitionTimeout, isEntering: boolean) => {
  if (typeof timeout === 'number') return timeout
  return isEntering ? timeout.enter : timeout.exit
}

/**
 * The state of a show-and-hide transition. `isShown` asks for it in or out and the status follows:
 * out (`exited`) to `entering` to `entered`, and back through `exiting`. The component draws each
 * status; the hook only keeps time, mounts and unmounts, and tells the callbacks. A node that is
 * not yet shown renders in its out state first, so the browser has a start to move from.
 */
export function useTransition(params: UseTransitionParams) {
  const { isShown, shouldUnmountOnExit, nodeRef } = params
  const [state, setStatus] = useState(() => getInitialStatus(params))
  // A node asked in is in the tree, out, before it moves: derived, so no effect has to mount it.
  const status = isShown && state === 'unmounted' ? 'exited' : state
  const isReduced = useSyncExternalStore(
    subscribeToReducedMotion,
    prefersReducedMotion,
    getServerReducedMotion
  )
  const timer = useRef<number | undefined>(undefined)
  // The latest callbacks and timeouts, so a re-render does not restart a transition.
  const latest = useRef(params)
  useEffect(() => {
    latest.current = params
  })

  // A move starts a tick after the render that asks for it, so the browser has drawn the state it
  // moves from. Everything it sets, it sets from a timer, not from the effect itself.
  const isMovingIn = isShown && (status === 'exited' || status === 'exiting')
  const isMovingOut = !isShown && (status === 'entering' || status === 'entered')
  useEffect(() => {
    if (!isMovingIn && !isMovingOut) return undefined
    const begin = window.setTimeout(() => {
      const { timeout, onEnter, onEntering, onExit, onExiting } = latest.current
      const node = nodeRef.current
      window.clearTimeout(timer.current)
      if (isMovingIn) {
        const ms = prefersReducedMotion() ? 0 : getDuration(timeout, true)
        if (node) onEnter?.(node)
        setStatus('entering')
        if (node) onEntering?.(node)
        timer.current = window.setTimeout(() => {
          setStatus('entered')
          // Read as the time is up, so a callback that changed meanwhile is the one that is called.
          if (node) latest.current.onEntered?.(node)
        }, ms)
      } else {
        const ms = prefersReducedMotion() ? 0 : getDuration(timeout, false)
        if (node) onExit?.(node)
        setStatus('exiting')
        if (node) onExiting?.(node)
        timer.current = window.setTimeout(() => {
          setStatus(shouldUnmountOnExit ? 'unmounted' : 'exited')
          if (node) latest.current.onExited?.(node)
        }, ms)
      }
    }, 0)
    return () => window.clearTimeout(begin)
  }, [isMovingIn, isMovingOut, shouldUnmountOnExit, nodeRef])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // The time of the move the status is in, or - while it rests - of the next: styles that start
  // the move from the outside (a measured height) already have the right time to move by.
  const duration = isReduced ? 0 : getDuration(params.timeout, isShown)
  return { status, duration }
}

/** The props every transition takes: one child, and when and how it moves. */
export interface TransitionProps extends TransitionCallbacks {
  /** The one element that moves - it holds a `ref` and takes a `style`. */
  children: ReactElement
  /** Whether the child is shown. Default: `false`. */
  isShown?: boolean
  /** Moves on the first render too, when shown. Default: `true`. */
  shouldAppear?: boolean
  /** Keeps the child out of the tree until it is first shown. Default: `false`. */
  shouldMountOnEnter?: boolean
  /** Takes the child out of the tree once it is out. Default: `false`. */
  shouldUnmountOnExit?: boolean
  /** How long it takes in milliseconds, in or out. Default: `theme.transitions.duration.standard`. */
  timeout?: TransitionTimeout
  /** Which of `theme.transitions.easing` it moves by. Default: `'standard'`. */
  easing?: keyof Theme['transitions']['easing']
}
