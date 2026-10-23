import { useTransitionChild } from '../utils/useTransitionChild'
import type { TransitionProps } from '../utils/useTransition'

export type ZoomProps = TransitionProps

/**
 * @description Zooms one child in from nothing and out to nothing. The child holds a `ref` and
 * takes a `style`; out, it is hidden. A user who asked for less motion sees it change at once.
 */
export function Zoom(props: Readonly<ZoomProps>) {
  return useTransitionChild(props, ({ status, duration, easing }) => ({
    transform: status === 'entering' || status === 'entered' ? 'none' : 'scale(0)',
    transition: `transform ${duration}ms ${easing}`,
    visibility: status === 'exited' ? 'hidden' : undefined,
  }))
}
