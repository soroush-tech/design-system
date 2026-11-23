import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { MenuItem } from '../../MenuItem'
import { ThemeProvider } from '../../theme'
import type { ReactNode } from 'react'
import { ContextMenu, type ContextMenuProps } from './ContextMenu'

const renderMenu = (props: Partial<ContextMenuProps> = {}) =>
  renderWithTheme(
    <>
      <ContextMenu
        target={
          <div data-testid="canvas" tabIndex={0}>
            Canvas
          </div>
        }
        aria-label="Canvas"
        {...props}
      >
        {props.children ?? (
          <>
            <MenuItem value="paste">Paste</MenuItem>
            <MenuItem value="select-all">Select all</MenuItem>
          </>
        )}
      </ContextMenu>
      <button type="button">Elsewhere</button>
    </>
  )

const canvas = () => screen.getByTestId('canvas')
const row = (name: string) => screen.getByRole('menuitem', { name })
const surface = () => screen.getByRole('menu').parentElement!
const openAt = () => fireEvent.contextMenu(canvas(), { clientX: 120, clientY: 80 })

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ContextMenu corners', () => {
  it('puts the data attributes an app gives on the list, through slotProps.list', () => {
    renderMenu({ slotProps: { list: { 'data-menu': '', className: 'app-menu' } } })
    openAt()
    const list = screen.getByRole('menu')
    expect(list).toHaveAttribute('data-menu', '')
    expect(list).toHaveClass('app-menu')
    expect(list).toHaveAccessibleName('Canvas')
  })

  it('is square by default, and takes a radius of its own', () => {
    const { unmount } = renderMenu()
    openAt()
    expect(surface()).toHaveStyle({ borderRadius: baseTheme.radii.sq })
    unmount()
    renderMenu({ borderRadius: 'lg' })
    openAt()
    expect(surface()).toHaveStyle({ borderRadius: baseTheme.radii.lg })
  })

  it('takes its radius from the theme', () => {
    const theme = createTheme(baseTheme, {
      components: { ContextMenu: { defaultProps: { borderRadius: 'md' } } },
    })
    renderWithTheme(
      <ContextMenu target={<div data-testid="canvas">Canvas</div>} aria-label="Canvas">
        <MenuItem value="paste">Paste</MenuItem>
      </ContextMenu>,
      { wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider> }
    )
    openAt()
    expect(surface()).toHaveStyle({ borderRadius: baseTheme.radii.md })
  })
})

