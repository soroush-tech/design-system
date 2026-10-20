import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { MenuItem } from '../../MenuItem'
import { MenuDivider } from '../MenuDivider'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { ThemeProvider } from '../../theme'
import type { ReactNode } from 'react'
import { MenuList } from './MenuList'

const renderBranchMenu = (props: Partial<Parameters<typeof MenuList>[0]> = {}) =>
  renderWithTheme(
    <MenuList aria-label="Branch" {...props}>
      <MenuItem value="new">New branch...</MenuItem>
      <MenuItem value="checkout" disabled note="Coming later">
        Checkout tag or revision...
      </MenuItem>
      <MenuDivider />
      <MenuItem value="rename">Rename...</MenuItem>
      <MenuItem value="delete">Delete</MenuItem>
    </MenuList>
  )

const row = (name: string) => screen.getByRole('menuitem', { name })

describe('MenuList', () => {
  it('renders a named role="menu" list that takes focus programmatically', () => {
    renderBranchMenu()
    const list = screen.getByRole('menu', { name: 'Branch' })
    expect(list.tagName).toBe('UL')
    expect(list).toHaveAttribute('tabindex', '-1')
  })

  it('moves focus with ArrowDown and ArrowUp, skipping disabled rows', () => {
    renderBranchMenu()
    row('New branch...').focus()
    fireEvent.keyDown(row('New branch...'), { key: 'ArrowDown' })
    expect(row('Rename...')).toHaveFocus()
    fireEvent.keyDown(row('Rename...'), { key: 'ArrowUp' })
    expect(row('New branch...')).toHaveFocus()
  })

  it('wraps by default and stops at the ends without shouldWrap', () => {
    const { unmount } = renderBranchMenu()
    row('Delete').focus()
    fireEvent.keyDown(row('Delete'), { key: 'ArrowDown' })
    expect(row('New branch...')).toHaveFocus()
    unmount()

    renderBranchMenu({ shouldWrap: false })
    row('Delete').focus()
    fireEvent.keyDown(row('Delete'), { key: 'ArrowDown' })
    expect(row('Delete')).toHaveFocus()
  })

  it('goes to the first and last enabled row with Home and End', () => {
    renderBranchMenu()
    row('Rename...').focus()
    fireEvent.keyDown(row('Rename...'), { key: 'End' })
    expect(row('Delete')).toHaveFocus()
    fireEvent.keyDown(row('Delete'), { key: 'Home' })
    expect(row('New branch...')).toHaveFocus()
  })

  it('prevents the default of the keys it handles, and not of others', () => {
    renderBranchMenu()
    row('New branch...').focus()
    expect(fireEvent.keyDown(row('New branch...'), { key: 'ArrowDown' })).toBe(false)
    expect(fireEvent.keyDown(row('Rename...'), { key: 'Tab' })).toBe(true)
  })

  it('jumps to a row by its label as keys are typed', () => {
    renderBranchMenu()
    row('New branch...').focus()
    fireEvent.keyDown(row('New branch...'), { key: 'd' })
    expect(row('Delete')).toHaveFocus()
  })

  it('builds a prefix from keys typed close together, and starts over after a pause', () => {
    renderWithTheme(
      <MenuList>
        <MenuItem>Redo</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Run</MenuItem>
      </MenuList>
    )
    vi.useFakeTimers()
    row('Redo').focus()
    fireEvent.keyDown(row('Redo'), { key: 'r' })
    expect(row('Rename')).toHaveFocus()
    vi.advanceTimersByTime(100)
    fireEvent.keyDown(row('Rename'), { key: 'u' })
    expect(row('Run')).toHaveFocus()
    vi.advanceTimersByTime(600)
    fireEvent.keyDown(row('Run'), { key: 'r' })
    expect(row('Redo')).toHaveFocus()
    vi.useRealTimers()
  })

  it('ignores keys typed with a modifier, and a key that matches nothing', () => {
    renderBranchMenu()
    row('New branch...').focus()
    expect(fireEvent.keyDown(row('New branch...'), { key: 'd', ctrlKey: true })).toBe(true)
    expect(fireEvent.keyDown(row('New branch...'), { key: 'd', metaKey: true })).toBe(true)
    expect(fireEvent.keyDown(row('New branch...'), { key: 'd', altKey: true })).toBe(true)
    expect(fireEvent.keyDown(row('New branch...'), { key: 'z' })).toBe(true)
    expect(row('New branch...')).toHaveFocus()
  })

  it('leaves keys pressed in a nested list to that list', () => {
    renderWithTheme(
      <MenuList aria-label="Outer">
        <MenuItem>Outer one</MenuItem>
        <li role="none">
          <MenuList aria-label="Inner">
            <MenuItem>Inner one</MenuItem>
            <MenuItem>Inner two</MenuItem>
          </MenuList>
        </li>
        <MenuItem>Outer two</MenuItem>
      </MenuList>
    )
    row('Inner one').focus()
    fireEvent.keyDown(row('Inner one'), { key: 'ArrowDown' })
    expect(row('Inner two')).toHaveFocus()
    fireEvent.keyDown(row('Inner two'), { key: 'ArrowDown' })
    expect(row('Inner one')).toHaveFocus()
  })

  it('passes every key on to onKeyDown', () => {
    const onKeyDown = vi.fn()
    renderBranchMenu({ onKeyDown })
    fireEvent.keyDown(row('New branch...'), { key: 'ArrowRight' })
    expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'ArrowRight' }))
  })

  it('focuses the checked row on mount with shouldAutoFocus', () => {
    renderWithTheme(
      <MenuList shouldAutoFocus>
        <MenuItem role="menuitemradio">main</MenuItem>
        <MenuItem role="menuitemradio" selected>
          feat/menu
        </MenuItem>
      </MenuList>
    )
    expect(screen.getByRole('menuitemradio', { name: 'feat/menu' })).toHaveFocus()
  })

  it('focuses the first enabled row, or the list itself, on mount with shouldAutoFocus', () => {
    const { unmount } = renderBranchMenu({ shouldAutoFocus: true })
    expect(row('New branch...')).toHaveFocus()
    unmount()

    renderWithTheme(<MenuList shouldAutoFocus aria-label="Empty" />)
    expect(screen.getByRole('menu', { name: 'Empty' })).toHaveFocus()
  })

  it('does not move focus on mount without shouldAutoFocus', () => {
    renderBranchMenu()
    expect(document.body).toHaveFocus()
  })

  it('reports a chosen row with a value through onSelect', () => {
    const onSelect = vi.fn()
    renderWithTheme(
      <MenuList onSelect={onSelect}>
        <MenuItem value="rename">Rename...</MenuItem>
        <MenuItem>No value</MenuItem>
      </MenuList>
    )
    fireEvent.click(row('Rename...'))
    expect(onSelect).toHaveBeenCalledWith('rename')
    fireEvent.click(row('No value'))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('hands its color, text color, size and density to rows, which may override them', () => {
    renderWithTheme(
      <MenuList color="secondary" textColor="primary" size="sm" dense>
        <MenuItem>Inherits</MenuItem>
        <MenuItem size="lg" dense={false}>
          Overrides
        </MenuItem>
      </MenuList>
    )
    expect(row('Inherits')).toHaveStyle({
      paddingTop: baseTheme.space[0.5],
      paddingLeft: baseTheme.space[baseTheme.sizes.sm.paddingLeft],
      color: baseTheme.text.primary,
    })
    expect(row('Overrides')).toHaveStyle({
      paddingTop: baseTheme.space[baseTheme.sizes.lg.paddingTop],
    })
  })

  it('forwards id, className, data-testid and space props', () => {
    renderWithTheme(<MenuList id="menu-id" className="custom" data-testid="list" p={2} />)
    const list = screen.getByTestId('list')
    expect(list).toHaveAttribute('id', 'menu-id')
    expect(list).toHaveClass('custom')
    expect(list).toHaveStyle({ padding: '16px' })
  })
})

const withTheme = (theme: Theme) =>
  function ThemedWrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

describe('MenuList theme defaults', () => {
  it("takes wrapping and its rows' look from theme.components.MenuList.defaultProps", () => {
    const theme = createTheme(baseTheme, {
      components: {
        MenuList: {
          defaultProps: {
            shouldWrap: false,
            color: 'error',
            textColor: 'secondary',
            size: 'sm',
            dense: true,
          },
        },
      },
    })
    renderWithTheme(
      <MenuList aria-label="Edit">
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
      </MenuList>,
      { wrapper: withTheme(theme) }
    )
    expect(row('Cut')).toHaveStyle({
      color: baseTheme.text.secondary,
      paddingTop: baseTheme.space[0.5],
    })
    row('Cut').focus()
    fireEvent.keyDown(row('Cut'), { key: 'ArrowUp' })
    expect(row('Cut')).toHaveFocus()
  })
})
