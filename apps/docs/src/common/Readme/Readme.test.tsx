import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { Readme } from './Readme'

describe('Readme', () => {
  it('renders markdown with links rewritten to site routes', () => {
    renderWithTheme(<Readme source="See [Button](../Button/README.md) for actions." />)
    expect(screen.getByRole('link', { name: 'Button' })).toHaveAttribute(
      'href',
      '/design-system/components/button/'
    )
  })

  it('strips the leading H1 when stripChrome is set', () => {
    renderWithTheme(<Readme source={'# Chrome Title\n\nBody text.'} stripChrome />)
    expect(screen.queryByRole('heading', { name: 'Chrome Title' })).not.toBeInTheDocument()
    expect(screen.getByText('Body text.')).toBeInTheDocument()
  })

  it('keeps the H1 by default', () => {
    renderWithTheme(<Readme source={'# Kept Title\n\nBody.'} />)
    expect(screen.getByRole('heading', { name: 'Kept Title' })).toBeInTheDocument()
  })
})
