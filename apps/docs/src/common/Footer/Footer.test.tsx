import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import { PACKAGES } from 'src/common/packages'
import { dark } from 'src/theme/themes'
import { Footer } from './Footer'

const renderFooter = () =>
  render(
    <ThemeProvider theme={dark}>
      <Footer />
    </ThemeProvider>
  )

describe('Footer', () => {
  it('shows the name and what the work is', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent('SOROUSH.TECH')
    expect(footer).toHaveTextContent('Built for speed, scaled for eternity.')
    expect(footer.querySelector('img')).toHaveAttribute('alt', '')
  })

  it('links the docs of every package', () => {
    renderFooter()
    const docs = within(screen.getByRole('navigation', { name: 'Documentation' }))
    expect(docs.getByRole('link', { name: 'All packages' })).toHaveAttribute('href', '/packages/')
    for (const entry of PACKAGES) {
      const link = docs.getByRole('link', { name: entry.name })
      expect(link).toHaveAttribute('href', `/${entry.docs}/`)
      expect(link).not.toHaveAttribute('target')
    }
  })

  it('links the places the work lives, each in a tab of its own', () => {
    renderFooter()
    const places = within(screen.getByRole('navigation', { name: 'Connectivity' }))
    expect(places.getAllByRole('link').map((link) => link.textContent)).toEqual([
      'GitHub',
      'npm',
      'soroush.tech',
    ])
    expect(places.getByRole('link', { name: 'soroush.tech' })).toHaveAttribute(
      'href',
      'https://soroush.tech'
    )
    for (const link of places.getAllByRole('link')) expect(link).toHaveAttribute('target', '_blank')
  })

  it('says who owns it', () => {
    renderFooter()
    expect(screen.getByText(/2026 SOROUSH.TECH. ALL RIGHTS RESERVED./)).toBeInTheDocument()
  })
})
