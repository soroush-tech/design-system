import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, screen } from '@testing-library/react'
import type { ComponentType, ReactElement } from 'react'
import { baseTheme } from '../../theme/themes'
import type { TransitionProps } from '../useTransition'
import { renderWithTheme } from './renderWithTheme'

type Style = Record<string, string>

interface TransitionExpectations {
  /** What the child's style says while it is out. */
  out: Style
  /** What it says while it is in. */
  shown: Style
  /** The CSS properties its `transition` names. */
  properties: string[]
}

const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms))
// A move starts a tick after the render that asks for it: each render here lets it begin.
const mount = (ui: ReactElement) => {
  const view = renderWithTheme(ui)
  tick(0)
  return {
    ...view,
    rerender: (next: ReactElement) => {
      view.rerender(next)
      tick(0)
    },
  }
}

const child = () => screen.getByTestId('child')
// A transition may draw nothing of its own while out - an empty style is not an assertion.
const expectStyle = (style: Style) => {
  if (Object.keys(style).length > 0) expect(child()).toHaveStyle(style)
}

/** The cases every transition around one child shares - what each draws is `expectations`. */
export function describeTransition(
  name: string,
  Transition: ComponentType<TransitionProps>,
  { out, shown, properties }: Readonly<TransitionExpectations>
) {
  describe(`${name} (a transition around one child)`, () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    const view = (props: Partial<TransitionProps> = {}) => (
      <Transition {...props}>
        <div data-testid="child" style={{ color: 'red' }}>
          Hello
        </div>
      </Transition>
    )

    it('is out, and hidden, until it is shown', () => {
      mount(view())
      expect(child()).toHaveStyle({ ...out, visibility: 'hidden' })
    })

    it('is in at once when shown and it need not appear', () => {
      mount(view({ isShown: true, shouldAppear: false }))
      expect(child()).toHaveStyle(shown)
      expect(child()).not.toHaveStyle({ visibility: 'hidden' })
    })

    it('moves in, and out, as isShown changes', () => {
      const { rerender } = mount(view())
      rerender(view({ isShown: true }))
      expect(child()).toHaveStyle(shown)
      tick(baseTheme.transitions.duration.standard)
      expect(child()).toHaveStyle(shown)
      rerender(view({ isShown: false }))
      expectStyle(out)
      expect(child()).not.toHaveStyle({ visibility: 'hidden' })
      tick(baseTheme.transitions.duration.standard)
      expect(child()).toHaveStyle({ ...out, visibility: 'hidden' })
    })

    it('moves over the standard time and easing of the theme', () => {
      mount(view({ isShown: true }))
      const { transition } = child().style
      for (const property of properties) {
        expect(transition).toContain(
          `${property} ${baseTheme.transitions.duration.standard}ms ${baseTheme.transitions.easing.standard}`
        )
      }
    })

    it('takes its time and easing from its props', () => {
      mount(view({ isShown: true, timeout: 90, easing: 'enter' }))
      expect(child().style.transition).toContain(`90ms ${baseTheme.transitions.easing.enter}`)
    })

    it('keeps the style and the ref of its child', () => {
      const ref = vi.fn()
      mount(
        <Transition isShown shouldAppear={false}>
          <div data-testid="child" ref={ref} style={{ color: 'red' }} />
        </Transition>
      )
      expect(child()).toHaveStyle({ color: 'rgb(255, 0, 0)' })
      expect(ref).toHaveBeenCalledWith(child())
    })

    it('leaves the tree until shown, and once out', () => {
      const { rerender } = mount(view({ shouldMountOnEnter: true, shouldUnmountOnExit: true }))
      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
      rerender(view({ shouldMountOnEnter: true, shouldUnmountOnExit: true, isShown: true }))
      expect(child()).toBeInTheDocument()
      rerender(view({ shouldMountOnEnter: true, shouldUnmountOnExit: true, isShown: false }))
      tick(baseTheme.transitions.duration.standard)
      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
    })

    it('tells its callbacks the node it moves', () => {
      const onEntered = vi.fn()
      const onExited = vi.fn()
      const { rerender } = mount(view({ onEntered, onExited }))
      rerender(view({ onEntered, onExited, isShown: true }))
      tick(baseTheme.transitions.duration.standard)
      expect(onEntered).toHaveBeenCalledWith(child())
      rerender(view({ onEntered, onExited, isShown: false }))
      tick(baseTheme.transitions.duration.standard)
      expect(onExited).toHaveBeenCalledWith(child())
    })
  })
}
