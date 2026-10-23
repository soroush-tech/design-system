import { describe, it, expect, vi, afterEach } from 'vitest'
import { createRef, type ReactNode } from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { Button } from '../../Button'
import { MenuItem } from '../../MenuItem'
import { ThemeProvider } from '../../theme'
import { Menu, type MenuProps } from './Menu'

const renderMenu = (props: Partial<MenuProps> = {}) =>
  renderWithTheme(
    <Menu trigger={<Button>main</Button>} {...props}>
      <MenuItem value="new">New branch...</MenuItem>
      <MenuItem value="checkout" disabled note="Coming later">
        Checkout...
      </MenuItem>
      <MenuItem value="rename">Rename...</MenuItem>
    </Menu>
  )

const trigger = () => screen.getByRole('button', { name: 'main' })
const row = (name: string) => screen.getByRole('menuitem', { name })

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Menu', () => {
  it('renders its trigger as a closed menu button', () => {
    renderMenu()
    expect(trigger()).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger()).toHaveAttribute('aria-expanded', 'false')
    expect(trigger()).not.toHaveAttribute('aria-controls')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens on a click, named by its trigger, with the first enabled row focused', () => {
    const onOpen = vi.fn()
    renderMenu({ onOpen })
    fireEvent.click(trigger())
    const list = screen.getByRole('menu', { name: 'main' })
    expect(trigger()).toHaveAttribute('aria-expanded', 'true')
    expect(trigger()).toHaveAttribute('aria-controls', list.id)
    expect(row('New branch...')).toHaveFocus()
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('closes when its trigger is pressed again', () => {
    const onClose = vi.fn()
    renderMenu({ onClose })
    fireEvent.click(trigger())
    fireEvent.click(trigger())
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'triggerClick')
    expect(trigger()).toHaveFocus()
  })

  it('opens with ArrowDown or ArrowUp on the trigger, and ignores other keys', () => {
    renderMenu()
    fireEvent.keyDown(trigger(), { key: 'Enter' })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(fireEvent.keyDown(trigger(), { key: 'ArrowDown' })).toBe(false)
    expect(row('New branch...')).toHaveFocus()
    fireEvent.keyDown(row('New branch...'), { key: 'Escape' })
    fireEvent.keyDown(trigger(), { key: 'ArrowUp' })
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it("keeps the trigger's own ref", () => {
    const ref = createRef<HTMLButtonElement>()
    renderWithTheme(
      <Menu
        trigger={
          <button type="button" ref={ref}>
            main
          </button>
        }
      >
        <MenuItem>Row</MenuItem>
      </Menu>
    )
    expect(ref.current).toBe(trigger())
  })

  it("keeps the trigger's own click and key handlers", () => {
    const onClick = vi.fn()
    const onKeyDown = vi.fn()
    renderWithTheme(
      <Menu
        trigger={
          <Button onClick={onClick} onKeyDown={onKeyDown} id="branch">
            main
          </Button>
        }
      >
        <MenuItem>Row</MenuItem>
      </Menu>
    )
    expect(trigger()).toHaveAttribute('id', 'branch')
    fireEvent.keyDown(trigger(), { key: 'a' })
    fireEvent.click(trigger())
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('menu')).toHaveAttribute('aria-labelledby', 'branch')
  })

  it('closes on Escape and gives focus back to the trigger', () => {
    const onClose = vi.fn()
    renderMenu({ onClose })
    fireEvent.click(trigger())
    expect(fireEvent.keyDown(row('New branch...'), { key: 'Escape' })).toBe(false)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'escapeKey')
    expect(trigger()).toHaveFocus()
  })

  it('closes when a row is chosen, reporting its value, and gives focus back', () => {
    const onClose = vi.fn()
    const onSelect = vi.fn()
    renderMenu({ onClose, onSelect })
    fireEvent.click(trigger())
    fireEvent.click(row('Rename...'))
    expect(onSelect).toHaveBeenCalledWith('rename')
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'select')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger()).toHaveFocus()
  })

  it('closes when focus leaves it, without moving focus, and not when focus moves inside', () => {
    const onClose = vi.fn()
    renderWithTheme(
      <>
        <Menu trigger={<Button>main</Button>} onClose={onClose}>
          <MenuItem>Row</MenuItem>
        </Menu>
        <button type="button">Elsewhere</button>
      </>
    )
    fireEvent.click(trigger())
    fireEvent.blur(row('Row'), { relatedTarget: trigger() })
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
    trigger().focus()
    trigger().blur()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('starts open with defaultOpen', () => {
    renderMenu({ defaultOpen: true })
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('in controlled mode, asks to open and close but leaves the state to its owner', () => {
    const onOpen = vi.fn()
    const onClose = vi.fn()
    const { rerender } = renderWithTheme(
      <Menu trigger={<Button>main</Button>} isOpen={false} onOpen={onOpen} onClose={onClose}>
        <MenuItem>Row</MenuItem>
      </Menu>
    )
    fireEvent.click(trigger())
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    rerender(
      <Menu trigger={<Button>main</Button>} isOpen onOpen={onOpen} onClose={onClose}>
        <MenuItem>Row</MenuItem>
      </Menu>
    )
    fireEvent.keyDown(row('Row'), { key: 'Escape' })
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'escapeKey')
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('steps with Left and Right through onStep, swapped right to left', () => {
    const onStep = vi.fn()
    const { unmount } = renderMenu({ isOpen: true, onStep })
    expect(fireEvent.keyDown(row('New branch...'), { key: 'ArrowRight' })).toBe(false)
    fireEvent.keyDown(row('New branch...'), { key: 'ArrowLeft' })
    expect(onStep.mock.calls).toEqual([[1], [-1]])
    unmount()

    onStep.mockClear()
    renderWithTheme(
      <div dir="rtl">
        <Menu trigger={<Button>main</Button>} isOpen onStep={onStep}>
          <MenuItem>Row</MenuItem>
        </Menu>
      </div>
    )
    fireEvent.keyDown(row('Row'), { key: 'ArrowRight' })
    expect(onStep).toHaveBeenCalledWith(-1)
  })

  it('leaves Left and Right alone without onStep', () => {
    renderMenu({ isOpen: true })
    expect(fireEvent.keyDown(row('New branch...'), { key: 'ArrowRight' })).toBe(true)
  })

  it('shows emptyLabel as one disabled row when it has no rows', () => {
    renderWithTheme(<Menu trigger={<Button>main</Button>} defaultOpen emptyLabel="Coming soon" />)
    expect(screen.getByRole('menuitem', { name: 'Coming soon' })).toHaveAttribute(
      'aria-disabled',
      'true'
    )
  })

  it('renders its rows from items, and shows emptyLabel for none', () => {
    const { unmount } = renderWithTheme(
      <Menu trigger={<Button>main</Button>} defaultOpen items={[{ value: 'cut', label: 'Cut' }]} />
    )
    expect(row('Cut')).toBeInTheDocument()
    unmount()
    renderWithTheme(
      <Menu trigger={<Button>main</Button>} defaultOpen items={[]} emptyLabel="None" />
    )
    expect(row('None')).toHaveAttribute('aria-disabled', 'true')
  })

  it('takes its own name with aria-label', () => {
    renderMenu({ defaultOpen: true, 'aria-label': 'Branch actions' })
    const list = screen.getByRole('menu', { name: 'Branch actions' })
    expect(list).not.toHaveAttribute('aria-labelledby')
  })

  it('hands color, textColor, size and dense to its rows', () => {
    renderMenu({ defaultOpen: true, textColor: 'secondary', size: 'sm', dense: true })
    expect(row('New branch...')).toHaveStyle({
      color: baseTheme.text.secondary,
      paddingTop: baseTheme.space[0.5],
    })
  })

  it('draws its surface on its layer with its elevation, and forwards className and data-testid', () => {
    renderMenu({
      defaultOpen: true,
      layer: 'drawer',
      elevation: 2,
      className: 'c',
      'data-testid': 'm',
    })
    const surface = screen.getByRole('menu').parentElement!
    expect(surface).toHaveStyle({
      position: 'fixed',
      zIndex: String(baseTheme.zOrder.drawer),
      boxShadow: baseTheme.shadows[2],
    })
    expect(screen.getByTestId('m')).toHaveClass('c')
  })

  describe('corners', () => {
    const surface = () => screen.getByRole('menu').parentElement

    it('is square by default, and takes a radius of its own', () => {
      const { unmount } = renderMenu({ defaultOpen: true })
      expect(surface()).toHaveStyle({ borderRadius: baseTheme.radii.sq })
      unmount()
      renderMenu({ defaultOpen: true, borderRadius: 'lg' })
      expect(surface()).toHaveStyle({ borderRadius: baseTheme.radii.lg })
    })

    it('is rounded as the theme rounds its surfaces, or by the radius the theme gives menus', () => {
      const rounded = createTheme(baseTheme, { defaults: { surfaceRadius: 'md' } })
      const { unmount } = renderWithTheme(
        <Menu trigger={<Button>main</Button>} defaultOpen>
          <MenuItem value="a">One</MenuItem>
        </Menu>,
        { wrapper: withTheme(rounded) }
      )
      expect(surface()).toHaveStyle({ borderRadius: baseTheme.radii.md })
      unmount()
      const own = createTheme(baseTheme, {
        components: { Menu: { defaultProps: { borderRadius: 'sm' } } },
      })
      renderWithTheme(
        <Menu trigger={<Button>main</Button>} defaultOpen>
          <MenuItem value="a">One</MenuItem>
        </Menu>,
        { wrapper: withTheme(own) }
      )
      expect(surface()).toHaveStyle({ borderRadius: baseTheme.radii.sm })
    })
  })

  describe('placement', () => {
    const rect = (top: number, left: number, width: number, height: number) =>
      ({ top, left, width, height, bottom: top + height, right: left + width }) as DOMRect

    const sizeSurface = (width: number, height: number) => {
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(width)
      vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(height)
    }

    it('is hidden until placed, then sits under the trigger at its start edge', () => {
      sizeSurface(200, 100)
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
        rect(40, 100, 80, 24)
      )
      renderMenu({ defaultOpen: true })
      const surface = screen.getByRole('menu').parentElement!
      expect(surface).toHaveStyle({ top: '64px', left: '100px', visibility: 'visible' })
    })

    it("lines up with the trigger's end edge with align end", () => {
      sizeSurface(200, 100)
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
        rect(40, 300, 80, 24)
      )
      renderMenu({ defaultOpen: true, align: 'end' })
      expect(screen.getByRole('menu').parentElement).toHaveStyle({ left: '180px' })
    })

    it('flips above the trigger when there is no room below', () => {
      sizeSurface(200, 300)
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
        rect(window.innerHeight - 40, 100, 80, 24)
      )
      renderMenu({ defaultOpen: true })
      expect(screen.getByRole('menu').parentElement).toHaveStyle({
        top: `${window.innerHeight - 40 - 300}px`,
      })
    })

    it('follows the trigger on scroll and resize', () => {
      sizeSurface(200, 100)
      const getRect = vi
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockReturnValue(rect(40, 100, 80, 24))
      renderMenu({ defaultOpen: true })
      const surface = screen.getByRole('menu').parentElement!

      getRect.mockReturnValue(rect(20, 100, 80, 24))
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
      expect(surface).toHaveStyle({ top: '44px' })

      getRect.mockReturnValue(rect(10, 120, 80, 24))
      act(() => {
        window.dispatchEvent(new Event('resize'))
      })
      expect(surface).toHaveStyle({ top: '34px', left: '120px' })
    })

    it('ignores a resize that lands after the list is gone', () => {
      const addListener = vi.spyOn(window, 'addEventListener')
      const { unmount } = renderMenu({ defaultOpen: true })
      const onResize = addListener.mock.calls.find(([type]) => type === 'resize')![1] as () => void
      unmount()
      expect(() => onResize()).not.toThrow()
    })

    it('stops following once closed', () => {
      renderMenu({ defaultOpen: true })
      fireEvent.keyDown(row('New branch...'), { key: 'Escape' })
      const getRect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      act(() => {
        window.dispatchEvent(new Event('resize'))
      })
      expect(getRect).not.toHaveBeenCalled()
    })
  })
})

const withTheme = (theme: Theme) =>
  function ThemedWrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

describe('Menu theme defaults', () => {
  it('takes its placement, surface and row look from theme.components.Menu.defaultProps', () => {
    const theme = createTheme(baseTheme, {
      components: {
        Menu: {
          defaultProps: {
            align: 'end',
            marginThreshold: 1,
            elevation: 2,
            layer: 'drawer',
            color: 'error',
            textColor: 'secondary',
            size: 'sm',
            dense: true,
          },
        },
      },
    })
    renderWithTheme(
      <Menu trigger={<Button>main</Button>} defaultOpen>
        <MenuItem value="new">New branch...</MenuItem>
      </Menu>,
      { wrapper: withTheme(theme) }
    )
    expect(screen.getByRole('menu').parentElement).toHaveStyle({
      zIndex: String(baseTheme.zOrder.drawer),
      boxShadow: baseTheme.shadows[2],
    })
    expect(row('New branch...')).toHaveStyle({
      color: baseTheme.text.secondary,
      paddingTop: baseTheme.space[0.5],
    })
  })
})
