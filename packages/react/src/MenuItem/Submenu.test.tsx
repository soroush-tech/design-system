import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Button } from '../Button'
import { Menu, type MenuProps } from '../Menu/Menu'
import { MenuList } from '../Menu/MenuList'
import { MenuItem } from './MenuItem'

const branchRows = (
  <>
    <MenuItem value="new">New branch...</MenuItem>
    <MenuItem
      submenu={[
        <MenuItem key="main" value="main" role="menuitemradio" selected>
          main
        </MenuItem>,
        <MenuItem key="old" value="old" disabled>
          old
        </MenuItem>,
        <MenuItem key="menu" value="feat/menu" role="menuitemradio">
          feat/menu
        </MenuItem>,
      ]}
    >
      Local branches
    </MenuItem>
    <MenuItem submenu={null} emptyLabel="Coming soon">
      Remote branches
    </MenuItem>
  </>
)

const renderList = (onSelect = vi.fn()) => {
  renderWithTheme(
    <MenuList aria-label="Branch" onSelect={onSelect}>
      {branchRows}
    </MenuList>
  )
  return onSelect
}

const renderMenu = (props: Partial<MenuProps> = {}) =>
  renderWithTheme(
    <Menu trigger={<Button>main</Button>} {...props}>
      {branchRows}
    </Menu>
  )

const row = (name: string) => screen.getByRole('menuitem', { name })
const radio = (name: string) => screen.getByRole('menuitemradio', { name })
const local = () => row('Local branches')
const focus = (element: HTMLElement) =>
  act(() => {
    element.focus()
  })

afterEach(() => {
  vi.restoreAllMocks()
})