describe('ContextMenu opened by the app', () => {
  const controlled = (props: Partial<ContextMenuProps> = {}) => (
    <>
      <ContextMenu isOpen anchorPosition={{ top: 80, left: 120 }} aria-label="Canvas" {...props}>
        <MenuItem value="paste">Paste</MenuItem>
        <MenuItem value="select-all">Select all</MenuItem>
      </ContextMenu>
      <button type="button">Elsewhere</button>
    </>
  )

  it('opens at the point with no target, where the app says', () => {
    renderWithTheme(controlled())
    expect(surface()).toHaveStyle({ top: '80px', left: '120px', visibility: 'visible' })
    expect(screen.getByRole('menu')).toHaveAccessibleName('Canvas')
  })

  it('stays closed when it is not open, or has no point', () => {
    const { rerender } = renderWithTheme(controlled({ isOpen: false }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    rerender(controlled({ anchorPosition: undefined }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('moves the open list as the point changes', () => {
    const { rerender } = renderWithTheme(controlled())
    rerender(controlled({ anchorPosition: { top: 40, left: 30 } }))
    expect(surface()).toHaveStyle({ top: '40px', left: '30px' })
  })

  it('asks to close through onClose, and is closed only by the app', () => {
    const onClose = vi.fn()
    renderWithTheme(controlled({ onClose, onSelect: vi.fn() }))
    fireEvent.keyDown(row('Paste'), { key: 'Escape' })
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'escapeKey')
    expect(screen.getByRole('menu')).toBeInTheDocument()
    fireEvent.click(row('Select all'))
    expect(onClose).toHaveBeenLastCalledWith(expect.anything(), 'select')
  })

  it('gives the focus back to where it was when the app opened it', () => {
    const { rerender } = renderWithTheme(controlled({ isOpen: false }))
    screen.getByRole('button', { name: 'Elsewhere' }).focus()
    rerender(controlled())
    expect(row('Paste')).toHaveFocus()
    fireEvent.keyDown(row('Paste'), { key: 'Escape' })
    expect(screen.getByRole('button', { name: 'Elsewhere' })).toHaveFocus()
  })

  it('leaves a right-click on its target to the app, and the browser own menu', () => {
    renderMenu({ isOpen: false, anchorPosition: { top: 1, left: 1 } })
    expect(fireEvent.contextMenu(canvas(), { clientX: 120, clientY: 80 })).toBe(true)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(fireEvent.keyDown(canvas(), { key: 'ContextMenu' })).toBe(true)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('does not restore the focus to nowhere when it was closed by focus leaving', () => {
    const onClose = vi.fn()
    renderWithTheme(controlled({ onClose }))
    fireEvent.blur(row('Paste'), {
      relatedTarget: screen.getByRole('button', { name: 'Elsewhere' }),
    })
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'blur')
  })
})

describe('ContextMenu', () => {
  it('opens at the pointer on a right-click, holding back the browser menu', () => {
    renderMenu()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    const notCancelled = fireEvent.contextMenu(canvas(), { clientX: 120, clientY: 80 })
    expect(notCancelled).toBe(false)
    expect(screen.getByRole('menu', { name: 'Canvas' })).toBeInTheDocument()
    expect(surface()).toHaveStyle({ top: '80px', left: '120px', visibility: 'visible' })
    expect(row('Paste')).toHaveFocus()
  })

  it.each([[{ key: 'ContextMenu' }], [{ key: 'F10', shiftKey: true }]])(
    'opens at the focused element from the keyboard (%o)',
    (init) => {
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
        top: 10,
        left: 30,
        bottom: 40,
        right: 90,
        width: 60,
        height: 30,
      } as DOMRect)
      renderMenu()
      expect(fireEvent.keyDown(canvas(), init)).toBe(false)
      expect(surface()).toHaveStyle({ top: '40px', left: '30px' })
    }
  )

  it('ignores other keys, and F10 without Shift', () => {
    renderMenu()
    fireEvent.keyDown(canvas(), { key: 'F10' })
    fireEvent.keyDown(canvas(), { key: 'Enter' })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it("keeps the target's own handlers", () => {
    const onContextMenu = vi.fn()
    const onKeyDown = vi.fn()
    renderWithTheme(
      <ContextMenu
        target={
          <div data-testid="canvas" onContextMenu={onContextMenu} onKeyDown={onKeyDown}>
            Canvas
          </div>
        }
      >
        <MenuItem>Paste</MenuItem>
      </ContextMenu>
    )
    fireEvent.keyDown(canvas(), { key: 'a' })
    fireEvent.contextMenu(canvas())
    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(onContextMenu).toHaveBeenCalledTimes(1)
  })

  it('closes on Escape and gives focus back to where it was', () => {
    const onClose = vi.fn()
    renderMenu({ onClose })
    canvas().focus()
    fireEvent.contextMenu(canvas())
    expect(fireEvent.keyDown(row('Paste'), { key: 'Escape' })).toBe(false)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'escapeKey')
    expect(canvas()).toHaveFocus()
  })

  it('leaves other keys on the list to it', () => {
    renderMenu()
    fireEvent.contextMenu(canvas())
    fireEvent.keyDown(row('Paste'), { key: 'ArrowDown' })
    expect(row('Select all')).toHaveFocus()
  })

  it('closes when a row is chosen, reporting its value', () => {
    const onClose = vi.fn()
    const onSelect = vi.fn()
    renderMenu({ onClose, onSelect })
    canvas().focus()
    fireEvent.contextMenu(canvas())
    fireEvent.click(row('Select all'))
    expect(onSelect).toHaveBeenCalledWith('select-all')
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'select')
    expect(canvas()).toHaveFocus()
  })

  it('closes when focus leaves it, and not when focus moves inside', () => {
    const onClose = vi.fn()
    renderMenu({ onClose })
    fireEvent.contextMenu(canvas())
    fireEvent.blur(row('Paste'), { relatedTarget: row('Select all') })
    expect(screen.getByRole('menu')).toBeInTheDocument()
    const elsewhere = screen.getByRole('button', { name: 'Elsewhere' })
    act(() => {
      elsewhere.focus()
    })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'blur')
    expect(elsewhere).toHaveFocus()
  })

  it('does not close on blur while closed', () => {
    const onClose = vi.fn()
    renderMenu({ onClose })
    canvas().focus()
    canvas().blur()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders its rows from items', () => {
    renderMenu({ items: [{ value: 'cut', label: 'Cut' }, { type: 'divider' }] })
    fireEvent.contextMenu(canvas())
    expect(row('Cut')).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('shows emptyLabel when it has no rows, from children or items', () => {
    const { unmount } = renderMenu({ items: [], emptyLabel: 'Nothing here' })
    fireEvent.contextMenu(canvas())
    expect(row('Nothing here')).toHaveAttribute('aria-disabled', 'true')
    unmount()

    renderWithTheme(
      <ContextMenu target={<div data-testid="canvas">Canvas</div>} emptyLabel="Empty" />
    )
    fireEvent.contextMenu(canvas())
    expect(row('Empty')).toBeInTheDocument()
  })

  it('draws its surface on its layer with its elevation, and hands rows their look', () => {
    renderMenu({
      layer: 'drawer',
      elevation: 2,
      textColor: 'secondary',
      size: 'sm',
      dense: true,
      color: 'error',
    })
    fireEvent.contextMenu(canvas())
    expect(surface()).toHaveStyle({
      zIndex: String(baseTheme.zOrder.drawer),
      boxShadow: baseTheme.shadows[2],
    })
    expect(row('Paste')).toHaveStyle({
      color: baseTheme.text.secondary,
      paddingTop: baseTheme.space[0.5],
    })
  })

  it('opens a submenu beside its row, the menu way', () => {
    renderWithTheme(
      <ContextMenu target={<div data-testid="canvas">Canvas</div>}>
        <MenuItem submenu={[<MenuItem key="a">Align left</MenuItem>]}>Align</MenuItem>
      </ContextMenu>
    )
    fireEvent.contextMenu(canvas())
    expect(screen.getByRole('menu', { name: 'Align' })).toBeInTheDocument()
  })

  it('forwards className and data-testid', () => {
    renderMenu({ className: 'c', 'data-testid': 'context' })
    expect(screen.getByTestId('context')).toHaveClass('c')
  })
})

const withTheme = (theme: Theme) =>
  function ThemedWrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

describe('ContextMenu theme defaults', () => {
  it('takes its surface and row look from theme.components.ContextMenu.defaultProps', () => {
    const theme = createTheme(baseTheme, {
      components: {
        ContextMenu: {
          defaultProps: {
            marginThreshold: 1,
            elevation: 2,
            layer: 'drawer',
            color: 'error',
            textColor: 'secondary',
            size: 'sm',
            dense: true,
          },
          styleOverrides: { paper: { outlineStyle: 'dotted' } },
        },
      },
    })
    renderWithTheme(
      <ContextMenu target={<div data-testid="canvas">Canvas</div>}>
        <MenuItem value="paste">Paste</MenuItem>
      </ContextMenu>,
      { wrapper: withTheme(theme) }
    )
    fireEvent.contextMenu(canvas())
    expect(surface()).toHaveStyle({
      zIndex: String(baseTheme.zOrder.drawer),
      boxShadow: baseTheme.shadows[2],
      outlineStyle: 'dotted',
    })
    expect(row('Paste')).toHaveStyle({
      color: baseTheme.text.secondary,
      paddingTop: baseTheme.space[0.5],
    })
  })
})
