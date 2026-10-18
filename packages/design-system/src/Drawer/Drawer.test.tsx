import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest'
import { act, cleanup, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { baseTheme } from '../theme/themes'
import { installPopover } from '../testing'
import { Drawer, DrawerToggle } from './'

// jsdom has no popover API: the published stand-in fires `toggle` the way a real popover does.
// The behaviour in a browser is covered by Drawer.browser.test.tsx.
let restorePopover = () => {}
beforeAll(() => {
  restorePopover = installPopover()
})
afterAll(() => restorePopover())

afterEach(() => {
  cleanup()
  document.body.removeAttribute('style')
  vi.restoreAllMocks()
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
      expect(getPanel()).toBeVisible()
      rerender(
        <Drawer id="nav" isOpen={false} onClose={onClose}>
          <button type="button">inside</button>
        </Drawer>
      )
      expect(getPanel()).not.toBeVisible()
      expect(onClose).not.toHaveBeenCalled()
    })

    it('does nothing when isOpen matches the open state', () => {
      const hide = vi.spyOn(HTMLElement.prototype, 'hidePopover')
      renderDrawer({ isOpen: false })
      expect(hide).not.toHaveBeenCalled()
    })

    it('opens from its toggle button', () => {
      renderWithTheme(
        <>
          <DrawerToggle drawer="nav">Menu</DrawerToggle>
          <Drawer id="nav">
            <button type="button">inside</button>
          </Drawer>
        </>
      )
      act(() => screen.getByRole('button', { name: 'Menu' }).click())
      expect(getPanel()).toBeVisible()
    })

    it('reports a close by Escape as escapeKey and any other as dismiss', () => {
      const onClose = vi.fn()
      renderDrawer({ onClose })
      act(() => getPanel().showPopover())
      act(() => {
        fireEvent.keyDown(document, { key: 'Escape' })
      })
      expect(onClose).toHaveBeenLastCalledWith(expect.any(Event), 'escapeKey')
      act(() => getPanel().showPopover())
      act(() => getPanel().hidePopover())
      expect(onClose).toHaveBeenLastCalledWith(expect.any(Event), 'dismiss')
    })

    it('moves focus in and locks scroll while open, and undoes both on close', () => {
      renderDrawer()
      act(() => getPanel().showPopover())
      expect(screen.getByText('inside')).toHaveFocus()
      expect(document.body.style.overflow).toBe('hidden')
      act(() => getPanel().hidePopover())
      expect(document.body.style.overflow).toBe('')
    })

    it('leaves scroll alone when shouldLockScroll is false', () => {
      renderDrawer({ shouldLockScroll: false })
      act(() => getPanel().showPopover())
      expect(document.body.style.overflow).toBe('')
    })
  })

  describe('without the Popover API (jsdom, older browsers)', () => {
    it('stays closed from isOpen instead of throwing', () => {
      restorePopover()
      try {
        expect(() => renderDrawer({ isOpen: true })).not.toThrow()
        expect(document.body.style.overflow).toBe('')
      } finally {
        restorePopover = installPopover()
      }
    })

    it('hides the panel where the browser cannot, instead of covering the page', () => {
      renderDrawer()
      // Emotion minifies the at-rule; the browser applies it only without `:popover-open`.
      expect(styles()).toMatch(
        /@supports not selector\(:popover-open\)\{\.[\w-]+\{display:none;\}\}/
      )
    })
  })
})
