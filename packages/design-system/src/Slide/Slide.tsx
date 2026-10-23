import { useRef } from 'react'
import { isRtl } from '../utils/isRtl'
import { useTransitionChild } from '../utils/useTransitionChild'
import type { TransitionProps } from '../utils/useTransition'

/** The edge of the window the child slides in from. */
export type SlideDirection = 'up' | 'down' | 'left' | 'right'

export interface SlideProps extends TransitionProps {
  /** The edge it slides in from - and out to. Mirrored in right-to-left pages. Default: `'down'`. */
  direction?: SlideDirection
}

const mirrored: Record<SlideDirection, SlideDirection> = {
  up: 'up',
  down: 'down',
  left: 'right',
  right: 'left',
}

// How far the node must move to be wholly outside the window, from where it is now.
const getOffset = (node: HTMLElement, direction: SlideDirection) => {
  const rect = node.getBoundingClientRect()
  const toward = isRtl(node) ? mirrored[direction] : direction
  if (toward === 'left') return `translateX(${-(rect.left + rect.width)}px)`
  if (toward === 'right') return `translateX(${window.innerWidth - rect.left}px)`
  if (toward === 'up') return `translateY(${-(rect.top + rect.height)}px)`
  return `translateY(${window.innerHeight - rect.top}px)`
}

/**
 * @description Slides one child in from an edge of the window and back out. The child holds a
 * `ref` and takes a `style`; out, it is hidden. Its way out is measured as it starts, so it
 * leaves the window from wherever it sits. A user who asked for less motion sees it change at
 * once.
 */
export function Slide({ direction = 'down', ...props }: Readonly<SlideProps>) {
  const offset = useRef('')
  // The node measured as it is in its place - not where a move left it.
  const measure = (node: HTMLElement) => {
    const { transform } = node.style
    node.style.transform = 'none'
    offset.current = getOffset(node, direction)
    node.style.transform = transform
  }
  return useTransitionChild(
    props,
    ({ status, duration, easing }) => ({
      transform:
        status === 'entering' || status === 'entered' ? 'none' : offset.current || undefined,
      transition: `transform ${duration}ms ${easing}`,
      visibility: status === 'exited' ? 'hidden' : undefined,
    }),
    {
      // Out of the window with no move, so it has somewhere to come from.
      onEnter: (node) => {
        measure(node)
        const { transition } = node.style
        node.style.transition = 'none'
        node.style.transform = offset.current
        node.getBoundingClientRect()
        node.style.transition = transition
      },
      onExit: measure,
    }
  )
}
