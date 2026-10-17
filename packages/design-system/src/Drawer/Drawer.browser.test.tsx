import { describe, it, expect, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Drawer, DrawerToggle } from './'

// jsdom has no popover API, so the browser's own behaviour - the toggle button, Escape, light
// dismiss, the top layer - is verified here, in Chromium.

const panel = () => document.getElementById('nav') as HTMLElement
const isOpen = () => panel().matches(':popover-open')

const renderPage = (onClose = vi.fn()) => {
  renderWithTheme(
    <>
      <DrawerToggle drawer="nav">Menu</DrawerToggle>
      <Drawer id="nav" onClose={onClose}>
        <a href="#home">Home</a>
      </Drawer>
    </>
  )
  return onClose
}

describe('Drawer in a browser', () => {
  it('is hidden until its toggle opens it, then pinned to the left edge', async () => {
    renderPage()
    expect(isOpen()).toBe(false)
    expect(getComputedStyle(panel()).display).toBe('none')

    await userEvent.click(document.querySelector('button')!)
    expect(isOpen()).toBe(true)
    // It slides in from off-screen and comes to rest at the edge.
    await vi.waitFor(() => expect(panel().getBoundingClientRect().left).toBe(0))
  })

  it('closes on Escape and reports it', async () => {
    const onClose = renderPage()
    await userEvent.click(document.querySelector('button')!)
    await userEvent.keyboard('{Escape}')
    expect(isOpen()).toBe(false)
    expect(onClose).toHaveBeenCalledWith(expect.any(Event), 'escapeKey')
  })

  it('closes on a click outside and reports a dismiss', async () => {
    const onClose = renderPage()
    await userEvent.click(document.querySelector('button')!)
    await userEvent.click(document.body, { position: { x: window.innerWidth - 5, y: 5 } })
    await vi.waitFor(() => expect(isOpen()).toBe(false))
    expect(onClose).toHaveBeenCalledWith(expect.any(Event), 'dismiss')
  })

  it('opens and closes from isOpen', async () => {
    const { rerender } = renderWithTheme(
      <Drawer id="nav" isOpen>
        <a href="#home">Home</a>
      </Drawer>
    )
    await vi.waitFor(() => expect(isOpen()).toBe(true))
    rerender(
      <Drawer id="nav" isOpen={false}>
        <a href="#home">Home</a>
      </Drawer>
    )
    await vi.waitFor(() => expect(isOpen()).toBe(false))
  })
})
