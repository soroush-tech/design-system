import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Tooltip, type TooltipProps } from './Tooltip'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms))
const button = () => screen.getByRole('button', { hidden: true })
const tooltip = () => screen.getByRole('tooltip')
// What a browser says of a focus: by the keyboard (`:focus-visible`), or by the pointer.
const stubFocusVisible = (isVisible: boolean) => {
  const matches = Element.prototype.matches
  vi.spyOn(Element.prototype, 'matches').mockImplementation(function (
    this: Element,
    selector: string
  ) {
    return selector === ':focus-visible' ? isVisible : matches.call(this, selector)
  })
}
const noTooltip = () => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

const view = (props: Partial<TooltipProps> = {}) => (
  <Tooltip title="Save" {...props}>
    <button type="button">Icon</button>
  </Tooltip>
)

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('Tooltip', () => {
  describe('on hover', () => {
    it('opens after the enter delay, and closes as the pointer leaves', () => {
      renderWithTheme(view())
      noTooltip()
      fireEvent.mouseEnter(button())
      tick(99)
      noTooltip()
      tick(1)
      expect(tooltip()).toHaveTextContent('Save')
      fireEvent.mouseLeave(button())
      tick(0)
      noTooltip()
    })

    it('waits as long as it is told, both ways', () => {
      renderWithTheme(view({ enterDelay: 300, leaveDelay: 200 }))
      fireEvent.mouseEnter(button())
      tick(299)
      noTooltip()
      tick(1)
      expect(tooltip()).toBeInTheDocument()
      fireEvent.mouseLeave(button())
      tick(199)
      expect(tooltip()).toBeInTheDocument()
      tick(1)
      noTooltip()
    })

    it('does not open if the pointer leaves first', () => {
      renderWithTheme(view())
      fireEvent.mouseEnter(button())
      tick(50)
      fireEvent.mouseLeave(button())
      tick(500)
      noTooltip()
    })

    it('stays open while the pointer is on the tooltip itself, and closes as it leaves it', () => {
      renderWithTheme(view())
      fireEvent.mouseEnter(button())
      tick(100)
      fireEvent.mouseLeave(button())
      fireEvent.mouseEnter(tooltip())
      tick(500)
      expect(tooltip()).toBeInTheDocument()
      fireEvent.mouseLeave(tooltip())
      tick(0)
      noTooltip()
    })

    it('is not opened by hover when it is not to be', () => {
      renderWithTheme(view({ shouldOpenOnHover: false }))
      fireEvent.mouseEnter(button())
      tick(500)
      noTooltip()
      fireEvent.mouseLeave(button())
      tick(500)
      noTooltip()
    })

    it('is held open, as the pointer is on it, only with hover on', () => {
      renderWithTheme(view({ shouldOpenOnHover: false, defaultOpen: true }))
      expect(tooltip()).toBeInTheDocument()
      fireEvent.mouseEnter(tooltip())
      fireEvent.mouseLeave(tooltip())
      tick(500)
      expect(tooltip()).toBeInTheDocument()
    })
  })

  describe('on focus', () => {
    it('opens on keyboard focus, and closes on blur', () => {
      stubFocusVisible(true)
      renderWithTheme(view())
      fireEvent.focus(button())
      tick(100)
      expect(tooltip()).toBeInTheDocument()
      fireEvent.blur(button())
      tick(0)
      noTooltip()
    })

    it('does not open for a focus the pointer gave', () => {
      stubFocusVisible(false)
      renderWithTheme(view())
      fireEvent.focus(button())
      tick(500)
      noTooltip()
    })

    it('takes any focus for the keyboard where a browser has no :focus-visible', () => {
      const matches = Element.prototype.matches
      vi.spyOn(Element.prototype, 'matches').mockImplementation(function (
        this: Element,
        selector: string
      ) {
        if (selector === ':focus-visible') throw new SyntaxError('not a selector')
        return matches.call(this, selector)
      })
      renderWithTheme(view())
      fireEvent.focus(button())
      tick(100)
      expect(tooltip()).toBeInTheDocument()
    })

    it('is not opened by focus when it is not to be', () => {
      renderWithTheme(view({ shouldOpenOnFocus: false }))
      fireEvent.focus(button())
      tick(500)
      noTooltip()
      fireEvent.blur(button())
    })
  })

  describe('on touch', () => {
    it('opens after a long touch, and closes a while after it ends', () => {
      renderWithTheme(view())
      fireEvent.touchStart(button())
      tick(699)
      noTooltip()
      tick(1)
      expect(tooltip()).toBeInTheDocument()
      fireEvent.touchEnd(button())
      tick(1499)
      expect(tooltip()).toBeInTheDocument()
      tick(1)
      noTooltip()
    })

    it('does not open for a touch that ends first, or is cancelled', () => {
      renderWithTheme(view())
      fireEvent.touchStart(button())
      tick(300)
      fireEvent.touchEnd(button())
      tick(5000)
      noTooltip()
      fireEvent.touchStart(button())
      tick(300)
      fireEvent.touchCancel(button())
      tick(5000)
      noTooltip()
    })

    it('takes the touch delays it is given', () => {
      renderWithTheme(view({ enterTouchDelay: 50, leaveTouchDelay: 80 }))
      fireEvent.touchStart(button())
      tick(50)
      expect(tooltip()).toBeInTheDocument()
      fireEvent.touchEnd(button())
      tick(80)
      noTooltip()
    })

    it('is not opened by touch when it is not to be', () => {
      renderWithTheme(view({ shouldOpenOnTouch: false }))
      fireEvent.touchStart(button())
      tick(1000)
      noTooltip()
      fireEvent.touchEnd(button())
      fireEvent.touchCancel(button())
    })
  })

  describe('closing', () => {
    it('closes on Escape, at once, and leaves other keys alone', () => {
      renderWithTheme(view({ defaultOpen: true }))
      fireEvent.keyDown(document, { key: 'a' })
      tick(0)
      expect(tooltip()).toBeInTheDocument()
      fireEvent.keyDown(document, { key: 'Escape' })
      tick(0)
      noTooltip()
    })

    it('stops its clock when it goes', () => {
      const onOpen = vi.fn()
      const { unmount } = renderWithTheme(view({ onOpen }))
      fireEvent.mouseEnter(button())
      unmount()
      tick(1000)
      expect(onOpen).not.toHaveBeenCalled()
    })
  })

  describe('open or closed', () => {
    it('is open at once with defaultOpen', () => {
      renderWithTheme(view({ defaultOpen: true }))
      expect(tooltip()).toBeInTheDocument()
    })

    it('tells onOpen and onClose once each, however often it is asked', () => {
      const onOpen = vi.fn()
      const onClose = vi.fn()
      renderWithTheme(view({ onOpen, onClose }))
      fireEvent.mouseEnter(button())
      tick(100)
      fireEvent.mouseEnter(button())
      tick(100)
      expect(onOpen).toHaveBeenCalledTimes(1)
      fireEvent.mouseLeave(button())
      tick(0)
      fireEvent.mouseLeave(button())
      tick(0)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it("is the owner's with isOpen: it asks, and does not move itself", () => {
      const onOpen = vi.fn()
      const onClose = vi.fn()
      const { rerender } = renderWithTheme(view({ isOpen: false, onOpen, onClose }))
      fireEvent.mouseEnter(button())
      tick(100)
      expect(onOpen).toHaveBeenCalledTimes(1)
      noTooltip()
      rerender(view({ isOpen: true, onOpen, onClose }))
      expect(tooltip()).toBeInTheDocument()
      fireEvent.mouseLeave(button())
      tick(0)
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(tooltip()).toBeInTheDocument()
    })

    it('works with no onOpen or onClose', () => {
      renderWithTheme(view())
      fireEvent.mouseEnter(button())
      tick(100)
      fireEvent.mouseLeave(button())
      tick(0)
      noTooltip()
    })

    it('draws nothing for no title', () => {
      const { unmount } = renderWithTheme(view({ title: undefined, defaultOpen: true }))
      noTooltip()
      expect(button()).not.toHaveAttribute('aria-label')
      unmount()
      const { unmount: second } = renderWithTheme(view({ title: null, defaultOpen: true }))
      noTooltip()
      second()
      renderWithTheme(view({ title: '', defaultOpen: true }))
      noTooltip()
    })
  })

  describe('naming and describing', () => {
    it('names its child by its title, when that is text', () => {
      renderWithTheme(view())
      expect(button()).toHaveAttribute('aria-label', 'Save')
    })

    it('leaves a name the child already has', () => {
      renderWithTheme(
        <Tooltip title="Save">
          <button type="button" aria-label="Own">
            Icon
          </button>
        </Tooltip>
      )
      expect(button()).toHaveAttribute('aria-label', 'Own')
    })

    it('names nothing by a title that is not text', () => {
      renderWithTheme(view({ title: <b>Bold</b> }))
      expect(button()).not.toHaveAttribute('aria-label')
    })

    it('describes its child, only while it is open, with shouldDescribeChild', () => {
      renderWithTheme(view({ shouldDescribeChild: true }))
      expect(button()).not.toHaveAttribute('aria-label')
      expect(button()).not.toHaveAttribute('aria-describedby')
      fireEvent.mouseEnter(button())
      tick(100)
      expect(button()).toHaveAttribute('aria-describedby', tooltip().id)
      expect(button()).toHaveAccessibleDescription('Save')
    })

    it('adds to a description the child already has', () => {
      renderWithTheme(
        <>
          <span id="help">Help</span>
          <Tooltip title="Save" shouldDescribeChild defaultOpen>
            <button type="button" aria-describedby="help">
              Icon
            </button>
          </Tooltip>
        </>
      )
      expect(button()).toHaveAttribute('aria-describedby', `help ${tooltip().id}`)
    })

    it('keeps the description the child has while it is closed', () => {
      renderWithTheme(
        <Tooltip title="Save" shouldDescribeChild>
          <button type="button" aria-describedby="help">
            Icon
          </button>
        </Tooltip>
      )
      expect(button()).toHaveAttribute('aria-describedby', 'help')
    })
  })

  describe('a persistent description', () => {
    const persistent = (props: Partial<TooltipProps> = {}) =>
      view({ shouldDescribeChild: true, isDescriptionPersistent: true, ...props })

    it('describes the child while the tooltip is closed, by a hidden copy of the title', () => {
      renderWithTheme(persistent())
      noTooltip()
      expect(button()).toHaveAccessibleDescription('Save')
      expect(button().getAttribute('aria-describedby')).toMatch(/-description$/)
    })

    it('does not read the open tooltip as well', () => {
      renderWithTheme(persistent())
      const before = button().getAttribute('aria-describedby')
      fireEvent.mouseEnter(button())
      tick(100)
      expect(tooltip()).toHaveTextContent('Save')
      expect(button().getAttribute('aria-describedby')).toBe(before)
      expect(button()).toHaveAccessibleDescription('Save')
    })

    it('adds to a description the child already has', () => {
      renderWithTheme(
        <>
          <span id="help">Help</span>
          <Tooltip title="Save" shouldDescribeChild isDescriptionPersistent>
            <button type="button" aria-describedby="help">
              Icon
            </button>
          </Tooltip>
        </>
      )
      expect(button().getAttribute('aria-describedby')).toMatch(/^help .+-description$/)
      expect(button()).toHaveAccessibleDescription('Help Save')
    })

    it('has no copy without a title, and none without shouldDescribeChild', () => {
      const { unmount } = renderWithTheme(persistent({ title: '' }))
      expect(button()).not.toHaveAttribute('aria-describedby')
      unmount()
      renderWithTheme(view({ isDescriptionPersistent: true }))
      expect(button()).toHaveAttribute('aria-label', 'Save')
      expect(button()).not.toHaveAttribute('aria-describedby')
    })

    it('keeps a title that is not text as it is', () => {
      renderWithTheme(persistent({ title: <b>Bold</b> }))
      expect(button()).toHaveAccessibleDescription('Bold')
    })

    it('is set for every tooltip by the theme', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Tooltip: { defaultProps: { shouldDescribeChild: true, isDescriptionPersistent: true } },
        },
      })
      render(view(), { wrapper: withTheme(theme) })
      expect(button()).toHaveAccessibleDescription('Save')
    })
  })

  describe('a disabled child', () => {
    const disabled = () => (
      <Tooltip title="Save">
        <button type="button" disabled>
          Icon
        </button>
      </Tooltip>
    )

    it('opens as the pointer enters it, on a wrapper that takes the handlers', () => {
      renderWithTheme(disabled())
      const target = button().parentElement as HTMLElement
      expect(target.tagName).toBe('SPAN')
      fireEvent.mouseEnter(target)
      tick(100)
      expect(tooltip()).toHaveTextContent('Save')
      fireEvent.mouseLeave(target)
      tick(0)
      noTooltip()
    })

    it('keeps the control its own ref, and names or describes it as for any other', () => {
      const ref = { current: null as HTMLButtonElement | null }
      renderWithTheme(
        <Tooltip title="Save">
          <button type="button" disabled ref={ref}>
            Icon
          </button>
        </Tooltip>
      )
      expect(ref.current).toBe(button())
      expect(button()).toHaveAttribute('aria-label', 'Save')
    })

    it('does not wrap a control that is not disabled', () => {
      renderWithTheme(view())
      expect(button().parentElement?.tagName).not.toBe('SPAN')
    })
  })

  describe('the child', () => {
    it('keeps its own handlers and ref', () => {
      const onMouseEnter = vi.fn()
      const ref = vi.fn()
      renderWithTheme(
        <Tooltip title="Save">
          <button type="button" onMouseEnter={onMouseEnter} ref={ref}>
            Icon
          </button>
        </Tooltip>
      )
      fireEvent.mouseEnter(button())
      expect(onMouseEnter).toHaveBeenCalledTimes(1)
      expect(ref).toHaveBeenCalledWith(button())
      tick(100)
      expect(tooltip()).toBeInTheDocument()
    })

    it('never takes the focus', () => {
      renderWithTheme(view({ defaultOpen: true }))
      expect(tooltip()).not.toHaveAttribute('tabindex')
      expect(document.body).toHaveFocus()
    })
  })

  describe('where it sits', () => {
    // jsdom lays nothing out: the child is at 100, 100 and 50 by 20; the tooltip is 40 by 16.
    const anchorRect = {
      left: 100,
      top: 100,
      width: 50,
      height: 20,
      right: 150,
      bottom: 120,
      x: 100,
      y: 100,
    } as DOMRect

    const lay = () => {
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(40)
      vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(16)
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: HTMLElement
      ) {
        if (this.getAttribute('role') !== 'tooltip') return anchorRect
        const left = Number.parseFloat(this.style.left) || 0
        const top = Number.parseFloat(this.style.top) || 0
        return { left, top, width: 40, height: 16, right: left + 40, bottom: top + 16 } as DOMRect
      })
    }

    it('is fixed above everything but the layers above it, hidden until placed', () => {
      renderWithTheme(view({ defaultOpen: true }))
      expect(tooltip()).toHaveStyle({
        position: 'fixed',
        zIndex: String(baseTheme.zOrder.tooltip),
      })
    })

    it('takes the layer it is given', () => {
      renderWithTheme(view({ defaultOpen: true, layer: 'modal' }))
      expect(tooltip()).toHaveStyle({ zIndex: String(baseTheme.zOrder.modal) })
    })

    it('sits above its child by default, a gap away', () => {
      lay()
      renderWithTheme(view({ defaultOpen: true }))
      // The child's top (100) less the gap (8) less the tooltip's height (16).
      expect(tooltip().style.top).toBe('76px')
    })

    it.each([
      ['bottom', 'top', '128px'],
      ['left', 'left', '52px'],
      ['right', 'left', '158px'],
    ] as const)('sits to the %s of its child', (placement, property, expected) => {
      lay()
      renderWithTheme(view({ defaultOpen: true, placement }))
      expect(tooltip().style[property]).toBe(expected)
    })

    it('takes the side with the most room for auto, and lines up for auto-start', () => {
      lay()
      const { unmount } = renderWithTheme(view({ defaultOpen: true, placement: 'auto' }))
      // Most room is to the right of a child at the top left of the window.
      expect(tooltip().style.left).toBe('158px')
      unmount()
      const { unmount: second } = renderWithTheme(
        view({ defaultOpen: true, placement: 'right-start' })
      )
      const fixed = { left: tooltip().style.left, top: tooltip().style.top }
      second()
      renderWithTheme(view({ defaultOpen: true, placement: 'auto-start' }))
      expect({ left: tooltip().style.left, top: tooltip().style.top }).toEqual(fixed)
    })

    it('takes a class name and a test id on its surface', () => {
      renderWithTheme(view({ defaultOpen: true, className: 'extra', 'data-testid': 'surface' }))
      expect(screen.getByTestId('surface')).toHaveClass('extra')
    })
  })

  describe('slots', () => {
    it('puts the props of a slot on its surface and its arrow, the tooltip own props winning', () => {
      renderWithTheme(
        view({
          defaultOpen: true,
          hasArrow: true,
          slotProps: {
            root: { className: 'mine', title: 'Surface', id: 'ignored', 'data-testid': 'slot' },
            arrow: { className: 'point', style: { opacity: 0.5, left: '999px' } },
          },
          className: 'extra',
        })
      )
      expect(tooltip()).toHaveClass('mine', 'extra')
      expect(tooltip()).toHaveAttribute('title', 'Surface')
      expect(tooltip()).toHaveAttribute('data-testid', 'slot')
      expect(tooltip().id).not.toBe('ignored')
      expect(tooltip()).toHaveAttribute('role', 'tooltip')
      const arrow = tooltip().querySelector('[aria-hidden="true"]') as HTMLElement
      expect(arrow).toHaveClass('point')
      expect(arrow).toHaveStyle({ opacity: '0.5' })
      expect(arrow.style.left).not.toBe('999px')
    })

    it('draws its surface and its arrow as the elements given, keeping the styles', () => {
      renderWithTheme(
        view({
          defaultOpen: true,
          hasArrow: true,
          slots: { root: 'section', arrow: 'i' },
        })
      )
      expect(tooltip().tagName).toBe('SECTION')
      expect(tooltip()).toHaveStyle({ position: 'fixed' })
      expect((tooltip().querySelector('[aria-hidden="true"]') as HTMLElement).tagName).toBe('I')
    })
  })

  describe('the arrow', () => {
    const arrow = () => tooltip().querySelector('[aria-hidden="true"]')

    it('is drawn only when asked for, and hidden from assistive technology', () => {
      const { unmount } = renderWithTheme(view({ defaultOpen: true }))
      expect(arrow()).toBeNull()
      unmount()
      renderWithTheme(view({ defaultOpen: true, hasArrow: true }))
      expect(arrow()).toBeInTheDocument()
    })

    const anchorRect = {
      left: 100,
      top: 100,
      width: 50,
      height: 20,
      right: 150,
      bottom: 120,
      x: 100,
      y: 100,
    } as DOMRect
    const lay = () => {
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(40)
      vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(16)
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: HTMLElement
      ) {
        if (this.getAttribute('role') !== 'tooltip') return anchorRect
        const left = Number.parseFloat(this.style.left) || 0
        const top = Number.parseFloat(this.style.top) || 0
        return { left, top, width: 40, height: 16, right: left + 40, bottom: top + 16 } as DOMRect
      })
    }

    it.each([
      ['top', 'bottom'],
      ['bottom', 'top'],
      ['left', 'right'],
      ['right', 'left'],
    ] as const)('sticks out of the edge that faces the child: %s', (placement, edge) => {
      lay()
      renderWithTheme(view({ defaultOpen: true, hasArrow: true, placement }))
      expect((arrow() as HTMLElement).style[edge]).toBe('-4px')
    })

    it('points at the middle of the child, kept inside the tooltip', () => {
      lay()
      renderWithTheme(view({ defaultOpen: true, hasArrow: true, placement: 'top-start' }))
      // The child's middle is 125 and the tooltip, lined up with the child's own edge, starts at 100:
      // the middle is 25 along it, less half the arrow.
      expect((arrow() as HTMLElement).style.left).toBe('21px')
    })
  })

  describe('surface', () => {
    it('is square, on the modal background, in the theme text, by default', () => {
      renderWithTheme(view({ defaultOpen: true }))
      expect(tooltip()).toHaveStyle({
        borderRadius: baseTheme.radii.sq,
        backgroundColor: baseTheme.background.modal,
        color: baseTheme.text.initial,
      })
    })

    it('takes a radius, a background and a text color of its own, its arrow following', () => {
      renderWithTheme(
        view({
          defaultOpen: true,
          hasArrow: true,
          borderRadius: 'lg',
          bg: 'paper',
          textColor: 'secondary',
        })
      )
      expect(tooltip()).toHaveStyle({
        borderRadius: baseTheme.radii.lg,
        backgroundColor: baseTheme.background.paper,
        color: baseTheme.text.secondary,
      })
      const arrow = tooltip().querySelector('[aria-hidden="true"]') as HTMLElement
      expect(getComputedStyle(arrow).backgroundColor).toBe(
        getComputedStyle(tooltip()).backgroundColor
      )
    })

    it('takes them from the theme', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Tooltip: { defaultProps: { borderRadius: 'md', bg: 'paper', textColor: 'secondary' } },
        },
      })
      render(view({ defaultOpen: true }), { wrapper: withTheme(theme) })
      expect(tooltip()).toHaveStyle({
        borderRadius: baseTheme.radii.md,
        backgroundColor: baseTheme.background.paper,
        color: baseTheme.text.secondary,
      })
    })
  })

  describe('theme', () => {
    it('takes its defaults from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Tooltip: {
            defaultProps: {
              placement: 'bottom',
              hasArrow: true,
              enterDelay: 10,
              leaveDelay: 20,
              enterTouchDelay: 30,
              leaveTouchDelay: 40,
              shouldDescribeChild: true,
              shouldOpenOnHover: false,
              shouldOpenOnFocus: false,
              shouldOpenOnTouch: false,
              layer: 'modal',
            },
          },
        },
      })
      const { unmount } = render(view({ defaultOpen: true }), { wrapper: withTheme(theme) })
      expect(tooltip()).toHaveStyle({ zIndex: String(baseTheme.zOrder.modal) })
      expect(tooltip().querySelector('[aria-hidden="true"]')).toBeInTheDocument()
      fireEvent.mouseEnter(button())
      tick(1000)
      expect(tooltip()).toBeInTheDocument()
      unmount()
      render(
        view({
          shouldOpenOnHover: true,
          enterDelay: 5,
          layer: 'tooltip',
          shouldDescribeChild: false,
          hasArrow: false,
        }),
        { wrapper: withTheme(theme) }
      )
      fireEvent.mouseEnter(button())
      tick(5)
      expect(tooltip()).toHaveStyle({ zIndex: String(baseTheme.zOrder.tooltip) })
    })

    it('styles the surface and the arrow from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Tooltip: { styleOverrides: { root: { opacity: 0.9 }, arrow: { opacity: 0.8 } } },
        },
      })
      render(view({ defaultOpen: true, hasArrow: true }), { wrapper: withTheme(theme) })
      expect(tooltip()).toHaveStyle({ opacity: '0.9' })
      expect(tooltip().querySelector('[aria-hidden="true"]')).toHaveStyle({ opacity: '0.8' })
    })
  })
})
