import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { MenuDivider } from './MenuDivider'

describe('MenuDivider', () => {
  it('renders a separator list item with a top border', () => {
    renderWithTheme(
      <ul>
        <MenuDivider />
      </ul>
    )
    const separator = screen.getByRole('separator')
    expect(separator.tagName).toBe('LI')
    expect(separator).toHaveStyle({ borderTopStyle: 'solid' })
  })

  it('forwards className and data-testid', () => {
    renderWithTheme(
      <ul>
        <MenuDivider className="custom" data-testid="divider" />
      </ul>
    )
    expect(screen.getByTestId('divider')).toHaveClass('custom')
  })
})
