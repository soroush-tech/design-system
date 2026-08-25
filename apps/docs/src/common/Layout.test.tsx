import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('has no menu button or aside without a sidebar', () => {
    renderLayout()
    expect(screen.queryByRole('button', { name: 'Open navigation' })).not.toBeInTheDocument()
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })

  it('renders the sidebar in an aside and opens it in a drawer from the menu button', async () => {
    const user = userEvent.setup()
    renderLayout(<div data-testid="nav">nav content</div>)
    expect(screen.getByRole('complementary')).toBeInTheDocument()
    expect(screen.getByTestId('nav')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    // Drawer portals a second copy of the sidebar content.
    expect(screen.getAllByTestId('nav').length).toBe(2)
    await user.keyboard('{Escape}')
    expect(screen.getAllByTestId('nav').length).toBe(1)
  })
})
