import { describe, it, expect, vi } from 'vitest'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Tabs, type TabsProps } from '../Tabs'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { ThemeProvider } from '../../theme'
import type { ReactNode } from 'react'
import { Menu } from '../../Menu'
import { MenuItem } from '../../MenuItem'
import { Tab } from './Tab'

const renderEditor = (props: Partial<TabsProps> = {}) =>
  renderWithTheme(
    <Tabs aria-label="Views" defaultValue="button" {...props}>
      <Tab value="canvas" label="Canvas" />
      <Tab value="button" label="Button" closeLabel="Close Button" />
      <Tab value="card" label="Card" closeLabel="Close Card" />
    </Tabs>
  )

const tab = (name: string) => screen.getByRole('tab', { name })
// A close button is the pointer's, hidden from assistive technology: found beside its tab, by the
// label it is closeLabel of ('Close Button' is the one of the tab 'Button').
const close = (name: string) =>
  tab(name.replace(/^Close /, '')).parentElement!.querySelector<HTMLButtonElement>(
    '[data-tab-close]'
  )!

describe('hints', () => {
  it('shows the close label as a tooltip, and a title given to the Tab on the tab alone', () => {
    vi.useFakeTimers()
    renderWithTheme(
      <Tabs aria-label="Files">
        <Tab value="a" label="Alpha" title="About Alpha" closeLabel="Close Alpha" />
      </Tabs>
    )
    expect(document.querySelectorAll('[title]')).toHaveLength(1)
    expect(tab('Alpha')).toHaveAttribute('title', 'About Alpha')
    fireEvent.mouseEnter(close('Close Alpha'))
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByRole('tooltip')).toHaveTextContent('Close Alpha')
    vi.useRealTimers()
  })
})

