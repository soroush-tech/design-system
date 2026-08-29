import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@soroush.tech/design-system/utils/test/renderWithTheme'
import { Chip } from './Chip'

describe('Chip', () => {
  it('renders its content in a span by default', () => {
    renderWithTheme(<Chip>v1.3.3</Chip>)
    const chip = screen.getByText('v1.3.3')
    expect(chip.tagName).toBe('SPAN')
  })

  it('is pill-shaped with a light border', () => {
    renderWithTheme(<Chip>beta</Chip>)
    const chip = screen.getByText('beta')
    expect(chip).toHaveStyle({ borderRadius: '999px', display: 'inline-flex' })
  })

  it('forwards Typography props', () => {
    renderWithTheme(
      <Chip as="strong" variant="body2" data-testid="chip">
        strong chip
      </Chip>
    )
    expect(screen.getByTestId('chip').tagName).toBe('STRONG')
  })
})
