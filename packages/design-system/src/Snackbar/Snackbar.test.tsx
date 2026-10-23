import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import type { TransitionProps } from '../utils/useTransition'
import { Snackbar, type SnackbarProps } from './Snackbar'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const standard = baseTheme.transitions.duration.standard
const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms))
const status = () => screen.getByRole('status')
const none = () => expect(screen.queryByRole('status')).not.toBeInTheDocument()

// A move starts a tick after the render that asks for it: the render lets it begin.
const mount = (ui: ReactNode) => {
  const view = renderWithTheme(ui)
  tick(0)
  return {
    ...view,
    rerender: (next: ReactNode) => {
      view.rerender(next)
      tick(0)
    },
  }
}
const view = (props: Partial<SnackbarProps> = {}) => (
  <Snackbar data-testid="snackbar" message="Saved" {...props} />
)

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('Snackbar', () => {
  describe('showing', () => {
    it('is not in the tree until it is open', () => {
      mount(view())
      none()
    })

    it('shows its message and its action when open, announced politely', () => {
      mount(view({ defaultOpen: true, action: <button type="button">Undo</button> }))
      expect(status()).toHaveTextContent('Saved')
      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
    })

    it('holds its children in place of the message and the action', () => {
      mount(view({ defaultOpen: true, children: <p>Custom</p>, action: <i /> }))
      expect(status()).toHaveTextContent('Custom')
      expect(status()).not.toHaveTextContent('Saved')
    })

    it('draws no action box without an action', () => {
      mount(view({ defaultOpen: true }))
      expect(status().children).toHaveLength(1)
    })

    it('opens and closes as isOpen changes, leaving the tree once its transition is done', () => {
      const { rerender } = mount(view({ isOpen: false }))
      none()
      rerender(view({ isOpen: true }))
      expect(status()).toBeInTheDocument()
      rerender(view({ isOpen: false }))
      expect(status()).toBeInTheDocument()
      tick(standard + 1)
      none()
    })

    it('never takes the focus', () => {
      const outside = document.createElement('button')
      document.body.append(outside)
      outside.focus()
      mount(view({ defaultOpen: true }))
      expect(outside).toHaveFocus()
      outside.remove()
    })
  })

  describe('hiding by itself', () => {
    it('asks to close when the time is up, with the reason, and its owner decides', () => {
      const onClose = vi.fn()
      mount(view({ isOpen: true, autoHideDuration: 1000, onClose }))
      tick(999)
      expect(onClose).not.toHaveBeenCalled()
      tick(1)
      expect(onClose).toHaveBeenCalledWith(expect.any(Event), 'timeout')
      // Controlled: it stays until its owner closes it.
      expect(status()).toBeInTheDocument()
    })

    it('closes itself when it is uncontrolled', () => {
      mount(view({ defaultOpen: true, autoHideDuration: 1000 }))
      tick(1000)
      tick(standard + 1)
      none()
    })

    it('stays for ever without a time', () => {
      const onClose = vi.fn()
      mount(view({ defaultOpen: true, onClose }))
      tick(60_000)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('stops its clock while the pointer is on it, and starts again for half the time', () => {
      const onClose = vi.fn()
      mount(view({ isOpen: true, autoHideDuration: 1000, onClose }))
      fireEvent.mouseEnter(status())
      tick(5000)
      expect(onClose).not.toHaveBeenCalled()
      fireEvent.mouseLeave(status())
      tick(499)
      expect(onClose).not.toHaveBeenCalled()
      tick(1)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('stops its clock while the focus is on it, and starts again for resumeHideDuration', () => {
      const onClose = vi.fn()
      mount(
        view({
          isOpen: true,
          autoHideDuration: 1000,
          resumeHideDuration: 200,
          onClose,
          action: <button type="button">Undo</button>,
        })
      )
      fireEvent.focus(screen.getByRole('button', { name: 'Undo' }))
      tick(5000)
      expect(onClose).not.toHaveBeenCalled()
      fireEvent.blur(screen.getByRole('button', { name: 'Undo' }))
      tick(200)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('starts no clock when the pointer leaves a message that stays', () => {
      const onClose = vi.fn()
      mount(view({ isOpen: true, onClose }))
      fireEvent.mouseEnter(status())
      fireEvent.mouseLeave(status())
      tick(60_000)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('tells the callback it has now, not the one it had', () => {
      const first = vi.fn()
      const second = vi.fn()
      const { rerender } = mount(view({ isOpen: true, autoHideDuration: 1000, onClose: first }))
      rerender(view({ isOpen: true, autoHideDuration: 1000, onClose: second }))
      tick(1000)
      expect(first).not.toHaveBeenCalled()
      expect(second).toHaveBeenCalledTimes(1)
    })

    it('stops its clock when it closes', () => {
      const onClose = vi.fn()
      const { rerender } = mount(view({ isOpen: true, autoHideDuration: 1000, onClose }))
      rerender(view({ isOpen: false, autoHideDuration: 1000, onClose }))
      tick(5000)
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('asking to close', () => {
    it('asks on Escape, and closes itself when uncontrolled', () => {
      const onClose = vi.fn()
      mount(view({ defaultOpen: true, onClose }))
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onClose).toHaveBeenCalledWith(expect.any(KeyboardEvent), 'escapeKeyDown')
      tick(standard + 1)
      none()
    })

    it('leaves other keys alone', () => {
      const onClose = vi.fn()
      mount(view({ isOpen: true, onClose }))
      fireEvent.keyDown(document, { key: 'a' })
      expect(onClose).not.toHaveBeenCalled()
    })

    it('asks on a click away - and stays open when uncontrolled', () => {
      const onClose = vi.fn()
      mount(view({ defaultOpen: true, onClose }))
      fireEvent.pointerDown(document.body)
      expect(onClose).toHaveBeenCalledWith(expect.any(Event), 'clickaway')
      tick(standard + 1)
      expect(status()).toBeInTheDocument()
    })

    it('does not ask for a click on itself', () => {
      const onClose = vi.fn()
      mount(view({ isOpen: true, onClose }))
      fireEvent.pointerDown(status())
      expect(onClose).not.toHaveBeenCalled()
    })

    it('listens only while it is open', () => {
      const onClose = vi.fn()
      mount(view({ onClose }))
      fireEvent.keyDown(document, { key: 'Escape' })
      fireEvent.pointerDown(document.body)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('works with no onClose', () => {
      mount(view({ defaultOpen: true }))
      fireEvent.keyDown(document, { key: 'Escape' })
      tick(standard + 1)
      none()
    })
  })

  describe('where it sits', () => {
    const root = () => screen.getByTestId('snackbar')

    it('is fixed in the bottom start corner, above the page, by default', () => {
      mount(view({ defaultOpen: true }))
      expect(root()).toHaveStyle({
        position: 'fixed',
        bottom: baseTheme.space[3],
        zIndex: String(baseTheme.zOrder.snackbar),
        pointerEvents: 'none',
      })
      expect(status()).toHaveStyle({ pointerEvents: 'auto' })
    })

    it('goes to the top end corner', () => {
      mount(view({ defaultOpen: true, anchorOrigin: { vertical: 'top', horizontal: 'end' } }))
      expect(root()).toHaveStyle({ top: baseTheme.space[3] })
    })

    it('goes to the middle of the window', () => {
      mount(view({ defaultOpen: true, anchorOrigin: { vertical: 'top', horizontal: 'center' } }))
      expect(root()).toHaveStyle({ left: '0px', right: '0px', justifyContent: 'center' })
    })

    it('takes the layer it is given', () => {
      mount(view({ defaultOpen: true, layer: 'modal' }))
      expect(root()).toHaveStyle({ zIndex: String(baseTheme.zOrder.modal) })
    })

    it('renders into the container it is given', () => {
      const container = document.createElement('div')
      document.body.append(container)
      mount(view({ defaultOpen: true, container }))
      expect(container).toContainElement(status())
      container.remove()
    })

    it('takes a class name and a test id on its root', () => {
      mount(view({ defaultOpen: true, className: 'extra' }))
      expect(root()).toHaveClass('extra')
    })
  })

  describe('transition', () => {
    it('is moved by the transition it is given, which tells it when it is out', () => {
      const seen: boolean[] = []
      function Instant({ isShown, children, onExited }: TransitionProps) {
        seen.push(Boolean(isShown))
        if (!isShown) onExited?.(document.body)
        return isShown ? children : null
      }
      const { rerender } = mount(view({ isOpen: true, transition: Instant }))
      expect(status()).toBeInTheDocument()
      rerender(view({ isOpen: false, transition: Instant }))
      expect(seen).toContain(false)
    })

    it('grows in by default', () => {
      mount(view({ defaultOpen: true }))
      expect(status().style.transition).toContain('transform')
    })
  })

  describe('surface', () => {
    it('is square, on the modal background, in the theme text, by default', () => {
      mount(view({ isOpen: true }))
      expect(status()).toHaveStyle({
        borderRadius: baseTheme.radii.sq,
        backgroundColor: baseTheme.background.modal,
        color: baseTheme.text.initial,
      })
    })

    it('is square or a pill by shape, whatever its radius, and rounded by its radius by default', () => {
      const { rerender } = mount(view({ isOpen: true, borderRadius: 'lg' }))
      expect(status()).toHaveStyle({ borderRadius: baseTheme.radii.lg })
      rerender(view({ isOpen: true, shape: 'rounded', borderRadius: 'md' }))
      expect(status()).toHaveStyle({ borderRadius: baseTheme.radii.md })
      rerender(view({ isOpen: true, shape: 'square', borderRadius: 'lg' }))
      expect(status()).toHaveStyle({ borderRadius: '0' })
      rerender(view({ isOpen: true, shape: 'pill', borderRadius: 'lg' }))
      expect(status()).toHaveStyle({ borderRadius: '9999px' })
    })

    it('takes a radius, a background and a text color of its own', () => {
      mount(view({ isOpen: true, borderRadius: 'lg', bg: 'paper', textColor: 'secondary' }))
      expect(status()).toHaveStyle({
        borderRadius: baseTheme.radii.lg,
        backgroundColor: baseTheme.background.paper,
        color: baseTheme.text.secondary,
      })
    })

    it('takes them from the theme', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Snackbar: {
            defaultProps: {
              shape: 'rounded',
              borderRadius: 'md',
              bg: 'paper',
              textColor: 'secondary',
            },
          },
        },
      })
      render(view({ isOpen: true }), { wrapper: withTheme(theme) })
      tick(0)
      expect(status()).toHaveStyle({
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
          Snackbar: {
            defaultProps: {
              autoHideDuration: 500,
              resumeHideDuration: 100,
              anchorOrigin: { vertical: 'top', horizontal: 'center' },
              layer: 'modal',
            },
          },
        },
      })
      const onClose = vi.fn()
      const { unmount } = render(view({ isOpen: true, onClose }), { wrapper: withTheme(theme) })
      tick(0)
      const root = screen.getByTestId('snackbar')
      expect(root).toHaveStyle({ top: baseTheme.space[3], zIndex: String(baseTheme.zOrder.modal) })
      tick(500)
      expect(onClose).toHaveBeenCalledTimes(1)
      unmount()
      render(
        view({
          isOpen: true,
          onClose,
          autoHideDuration: 9000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'end' },
          layer: 'tooltip',
        }),
        { wrapper: withTheme(theme) }
      )
      tick(0)
      expect(screen.getByTestId('snackbar')).toHaveStyle({
        bottom: baseTheme.space[3],
        zIndex: String(baseTheme.zOrder.tooltip),
      })
      tick(600)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('styles each slot from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Snackbar: {
            styleOverrides: {
              root: { opacity: 0.9 },
              // Its transition owns its opacity: another property shows the override.
              content: { textTransform: 'uppercase' },
              message: { opacity: 0.7 },
              action: { opacity: 0.6 },
            },
          },
        },
      })
      render(view({ defaultOpen: true, action: <button type="button">Undo</button> }), {
        wrapper: withTheme(theme),
      })
      tick(0)
      expect(screen.getByTestId('snackbar')).toHaveStyle({ opacity: '0.9' })
      expect(status()).toHaveStyle({ textTransform: 'uppercase' })
      expect(screen.getByText('Saved')).toHaveStyle({ opacity: '0.7' })
      expect(screen.getByRole('button', { name: 'Undo' }).parentElement).toHaveStyle({
        opacity: '0.6',
      })
    })
  })
})