describe('icons', () => {
  /** The order of a tab's icon, by its test id, and its label's text, inside the tab. */
  const order = (name: string) =>
    [...tab(name).childNodes].map((node) =>
      node.nodeType === Node.TEXT_NODE
        ? node.textContent
        : (node as HTMLElement).querySelector('svg')?.getAttribute('data-testid')
    )
  const icon = (id: string) => <svg data-testid={id} />

  it('places `icon` where `iconPosition` says, above the label by default', () => {
    renderWithTheme(
      <Tabs aria-label="Icons" defaultValue="top">
        <Tab value="top" label="Top" icon={icon('a')} />
        <Tab value="start" label="Start" icon={icon('b')} iconPosition="start" />
        <Tab value="end" label="End" icon={icon('c')} iconPosition="end" />
        <Tab value="bottom" label="Bottom" icon={icon('d')} iconPosition="bottom" />
      </Tabs>
    )
    expect(order('Top')).toEqual(['a', 'Top'])
    expect(order('Start')).toEqual(['b', 'Start'])
    expect(order('End')).toEqual(['End', 'c'])
    expect(order('Bottom')).toEqual(['Bottom', 'd'])
    // Beside the label, the icon shares its line; above or below, it takes a line of its own.
    expect(tab('Start')).toHaveStyle({ gridAutoFlow: 'column' })
    expect(tab('Top')).toHaveStyle({ gridAutoFlow: 'row' })
    expect(screen.getByTestId('a').parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('sizes nothing - the icon keeps the size it was given', () => {
    renderWithTheme(
      <Tabs aria-label="Icons" size="sm">
        <Tab label="Files" icon={<svg data-testid="i" width="40" height="40" />} />
      </Tabs>
    )
    expect(screen.getByTestId('i')).toHaveAttribute('width', '40')
  })

  it('puts every label on the row line - the foot of the tab, or its head with the icon below', () => {
    renderWithTheme(
      <Tabs aria-label="Icons">
        <Tab label="Plain" />
        <Tab label="Top" icon={icon('a')} />
        <Tab label="Bottom" icon={icon('b')} iconPosition="bottom" />
      </Tabs>
    )
    expect(tab('Plain')).toHaveStyle({ display: 'grid', alignContent: 'end' })
    expect(tab('Top')).toHaveStyle({ alignContent: 'end' })
    expect(tab('Bottom')).toHaveStyle({ alignContent: 'start' })
  })
})

describe('closable tabs', () => {
  it('gives a closable tab a close button of its own, outside the tab, out of the tab order', () => {
    renderEditor()
    const button = close('Close Button')
    expect(tab('Button')).not.toContainElement(button)
    expect(button).toHaveAttribute('tabindex', '-1')
    // Its label is a tooltip's, never a native title.
    expect(button).not.toHaveAttribute('title')
    expect(screen.queryByRole('button', { name: /Close Canvas/, hidden: true })).toBeNull()
  })

  it("keeps the close button the pointer's, the tab announcing Delete - a tablist owns tabs alone", () => {
    renderEditor()
    expect(close('Close Button')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('button', { name: 'Close Button' })).toBeNull()
    expect(tab('Button')).toHaveAttribute('aria-keyshortcuts', 'Delete')
    expect(tab('Canvas')).not.toHaveAttribute('aria-keyshortcuts')
  })

  it('names the close button for assistive technology with shouldAnnounceClose - beside the tab, out of the tab order', () => {
    const onTabClose = vi.fn()
    renderEditor({ shouldAnnounceClose: true, onTabClose })
    const button = screen.getByRole('button', { name: 'Close Button' })
    expect(button).toBe(close('Close Button'))
    expect(button).not.toHaveAttribute('aria-hidden')
    expect(button).toHaveAttribute('tabindex', '-1')
    // Not inside the tab: nothing interactive is nested in it.
    expect(tab('Button')).not.toContainElement(button)
    expect(button.parentElement).toHaveAttribute('role', 'presentation')
    // A tab with no closeLabel has none, and the others are named too.
    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Close Card' })).toBeInTheDocument()
    fireEvent.click(button)
    expect(onTabClose).toHaveBeenCalledWith('button')
    // Delete still closes the focused tab.
    expect(tab('Button')).toHaveAttribute('aria-keyshortcuts', 'Delete')
  })

  it('shows the close button on the selected tab, keeping its room on the others', () => {
    renderEditor()
    expect(close('Close Button')).toHaveStyle({ visibility: 'visible' })
    expect(close('Close Card')).toHaveStyle({ visibility: 'hidden' })
  })

  it('closes from the close button, without selecting', () => {
    const onTabClose = vi.fn()
    const onChange = vi.fn()
    renderEditor({ onTabClose, onChange })
    fireEvent.click(close('Close Card'))
    expect(onTabClose).toHaveBeenCalledWith('card')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('closes on a middle click, which starts no autoscroll', () => {
    const onTabClose = vi.fn()
    renderEditor({ onTabClose })
    expect(fireEvent.mouseDown(tab('Card'), { button: 1 })).toBe(false)
    fireEvent(tab('Card'), new MouseEvent('auxclick', { bubbles: true, button: 1 }))
    expect(onTabClose).toHaveBeenCalledWith('card')
  })

  it('closes the focused tab with Delete', () => {
    const onTabClose = vi.fn()
    renderEditor({ onTabClose })
    expect(fireEvent.keyDown(tab('Button'), { key: 'Delete' })).toBe(false)
    expect(onTabClose).toHaveBeenCalledWith('button')
  })

  it('never closes a tab without a closeLabel', () => {
    const onTabClose = vi.fn()
    renderEditor({ onTabClose })
    fireEvent.mouseDown(tab('Canvas'), { button: 1 })
    fireEvent(tab('Canvas'), new MouseEvent('auxclick', { bubbles: true, button: 1 }))
    expect(fireEvent.keyDown(tab('Canvas'), { key: 'Delete' })).toBe(true)
    expect(onTabClose).not.toHaveBeenCalled()
  })

  it('ignores other buttons and keys on a closable tab', () => {
    const onTabClose = vi.fn()
    renderEditor({ onTabClose })
    expect(fireEvent.mouseDown(tab('Card'), { button: 0 })).toBe(true)
    fireEvent(tab('Card'), new MouseEvent('auxclick', { bubbles: true, button: 2 }))
    fireEvent.keyDown(tab('Card'), { key: 'Backspace' })
    expect(onTabClose).not.toHaveBeenCalled()
  })

  it('closes nothing, quietly, without onTabClose', () => {
    renderEditor()
    expect(() => fireEvent.click(close('Close Card'))).not.toThrow()
  })
})

describe('secondaryAction', () => {
  it('renders a control of its own after the label, before the close button', () => {
    renderWithTheme(
      <Tabs defaultValue="light">
        <Tab
          value="light"
          label="Light"
          closeLabel="Close Light"
          secondaryAction={<button type="button">Theme options</button>}
        />
      </Tabs>
    )
    const action = screen.getByRole('button', { name: 'Theme options' })
    expect(tab('Light')).not.toContainElement(action)
    expect(action.parentElement!.previousElementSibling).toBe(tab('Light'))
    expect(action.parentElement!.nextElementSibling).toBe(close('Close Light'))
  })

  it('keeps its own keys - a menu there moves through its rows, not the tabs', () => {
    renderWithTheme(
      <Tabs defaultValue="light">
        <Tab
          value="light"
          label="Light"
          secondaryAction={
            <Menu trigger={<button type="button">Theme options</button>}>
              <MenuItem>Rename</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
          }
        />
        <Tab value="dark" label="Dark" />
      </Tabs>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Theme options' }))
    const rename = screen.getByRole('menuitem', { name: 'Rename' })
    rename.focus()
    for (const key of ['ArrowRight', 'ArrowDown', 'End', 'Home']) fireEvent.keyDown(rename, { key })
    expect(tab('Dark')).not.toHaveFocus()
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus()
  })
})

const withTheme = (theme: Theme) =>
  function ThemedWrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

describe('Tab theme defaults', () => {
  it('wraps its label when theme.components.Tab.defaultProps says so', () => {
    const theme = createTheme(baseTheme, {
      components: { Tab: { defaultProps: { isWrapped: true } } },
    })
    renderWithTheme(
      <Tabs aria-label="Views" defaultValue="canvas">
        <Tab value="canvas" label="Canvas" />
      </Tabs>,
      { wrapper: withTheme(theme) }
    )
    expect(tab('Canvas')).toHaveStyle({ whiteSpace: 'normal' })
  })
})

describe('Tab ground', () => {
  it('takes its own bg while unselected, and the Tabs selectedBg once selected', () => {
    renderWithTheme(
      <Tabs aria-label="Views" defaultValue="a" selectedBg="paper">
        <Tab value="a" label="A" bg="default" />
        <Tab value="b" label="B" bg="default" />
      </Tabs>
    )
    expect(tab('A').parentElement).toHaveStyle({ backgroundColor: baseTheme.background.paper })
    expect(tab('B').parentElement).toHaveStyle({ backgroundColor: baseTheme.background.default })
  })

  it('takes bg and borderRadius from the theme', () => {
    const theme = createTheme(baseTheme, {
      components: { Tab: { defaultProps: { bg: 'default', borderRadius: 'md' } } },
    })
    renderWithTheme(
      <Tabs aria-label="Views" defaultValue="a">
        <Tab value="a" label="A" />
        <Tab value="b" label="B" />
      </Tabs>,
      { wrapper: withTheme(theme) }
    )
    expect(tab('B').parentElement).toHaveStyle({
      backgroundColor: baseTheme.background.default,
      borderRadius: baseTheme.radii.md,
    })
  })
})

// As a table cell's: a tab takes its row's look, and its own value wins.
describe("a tab's own look", () => {
  const sizes = baseTheme.sizes
  const space = baseTheme.space as Record<string | number, string>

  it("takes color, textColor, size and selectedBg of its own over its row's", () => {
    renderWithTheme(
      <Tabs aria-label="Views" defaultValue="a" color="primary" textColor="primary" size="md">
        <Tab value="a" label="A" color="error" size="sm" selectedBg="default" />
        <Tab value="b" label="B" textColor="secondary" />
        <Tab value="c" label="C" />
      </Tabs>
    )
    expect(tab('A')).toHaveStyle({
      color: baseTheme.palette.error.main,
      paddingLeft: space[sizes.sm.paddingLeft],
    })
    expect(tab('A').parentElement).toHaveStyle({ backgroundColor: baseTheme.background.default })
    expect(tab('B')).toHaveStyle({ color: baseTheme.text.secondary })
    expect(tab('C')).toHaveStyle({
      color: baseTheme.text.primary,
      paddingTop: space[sizes.md.paddingTop],
    })
  })

  it("lets a value set on the row beat the theme's for every tab, and that beat the row's own default", () => {
    const theme = createTheme(baseTheme, {
      components: { Tab: { defaultProps: { color: 'success', size: 'sm' } } },
    })
    renderWithTheme(
      <>
        <Tabs aria-label="Set" defaultValue="a" color="error">
          <Tab value="a" label="Set on the row" />
        </Tabs>
        <Tabs aria-label="Unset" defaultValue="a">
          <Tab value="a" label="From the theme" />
        </Tabs>
      </>,
      { wrapper: withTheme(theme) }
    )
    expect(tab('Set on the row')).toHaveStyle({ color: baseTheme.palette.error.main })
    expect(tab('From the theme')).toHaveStyle({
      color: baseTheme.palette.success.main,
      paddingTop: space[sizes.sm.paddingTop],
    })
  })

  it("draws the row's indicator in the selected tab's color", () => {
    renderWithTheme(
      <Tabs aria-label="Views" defaultValue="a">
        <Tab value="a" label="A" color="warning" />
        <Tab value="b" label="B" />
      </Tabs>
    )
    const indicator = screen.getByRole('tablist').querySelector('[aria-hidden]')
    expect(indicator).toHaveStyle({ backgroundColor: baseTheme.palette.warning.main })
    fireEvent.click(tab('B'))
    expect(indicator).toHaveStyle({ backgroundColor: baseTheme.palette.primary.main })
  })

  it("keeps a smaller tab's label on its row's line - the row's tallest top and bottom padding, its own sides", () => {
    renderWithTheme(
      <Tabs aria-label="Views" defaultValue="a">
        <Tab value="a" label="A" />
        <Tab value="b" label="B" size="sm" />
      </Tabs>
    )
    expect(tab('B')).toHaveStyle({
      paddingTop: space[sizes.md.paddingTop],
      paddingBottom: space[sizes.md.paddingBottom],
      paddingLeft: space[sizes.sm.paddingLeft],
      fontSize: `${baseTheme.fontSizes[sizes.sm.fontSize]}px`,
    })
  })

  it('stays compact when every tab is small, and down a column each tab keeps its own', () => {
    const theme = createTheme(baseTheme, { components: { Tab: { defaultProps: { size: 'sm' } } } })
    renderWithTheme(
      <>
        <Tabs aria-label="Row" defaultValue="a">
          <Tab value="a" label="Small row" />
        </Tabs>
        <Tabs aria-label="Column" orientation="vertical" defaultValue="a">
          <Tab value="a" label="Tall" size="lg" />
          <Tab value="b" label="Short" />
        </Tabs>
        <Tabs aria-label="Empty" />
      </>,
      { wrapper: withTheme(theme) }
    )
    expect(tab('Small row')).toHaveStyle({ paddingTop: space[sizes.sm.paddingTop] })
    expect(tab('Short')).toHaveStyle({ paddingTop: space[sizes.sm.paddingTop] })
  })

  it("runs an enclosed row's line under every other tab in the selected tab's color", () => {
    renderWithTheme(
      <Tabs aria-label="Views" variant="enclosed" defaultValue="a">
        <Tab value="a" label="A" color="warning" />
        <Tab value="b" label="B" />
      </Tabs>
    )
    const shadow = (name: string) => getComputedStyle(tab(name).parentElement!).boxShadow
    expect(shadow('B')).toContain(baseTheme.palette.warning.main.toLowerCase())
    fireEvent.click(tab('B'))
    expect(shadow('A')).toContain(baseTheme.palette.primary.main.toLowerCase())
  })
})
