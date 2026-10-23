import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../../theme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { FabMenuItem } from '../FabMenuItem'
import { FabMenu, type FabMenuProps } from './FabMenu'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const settle = () => act(() => vi.advanceTimersByTime(baseTheme.transitions.duration.long + 500))
const trigger = () => screen.getByRole('button', { name: 'Create' })
const item = (name: string) => screen.getByRole('button', { name })
const noItem = (name: string) =>
  expect(screen.queryByRole('button', { name })).not.toBeInTheDocument()
const key = (name: string, target: Element = document.activeElement as Element) =>
  fireEvent.keyDown(target, { key: name })

const view = (props: Partial<FabMenuProps> = {}) => (
  <FabMenu aria-label="Create" data-testid="menu" {...props}>
    <FabMenuItem icon={<i data-testid="doc" />}>Document</FabMenuItem>
    <FabMenuItem>Folder</FabMenuItem>
    <FabMenuItem disabled>Upload</FabMenuItem>
    <FabMenuItem>Import</FabMenuItem>
  </FabMenu>
)

// jsdom lays nothing out: the trigger is put in the middle of a 1600 by 900 window - room on every
// side for four actions of 120 wide in a row - and each action is 120 wide.
const lay = (
  rect: Partial<DOMRect> = { left: 800, top: 450, right: 840, bottom: 490, width: 40, height: 40 },
  window_: { width: number; height: number } = { width: 1600, height: 900 }
) => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(rect as DOMRect)
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(120)
  vi.stubGlobal('innerWidth', window_.width)
  vi.stubGlobal('innerHeight', window_.height)
}

beforeEach(() => {
  vi.useFakeTimers()
  lay()
})
afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

const open = () => {
  fireEvent.click(trigger())
  settle()
}

