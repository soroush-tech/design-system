import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { MdxReadme } from './MdxReadme'

describe('MdxReadme', () => {
  it('renders the full README by default', () => {
    renderWithTheme(<MdxReadme of="Quote" />)
    expect(screen.getByRole('heading', { name: 'Quote' })).toBeInTheDocument()
  })

  it('renders only the intro with its chrome stripped', () => {
    renderWithTheme(<MdxReadme of="Button" part="intro" />)
    expect(screen.queryByRole('heading', { name: 'Button' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /Button-specific props/ })).not.toBeInTheDocument()
  })

  it('renders the api part', () => {
    renderWithTheme(<MdxReadme of="Button" part="api" />)
    expect(screen.getByRole('heading', { name: /Button-specific props/ })).toBeInTheDocument()
  })

  it('throws on an unknown component name', () => {
    expect(() => renderWithTheme(<MdxReadme of="Nope" />)).toThrow('Unknown component "Nope"')
  })
})
