import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Collapse, type CollapseProps } from './Collapse'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const standard = baseTheme.transitions.duration.standard
const root = () => screen.getByTestId('collapse')
const view = (props: Partial<CollapseProps> = {}) => (
  <Collapse data-testid="collapse" {...props}>
    <p>Content</p>
  </Collapse>
)
const transitionOf = () => getComputedStyle(root()).transition
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

describe('Collapse', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // jsdom lays nothing out: the content is 120 tall and 80 wide.
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(120)
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(80)
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('closed', () => {
    it('is nothing tall, hidden and cut off, with its content in the tree', () => {
      mount(view())
      expect(root()).toHaveStyle({ height: '0px', overflow: 'hidden', visibility: 'hidden' })
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('keeps a collapsed size in pixels, and stays visible', () => {
      mount(view({ collapsedSize: 40 }))
      expect(root()).toHaveStyle({ height: '40px' })
      expect(root()).not.toHaveStyle({ visibility: 'hidden' })
    })

    it('keeps a collapsed size as it is given', () => {
      mount(view({ collapsedSize: '3rem' }))
      expect(root()).toHaveStyle({ height: '3rem' })
    })

    it('narrows, not shortens, when horizontal', () => {
      mount(view({ orientation: 'horizontal', collapsedSize: 10 }))
      expect(root()).toHaveStyle({ width: '10px' })
      expect(root().style.height).toBe('')
    })
  })

  describe('open', () => {
    it('is as big as its content, at once, when shown and it need not appear', () => {
      mount(view({ isShown: true, shouldAppear: false }))
      expect(root().style.height).toBe('')
      expect(root()).not.toHaveStyle({ height: '0px' })
      expect(root()).not.toHaveStyle({ visibility: 'hidden' })
    })

    it('opens to the height of its content, then leaves the height to the content', () => {
      const { rerender } = mount(view())
      rerender(view({ isShown: true }))
      expect(root().style.height).toBe('120px')
      tick(standard)
      expect(root().style.height).toBe('')
    })

    it('closes from the height of its content to its collapsed size', () => {
      const { rerender } = mount(view({ isShown: true, shouldAppear: false }))
      rerender(view({ isShown: false, collapsedSize: 30 }))
      expect(root().style.height).toBe('30px')
      tick(standard)
      expect(root().style.height).toBe('')
      expect(root()).toHaveStyle({ height: '30px' })
    })

    it('opens by its width, not its height, when horizontal', () => {
      const { rerender } = mount(view({ orientation: 'horizontal' }))
      rerender(view({ orientation: 'horizontal', isShown: true }))
      expect(root().style.width).toBe('80px')
      expect(root().style.height).toBe('')
      tick(standard)
      rerender(view({ orientation: 'horizontal', isShown: false }))
      expect(root().style.width).toBe('0px')
    })

    it('moves over the standard time and easing of the theme, or the ones it is given', () => {
      const { rerender } = mount(view())
      expect(transitionOf()).toContain(
        `height ${standard}ms ${baseTheme.transitions.easing.standard}`
      )
      rerender(view({ timeout: 90, easing: 'exit' }))
      expect(transitionOf()).toContain(`height 90ms ${baseTheme.transitions.easing.exit}`)
    })
  })

  it('tells each callback the node that moves', () => {
    const names = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'] as const
    const calls: string[] = []
    const callbacks = Object.fromEntries(
      names.map((name) => [
        name,
        (node: HTMLElement) => {
          expect(node).toBe(root())
          calls.push(name)
        },
      ])
    )
    const { rerender } = mount(view(callbacks))
    rerender(view({ ...callbacks, isShown: true }))
    tick(standard)
    rerender(view({ ...callbacks, isShown: false }))
    tick(standard)
    expect(calls).toEqual(names)
  })

  it('leaves the tree until opened and once closed, when asked', () => {
    const props = { shouldMountOnEnter: true, shouldUnmountOnExit: true }
    const { rerender } = mount(view(props))
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    rerender(view({ ...props, isShown: true }))
    expect(screen.getByText('Content')).toBeInTheDocument()
    rerender(view({ ...props, isShown: false }))
    tick(standard)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('takes a class name and a test id on its root', () => {
    mount(view({ className: 'extra' }))
    expect(root()).toHaveClass('extra')
  })

  describe('theme', () => {
    it('takes its defaults from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Collapse: {
            defaultProps: {
              orientation: 'horizontal',
              collapsedSize: 12,
              timeout: 77,
              easing: 'enter',
              shouldAppear: false,
            },
          },
        },
      })
      const view1 = render(view({ isShown: true }), { wrapper: withTheme(theme) })
      tick(0)
      const rerender = (next: ReactElement) => {
        view1.rerender(next)
        tick(0)
      }
      // shouldAppear is off: open at once.
      expect(root().style.width).toBe('')
      expect(transitionOf()).toContain(`width 77ms ${baseTheme.transitions.easing.enter}`)
      rerender(view({ isShown: false, orientation: 'vertical', collapsedSize: 5 }))
      tick(77)
      expect(root()).toHaveStyle({ height: '5px' })
    })

    it('styles each slot from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Collapse: {
            styleOverrides: {
              root: { opacity: 0.9 },
              wrapper: { opacity: 0.8 },
              inner: { opacity: 0.7 },
            },
          },
        },
      })
      render(view({ isShown: true, shouldAppear: false }), { wrapper: withTheme(theme) })
      expect(root()).toHaveStyle({ opacity: '0.9' })
      expect(root().firstElementChild).toHaveStyle({ opacity: '0.8' })
      expect(root().firstElementChild?.firstElementChild).toHaveStyle({ opacity: '0.7' })
    })
  })
})
