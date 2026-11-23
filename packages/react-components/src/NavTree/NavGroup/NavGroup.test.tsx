import { describe, it, expect } from 'vitest'
import { fireEvent, screen, within } from '@testing-library/react'
import { renderWithTheme } from '@soroush.tech/design-system/utils/test/renderWithTheme'
import { NavLink } from '../NavLink'
import { NavGroup } from './NavGroup'

describe('NavGroup', () => {
  it('is a section named by its heading, over a list of its links', () => {
    renderWithTheme(
      <NavGroup label="Components">
        <NavLink href="/a/">A</NavLink>
        <NavLink href="/b/">B</NavLink>
      </NavGroup>
    )
    const group = screen.getByRole('region', { name: 'Components' })
    expect(within(group).getByRole('heading', { level: 2, name: 'Components' })).toBeInTheDocument()
    expect(
      within(group)
        .getAllByRole('listitem')
        .map((item) => item.textContent)
    ).toEqual(['A', 'B'])
  })

  it('puts a child that is not an element in a list item as well', () => {
    renderWithTheme(
      <NavGroup label="Notes">
        plain text
        <NavLink href="/a/">A</NavLink>
      </NavGroup>
    )
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'plain text',
      'A',
    ])
  })

  it('has an empty list without children', () => {
    renderWithTheme(<NavGroup label="Empty" />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('is a details when it folds, its name the summary', () => {
    const { container } = renderWithTheme(
      <NavGroup label="Folding" isCollapsible>
        <NavLink href="/a/">A</NavLink>
      </NavGroup>
    )
    const details = container.querySelector('details')!
    expect(details).not.toHaveAttribute('open')
    expect(details.querySelector('summary')).toHaveTextContent('Folding')
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('is open while isOpen, and folds again when it is not', () => {
    const { container, rerender } = renderWithTheme(
      <NavGroup label="Folding" isCollapsible isOpen>
        <NavLink href="/a/">A</NavLink>
      </NavGroup>
    )
    expect(container.querySelector('details')).toHaveAttribute('open')
    rerender(
      <NavGroup label="Folding" isCollapsible isOpen={false}>
        <NavLink href="/a/">A</NavLink>
      </NavGroup>
    )
    expect(container.querySelector('details')).not.toHaveAttribute('open')
  })

  it('lets the reader fold and open it, as a details does', () => {
    const { container } = renderWithTheme(
      <NavGroup label="Folding" isCollapsible>
        <NavLink href="/a/">A</NavLink>
      </NavGroup>
    )
    const details = container.querySelector('details')!
    // A browser opens a details on a click of its summary; jsdom does not, so the toggle is made.
    details.open = true
    fireEvent(details, new Event('toggle'))
    expect(details).toHaveAttribute('open')
  })

  it('passes its other attributes to its root', () => {
    renderWithTheme(
      <NavGroup label="Plain" data-testid="group">
        <NavLink href="/a/">A</NavLink>
      </NavGroup>
    )
    expect(screen.getByTestId('group').tagName).toBe('SECTION')
  })
})
