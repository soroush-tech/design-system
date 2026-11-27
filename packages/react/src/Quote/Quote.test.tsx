import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Quote } from './Quote'
import { lastColor, overrides } from '../utils/test/overrides'

describe('Quote', () => {
  it('renders children inside a 2px solid left border', () => {
    renderWithTheme(<Quote>quoted text</Quote>)
    const el = screen.getByText('quoted text')
    expect(el).toBeInTheDocument()
    expect(el).toHaveStyle({ borderLeftWidth: '2px', borderLeftStyle: 'solid' })
  })
})

describe('Quote style', () => {
  it('takes a list of entries, the later one winning, and drops false, null and undefined', () => {
    renderWithTheme(
      <Quote data-testid="root" style={[overrides.first, false, null, undefined, overrides.second]}>
        text
      </Quote>
    )
    expect(lastColor(screen.getByTestId('root'))).toBe('rgb(4, 5, 6)')
  })
})
