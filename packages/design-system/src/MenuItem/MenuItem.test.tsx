import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { MenuList } from '../Menu/MenuList'
import { ThemeProvider } from '../theme'
import type { ReactNode } from 'react'
import { MenuItem } from './MenuItem'

describe('MenuItem', () => {
  it('renders a semantic option with its label and value', () => {
    renderWithTheme(<MenuItem value="a">Alpha</MenuItem>)
    const option = screen.getByRole('option', { name: 'Alpha' })
    expect(option.tagName).toBe('LI')
    expect(option).toHaveAttribute('data-value', 'a')
    expect(option).toHaveAttribute('aria-selected', 'false')
  })

  it('fires onSelect with its value when clicked', () => {
    const onSelect = vi.fn()
    renderWithTheme(
      <MenuItem value={7} onSelect={onSelect}>
        Seven
      </MenuItem>
    )
    fireEvent.click(screen.getByRole('option'))
    expect(onSelect).toHaveBeenCalledWith(7)
  })

  it('does not fire onSelect for an option without a value', () => {
    const onSelect = vi.fn()
    renderWithTheme(<MenuItem onSelect={onSelect}>Unset</MenuItem>)
    fireEvent.click(screen.getByRole('option'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('does not fire onSelect when disabled', () => {
    const onSelect = vi.fn()
    renderWithTheme(
      <MenuItem value={7} disabled onSelect={onSelect}>
        Seven
      </MenuItem>
    )
    const option = screen.getByRole('option')
    expect(option).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(option)
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('prevents default on mousedown so the trigger keeps focus', () => {
    renderWithTheme(<MenuItem value="a">Alpha</MenuItem>)
    const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
    fireEvent(screen.getByRole('option'), event)
    expect(event.defaultPrevented).toBe(true)
  })

  it('shows a checkmark only when selected in multiple mode', () => {
    const { rerender } = renderWithTheme(
      <MenuItem value="a" multiple selected>
        Alpha
      </MenuItem>
    )
    expect(document.querySelector('svg')).toBeInTheDocument()

    rerender(
      <MenuItem value="a" multiple>
        Alpha
      </MenuItem>
    )
    expect(document.querySelector('svg')).not.toBeInTheDocument()
  })

  it('defaults the row text to the accent color main when textColor is unset', () => {
    renderWithTheme(
      <MenuItem value="a" color="error">
        Alpha
      </MenuItem>
    )
    expect(screen.getByRole('option')).toHaveStyle({ color: baseTheme.palette.error.main })
  })

  it('applies its own textColor to the row, overriding the accent default', () => {
    renderWithTheme(
      <MenuItem value="a" textColor="secondary">
        Alpha
      </MenuItem>
    )
    expect(screen.getByRole('option')).toHaveStyle({ color: baseTheme.text.secondary })
  })

  it('applies the accent color when selected', () => {
    renderWithTheme(
      <MenuItem value="a" selected>
        Alpha
      </MenuItem>
    )
    expect(screen.getByRole('option')).toHaveStyle({ color: baseTheme.palette.primary.main })
  })

  it('renders as a custom element via `as`', () => {
    renderWithTheme(
      <MenuItem value="a" as="div">
        Alpha
      </MenuItem>
    )
    const option = screen.getByRole('option', { name: 'Alpha' })
    expect(option.tagName).toBe('DIV')
    expect(option).toHaveAttribute('tabindex', '-1')
  })

  it('applies compact vertical padding when dense', () => {
    const { rerender } = renderWithTheme(
      <MenuItem value="a" size="md">
        Alpha
      </MenuItem>
    )
    expect(screen.getByRole('option')).toHaveStyle({ paddingTop: baseTheme.space[1] })
    rerender(
      <MenuItem value="a" size="md" dense>
        Alpha
      </MenuItem>
    )
    expect(screen.getByRole('option')).toHaveStyle({ paddingTop: baseTheme.space[0.5] })
  })

  it('removes horizontal padding when disableGutters', () => {
    renderWithTheme(
      <MenuItem value="a" disableGutters>
        Alpha
      </MenuItem>
    )
    expect(screen.getByRole('option')).toHaveStyle({ paddingLeft: '0px', paddingRight: '0px' })
  })

  it('adds a bottom border when divider', () => {
    renderWithTheme(
      <MenuItem value="a" divider>
        Alpha
      </MenuItem>
    )
    expect(screen.getByRole('option')).toHaveStyle({
      borderBottomStyle: 'solid',
      borderBottomColor: baseTheme.border.light,
    })
  })

  it('focuses the row on mount when autoFocus is set', () => {
    renderWithTheme(
      <MenuItem value="a" autoFocus>
        Alpha
      </MenuItem>
    )
    expect(screen.getByRole('option')).toHaveFocus()
  })

  it('applies focusVisibleClassName on keyboard focus and clears it on blur', () => {
    renderWithTheme(
      <MenuItem value="a" focusVisibleClassName="fv">
        Alpha
      </MenuItem>
    )
    const option = screen.getByRole('option')
    vi.spyOn(option, 'matches').mockReturnValue(true)
    fireEvent.focus(option)
    expect(option).toHaveClass('fv')
    fireEvent.blur(option)
    expect(option).not.toHaveClass('fv')
  })

  it('does not apply focusVisibleClassName for pointer focus', () => {
    renderWithTheme(
      <MenuItem value="a" focusVisibleClassName="fv">
        Alpha
      </MenuItem>
    )
    const option = screen.getByRole('option')
    vi.spyOn(option, 'matches').mockReturnValue(false)
    fireEvent.focus(option)
    expect(option).not.toHaveClass('fv')
  })

  it('treats an unsupported :focus-visible match as non-keyboard focus', () => {
    renderWithTheme(
      <MenuItem value="a" focusVisibleClassName="fv">
        Alpha
      </MenuItem>
    )
    const option = screen.getByRole('option')
    vi.spyOn(option, 'matches').mockImplementation(() => {
      throw new Error('unsupported selector')
    })
    fireEvent.focus(option)
    expect(option).not.toHaveClass('fv')
  })
})

describe('MenuItem in a MenuList', () => {
  const inMenu = (ui: React.ReactNode, onSelect?: (value: string | number) => void) =>
    renderWithTheme(
      <MenuList aria-label="Menu" onSelect={onSelect}>
        {ui}
      </MenuList>
    )

  it('puts a secondaryAction beside the row in its entry, out of the arrow keys', () => {
    inMenu(
      <>
        <MenuItem value="a" secondaryAction={<button type="button">Close Alpha</button>}>
          Alpha
        </MenuItem>
        <MenuItem
          value="b"
          submenu={null}
          secondaryAction={<button type="button">Pin Beta</button>}
        >
          Beta
        </MenuItem>
      </>
    )
    for (const [name, action] of [
      ['Alpha', 'Close Alpha'],
      ['Beta', 'Pin Beta'],
    ]) {
      const row = screen.getByRole('menuitem', { name })
      // The pointer's, hidden from assistive technology - a menu owns rows alone.
      const control = screen.getByRole('button', { name: action, hidden: true })
      expect(control.closest('[aria-hidden="true"]')).not.toBeNull()
      // Siblings in a role="none" entry - a row can't hold a button.
      expect(row.parentElement).toHaveAttribute('role', 'none')
      // The entry is the list item; the row in it a div - an li can't hold an li.
      expect(row.parentElement!.tagName).toBe('LI')
      expect(row.tagName).toBe('DIV')
      expect(control.closest('[role="none"]')).toBe(row.parentElement)
      expect(row).not.toContainElement(control)
    }
    const alpha = screen.getByRole('menuitem', { name: 'Alpha' })
    alpha.focus()
    fireEvent.keyDown(alpha, { key: 'ArrowDown' })
    expect(screen.getByRole('menuitem', { name: 'Beta' })).toHaveFocus()
  })

  it('renders a menuitem by default, with no aria-checked', () => {
    inMenu(<MenuItem value="a">Alpha</MenuItem>)
    const row = screen.getByRole('menuitem', { name: 'Alpha' })
    expect(row).toHaveAttribute('tabindex', '-1')
    expect(row).not.toHaveAttribute('aria-checked')
    expect(row).not.toHaveAttribute('aria-selected')
  })

  it('sets aria-checked from selected on radio and checkbox rows, and ticks the checked one', () => {
    inMenu(
      <>
        <MenuItem role="menuitemradio" selected>
          main
        </MenuItem>
        <MenuItem role="menuitemcheckbox">Wrap</MenuItem>
      </>
    )
    const checked = screen.getByRole('menuitemradio', { name: 'main' })
    expect(checked).toHaveAttribute('aria-checked', 'true')
    expect(checked.querySelector('svg')).toBeInTheDocument()
    const unchecked = screen.getByRole('menuitemcheckbox', { name: 'Wrap' })
    expect(unchecked).toHaveAttribute('aria-checked', 'false')
    expect(unchecked.querySelector('svg')).not.toBeInTheDocument()
  })

  it('keeps a leading column on every row, holding the start icon when given', () => {
    inMenu(
      <>
        <MenuItem startIcon={<span data-testid="folder" />}>Open</MenuItem>
        <MenuItem>Save</MenuItem>
      </>
    )
    expect(screen.getByTestId('folder')).toBeInTheDocument()
    const save = screen.getByRole('menuitem', { name: 'Save' })
    expect(save.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    expect(save.firstElementChild).toBeEmptyDOMElement()
  })

  it('shows a shortcut out of the accessible name, as aria-keyshortcuts when a string', () => {
    inMenu(
      <>
        <MenuItem shortcut="Control+S">Save</MenuItem>
        <MenuItem shortcut={<kbd>⌘O</kbd>}>Open</MenuItem>
      </>
    )
    expect(screen.getByRole('menuitem', { name: 'Save' })).toHaveAttribute(
      'aria-keyshortcuts',
      'Control+S'
    )
    expect(screen.getByText('Control+S')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('menuitem', { name: 'Open' })).not.toHaveAttribute('aria-keyshortcuts')
  })

  it('gives a note as the tooltip and accessible description', () => {
    inMenu(
      <MenuItem disabled note="Coming later">
        Checkout
      </MenuItem>
    )
    const row = screen.getByRole('menuitem', { name: 'Checkout' })
    expect(row).toHaveAttribute('title', 'Coming later')
    expect(row).toHaveAccessibleDescription('Coming later')
    expect(row).toHaveAttribute('aria-disabled', 'true')
  })

  it('is chosen by a click, Enter, or Space on release', () => {
    const onClick = vi.fn()
    const onSelect = vi.fn()
    inMenu(
      <MenuItem value="save" onClick={onClick}>
        Save
      </MenuItem>,
      onSelect
    )
    const row = screen.getByRole('menuitem', { name: 'Save' })
    fireEvent.click(row)
    expect(fireEvent.keyDown(row, { key: 'Enter' })).toBe(false)
    expect(fireEvent.keyDown(row, { key: ' ' })).toBe(false)
    expect(onClick).toHaveBeenCalledTimes(2)
    fireEvent.keyUp(row, { key: ' ' })
    expect(onClick).toHaveBeenCalledTimes(3)
    expect(onSelect).toHaveBeenCalledTimes(3)
    expect(onSelect).toHaveBeenCalledWith('save')
  })

  it('ignores other keys', () => {
    const onClick = vi.fn()
    inMenu(<MenuItem onClick={onClick}>Save</MenuItem>)
    const row = screen.getByRole('menuitem', { name: 'Save' })
    fireEvent.keyDown(row, { key: 'a' })
    fireEvent.keyUp(row, { key: 'Enter' })
    expect(onClick).not.toHaveBeenCalled()
  })

  it('is not chosen while disabled', () => {
    const onClick = vi.fn()
    inMenu(
      <MenuItem disabled onClick={onClick}>
        Save
      </MenuItem>
    )
    const row = screen.getByRole('menuitem', { name: 'Save' })
    fireEvent.click(row)
    fireEvent.keyDown(row, { key: 'Enter' })
    expect(onClick).not.toHaveBeenCalled()
  })

  it('takes focus as the pointer moves over it, unless disabled', () => {
    inMenu(
      <>
        <MenuItem>Open</MenuItem>
        <MenuItem disabled>Close</MenuItem>
      </>
    )
    const open = screen.getByRole('menuitem', { name: 'Open' })
    fireEvent.pointerMove(open)
    expect(open).toHaveFocus()
    fireEvent.pointerMove(open)
    expect(open).toHaveFocus()
    fireEvent.pointerMove(screen.getByRole('menuitem', { name: 'Close' }))
    expect(open).toHaveFocus()
  })

  it('lets a press through so the row can take focus', () => {
    inMenu(<MenuItem>Open</MenuItem>)
    const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
    fireEvent(screen.getByRole('menuitem'), event)
    expect(event.defaultPrevented).toBe(false)
  })

  it('colors the row with its text color, or the accent, and greys it out when disabled', () => {
    inMenu(
      <>
        <MenuItem color="error">Accent</MenuItem>
        <MenuItem textColor="secondary">Text</MenuItem>
        <MenuItem disabled>Off</MenuItem>
      </>
    )
    expect(screen.getByRole('menuitem', { name: 'Accent' })).toHaveStyle({
      color: baseTheme.palette.error.main,
    })
    expect(screen.getByRole('menuitem', { name: 'Text' })).toHaveStyle({
      color: baseTheme.text.secondary,
    })
    expect(screen.getByRole('menuitem', { name: 'Off' })).toHaveStyle({
      color: baseTheme.text.disabled,
    })
  })
})

const withTheme = (theme: Theme) =>
  function ThemedWrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

describe('MenuItem theme defaults', () => {
  it("takes its look from theme.components.MenuItem.defaultProps, under its list's", () => {
    const theme = createTheme(baseTheme, {
      components: {
        MenuItem: {
          defaultProps: { color: 'error', textColor: 'secondary', size: 'sm', dense: true },
        },
      },
    })
    renderWithTheme(
      <MenuList aria-label="Edit">
        <MenuItem>Cut</MenuItem>
      </MenuList>,
      { wrapper: withTheme(theme) }
    )
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveStyle({
      color: baseTheme.text.secondary,
      paddingTop: baseTheme.space[0.5],
    })
  })
})
