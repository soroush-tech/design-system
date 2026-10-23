import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import type { ReactNode } from 'react'
import type { PageContext as VikePageContext } from 'vike/types'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import { PageContext } from 'src/common/PageContext'
import { dark } from 'src/theme/themes'
import { OnThisPage } from './OnThisPage'

const renderToc = (content: ReactNode, urlPathname = '/design-system/components/button/') =>
  render(
    <ThemeProvider theme={dark}>
      <PageContext.Provider value={{ urlPathname } as VikePageContext}>
        <main>{content}</main>
        <OnThisPage />
      </PageContext.Provider>
    </ThemeProvider>
  )

describe('OnThisPage', () => {
  it('links the h2 headings of the page that have an id', () => {
    renderToc(
      <>
        <h2 id="examples">Examples</h2>
        <h2 id="props">Props</h2>
        <h2>No id</h2>
        <h3 id="deep">Deeper</h3>
      </>
    )
    const nav = screen.getByRole('navigation', { name: 'On this page' })
    const links = Array.from(nav.querySelectorAll('a'))
    expect(links.map((link) => link.textContent)).toEqual(['Examples', 'Props'])
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['#examples', '#props'])
  })

  it('shows nothing for a page with fewer than two sections', () => {
    renderToc(<h2 id="only">Only</h2>)
    expect(screen.queryByRole('navigation', { name: 'On this page' })).not.toBeInTheDocument()
  })

  it('renders nothing on the server, where there is no page to read', () => {
    const html = renderToString(
      <ThemeProvider theme={dark}>
        <OnThisPage />
      </ThemeProvider>
    )
    expect(html).toBe('')
  })

  it('follows the page when its sections change', async () => {
    const { rerender } = renderToc(<h2 id="a">A</h2>)
    expect(screen.queryByRole('navigation', { name: 'On this page' })).not.toBeInTheDocument()
    rerender(
      <ThemeProvider theme={dark}>
        <PageContext.Provider
          value={{ urlPathname: '/design-system/components/button/' } as VikePageContext}
        >
          <main>
            <h2 id="a">A</h2>
            <h2 id="b">B</h2>
          </main>
          <OnThisPage />
        </PageContext.Provider>
      </ThemeProvider>
    )
    expect(await screen.findByRole('navigation', { name: 'On this page' })).toBeInTheDocument()
  })

  it('shows nothing for a page without sections', () => {
    renderToc(<p>text</p>)
    expect(screen.queryByRole('navigation', { name: 'On this page' })).not.toBeInTheDocument()
  })
})
