import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { ScrollArea, type ScrollAreaProps } from './ScrollArea'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

/**
 * Gives jsdom's boxes the sizes a browser would measure: `content` long and `view` in view on
 * both axes, with every track as long as the view.
 */
const sized = (content: number, view: number) => {
  for (const name of ['scrollHeight', 'scrollWidth'] as const) {
    vi.spyOn(HTMLElement.prototype, name, 'get').mockReturnValue(content)
  }
  for (const name of ['clientHeight', 'clientWidth'] as const) {
    vi.spyOn(HTMLElement.prototype, name, 'get').mockReturnValue(view)
  }
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    left: 0,
    height: view,
    width: view,
  } as DOMRect)
}

// jsdom has no ResizeObserver: a stub that watches nothing, unless a test brings its own.
beforeEach(() =>
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    }
  )
)
afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

const view = (props: Partial<ScrollAreaProps> = {}) => (
  <ScrollArea data-testid="area" {...props}>
    <p>Content</p>
  </ScrollArea>
)
const viewport = () => document.querySelector<HTMLElement>('[data-scroll-viewport]') as HTMLElement
const thumbOn = (axis: 'x' | 'y') =>
  document.querySelector<HTMLElement>(`[data-scroll-track="${axis}"] [data-scroll-thumb]`)

