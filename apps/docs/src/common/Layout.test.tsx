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
    expect(screen.getByRole('contentinfo')).toHaveTextContent('SOROUSH.TECH')
  })

  it('puts the footer under the content, not under the sidebar', () => {
    renderLayout(<nav>the sidebar</nav>)
    const footer = screen.getByRole('contentinfo')
    const main = screen.getByRole('main')
    expect(footer.parentElement).toBe(main.parentElement)
    expect(main.nextElementSibling).toBe(footer)
    for (const aside of document.querySelectorAll('aside'))
      expect(aside).not.toContainElement(footer)
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

  it('puts a head above the content, outside its column, so it can be wider', () => {
    render(
      <ThemeModeProvider>
        <PageContext.Provider value={{ urlPathname: '/design-system/' } as VikePageContext}>
          <Layout head={<header data-testid="head">the head</header>}>
            <div data-testid="content">page content</div>
          </Layout>
        </PageContext.Provider>
      </ThemeModeProvider>
    )
    const head = screen.getByTestId('head')
    const column = screen.getByTestId('content').parentElement!
    expect(column).toHaveStyle({ maxWidth: '1200px' })
    expect(column).not.toContainElement(head)
    // Both are in the page's own main, the head first and the row of the column after it.
    expect(head.parentElement).toBe(column.parentElement!.parentElement)
    expect(head.nextElementSibling).toBe(column.parentElement)
  })

  it('puts the contents beside the column, and leaves their room to the head', () => {
    const { container } = render(
      <ThemeModeProvider>
        <PageContext.Provider value={{ urlPathname: '/design-system/' } as VikePageContext}>
          <Layout hasToc>
            <div data-testid="content">page content</div>
          </Layout>
        </PageContext.Provider>
      </ThemeModeProvider>
    )
    const column = screen.getByTestId('content').parentElement!
    const contents = container.querySelector('aside[aria-label="Contents"]')!
    expect(contents.parentElement).toBe(column.parentElement)
    expect(container.querySelector('main')).toHaveStyle({ '--toc-room': '16rem' })
  })

  it('leaves no room for contents on a page without them', () => {
    const { container } = renderLayout()
    expect(container.querySelector('main')).toHaveStyle({ '--toc-room': '0px' })
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

  it('puts the sidebar on a panel of its own, with round corners', () => {
    renderLayout(<div data-testid="nav">nav content</div>)
    const aside = screen.getByRole('complementary', { hidden: true })
    const panel = aside.firstElementChild as HTMLElement
    expect(within(panel).getByTestId('nav')).toBeInTheDocument()
    expect(panel).toHaveStyle({ borderRadius: '1.75rem' })
    // Its ground is not the page's: the page behind it shows around, not through.
    expect(getComputedStyle(panel).backgroundColor).not.toBe(
      getComputedStyle(document.body).backgroundColor
    )
  })
})
