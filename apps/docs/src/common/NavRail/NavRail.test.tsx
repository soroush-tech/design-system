import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { PageContext as VikePageContext } from 'vike/types'
import { PageContext } from 'src/common/PageContext'
import { SearchProvider } from 'src/common/Search/SearchProvider'
import { ThemeModeProvider } from 'src/theme/ThemeModeProvider'
import { NavRail } from './NavRail'
import { RailGlyph, type GlyphName } from './RailGlyph'

const renderRail = (urlPathname: string) =>
  render(
    <ThemeModeProvider>
      <PageContext.Provider value={{ urlPathname } as VikePageContext}>
        <SearchProvider>
          <NavRail />
        </SearchProvider>
      </PageContext.Provider>
    </ThemeModeProvider>
  )

const rail = () => screen.getByRole('navigation', { name: 'Primary' })

describe('NavRail', () => {
  it('lists home and the parts of the design-system docs, each with its name', () => {
    renderRail('/design-system/')
    const names = within(rail())
      .getAllByRole('link')
      .map((link) => link.textContent)
    expect(names).toEqual(['Home', 'Get started', 'Components', 'Packages', 'Styles'])
  })

  it('has no API item', () => {
    renderRail('/design-system/')
    expect(within(rail()).queryByRole('link', { name: 'API' })).not.toBeInTheDocument()
  })

  it('marks the part the page belongs to as current', () => {
    renderRail('/design-system/components/button/')
    expect(within(rail()).getByRole('link', { name: 'Components' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(within(rail()).getByRole('link', { name: 'Styles' })).not.toHaveAttribute('aria-current')
  })

  it("keeps a component's specs under Components", () => {
    renderRail('/design-system/api/button/')
    expect(within(rail()).getByRole('link', { name: 'Components' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('reads a path without its trailing slash, and an empty one as the root', () => {
    const { unmount } = renderRail('/design-system/components')
    expect(within(rail()).getByRole('link', { name: 'Components' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    unmount()
    renderRail('')
    expect(within(rail()).getByRole('link', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('marks home as current on the landing page', () => {
    renderRail('/')
    expect(within(rail()).getByRole('link', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('links each part to where it starts', () => {
    renderRail('/design-system/')
    const link = (name: string) => within(rail()).getByRole('link', { name })
    expect(link('Home')).toHaveAttribute('href', '/')
    expect(link('Get started')).toHaveAttribute('href', '/design-system/')
    expect(link('Components')).toHaveAttribute('href', '/design-system/components/')
    expect(link('Styles')).toHaveAttribute('href', '/design-system/customization/theming/')
  })

  it("shows the other sections' own parts", () => {
    renderRail('/styled-system/')
    const names = within(rail())
      .getAllByRole('link')
      .map((link) => link.textContent)
    expect(names).toEqual(['Home', 'Get started', 'Docs', 'Guides', 'Packages'])
  })

  it('opens a component of the markdown docs from Components, which has no page of its own', () => {
    renderRail('/markdown/components/preview/')
    const href = within(rail()).getByRole('link', { name: 'Components' }).getAttribute('href')
    expect(href).toMatch(/^\/markdown\/components\/[a-z-]+\/$/)
    expect(href).not.toBe('/markdown/components/')
  })

  it('puts the version of the docs under the search, to choose another', () => {
    renderRail('/design-system/')
    const buttons = within(rail()).getAllByRole('button')
    expect(buttons[0]).toHaveAccessibleName('Search')
    expect(buttons[1]).toHaveAccessibleName(/Documentation version, v\d+\.\d+\.\d+/)
  })

  it('opens the search from its button', async () => {
    const user = userEvent.setup()
    renderRail('/design-system/')
    await user.click(screen.getByRole('button', { name: 'Search' }))
    expect(screen.getByRole('dialog', { name: 'Search the documentation' })).toBeInTheDocument()
  })

  it('toggles the color scheme', async () => {
    const user = userEvent.setup()
    renderRail('/design-system/')
    const toggle = screen.getByRole('button', { name: 'Toggle color scheme' })
    const before = toggle.innerHTML
    await user.click(toggle)
    expect(toggle.innerHTML).not.toBe(before)
  })
})

describe('RailGlyph', () => {
  const names: GlyphName[] = [
    'home',
    'dots',
    'add_circle',
    'palette',
    'article',
    'book',
    'search',
    'close',
    'history',
    'package',
    'code',
    'open_in_new',
    'light_mode',
    'dark_mode',
  ]

  it.each(names)('draws %s, hidden from assistive technology', (name) => {
    const { container } = render(<RailGlyph name={name} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.querySelector('path, circle')).toBeInTheDocument()
  })

  it('draws the dots of Get started as nine circles', () => {
    const { container } = render(<RailGlyph name="dots" />)
    expect(container.querySelectorAll('circle')).toHaveLength(9)
  })

  it('takes a size', () => {
    const { container } = render(<RailGlyph name="home" size={20} />)
    expect(container.querySelector('svg')).toHaveAttribute('width', '20')
  })
})
