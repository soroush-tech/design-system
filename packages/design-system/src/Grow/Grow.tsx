import { useTransitionChild } from '../utils/useTransitionChild'
import type { TransitionProps } from '../utils/useTransition'

export type GrowProps = TransitionProps

/**
 * @description Grows one child in from a little smaller, fading as it does, and shrinks it out.
 * The child holds a `ref` and takes a `style`; out, it is hidden. A user who asked for less
 * motion sees it change at once.
 */
export function Grow(props: Readonly<GrowProps>) {
  return useTransitionChild(props, ({ status, duration, easing }) => {
    const isIn = status === 'entering' || status === 'entered'
    return {
      opacity: isIn ? 1 : 0,
      transform: isIn ? 'none' : 'scale(0.75)',
      transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
      visibility: status === 'exited' ? 'hidden' : undefined,
    }
  })
}
