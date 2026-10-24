import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
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

describe('OnThisPage as the page scrolls', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  const page = (
    <>
      <h1>Button</h1>
      <h2 id="examples">Examples</h2>
      <h2 id="props">Props</h2>
    </>
  )
  const active = () => document.querySelector('nav[aria-label="On this page"] a[data-active]')

  // Where each heading is, as a browser measures it: a map of ids to their top in the window.
  const placeHeadings = (tops: Record<string, number>) => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement
    ) {
      return { top: tops[this.id] ?? 0 } as DOMRect
    })
  }

  it('starts with the name of the page, which takes the reader to the top', () => {
    renderToc(page)
    const links = screen.getAllByRole('link')
    expect(links.map((link) => link.textContent)).toEqual(['Button', 'Examples', 'Props'])
    expect(links[0]).toHaveAttribute('href', '#')
  })

  it('has no name entry for a page without an h1', () => {
    renderToc(
      <>
        <h2 id="a">A</h2>
        <h2 id="b">B</h2>
      </>
    )
    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(['A', 'B'])
  })

  it('marks no section as current at the head of the page, and puts the ground away', () => {
    placeHeadings({ examples: 600, props: 1200 })
    renderToc(page)
    expect(active()).toBeNull()
    expect(
      document.querySelector<HTMLElement>('nav[aria-label="On this page"] ul > span')!.style.opacity
    ).toBe('0')
  })

  it('marks the last section above the read line, as the page scrolls', () => {
    placeHeadings({ examples: 600, props: 1200 })
    renderToc(page)
    placeHeadings({ examples: 80, props: 700 })
    act(() => {
      fireEvent.scroll(window)
    })
    expect(active()).toHaveTextContent('Examples')
    expect(active()).toHaveAttribute('aria-current', 'location')
    placeHeadings({ examples: -400, props: 100 })
    act(() => {
      fireEvent.scroll(window)
    })
    expect(active()).toHaveTextContent('Props')
  })

  it('marks the last section at the foot of the page, though its heading is below the line', () => {
    placeHeadings({ examples: 80, props: 700 })
    vi.stubGlobal('scrollY', 500)
    vi.stubGlobal('innerHeight', 800)
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(1300)
    renderToc(page)
    expect(active()).toHaveTextContent('Props')
  })

  it('passes over a section whose heading has left the page', () => {
    placeHeadings({ examples: 80, props: 700 })
    renderToc(page)
    const original = document.getElementById.bind(document)
    vi.spyOn(document, 'getElementById').mockImplementation((id) =>
      id === 'examples' ? null : original(id)
    )
    act(() => {
      fireEvent.scroll(window)
    })
    expect(active()).toBeNull()
  })

  it('slides the tinted ground to the current entry', () => {
    placeHeadings({ examples: 80, props: 700 })
    renderToc(page)
    const marker = document.querySelector<HTMLElement>('nav[aria-label="On this page"] ul > span')!
    expect(marker.style.opacity).toBe('1')
    expect(marker).toHaveAttribute('aria-hidden', 'true')
  })

  it('leaves the ground hidden while no entry is measured', () => {
    renderToc(<p>text</p>)
    expect(document.querySelector('nav[aria-label="On this page"]')).toBeNull()
  })
})
