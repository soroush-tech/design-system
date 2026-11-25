import { describe, it, expect, vi } from 'vitest'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { MenuList } from '../MenuList'
import { MenuItems, type MenuItemData } from './MenuItems'

const items: MenuItemData[] = [
  { value: 'new', label: 'New branch...', shortcut: 'Control+B' },
  { value: 'checkout', label: 'Checkout...', disabled: true, note: 'Coming later' },
  { type: 'divider' },
  {
    label: 'Local branches',
    submenu: [
      { value: 'main', label: 'main', role: 'menuitemradio', selected: true },
      { value: 'feat/menu', label: 'feat/menu', role: 'menuitemradio' },
    ],
  },
  { label: 'Remote branches', submenu: [], emptyLabel: 'Coming soon' },
  { label: 'Tags', submenu: null, emptyLabel: 'None yet' },
]

const row = (name: string) => screen.getByRole('menuitem', { name })

describe('MenuItems', () => {
  it('renders rows and dividers from data, as the same rows JSX would', () => {
    renderWithTheme(
      <MenuList aria-label="Branch">
        <MenuItems items={items} />
      </MenuList>
    )
    expect(row('New branch...')).toHaveAttribute('aria-keyshortcuts', 'Control+B')
    expect(row('Checkout...')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByRole('separator')).toBeInTheDocument()
    expect(row('Local branches')).toHaveAttribute('aria-haspopup', 'menu')
  })

  it('renders a submenu from data, and reports its choice', () => {
    const onSelect = vi.fn()
    renderWithTheme(
      <MenuList aria-label="Branch" onSelect={onSelect}>
        <MenuItems items={items} />
      </MenuList>
    )
    act(() => {
      row('Local branches').focus()
    })
    const main = screen.getByRole('menuitemradio', { name: 'main' })
    expect(main).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'feat/menu' }))
    expect(onSelect).toHaveBeenCalledWith('feat/menu')
  })

  it.each([
    ['Remote branches', 'Coming soon'],
    ['Tags', 'None yet'],
  ])('shows the empty label of an empty data submenu (%s)', (name, emptyLabel) => {
    renderWithTheme(
      <MenuList aria-label="Branch">
        <MenuItems items={items} />
      </MenuList>
    )
    act(() => {
      row(name).focus()
    })
    expect(row(emptyLabel)).toHaveAttribute('aria-disabled', 'true')
  })

  it("fires a data row's onClick", () => {
    const onClick = vi.fn()
    renderWithTheme(
      <MenuList>
        <MenuItems items={[{ label: 'Run', onClick }]} />
      </MenuList>
    )
    fireEvent.click(row('Run'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
