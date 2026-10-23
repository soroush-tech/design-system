import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { PageContext as VikePageContext } from 'vike/types'
import { PageContext } from 'src/common/PageContext'
import { ThemeModeProvider } from 'src/theme/ThemeModeProvider'
import { Layout } from './Layout'

const renderLayout = (sidebar?: React.ReactNode, urlPathname = '/design-system/', hasToc = false) =>
  render(
    <ThemeModeProvider>
      <PageContext.Provider value={{ urlPathname } as VikePageContext}>
        <Layout sidebar={sidebar} hasToc={hasToc}>
          <div data-testid="content">page content</div>
        </Layout>
      </PageContext.Provider>
    </ThemeModeProvider>
  )

describe('Layout', () => {
  it('renders the navbar, the content, and the footer', () => {
    renderLayout()
    expect(screen.getByRole('link', { name: 'SOROUSH.DESIGN' })).toHaveAttribute('href', '/')
    expect(screen.getByTestId('content')).toHaveTextContent('page content')
    expect(screen.getByText('@soroush.tech design system')).toBeInTheDocument()
  })

  it('puts the version menu in the top bar, and reads an empty path as the root', () => {
    renderLayout(undefined, '')
    const bar = screen.getByRole('banner')
    expect(
      within(bar).getByRole('button', { name: /Documentation version, v\d+\.\d+\.\d+/ })
    ).toBeInTheDocument()
  })

  it('has a contents column beside the page only when it is asked for', () => {
    const { unmount } = renderLayout()
    expect(screen.queryByLabelText('Contents')).toBeNull()
    unmount()
    renderLayout(undefined, '/design-system/', true)
    expect(screen.getByLabelText('Contents').tagName).toBe('ASIDE')
  })

  it('keeps the content in a column no wider than 1200px', () => {
    renderLayout()
    expect(screen.getByTestId('content').parentElement).toHaveStyle({ maxWidth: '1200px' })
  })

  it('draws the navigation rail beside the page, for wide screens', () => {
    renderLayout()
    const rail = screen.getByRole('navigation', { name: 'Primary', hidden: true })
    expect(within(rail).getByRole('link', { name: 'Components', hidden: true })).toHaveAttribute(
      'href',
      '/design-system/components/'
    )
  })

  it('opens the search from the top bar', async () => {
    const user = userEvent.setup()
    renderLayout()
    await user.click(screen.getByRole('button', { name: 'Search' }))
    expect(screen.getByRole('dialog', { name: 'Search the documentation' })).toBeInTheDocument()
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