describe('FabMenu', () => {
  describe('the trigger', () => {
    it('is a circular fab named by its aria-label, a disclosure with its actions closed', () => {
      renderWithTheme(view())
      expect(trigger()).toHaveAttribute('aria-expanded', 'false')
      expect(trigger()).not.toHaveAttribute('aria-controls')
      expect(trigger()).toHaveStyle({ borderRadius: '50%' })
      noItem('Document')
    })

    it('is extended and named by its label, when it has one', () => {
      renderWithTheme(view({ label: 'Compose', 'aria-label': undefined }))
      expect(screen.getByRole('button', { name: 'Compose' })).toHaveStyle({
        borderRadius: '9999px',
      })
    })

    it('opens its actions on a press, and says what they are', () => {
      renderWithTheme(view())
      open()
      expect(trigger()).toHaveAttribute('aria-expanded', 'true')
      const list = document.getElementById(trigger().getAttribute('aria-controls') as string)
      expect(list).toContainElement(item('Document'))
      expect(item('Folder')).toBeVisible()
    })

    it('closes them on a second press', () => {
      renderWithTheme(view())
      open()
      fireEvent.click(trigger())
      settle()
      expect(trigger()).toHaveAttribute('aria-expanded', 'false')
      noItem('Folder')
    })

    it('turns its icon to a close one while open', () => {
      renderWithTheme(view({ icon: <i data-testid="plus" />, closeIcon: <i data-testid="x" /> }))
      expect(screen.getByTestId('plus')).toBeInTheDocument()
      expect(screen.queryByTestId('x')).not.toBeInTheDocument()
      open()
      expect(screen.getByTestId('x')).toBeInTheDocument()
      expect(screen.queryByTestId('plus')).not.toBeInTheDocument()
    })

    it('has an add icon and a close one of its own', () => {
      renderWithTheme(view())
      const before = trigger().innerHTML
      open()
      expect(trigger().innerHTML).not.toBe(before)
      expect(trigger().querySelector('svg')).toBeInTheDocument()
    })

    it('keeps its icon before its label while extended, turning it too', () => {
      renderWithTheme(
        view({ label: 'Compose', icon: <i data-testid="plus" />, closeIcon: <i data-testid="x" /> })
      )
      expect(screen.getByTestId('plus')).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'Compose' }))
      expect(screen.getByTestId('x')).toBeInTheDocument()
      expect(screen.getByText('Compose')).toBeInTheDocument()
    })
  })

  describe('open state', () => {
    it('tells its owner when it asks to open and to close', () => {
      const onOpen = vi.fn()
      const onClose = vi.fn()
      renderWithTheme(view({ onOpen, onClose }))
      open()
      expect(onOpen).toHaveBeenCalledTimes(1)
      fireEvent.click(trigger())
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('is its owner when it is given isOpen', () => {
      const onClose = vi.fn()
      const { rerender } = renderWithTheme(view({ isOpen: true, onClose }))
      settle()
      expect(item('Folder')).toBeVisible()
      fireEvent.click(trigger())
      // It asked: the owner decides.
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(trigger()).toHaveAttribute('aria-expanded', 'true')
      rerender(view({ isOpen: false, onClose }))
      settle()
      noItem('Folder')
    })

    it('can start open', () => {
      renderWithTheme(view({ defaultOpen: true }))
      expect(trigger()).toHaveAttribute('aria-expanded', 'true')
    })

    it('asks only once however it is asked', () => {
      const onOpen = vi.fn()
      renderWithTheme(view({ onOpen, defaultOpen: true }))
      key('ArrowUp', trigger())
      expect(onOpen).not.toHaveBeenCalled()
    })
  })

  describe('its actions', () => {
    it('are the children of a fragment, however it is nested, and nothing that is not an element', () => {
      renderWithTheme(
        <FabMenu aria-label="Create" defaultOpen>
          <>
            <FabMenuItem>One</FabMenuItem>
            <>
              <FabMenuItem>Two</FabMenuItem>
            </>
          </>
          <>
            <FabMenuItem>Three</FabMenuItem>
          </>
          {'text'}
          {null}
          <FabMenuItem>Four</FabMenuItem>
        </FabMenu>
      )
      settle()
      for (const name of ['One', 'Two', 'Three', 'Four']) expect(item(name)).toBeVisible()
    })

    it('are walked in the order they are drawn through a fragment', () => {
      renderWithTheme(
        <FabMenu aria-label="Create" defaultOpen direction="down">
          <>
            <FabMenuItem>One</FabMenuItem>
            <FabMenuItem>Two</FabMenuItem>
          </>
        </FabMenu>
      )
      settle()
      trigger().focus()
      key('ArrowDown')
      expect(item('One')).toHaveFocus()
      key('ArrowDown')
      expect(item('Two')).toHaveFocus()
    })
  })

  describe('choosing an action', () => {
    it('runs it, closes the menu and returns the focus to the trigger', () => {
      const onClick = vi.fn()
      const onClose = vi.fn()
      renderWithTheme(
        <FabMenu aria-label="Create" onClose={onClose}>
          <FabMenuItem onClick={onClick}>Document</FabMenuItem>
        </FabMenu>
      )
      open()
      item('Document').focus()
      fireEvent.click(item('Document'))
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(trigger()).toHaveFocus()
      settle()
      noItem('Document')
    })

    it('runs it with no handler of its own', () => {
      renderWithTheme(view())
      open()
      fireEvent.click(item('Folder'))
      expect(trigger()).toHaveAttribute('aria-expanded', 'false')
    })

    it('does nothing for a disabled action', () => {
      const onClose = vi.fn()
      renderWithTheme(view({ onClose }))
      open()
      fireEvent.click(item('Upload'))
      expect(onClose).not.toHaveBeenCalled()
    })

    it('is a secondary extended fab of the trigger size by default, and the color it is given', () => {
      renderWithTheme(
        <FabMenu aria-label="Create" size="sm" defaultOpen>
          <FabMenuItem>One</FabMenuItem>
          <FabMenuItem color="error">Two</FabMenuItem>
        </FabMenu>
      )
      settle()
      expect(item('One')).toHaveStyle({
        backgroundColor: baseTheme.palette.secondary.main,
        height: baseTheme.avatar.sm,
        borderRadius: '9999px',
      })
      expect(item('Two')).toHaveStyle({ backgroundColor: baseTheme.palette.error.main })
    })

    it('must be in a menu', () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
      expect(() => render(<FabMenuItem>Lost</FabMenuItem>)).toThrow(
        'A FabMenuItem must be inside a FabMenu.'
      )
      error.mockRestore()
    })
  })

  describe('closing', () => {
    it('closes on Escape and returns the focus to the trigger, and ignores it while closed', () => {
      const onClose = vi.fn()
      renderWithTheme(view({ onClose }))
      key('Escape', trigger())
      expect(onClose).not.toHaveBeenCalled()
      open()
      item('Folder').focus()
      key('Escape')
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(trigger()).toHaveFocus()
    })

    it('closes on a press anywhere but in it', () => {
      const onClose = vi.fn()
      renderWithTheme(
        <>
          {view({ onClose })}
          <button type="button">Elsewhere</button>
        </>
      )
      open()
      fireEvent.pointerDown(item('Folder'))
      expect(onClose).not.toHaveBeenCalled()
      fireEvent.pointerDown(screen.getByRole('button', { name: 'Elsewhere' }))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('listens for that press only while open', () => {
      const onClose = vi.fn()
      renderWithTheme(view({ onClose }))
      fireEvent.pointerDown(document.body)
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('keys', () => {
    it('opens on ArrowUp and ArrowDown from the trigger, and not on other keys', () => {
      renderWithTheme(view())
      key('a', trigger())
      expect(trigger()).toHaveAttribute('aria-expanded', 'false')
      key('Home', trigger())
      expect(trigger()).toHaveAttribute('aria-expanded', 'false')
      key('ArrowUp', trigger())
      expect(trigger()).toHaveAttribute('aria-expanded', 'true')
    })

    it('walks the actions and the trigger as they are drawn, up from the trigger', () => {
      renderWithTheme(view())
      open()
      trigger().focus()
      key('ArrowUp')
      expect(item('Import')).toHaveFocus()
      // The disabled action is skipped.
      key('ArrowUp')
      expect(item('Folder')).toHaveFocus()
      key('ArrowUp')
      expect(item('Document')).toHaveFocus()
      // No further than the first.
      key('ArrowUp')
      expect(item('Document')).toHaveFocus()
      key('ArrowDown')
      expect(item('Folder')).toHaveFocus()
    })

    it('goes to the first and the last drawn with Home and End', () => {
      renderWithTheme(view())
      open()
      item('Folder').focus()
      key('End')
      expect(trigger()).toHaveFocus()
      key('Home')
      expect(item('Document')).toHaveFocus()
    })

    it('leaves a key alone where focus is not on one of its parts', () => {
      renderWithTheme(
        <>
          {view()}
          <input data-testid="outside" />
        </>
      )
      open()
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        cancelable: true,
      })
      screen.getByTestId('menu').dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
    })

    it('walks the other way when the actions go down', () => {
      renderWithTheme(view({ direction: 'down' }))
      open()
      trigger().focus()
      key('ArrowDown')
      expect(item('Document')).toHaveFocus()
      key('End')
      expect(item('Import')).toHaveFocus()
      key('Home')
      expect(trigger()).toHaveFocus()
    })
  })

  describe('where the actions are', () => {
    const list = () => document.getElementById(trigger().getAttribute('aria-controls') as string)

    it('goes up from the trigger, along its end, by default', () => {
      renderWithTheme(view({ defaultOpen: true }))
      expect(list()).toHaveStyle({
        position: 'absolute',
        bottom: `calc(100% + ${baseTheme.space[1]})`,
        insetInlineEnd: '0',
        alignItems: 'flex-end',
      })
    })

    it('goes down, along its start, when it is told', () => {
      renderWithTheme(view({ defaultOpen: true, direction: 'down', align: 'start' }))
      expect(list()).toHaveStyle({
        top: `calc(100% + ${baseTheme.space[1]})`,
        insetInlineStart: '0',
        alignItems: 'flex-start',
      })
    })
  })

  describe('a row of actions', () => {
    const list = () => document.getElementById(trigger().getAttribute('aria-controls') as string)

    it('goes to the start side of the trigger for left, level with it', () => {
      renderWithTheme(view({ defaultOpen: true, direction: 'left' }))
      expect(list()).toHaveStyle({
        position: 'absolute',
        flexDirection: 'row',
        top: '0',
        bottom: '0',
        insetInlineEnd: `calc(100% + ${baseTheme.space[1]})`,
        alignItems: 'center',
      })
    })

    it('goes to the end side of the trigger for right', () => {
      renderWithTheme(view({ defaultOpen: true, direction: 'right' }))
      expect(list()).toHaveStyle({
        flexDirection: 'row',
        insetInlineStart: `calc(100% + ${baseTheme.space[1]})`,
      })
    })

    it('opens on ArrowLeft and ArrowRight, and not on the keys of a column', () => {
      renderWithTheme(view({ direction: 'left' }))
      key('ArrowUp', trigger())
      key('ArrowDown', trigger())
      expect(trigger()).toHaveAttribute('aria-expanded', 'false')
      key('ArrowLeft', trigger())
      expect(trigger()).toHaveAttribute('aria-expanded', 'true')
    })

    it('walks the actions with ArrowLeft and ArrowRight, as drawn, to the left of the trigger', () => {
      renderWithTheme(view({ direction: 'left' }))
      open()
      trigger().focus()
      key('ArrowLeft')
      expect(item('Import')).toHaveFocus()
      key('ArrowLeft')
      expect(item('Folder')).toHaveFocus()
      key('ArrowRight')
      expect(item('Import')).toHaveFocus()
      key('Home')
      expect(item('Document')).toHaveFocus()
      key('End')
      expect(trigger()).toHaveFocus()
      // The keys of a column are the page's here.
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        cancelable: true,
      })
      trigger().dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
    })

    it('walks the other way round when the actions are to the right of the trigger', () => {
      renderWithTheme(view({ direction: 'right' }))
      open()
      trigger().focus()
      key('ArrowRight')
      expect(item('Document')).toHaveFocus()
      key('ArrowRight')
      expect(item('Folder')).toHaveFocus()
      key('ArrowLeft')
      expect(item('Document')).toHaveFocus()
    })

    it('reads right to left the other way, and so do its arrow keys', () => {
      renderWithTheme(<div dir="rtl">{view({ direction: 'left' })}</div>)
      open()
      trigger().focus()
      // The row is drawn from the trigger toward the inline start, which is on the right.
      key('ArrowRight')
      expect(item('Import')).toHaveFocus()
      key('ArrowLeft')
      expect(trigger()).toHaveFocus()
    })
  })

  describe('against the window', () => {
    const list = () => document.getElementById(trigger().getAttribute('aria-controls') as string)
    const resize = () => act(() => void window.dispatchEvent(new Event('resize')))

    it('keeps a row where it fits beside the trigger', () => {
      renderWithTheme(view({ direction: 'left', defaultOpen: true }))
      expect(list()).toHaveStyle({ flexDirection: 'row' })
      expect(list()).not.toHaveStyle({ maxWidth: '1px' })
    })

    it('makes a row that is wider than the room beside the trigger a column, above it where there is more room', () => {
      // 4 actions of 120 and their steps are wider than 200px.
      lay({ left: 200, top: 500, right: 240, bottom: 540, width: 40, height: 40 })
      renderWithTheme(view({ direction: 'left', defaultOpen: true }))
      expect(list()).toHaveStyle({
        flexDirection: 'column',
        bottom: `calc(100% + ${baseTheme.space[1]})`,
      })
    })

    it('makes it a column below the trigger where there is more room below', () => {
      // Room on neither side beside it - a window's right edge - and more below than above.
      lay({ left: 1300, top: 40, right: 1340, bottom: 80, width: 40, height: 40 })
      renderWithTheme(view({ direction: 'right', defaultOpen: true }))
      expect(list()).toHaveStyle({
        flexDirection: 'column',
        top: `calc(100% + ${baseTheme.space[1]})`,
      })
    })

    it('measures the side the actions go to right to left, where left is the end of the page', () => {
      // Room on the window's left only: a row to the page's start - the right in RTL - does not fit.
      lay({ left: 60, top: 400, right: 100, bottom: 440, width: 40, height: 40 })
      renderWithTheme(<div dir="rtl">{view({ direction: 'left', defaultOpen: true })}</div>)
      expect(list()).toHaveStyle({ flexDirection: 'row' })
      lay({ left: 1300, top: 400, right: 1340, bottom: 440, width: 40, height: 40 })
      resize()
      expect(list()).toHaveStyle({ flexDirection: 'column' })
    })

    it('goes back to the row when the window has room for it again', () => {
      lay({ left: 200, top: 500, right: 240, bottom: 540, width: 40, height: 40 })
      renderWithTheme(view({ direction: 'left', defaultOpen: true }))
      expect(list()).toHaveStyle({ flexDirection: 'column' })
      lay({ left: 700, top: 500, right: 740, bottom: 540, width: 40, height: 40 })
      resize()
      expect(list()).toHaveStyle({ flexDirection: 'row' })
    })

    it('counts an action as wide as its label, though it is cut now', () => {
      lay({ left: 200, top: 500, right: 240, bottom: 540, width: 40, height: 40 })
      renderWithTheme(view({ direction: 'left', defaultOpen: true }))
      // The label of one is 60 wider than it is drawn: the row needs more room than it was shown.
      for (const text of document.querySelectorAll('[data-fab-label]')) {
        Object.defineProperty(text, 'scrollWidth', { value: 160, configurable: true })
        Object.defineProperty(text, 'clientWidth', { value: 100, configurable: true })
      }
      lay({ left: 560, top: 500, right: 600, bottom: 540, width: 40, height: 40 })
      resize()
      // 4 x (120 + 60) and the steps do not fit in 544.
      expect(list()).toHaveStyle({ flexDirection: 'column' })
    })

    it('limits a column to the room it has, along the edge it lines up with', () => {
      lay({ left: 300, top: 400, right: 340, bottom: 440, width: 40, height: 40 })
      renderWithTheme(view({ defaultOpen: true }))
      // Along the end edge, toward the page's start: from the trigger's right edge to the window's left.
      expect(list()).toHaveStyle({ maxWidth: '324px' })
    })

    it('limits a column that lines up with the start edge by the room toward the end', () => {
      lay({ left: 300, top: 400, right: 340, bottom: 440, width: 40, height: 40 })
      renderWithTheme(view({ defaultOpen: true, align: 'start' }))
      // From the trigger's left edge to the window's right: 1600 - 300 - 16.
      expect(list()).toHaveStyle({ maxWidth: '1284px' })
    })

    it('mirrors those limits right to left', () => {
      lay({ left: 300, top: 400, right: 340, bottom: 440, width: 40, height: 40 })
      renderWithTheme(<div dir="rtl">{view({ defaultOpen: true })}</div>)
      // The end edge is the left: toward the page's start, the window's right.
      expect(list()).toHaveStyle({ maxWidth: '1284px' })
    })

    it('scrolls a column that is taller than the room it has, with room for the focus ring', () => {
      lay({ left: 500, top: 100, right: 540, bottom: 140, width: 40, height: 40 })
      vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(400)
      renderWithTheme(view({ defaultOpen: true }))
      // 100 above the trigger, less the margin and the step: 76.
      expect(list()).toHaveStyle({
        maxHeight: '76px',
        overflowY: 'auto',
        padding: baseTheme.space[0.5],
      })
    })

    it('leaves a column alone that fits', () => {
      vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(100)
      renderWithTheme(view({ defaultOpen: true }))
      expect(list()).not.toHaveStyle({ overflowY: 'auto' })
    })

    it('takes no negative room', () => {
      lay({ left: -30, top: -30, right: 10, bottom: 10, width: 40, height: 40 })
      vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(100)
      renderWithTheme(view({ defaultOpen: true }))
      expect(list()).toHaveStyle({ maxHeight: '0px', maxWidth: '0px' })
    })

    it('measures again when the actions change in number', () => {
      lay({ left: 500, top: 100, right: 540, bottom: 140, width: 40, height: 40 })
      vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(400)
      const { rerender } = renderWithTheme(view({ defaultOpen: true }))
      expect(list()).toHaveStyle({ maxHeight: '76px' })
      vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(50)
      rerender(
        <FabMenu aria-label="Create" defaultOpen>
          <FabMenuItem>Only</FabMenuItem>
        </FabMenu>
      )
      expect(list()).not.toHaveStyle({ overflowY: 'auto' })
    })

    it('is as it is asked to be again once it is closed, and measures anew when it opens', () => {
      lay({ left: 200, top: 500, right: 240, bottom: 540, width: 40, height: 40 })
      renderWithTheme(view({ direction: 'left' }))
      open()
      expect(list()).toHaveStyle({ flexDirection: 'column' })
      fireEvent.click(trigger())
      settle()
      lay({ left: 700, top: 500, right: 740, bottom: 540, width: 40, height: 40 })
      open()
      expect(list()).toHaveStyle({ flexDirection: 'row' })
    })

    it('stops listening for the window once it is closed', () => {
      const remove = vi.spyOn(window, 'removeEventListener')
      renderWithTheme(view({ defaultOpen: true }))
      fireEvent.click(trigger())
      expect(remove).toHaveBeenCalledWith('resize', expect.any(Function))
      expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
    })

    it('measures on a scroll of the page too', () => {
      renderWithTheme(view({ direction: 'left', defaultOpen: true }))
      expect(list()).toHaveStyle({ flexDirection: 'row' })
      lay({ left: 200, top: 500, right: 240, bottom: 540, width: 40, height: 40 })
      act(() => void window.dispatchEvent(new Event('scroll')))
      expect(list()).toHaveStyle({ flexDirection: 'column' })
    })
  })

  describe('look', () => {
    it('takes the color and the size of the trigger', () => {
      renderWithTheme(view({ color: 'error', size: 'lg' }))
      expect(trigger()).toHaveStyle({
        backgroundColor: baseTheme.palette.error.main,
        height: baseTheme.avatar.lg,
      })
    })

    it('takes spacing as theme space keys, and a class name and test id on its root', () => {
      renderWithTheme(view({ m: 3, className: 'mine' }))
      expect(screen.getByTestId('menu')).toHaveClass('mine')
      expect(screen.getByTestId('menu')).toHaveStyle({ margin: baseTheme.space[3] })
    })
  })

  describe('theme', () => {
    it('takes its defaults from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: {
          FabMenu: {
            defaultProps: { direction: 'down', align: 'start', color: 'error', size: 'sm' },
          },
        },
      })
      const { unmount } = render(view({ defaultOpen: true }), { wrapper: withTheme(theme) })
      const list = document.getElementById(trigger().getAttribute('aria-controls') as string)
      expect(list).toHaveStyle({ top: `calc(100% + ${baseTheme.space[1]})` })
      expect(trigger()).toHaveStyle({
        backgroundColor: baseTheme.palette.error.main,
        height: baseTheme.avatar.sm,
      })
      unmount()
      render(view({ defaultOpen: true, direction: 'up' }), { wrapper: withTheme(theme) })
      const own = document.getElementById(trigger().getAttribute('aria-controls') as string)
      expect(own).toHaveStyle({ bottom: `calc(100% + ${baseTheme.space[1]})` })
    })

    it('styles its root and its list from styleOverrides', () => {
      const style = { outlineColor: 'rgb(1, 2, 3)' }
      const theme = createTheme(baseTheme, {
        components: { FabMenu: { styleOverrides: { root: style, list: style } } },
      })
      render(view({ defaultOpen: true }), { wrapper: withTheme(theme) })
      expect(screen.getByTestId('menu')).toHaveStyle(style)
      expect(
        document.getElementById(trigger().getAttribute('aria-controls') as string)
      ).toHaveStyle(style)
    })
  })
})
