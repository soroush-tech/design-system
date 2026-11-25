import { describe, it, expect, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { MenuItem } from '../../MenuItem'
import { Menu } from './Menu'

// Real layout, focus and pointer: where the list lands in the window, and that a click
// elsewhere closes it - which jsdom can neither measure nor move focus for.

const renderMenu = (style: React.CSSProperties, onClose = vi.fn()) => {
  renderWithTheme(
    <>
      <div style={{ position: 'absolute', ...style }}>
        <Menu trigger={<button type="button">main</button>} onClose={onClose}>
          <MenuItem>New branch...</MenuItem>
          <MenuItem>Rename...</MenuItem>
        </Menu>
      </div>
      <button type="button" style={{ position: 'absolute', top: 0, right: 0 }}>
        Elsewhere
      </button>
    </>
  )
  return onClose
}

const trigger = () => screen.getByRole('button', { name: 'main' })
const surface = () => screen.getByRole('menu').parentElement!

describe('Menu in a browser', () => {
  it('opens under its trigger, lined up with its start edge', async () => {
    renderMenu({ top: 40, left: 40 })
    await userEvent.click(trigger())
    const anchor = trigger().getBoundingClientRect()
    await vi.waitFor(() => {
      const box = surface().getBoundingClientRect()
      expect(Math.floor(box.top)).toBe(Math.floor(anchor.bottom))
      expect(Math.floor(box.left)).toBe(Math.floor(anchor.left))
    })
    expect(screen.getByRole('menuitem', { name: 'New branch...' })).toHaveFocus()
  })

  it('flips above its trigger at the bottom of the window', async () => {
    renderMenu({ bottom: 8, left: 40 })
    await userEvent.click(trigger())
    const anchor = trigger().getBoundingClientRect()
    await vi.waitFor(() =>
      expect(Math.floor(surface().getBoundingClientRect().bottom)).toBeLessThanOrEqual(
        Math.ceil(anchor.top)
      )
    )
  })

  it('stays inside the window at its right edge', async () => {
    renderMenu({ top: 40, right: 0 })
    await userEvent.click(trigger())
    await vi.waitFor(() =>
      expect(surface().getBoundingClientRect().right).toBeLessThanOrEqual(window.innerWidth)
    )
  })

  it('closes when the pointer presses something else, which keeps the focus', async () => {
    const onClose = renderMenu({ top: 40, left: 40 })
    await userEvent.click(trigger())
    const elsewhere = screen.getByRole('button', { name: 'Elsewhere' })
    await userEvent.click(elsewhere)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'blur')
    expect(elsewhere).toHaveFocus()
  })

  it('moves focus with the pointer and the keys alike', async () => {
    renderMenu({ top: 40, left: 40 })
    await userEvent.click(trigger())
    await userEvent.hover(screen.getByRole('menuitem', { name: 'Rename...' }))
    expect(screen.getByRole('menuitem', { name: 'Rename...' })).toHaveFocus()
    await userEvent.keyboard('{ArrowUp}')
    expect(screen.getByRole('menuitem', { name: 'New branch...' })).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    expect(trigger()).toHaveFocus()
  })

  it('opens a submenu beside its row on hover, and closes it on a sibling', async () => {
    renderWithTheme(
      <div style={{ position: 'absolute', top: 40, left: 40 }}>
        <Menu trigger={<button type="button">main</button>}>
          <MenuItem>New branch...</MenuItem>
          <MenuItem submenu={[<MenuItem key="main">main</MenuItem>]}>Local branches</MenuItem>
        </Menu>
      </div>
    )
    await userEvent.click(trigger())
    const local = screen.getByRole('menuitem', { name: 'Local branches' })
    await userEvent.hover(local)
    const submenu = screen.getByRole('menu', { name: 'Local branches' }).parentElement!
    await vi.waitFor(() => {
      const box = submenu.getBoundingClientRect()
      const row = local.getBoundingClientRect()
      expect(Math.floor(box.left)).toBe(Math.floor(row.right))
      expect(getComputedStyle(submenu).visibility).toBe('visible')
    })
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('menuitem', { name: 'main' })).toHaveFocus()
    await userEvent.hover(screen.getByRole('menuitem', { name: 'New branch...' }))
    expect(screen.queryByRole('menu', { name: 'Local branches' })).not.toBeInTheDocument()
  })

  it("opens above at the bottom corner, its submenu on the row's other side at the edge", async () => {
    renderWithTheme(
      <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
        <Menu trigger={<button type="button">main</button>}>
          <MenuItem>New branch...</MenuItem>
          <MenuItem
            submenu={[
              <MenuItem key="main">main</MenuItem>,
              <MenuItem key="feat">feat/menu</MenuItem>,
            ]}
          >
            Local branches
          </MenuItem>
        </Menu>
      </div>
    )
    await userEvent.click(trigger())
    const anchor = trigger().getBoundingClientRect()
    await vi.waitFor(() =>
      expect(Math.floor(surface().getBoundingClientRect().bottom)).toBeLessThanOrEqual(
        Math.ceil(anchor.top)
      )
    )
    const local = screen.getByRole('menuitem', { name: 'Local branches' })
    await userEvent.hover(local)
    const submenu = screen.getByRole('menu', { name: 'Local branches' }).parentElement!
    await vi.waitFor(() => {
      const box = submenu.getBoundingClientRect()
      // No room past the row's end edge: it opens before its start edge, inside the window.
      expect(Math.ceil(box.right)).toBeLessThanOrEqual(
        Math.ceil(local.getBoundingClientRect().left)
      )
      expect(box.left).toBeGreaterThanOrEqual(0)
      expect(box.bottom).toBeLessThanOrEqual(window.innerHeight)
      expect(getComputedStyle(submenu).visibility).toBe('visible')
    })
  })

  it('opens right under its trigger inside a transformed box, which takes over `fixed`', async () => {
    // A zoom wrapper or a sliding drawer: any transform makes the box the containing block.
    renderWithTheme(
      <div style={{ position: 'absolute', top: 300, left: 20, transform: 'translateX(0)' }}>
        <div style={{ paddingTop: 120, paddingLeft: 20 }}>
          <Menu trigger={<button type="button">main</button>}>
            <MenuItem>New branch...</MenuItem>
          </Menu>
        </div>
      </div>
    )
    await userEvent.click(trigger())
    const anchor = trigger().getBoundingClientRect()
    await vi.waitFor(() => {
      const box = surface().getBoundingClientRect()
      expect(Math.floor(box.top)).toBe(Math.floor(anchor.bottom))
      expect(Math.floor(box.left)).toBe(Math.floor(anchor.left))
    })
  })

  it('outlines the row the keys move to, not only fills it', async () => {
    renderMenu({ top: 40, left: 40 })
    trigger().focus()
    await userEvent.keyboard('{ArrowDown}')
    const row = screen.getByRole('menuitem', { name: 'New branch...' })
    await vi.waitFor(() => expect(row).toHaveFocus())
    expect(getComputedStyle(row).outlineStyle).toBe('solid')
  })

  it('has no row without emptyLabel when empty - its list takes focus, outlined', async () => {
    renderWithTheme(<Menu trigger={<button type="button">main</button>} />)
    trigger().focus()
    await userEvent.keyboard('{ArrowDown}')
    const list = screen.getByRole('menu')
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
    await vi.waitFor(() => expect(list).toHaveFocus())
    expect(getComputedStyle(list).outlineStyle).toBe('solid')
  })

  it.each([
    { align: 'start' as const, corner: { top: 8, right: 8 } },
    { align: 'end' as const, corner: { top: 8, left: 8 } },
  ])(
    'keeps a deeper submenu going the way its submenu flipped, off the menu ($align)',
    async ({ align, corner }) => {
      await page.viewport(1280, 800)
      try {
        renderWithTheme(
          <div style={{ position: 'absolute', ...corner }}>
            <Menu trigger={<button type="button">main</button>} align={align}>
              <MenuItem
                submenu={[
                  <MenuItem key="feat" submenu={[<MenuItem key="menu">feat/menu</MenuItem>]}>
                    feat
                  </MenuItem>,
                ]}
              >
                Local branches
              </MenuItem>
            </Menu>
          </div>
        )
        await userEvent.click(trigger())
        await userEvent.hover(screen.getByRole('menuitem', { name: 'Local branches' }))
        await userEvent.hover(screen.getByRole('menuitem', { name: 'feat' }))
        const box = (name: string) =>
          screen.getByRole('menu', { name }).parentElement!.getBoundingClientRect()
        await vi.waitFor(() => {
          const menu = box('main')
          const sub = box('Local branches')
          const deeper = box('feat')
          // Each list opens past the one before it, on the side away from the menu.
          if (align === 'start') {
            expect(Math.ceil(sub.right)).toBeLessThanOrEqual(Math.ceil(menu.left))
            expect(Math.ceil(deeper.right)).toBeLessThanOrEqual(Math.ceil(sub.left))
          } else {
            expect(Math.floor(sub.left)).toBeGreaterThanOrEqual(Math.floor(menu.right))
            expect(Math.floor(deeper.left)).toBeGreaterThanOrEqual(Math.floor(sub.right))
          }
        })
      } finally {
        await page.viewport(414, 896)
      }
    }
  )

  it('opens a submenu with room on neither side under its row, leaving the row uncovered', async () => {
    renderWithTheme(
      <div style={{ position: 'absolute', top: 8, left: 8 }}>
        <Menu trigger={<button type="button">main</button>}>
          <MenuItem
            submenu={[<MenuItem key="main">A branch with a name too long to fit beside</MenuItem>]}
          >
            Local branches with a long name
          </MenuItem>
          <MenuItem>Rename...</MenuItem>
        </Menu>
      </div>
    )
    await userEvent.click(trigger())
    const local = screen.getByRole('menuitem', { name: 'Local branches with a long name' })
    await userEvent.hover(local)
    const submenu = screen.getByRole('menu', {
      name: 'Local branches with a long name',
    }).parentElement!
    await vi.waitFor(() => {
      const box = submenu.getBoundingClientRect()
      const row = local.getBoundingClientRect()
      expect(Math.floor(box.top)).toBe(Math.floor(row.bottom))
      expect(box.right).toBeLessThanOrEqual(window.innerWidth)
      const hit = document.elementFromPoint(row.left + row.width / 2, row.top + row.height / 2)
      expect(local.contains(hit)).toBe(true)
      expect(getComputedStyle(submenu).visibility).toBe('visible')
    })
  })
})
