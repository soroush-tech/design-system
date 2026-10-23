import { useTransitionChild } from '../utils/useTransitionChild'
import type { TransitionProps } from '../utils/useTransition'

export type FadeProps = TransitionProps

/**
 * @description Fades one child in and out by its opacity. The child holds a `ref` and takes a
 * `style`; out, it is hidden, so it takes no click or focus. A user who asked for less motion sees
 * it change at once.
 */
export function Fade(props: Readonly<FadeProps>) {
  return useTransitionChild(props, ({ status, duration, easing }) => ({
    opacity: status === 'entering' || status === 'entered' ? 1 : 0,
    transition: `opacity ${duration}ms ${easing}`,
    visibility: status === 'exited' ? 'hidden' : undefined,
  }))
}
