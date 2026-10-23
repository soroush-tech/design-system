import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeModeProvider } from 'src/theme/ThemeModeProvider'
import { Layout } from './Layout'

const renderLayout = (sidebar?: React.ReactNode) =>
  render(
    <ThemeModeProvider>
      <Layout sidebar={sidebar}>
        <div data-testid="content">page content</div>
      </Layout>
    </ThemeModeProvider>
  )

describe('Layout', () => {
  it('renders the navbar, the content, and the footer', () => {
    renderLayout()
    expect(screen.getByRole('link', { name: 'SOROUSH.DESIGN' })).toHaveAttribute('href', '/')
    expect(screen.getByTestId('content')).toHaveTextContent('page content')
    expect(screen.getByText('@soroush.tech design system')).toBeInTheDocument()
  })

  it('keeps the content in a column no wider than 1200px', () => {
    renderLayout()
    expect(screen.getByTestId('content').parentElement).toHaveStyle({ maxWidth: '1200px' })
  })

  it('has no menu button or aside without a sidebar', () => {
    renderLayout()
    expect(screen.queryByRole('button', { name: 'Open navigation' })).not.toBeInTheDocument()
    expect(screen.queryByRole('complementary', { hidden: true })).not.toBeInTheDocument()
  })

  it('renders the sidebar in an aside and in a drawer its menu button opens', () => {
    renderLayout(<div data-testid="nav">nav content</div>)
    // The aside is display: none below the `lg` breakpoint, which jsdom applies.
    expect(screen.getByRole('complementary', { hidden: true })).toBeInTheDocument()
    // The drawer is a popover in the page, so the sidebar is there twice; the menu button
    // opens it through popovertarget, which works without JavaScript (see the e2e test).
    expect(screen.getAllByTestId('nav')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
      'popovertarget',
      'docs-nav'
    )
    expect(document.getElementById('docs-nav')).toHaveAttribute('popover', 'auto')
  })
})
