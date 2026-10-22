import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { baseTheme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { describeTransition } from '../utils/test/describeTransition'
import { Slide, type SlideProps } from './Slide'

describeTransition('Slide', Slide, {
  out: {},
  shown: { transform: 'none' },
  properties: ['transform'],
})

// jsdom lays nothing out: the node sits at 100, 50 and is 200 wide and 80 tall.
const rect = { left: 100, top: 50, width: 200, height: 80 }
const offsets = {
  down: `translateY(${window.innerHeight - rect.top}px)`,
  up: `translateY(${-(rect.top + rect.height)}px)`,
  right: `translateX(${window.innerWidth - rect.left}px)`,
  left: `translateX(${-(rect.left + rect.width)}px)`,
}

const child = () => screen.getByTestId('child')
const view = (props: Partial<SlideProps> = {}) => (
  <Slide {...props}>
    <div data-testid="child">Hello</div>
  </Slide>
)
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

describe('Slide', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      ...rect,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      x: rect.left,
      y: rect.top,
      toJSON: () => ({}),
    })
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it.each(Object.entries(offsets))('leaves the window by its %s edge', (direction, offset) => {
    const { rerender } = mount(
      view({ direction: direction as SlideProps['direction'], isShown: true, shouldAppear: false })
    )
    rerender(view({ direction: direction as SlideProps['direction'], isShown: false }))
    expect(child().style.transform).toBe(offset)
  })

  it('comes from below by default', () => {
    const { rerender } = mount(view({ isShown: true, shouldAppear: false }))
    rerender(view({ isShown: false }))
    expect(child().style.transform).toBe(offsets.down)
  })

  it('starts outside the window, moves to its place, and keeps its own transition', () => {
    const seen: string[] = []
    mount(
      view({
        isShown: true,
        direction: 'up',
        onEntering: (node) => seen.push(node.style.transform),
      })
    )
    expect(seen).toEqual([offsets.up])
    tick(baseTheme.transitions.duration.standard)
    expect(child().style.transform).toBe('none')
    expect(child().style.transition).toContain('transform')
  })

  it('measures the node in its place, not where a move left it', () => {
    const { rerender } = mount(view({ direction: 'up', isShown: true }))
    tick(baseTheme.transitions.duration.standard)
    rerender(view({ direction: 'up', isShown: false }))
    // Back in while it was still going out: measured again, not stacked on the move.
    rerender(view({ direction: 'up', isShown: true }))
    expect(child().style.transform).toBe('none')
    tick(baseTheme.transitions.duration.standard)
    rerender(view({ direction: 'up', isShown: false }))
    expect(child().style.transform).toBe(offsets.up)
  })

  it('mirrors left and right in a right-to-left page', () => {
    const { rerender } = mount(
      <div dir="rtl">{view({ direction: 'left', isShown: true, shouldAppear: false })}</div>
    )
    rerender(<div dir="rtl">{view({ direction: 'left', isShown: false })}</div>)
    expect(child().style.transform).toBe(offsets.right)
  })
})
