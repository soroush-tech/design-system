import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest'
import { act, cleanup, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { baseTheme } from '../theme/themes'
import { Drawer, DrawerToggle } from './'

// jsdom has no popover API: these stand in for the browser - show/hide fire `toggle` the way a
// real popover does. The behaviour in a browser is covered by Drawer.browser.test.tsx.
const toggle = (element: HTMLElement, newState: 'open' | 'closed') => {
  const event = new Event('toggle')
  Object.assign(event, { newState })
  element.dispatchEvent(event)
}
beforeAll(() => {
  HTMLElement.prototype.showPopover = vi.fn(function (this: HTMLElement) {
    toggle(this, 'open')
  })
  HTMLElement.prototype.hidePopover = vi.fn(function (this: HTMLElement) {
    toggle(this, 'closed')
  })
})

afterEach(() => {
  cleanup()
  document.body.removeAttribute('style')
  vi.clearAllMocks()
})

const getPanel = () => document.getElementById('nav') as HTMLElement
const styles = () => [...document.querySelectorAll('style')].map((el) => el.textContent).join('')

const renderDrawer = (props: Partial<React.ComponentProps<typeof Drawer>> = {}) =>
  renderWithTheme(
    <Drawer id="nav" {...props}>
      <button type="button">inside</button>
    </Drawer>
  )

describe('Drawer', () => {
  describe('without JavaScript (the server-rendered markup)', () => {
    it('is an auto popover with the id its toggle names, content always in the page', () => {
      renderDrawer()
      expect(getPanel()).toHaveAttribute('popover', 'auto')
      expect(screen.getByText('inside')).toBeInTheDocument()
    })

    it('has a toggle button that targets it through popovertarget', () => {
      renderWithTheme(<DrawerToggle drawer="nav">Menu</DrawerToggle>)
      const button = screen.getByRole('button', { name: 'Menu' })
      expect(button).toHaveAttribute('popovertarget', 'nav')
      expect(button).toHaveAttribute('popovertargetaction', 'toggle')
    })

    it('can be a button that only closes it', () => {
      renderWithTheme(
        <DrawerToggle drawer="nav" action="hide">
          Close
        </DrawerToggle>
      )
      expect(screen.getByRole('button')).toHaveAttribute('popovertargetaction', 'hide')
    })
  })

  describe('panel', () => {
    it('pins to the left edge by default, full height, over a transparent frame', () => {
      renderDrawer()
      expect(getPanel()).toHaveStyle({ position: 'fixed', left: '0px', height: '100%' })
    })

    it.each([
      ['right', { right: '0px', height: '100%' }],
      ['top', { top: '0px', width: '100%' }],
      ['bottom', { bottom: '0px', width: '100%' }],
    ] as const)('pins to the %s edge', (anchor, expected) => {
      renderDrawer({ anchor })
      expect(getPanel()).toHaveStyle(expected)
    })

    it('draws its surface with Paper at the elevation', () => {
      renderDrawer({ elevation: 4 })
      expect(getPanel().firstElementChild).toHaveStyle({ boxShadow: baseTheme.shadows[4] })
    })

    it('dims the page with the backdrop token, or not at all', () => {
      renderDrawer()
      expect(styles()).toContain(`::backdrop{background-color:${baseTheme.background.backdrop};}`)
      cleanup()
      renderDrawer({ hasBackdrop: false })
      expect(styles()).toContain('::backdrop{background-color:transparent;}')
    })
  })

  describe('with JavaScript', () => {
    it('opens and closes from isOpen without reporting its own close', () => {
      const onClose = vi.fn()
      const { rerender } = renderDrawer({ isOpen: true, onClose })
      expect(HTMLElement.prototype.showPopover).toHaveBeenCalledTimes(1)
      rerender(
        <Drawer id="nav" isOpen={false} onClose={onClose}>
          <button type="button">inside</button>
        </Drawer>
      )
      expect(HTMLElement.prototype.hidePopover).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('does nothing when isOpen matches the open state', () => {
      renderDrawer({ isOpen: false })
      expect(HTMLElement.prototype.hidePopover).not.toHaveBeenCalled()
    })

    it('reports a close by Escape as escapeKey and any other as dismiss', () => {
      const onClose = vi.fn()
      renderDrawer({ onClose })
      act(() => toggle(getPanel(), 'open'))
      fireEvent.keyDown(document, { key: 'Escape' })
      act(() => toggle(getPanel(), 'closed'))
      expect(onClose).toHaveBeenLastCalledWith(expect.any(Event), 'escapeKey')
      act(() => toggle(getPanel(), 'open'))
      act(() => toggle(getPanel(), 'closed'))
      expect(onClose).toHaveBeenLastCalledWith(expect.any(Event), 'dismiss')
    })

    it('moves focus in and locks scroll while open, and undoes both on close', () => {
      renderDrawer()
      act(() => toggle(getPanel(), 'open'))
      expect(screen.getByText('inside')).toHaveFocus()
      expect(document.body.style.overflow).toBe('hidden')
      act(() => toggle(getPanel(), 'closed'))
      expect(document.body.style.overflow).toBe('')
    })

    it('leaves scroll alone when shouldLockScroll is false', () => {
      renderDrawer({ shouldLockScroll: false })
      act(() => toggle(getPanel(), 'open'))
      expect(document.body.style.overflow).toBe('')
    })
  })
})