describe('ScrollArea', () => {
  it('draws no scrollbar while nothing overflows', () => {
    sized(100, 100)
    renderWithTheme(view())
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(document.querySelector('[data-scroll-thumb]')).toBeNull()
  })

  it('draws a hidden thumb down the side, sized by the share in view, following the scroll', () => {
    sized(400, 100)
    renderWithTheme(view())
    // Down by default: no track along the bottom.
    expect(thumbOn('x')).toBeNull()
    expect(thumbOn('y')).toHaveStyle({ top: '0%', height: '25%' })
    expect(getComputedStyle(thumbOn('y') as HTMLElement).opacity).toBe('0')

    viewport().scrollTop = 300
    fireEvent.scroll(viewport())
    expect(thumbOn('y')).toHaveStyle({ top: '75%' })
  })

  it('draws a thumb along the bottom for a sideways area, and both for one that scrolls both ways', () => {
    sized(400, 100)
    const { unmount } = renderWithTheme(view({ axes: 'x' }))
    expect(thumbOn('y')).toBeNull()
    expect(thumbOn('x')).toHaveStyle({ left: '0%', width: '25%' })
    viewport().scrollLeft = 150
    fireEvent.scroll(viewport())
    expect(thumbOn('x')).toHaveStyle({ left: '37.5%' })
    unmount()

    renderWithTheme(view({ axes: 'both' }))
    expect(thumbOn('x')).not.toBeNull()
    expect(thumbOn('y')).not.toBeNull()
  })

  it('measures again when the box or its content changes size', () => {
    let resize: ResizeObserverCallback = () => undefined
    const observe = vi.fn()
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: ResizeObserverCallback) {
          resize = callback
        }
        observe = observe
        disconnect() {}
      }
    )
    sized(100, 100)
    const { unmount } = renderWithTheme(view())
    // The box and its content are both watched.
    expect(observe).toHaveBeenCalledTimes(2)
    expect(thumbOn('y')).toBeNull()

    sized(200, 100)
    act(() => resize([], {} as ResizeObserver))
    expect(thumbOn('y')).toHaveStyle({ height: '50%' })
    unmount()
  })

  it('is measured on mount and on scroll where there is no ResizeObserver', () => {
    vi.unstubAllGlobals()
    sized(400, 100)
    renderWithTheme(view())
    expect(thumbOn('y')).toHaveStyle({ height: '25%' })
  })

  it.each([
    ['y', { clientY: 80 }, { clientY: 10 }, 'scrollTop', { top: 100 }, { top: -100 }],
    ['x', { clientX: 80 }, { clientX: 10 }, 'scrollLeft', { left: 100 }, { left: -100 }],
  ] as const)(
    'pages one view toward the pointer when the %s track is pressed off the thumb',
    (axis, after, before, offset, forward, back) => {
      sized(400, 100)
      renderWithTheme(view({ axes: axis }))
      const box = viewport()
      box.scrollBy = vi.fn()
      const track = (thumbOn(axis) as HTMLElement).parentElement as HTMLElement

      // The thumb covers the first quarter: a press at 80% is past it.
      fireEvent.pointerDown(track, { button: 0, pointerId: 1, ...after })
      expect(box.scrollBy).toHaveBeenLastCalledWith(forward)

      box[offset] = 300
      fireEvent.scroll(box)
      fireEvent.pointerDown(track, { button: 0, pointerId: 1, ...before })
      expect(box.scrollBy).toHaveBeenLastCalledWith(back)

      // Only the primary button pages.
      fireEvent.pointerDown(track, { button: 2, pointerId: 1, ...before })
      expect(box.scrollBy).toHaveBeenCalledTimes(2)
    }
  )

  it.each([
    ['y', 'scrollTop', { clientY: 10 }, { clientY: 35 }],
    ['x', 'scrollLeft', { clientX: 10 }, { clientX: 35 }],
  ] as const)(
    'scrolls the box as the %s thumb is dragged, and keeps it shown until the drag ends',
    (axis, offset, down, moved) => {
      sized(400, 100)
      renderWithTheme(view({ axes: axis }))
      const track = (thumbOn(axis) as HTMLElement).parentElement as HTMLElement
      track.setPointerCapture = vi.fn()

      fireEvent.pointerDown(track, { button: 0, pointerId: 1, ...down })
      expect(getComputedStyle(thumbOn(axis) as HTMLElement).opacity).toBe('1')
      // 25px of drag is 100px of scroll (`scrollThumb.test.ts`).
      fireEvent.pointerMove(track, { pointerId: 1, ...moved })
      expect(viewport()[offset]).toBe(100)
      fireEvent.pointerUp(track, { pointerId: 1, ...moved })
      expect(getComputedStyle(thumbOn(axis) as HTMLElement).opacity).toBe('0')

      // A drag that is cancelled ends too.
      fireEvent.pointerDown(track, { button: 0, pointerId: 1, ...down })
      fireEvent.pointerCancel(track, { pointerId: 1 })
      expect(getComputedStyle(thumbOn(axis) as HTMLElement).opacity).toBe('0')
    }
  )

  it('lets go of a drag that is still going when it unmounts', () => {
    sized(400, 100)
    const { unmount } = renderWithTheme(view())
    const track = (thumbOn('y') as HTMLElement).parentElement as HTMLElement
    track.setPointerCapture = vi.fn()
    const remove = vi.spyOn(track, 'removeEventListener')
    fireEvent.pointerDown(track, { button: 0, pointerId: 1, clientY: 10 })
    unmount()
    expect(remove).toHaveBeenCalledWith('pointermove', expect.any(Function))
  })

  it('selects no text while the thumb is pressed and dragged', () => {
    sized(400, 100)
    renderWithTheme(view())
    const track = document.querySelector('[data-scroll-track="y"]') as HTMLElement
    const press = new PointerEvent('pointerdown', {
      clientY: 10,
      button: 0,
      bubbles: true,
      cancelable: true,
    })
    track.setPointerCapture = vi.fn()
    act(() => {
      track.dispatchEvent(press)
    })
    expect(press.defaultPrevented).toBe(true)
  })

  it('keeps the wheel on an axis it scrolls and passes it on along one it does not', () => {
    sized(100, 100)
    renderWithTheme(
      <>
        {view({ axes: 'x', 'data-testid': 'across' })}
        {view({ axes: 'both', 'data-testid': 'both' })}
      </>
    )
    const [across, both] = [...document.querySelectorAll<HTMLElement>('[data-scroll-viewport]')]
    expect(across).toHaveStyle({ overscrollBehaviorX: 'none', overscrollBehaviorY: 'auto' })
    expect(both).toHaveStyle({ overscrollBehaviorX: 'none', overscrollBehaviorY: 'none' })
  })

  it('takes a size, a ceiling and its spacing as props', () => {
    sized(100, 100)
    renderWithTheme(view({ maxHeight: 120, width: '50%', m: 2 }))
    expect(screen.getByTestId('area')).toHaveStyle({
      maxHeight: '120px',
      width: '50%',
      margin: baseTheme.space[2],
    })
  })

  it('is a named region only when it is named, and in the tab order when asked', () => {
    sized(100, 100)
    const { rerender } = renderWithTheme(view())
    expect(viewport()).not.toHaveAttribute('role')
    expect(viewport()).not.toHaveAttribute('tabindex')
    rerender(view({ 'aria-label': 'Log', tabIndex: 0 }))
    expect(screen.getByRole('region', { name: 'Log' })).toBe(viewport())
    expect(viewport()).toHaveAttribute('tabindex', '0')
    rerender(
      <>
        <span id="title">Log</span>
        {view({ 'aria-labelledby': 'title' })}
      </>
    )
    expect(screen.getByRole('region', { name: 'Log' })).toBe(viewport())
  })

  describe('theme', () => {
    it('takes its axes from the theme, an own prop winning', () => {
      sized(400, 100)
      const theme = createTheme(baseTheme, {
        components: { ScrollArea: { defaultProps: { axes: 'x' } } },
      })
      const { unmount } = render(view(), { wrapper: withTheme(theme) })
      expect(thumbOn('x')).not.toBeNull()
      expect(thumbOn('y')).toBeNull()
      unmount()
      render(view({ axes: 'y' }), { wrapper: withTheme(theme) })
      expect(thumbOn('y')).not.toBeNull()
    })

    it('draws its thumb and its track from the theme tokens', () => {
      sized(400, 100)
      const theme = createTheme(baseTheme, {
        background: { scrollbar: '#112233', scrollbarTrack: '#445566' },
      })
      render(view(), { wrapper: withTheme(theme) })
      const thumb = thumbOn('y') as HTMLElement
      expect(thumb).toHaveStyle({ backgroundColor: '#112233' })
      expect(thumb.parentElement).toHaveStyle({ width: baseTheme.space[1.25] })
      expect(thumb).toHaveStyle({ width: baseTheme.space[0.75] })
    })

    it('styles every part from styleOverrides', () => {
      sized(400, 100)
      const style = { outlineColor: 'rgb(1, 2, 3)' }
      const theme = createTheme(baseTheme, {
        components: {
          ScrollArea: {
            styleOverrides: { root: style, viewport: style, track: style, thumb: style },
          },
        },
      })
      render(view(), { wrapper: withTheme(theme) })
      for (const part of [
        screen.getByTestId('area'),
        viewport(),
        document.querySelector('[data-scroll-track]'),
        thumbOn('y'),
      ]) {
        expect(part).toHaveStyle(style)
      }
    })
  })
})
