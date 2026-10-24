import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { screen, within } from '@testing-library/react'
import { ThemeProvider, baseTheme } from '@soroush.tech/design-system/theme'
import { renderWithTheme } from '@soroush.tech/design-system/utils/test/renderWithTheme'
import { Sidebar } from './Sidebar'
import { SidebarItem } from '../SidebarItem'

// What jsdom answers for a `transparent` background.
const CLEAR = 'rgba(0, 0, 0, 0)'

describe('Sidebar stacked layout', () => {
  it('shows every label while the rail is not open, each under its icon', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked">
        <SidebarItem icon="home" label="Home" />
        <SidebarItem icon="search" label="Search" />
      </Sidebar>
    )
    for (const name of ['Home', 'Search']) {
      const item = screen.getByRole('button', { name })
      expect(within(item).getByText(name)).toBeInTheDocument()
      // The icon, on its pill, comes before the label.
      const [pill, label] = Array.from(item.firstElementChild!.children)
      expect(pill).toHaveAttribute('data-sidebar-pill')
      expect(label).toHaveTextContent(name)
    }
  })

  it('does not need isOpen, and ignores it', () => {
    const { rerender } = renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked" isOpen>
        <SidebarItem icon="home" label="Home" />
      </Sidebar>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    rerender(
      <ThemeProvider theme={baseTheme}>
        <Sidebar aria-label="Primary" layout="stacked" isOpen={false}>
          <SidebarItem icon="home" label="Home" />
        </Sidebar>
      </ThemeProvider>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('has one width, and does not animate it', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked">
        <SidebarItem icon="home" label="Home" />
      </Sidebar>
    )
    const rail = screen.getByRole('navigation', { name: 'Primary' }).firstElementChild
    expect(rail).toHaveStyle({ width: '5.5rem' })
    expect(getComputedStyle(rail!).transition).not.toContain('width')
  })

  it('takes the width of the rail as stackedWidth', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked" stackedWidth="7rem">
        <SidebarItem icon="home" label="Home" />
      </Sidebar>
    )
    expect(screen.getByRole('navigation', { name: 'Primary' }).firstElementChild).toHaveStyle({
      width: '7rem',
    })
  })

  it('leaves the inline rail as it was: a label only while open, a width that animates', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" isOpen={false}>
        <SidebarItem icon="home" label="Home" />
      </Sidebar>
    )
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary' }).firstElementChild).toHaveStyle({
      width: '3.5rem',
    })
  })

  it('marks the selected item on its pill, and not on the row', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked">
        <SidebarItem icon="home" label="Home" isSelected />
        <SidebarItem icon="search" label="Search" />
      </Sidebar>
    )
    const pill = (name: string) =>
      screen.getByRole('button', { name }).querySelector('[data-sidebar-pill]')!
    // jsdom does not read `transparent` as a style, so a fill is a color the pill has.
    expect(getComputedStyle(pill('Home')).backgroundColor).not.toBe(CLEAR)
    expect(getComputedStyle(pill('Search')).backgroundColor).toBe(CLEAR)
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('draws no pill fill for a plain item - the text color alone shows the selection', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked" variant="plain">
        <SidebarItem icon="home" label="Home" isSelected />
      </Sidebar>
    )
    const pill = screen.getByRole('button', { name: 'Home' }).querySelector('[data-sidebar-pill]')!
    expect(getComputedStyle(pill).backgroundColor).toBe(CLEAR)
  })

  it('shows custom children under the icon instead of the label', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked">
        <SidebarItem icon="home" label="Home">
          <b>Home (3)</b>
        </SidebarItem>
      </Sidebar>
    )
    expect(screen.getByText('Home (3)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
  })
})

describe('Sidebar stacked layout with a ported panel', () => {
  it('keeps the label under the icon, and the item children in the panel', async () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked" hasPanel>
        <SidebarItem icon="home" label="Home" isSelected>
          <p>In the panel</p>
        </SidebarItem>
      </Sidebar>
    )
    const item = screen.getByRole('button', { name: 'Home' })
    expect(within(item).getByText('Home')).toBeInTheDocument()
    expect(within(item).queryByText('In the panel')).not.toBeInTheDocument()
    expect(await screen.findByText('In the panel')).toBeInTheDocument()
  })
})

describe('Sidebar panel in place', () => {
  it('renders its panel beside the rail, named as given', () => {
    renderWithTheme(
      <Sidebar
        aria-label="Primary"
        layout="stacked"
        panel={<p>The tree</p>}
        panelProps={{ 'aria-label': 'Components' }}
      >
        <SidebarItem icon="home" label="Home" />
      </Sidebar>
    )
    const panel = screen.getByRole('region', { name: 'Components' })
    expect(panel).toHaveTextContent('The tree')
    expect(screen.getByRole('navigation', { name: 'Primary' })).toContainElement(panel)
  })

  it('is in the server-rendered markup, which a ported panel is not', () => {
    const html = renderToString(
      <ThemeProvider theme={baseTheme}>
        <Sidebar aria-label="Primary" layout="stacked" panel={<p>The tree</p>}>
          <SidebarItem icon="home" label="Home" />
        </Sidebar>
      </ThemeProvider>
    )
    expect(html).toContain('The tree')
  })

  it('takes the width of panelWidth', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" panel={<p>The tree</p>} panelWidth="20rem">
        <SidebarItem icon="home" label="Home" />
      </Sidebar>
    )
    expect(screen.getByText('The tree').parentElement).toHaveStyle({ width: '20rem' })
  })

  it('takes the place of hasPanel: the items keep their children in the row', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" isOpen hasPanel panel={<p>The tree</p>}>
        <SidebarItem icon="home" label="Home" isSelected>
          <span>In the row</span>
        </SidebarItem>
      </Sidebar>
    )
    expect(screen.getByText('The tree')).toBeInTheDocument()
    expect(screen.getByText('In the row')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Home' })).not.toHaveAttribute('aria-expanded')
  })

  it('has no panel column without one', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" isOpen>
        <SidebarItem icon="home" label="Home" />
      </Sidebar>
    )
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })
})

describe('SidebarItem as a link', () => {
  it('is an anchor given href, with the current page marked by aria-current and no aria-pressed', () => {
    renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked">
        <SidebarItem
          icon="home"
          label="Home"
          href="/"
          aria-current="page"
          aria-pressed={undefined}
          isSelected
        />
        <SidebarItem icon="search" label="Search" href="/search" aria-pressed={undefined} />
      </Sidebar>
    )
    const home = screen.getByRole('link', { name: 'Home' })
    expect(home.tagName).toBe('A')
    expect(home).toHaveAttribute('href', '/')
    expect(home).toHaveAttribute('aria-current', 'page')
    expect(home).not.toHaveAttribute('aria-pressed')
    expect(screen.getByRole('link', { name: 'Search' })).not.toHaveAttribute('aria-current')
  })

  it('still fires onSelect when followed', () => {
    let selected = 0
    renderWithTheme(
      <Sidebar aria-label="Primary" layout="stacked">
        <SidebarItem
          icon="home"
          label="Home"
          href="#home"
          aria-pressed={undefined}
          onSelect={() => (selected += 1)}
        />
      </Sidebar>
    )
    screen.getByRole('link', { name: 'Home' }).click()
    expect(selected).toBe(1)
  })
})
