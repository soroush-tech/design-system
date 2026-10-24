import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import type { PageContext as VikePageContext } from 'vike/types'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import { PageContext } from 'src/common/PageContext'
import { componentCategories } from 'src/common/nav'
import { dark } from 'src/theme/themes'
import { DocsNav } from './DocsNav'

const renderNav = (urlPathname: string) => {
  const pageContext = { urlPathname } as VikePageContext
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={dark}>
      <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
    </ThemeProvider>
  )
  return render(<DocsNav />, { wrapper })
}

describe('DocsNav', () => {
  it('shows the sidebar of the rail item the page belongs to, not every group', () => {
    renderNav('/design-system/components/button/')
    expect(screen.getByRole('link', { name: 'All components' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Installation' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Theming' })).not.toBeInTheDocument()
  })

  it('lists All components first, then every category as a folding group', () => {
    const { container } = renderNav('/design-system/components/')
    expect(screen.getByRole('link', { name: 'All components' })).toHaveAttribute(
      'href',
      '/design-system/components/'
    )
    for (const category of componentCategories) {
      expect(screen.getByText(category.label)).toBeInTheDocument()
    }
    expect(container.querySelectorAll('details')).toHaveLength(componentCategories.length)
  })

  it('opens the group that holds the current page, and no other', () => {
    const { container } = renderNav('/design-system/components/button/')
    const open = Array.from(container.querySelectorAll('details[open]'))
    expect(open).toHaveLength(1)
    expect(open[0]).toContainElement(screen.getByRole('link', { name: 'Button' }))
  })

  it('shows the get started pages on the overview', () => {
    renderNav('/design-system/')
    expect(screen.getByRole('link', { name: 'Installation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'page')
  })

  it('shows the style pages under Styles', () => {
    renderNav('/design-system/customization/theming/')
    expect(screen.getByRole('link', { name: 'Theming' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'How to customize' })).toBeInTheDocument()
  })

  it('renders the markdown section nav on markdown paths', () => {
    renderNav('/markdown/components/preview/')
    expect(screen.getByRole('navigation', { name: 'Markdown documentation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Preview' })).toHaveAttribute('aria-current', 'page')
  })

  it('renders the styled-system section nav on styled-system paths', () => {
    renderNav('/styled-system/docs/responsive-styles/')
    expect(
      screen.getByRole('navigation', { name: 'Styled-system documentation' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Responsive styles' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('lists the packages on the packages page, each with its version', () => {
    renderNav('/packages/')
    expect(screen.getByRole('link', { name: 'All packages' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    for (const [name, href] of [
      ['Markdown', '/markdown/'],
      ['MCP server', '/mcp/'],
      ['UI spec', '/ui-spec/'],
    ]) {
      const link = screen.getByRole('link', { name: new RegExp(`^${name}\\s*v\\d`) })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveTextContent(/v\d+\.\d+\.\d+/)
      expect(link).not.toHaveAttribute('target')
    }
  })

  it('picks the package from a select that shows the current one', async () => {
    const user = userEvent.setup()
    renderNav('/design-system/components/')
    const select = screen.getByRole('combobox', { name: 'Package' })
    expect(select).toHaveTextContent('Design System')
    await user.click(select)
    const options = screen.getAllByRole('option')
    expect(options.map((option) => option.textContent)).toEqual([
      'Design System',
      'Markdown',
      'Styled System',
      'MCP server',
      'UI spec',
    ])
    expect(options[0]).toHaveAttribute('aria-selected', 'true')
    expect(options[1]).toHaveAttribute('aria-selected', 'false')
  })

  it('opens the package that is chosen', async () => {
    const user = userEvent.setup()
    const assign = vi.fn()
    vi.stubGlobal('location', { ...window.location, assign })
    renderNav('/markdown/components/preview/')
    await user.click(screen.getByRole('combobox', { name: 'Package' }))
    await user.click(screen.getByRole('option', { name: 'Styled System' }))
    expect(assign).toHaveBeenCalledWith('/styled-system/')
    vi.unstubAllGlobals()
  })

  it('marks a component page of a family as current under its category', () => {
    renderNav('/design-system/components/menu/')
    expect(screen.getByRole('link', { name: 'Menu' })).toHaveAttribute('aria-current', 'page')
  })

  it('normalizes a pathname without a trailing slash', () => {
    renderNav('/design-system/components/button')
    expect(screen.getByRole('link', { name: 'Button' })).toHaveAttribute('aria-current', 'page')
  })

  it('falls back to the root path when urlPathname is empty', () => {
    renderNav('')
    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument()
  })
})
