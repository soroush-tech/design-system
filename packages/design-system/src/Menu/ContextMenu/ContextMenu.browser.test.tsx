import { describe, it, expect, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { MenuItem } from '../../MenuItem'
import { ContextMenu } from './ContextMenu'

// A real right-click: the browser's menu is held back, and the list lands at the pointer
// inside the window - which jsdom can't lay out.

const renderCanvas = () =>
  renderWithTheme(
    <ContextMenu
      target={
        <div data-testid="canvas" style={{ position: 'fixed', inset: 0 }}>
          Canvas
        </div>
      }
      aria-label="Canvas"
    >
      <MenuItem>Paste</MenuItem>
      <MenuItem>Select all</MenuItem>
    </ContextMenu>
  )

const surface = () => screen.getByRole('menu').parentElement!

describe('ContextMenu in a browser', () => {
  it('opens at the pointer on a right-click', async () => {
    renderCanvas()
    // The canvas fills the window, so a point on it is a point in the window.
    await userEvent.click(screen.getByTestId('canvas'), {
      button: 'right',
      position: { x: 100, y: 60 },
    })
    await vi.waitFor(() => {
      const box = surface().getBoundingClientRect()
      // Within a pixel: the test frame may be scaled.
      expect(Math.abs(box.left - 100)).toBeLessThanOrEqual(1)
      expect(Math.abs(box.top - 60)).toBeLessThanOrEqual(1)
    })
    expect(screen.getByRole('menuitem', { name: 'Paste' })).toHaveFocus()
  })

  it('stays inside the window near its bottom-right corner', async () => {
    renderCanvas()
    await userEvent.click(screen.getByTestId('canvas'), {
      button: 'right',
      position: { x: window.innerWidth - 4, y: window.innerHeight - 4 },
    })
    await vi.waitFor(() => {
      const box = surface().getBoundingClientRect()
      expect(box.right).toBeLessThanOrEqual(window.innerWidth)
      expect(box.bottom).toBeLessThanOrEqual(window.innerHeight)
    })
  })
})