describe('MenuItem with a submenu', () => {
  it('is a closed menu button with a chevron, in a role="none" entry', () => {
    renderList()
    expect(local()).toHaveAttribute('aria-haspopup', 'menu')
    expect(local()).toHaveAttribute('aria-expanded', 'false')
    expect(local().tagName).toBe('DIV')
    expect(local().parentElement).toHaveAttribute('role', 'none')
    expect(local().querySelector('svg')).toBeInTheDocument()
    expect(screen.getAllByRole('menu')).toHaveLength(1)
  })

  it('opens its submenu when it takes focus, named by the row', () => {
    renderList()
    focus(local())
    const submenu = screen.getByRole('menu', { name: 'Local branches' })
    expect(local()).toHaveAttribute('aria-expanded', 'true')
    expect(local()).toHaveAttribute('aria-controls', submenu.id)
    expect(local()).toHaveFocus()
  })

  it('opens as the pointer moves over it, and closes when focus goes to a sibling', () => {
    renderList()
    fireEvent.pointerMove(local())
    expect(screen.getByRole('menu', { name: 'Local branches' })).toBeInTheDocument()
    focus(row('New branch...'))
    expect(screen.queryByRole('menu', { name: 'Local branches' })).not.toBeInTheDocument()
  })

  it('stays open while focus moves inside its submenu', () => {
    renderList()
    focus(local())
    focus(radio('main'))
    expect(screen.getByRole('menu', { name: 'Local branches' })).toBeInTheDocument()
  })

  it.each(['ArrowRight', 'Enter', ' '])('goes into the submenu with %j', (key) => {
    const onKeyDown = vi.fn()
    renderWithTheme(
      <MenuList aria-label="Branch" onKeyDown={onKeyDown}>
        {branchRows}
      </MenuList>
    )
    focus(local())
    expect(fireEvent.keyDown(local(), { key })).toBe(false)
    expect(radio('main')).toHaveFocus()
    expect(onKeyDown).not.toHaveBeenCalled()
  })

  it('moves only between its own rows, skipping disabled ones', () => {
    renderList()
    focus(local())
    fireEvent.keyDown(local(), { key: 'ArrowRight' })
    fireEvent.keyDown(radio('main'), { key: 'ArrowDown' })
    expect(radio('feat/menu')).toHaveFocus()
    fireEvent.keyDown(radio('feat/menu'), { key: 'ArrowDown' })
    expect(radio('main')).toHaveFocus()
  })

  it.each(['ArrowLeft', 'Escape'])('comes back to its row with %s, closing the submenu', (key) => {
    renderList()
    focus(local())
    fireEvent.keyDown(local(), { key: 'ArrowRight' })
    expect(fireEvent.keyDown(radio('main'), { key })).toBe(false)
    expect(local()).toHaveFocus()
    expect(local()).toHaveAttribute('aria-expanded', 'false')
  })

  it('goes back in from a closed submenu once the row has focus again', () => {
    renderList()
    focus(local())
    fireEvent.keyDown(local(), { key: 'ArrowRight' })
    fireEvent.keyDown(radio('main'), { key: 'Escape' })
    fireEvent.keyDown(local(), { key: 'ArrowRight' })
    expect(radio('main')).toHaveFocus()
  })

  it('swaps the inward and outward keys right to left', () => {
    renderWithTheme(
      <div dir="rtl">
        <MenuList aria-label="Branch">{branchRows}</MenuList>
      </div>
    )
    focus(local())
    fireEvent.keyDown(local(), { key: 'ArrowRight' })
    expect(local()).toHaveFocus()
    fireEvent.keyDown(local(), { key: 'ArrowLeft' })
    expect(radio('main')).toHaveFocus()
    fireEvent.keyDown(radio('main'), { key: 'ArrowLeft' })
    expect(radio('main')).toHaveFocus()
    fireEvent.keyDown(radio('main'), { key: 'ArrowRight' })
    expect(local()).toHaveFocus()
  })

  it('reports a submenu row chosen through the outer list', () => {
    const onSelect = renderList()
    focus(local())
    fireEvent.click(radio('feat/menu'))
    expect(onSelect).toHaveBeenCalledWith('feat/menu')
  })

  it('is not chosen itself by a click', () => {
    const onSelect = renderList()
    fireEvent.click(local())
    fireEvent.keyUp(local(), { key: ' ' })
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('shows emptyLabel as one disabled row in an empty submenu, which cannot be entered', () => {
    renderList()
    const remote = row('Remote branches')
    focus(remote)
    expect(row('Coming soon')).toHaveAttribute('aria-disabled', 'true')
    fireEvent.keyDown(remote, { key: 'ArrowRight' })
    expect(remote).toHaveFocus()
  })

  it('does not open while disabled', () => {
    renderWithTheme(
      <MenuList>
        <MenuItem disabled submenu={[<MenuItem key="a">A</MenuItem>]}>
          Off
        </MenuItem>
      </MenuList>
    )
    focus(row('Off'))
    expect(row('Off')).toHaveAttribute('aria-expanded', 'false')
    fireEvent.keyDown(row('Off'), { key: 'ArrowRight' })
    expect(screen.getAllByRole('menu')).toHaveLength(1)
  })

  it('nests: Escape in a second-level submenu comes back one level only', () => {
    renderWithTheme(
      <MenuList aria-label="Top">
        <MenuItem
          submenu={[
            <MenuItem key="deep" submenu={[<MenuItem key="leaf">Leaf</MenuItem>]}>
              Deeper
            </MenuItem>,
          ]}
        >
          Outer
        </MenuItem>
      </MenuList>
    )
    focus(row('Outer'))
    fireEvent.keyDown(row('Outer'), { key: 'ArrowRight' })
    expect(row('Deeper')).toHaveFocus()
    fireEvent.keyDown(row('Deeper'), { key: 'ArrowRight' })
    expect(row('Leaf')).toHaveFocus()
    fireEvent.keyDown(row('Leaf'), { key: 'Escape' })
    expect(row('Deeper')).toHaveFocus()
    expect(screen.getByRole('menu', { name: 'Outer' })).toBeInTheDocument()
    expect(screen.queryByRole('menu', { name: 'Deeper' })).not.toBeInTheDocument()
  })

  describe('in a Menu', () => {
    it('closes the whole menu when a submenu row is chosen', () => {
      const onClose = vi.fn()
      const onSelect = vi.fn()
      renderMenu({ defaultOpen: true, onClose, onSelect })
      focus(local())
      fireEvent.click(radio('feat/menu'))
      expect(onSelect).toHaveBeenCalledWith('feat/menu')
      expect(onClose).toHaveBeenCalledWith(expect.anything(), 'select')
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('keeps the menu open on Escape in a submenu', () => {
      const onClose = vi.fn()
      renderMenu({ defaultOpen: true, onClose })
      focus(local())
      fireEvent.keyDown(local(), { key: 'ArrowRight' })
      fireEvent.keyDown(radio('main'), { key: 'Escape' })
      expect(onClose).not.toHaveBeenCalled()
      expect(screen.getByRole('menu', { name: 'main' })).toBeInTheDocument()
    })

    it('steps the menu bar with the inward key on a row without a submenu', () => {
      const onStep = vi.fn()
      renderMenu({ isOpen: true, onStep })
      focus(local())
      fireEvent.keyDown(local(), { key: 'ArrowRight' })
      fireEvent.keyDown(radio('main'), { key: 'ArrowRight' })
      expect(onStep).toHaveBeenCalledWith(1)
    })

    it('opens beside its row, on the far side from the trigger edge', () => {
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(150)
      vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100)
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        left: 300,
        width: 200,
        height: 30,
        bottom: 130,
        right: 500,
      } as DOMRect)
      renderMenu({ defaultOpen: true })
      focus(local())
      const surface = screen.getByRole('menu', { name: 'Local branches' }).parentElement!
      expect(surface).toHaveStyle({ top: '100px', left: '500px' })
    })

    it('opens toward the start for an end-aligned menu', () => {
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(150)
      vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100)
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        left: 300,
        width: 200,
        height: 30,
        bottom: 130,
        right: 500,
      } as DOMRect)
      renderMenu({ defaultOpen: true, align: 'end', layer: 'drawer' })
      focus(local())
      const surface = screen.getByRole('menu', { name: 'Local branches' }).parentElement!
      expect(surface).toHaveStyle({ left: '150px' })
    })
  })
})
