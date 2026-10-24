import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { screen } from '@testing-library/react'
import { ThemeProvider, baseTheme } from '@soroush.tech/design-system/theme'
import { renderWithTheme } from '@soroush.tech/design-system/utils/test/renderWithTheme'
import { NavGroup } from '../NavGroup'
import { NavLink } from '../NavLink'
import { NavTree } from './NavTree'

describe('NavTree', () => {
  it('holds groups and links, in a column', () => {
    renderWithTheme(
      <NavTree data-testid="tree">
        <NavGroup label="Components">
          <NavLink href="/a/">A</NavLink>
        </NavGroup>
        <NavLink href="/b/">B</NavLink>
      </NavTree>
    )
    expect(screen.getByTestId('tree')).toHaveStyle({ flexDirection: 'column' })
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'B' })).toBeInTheDocument()
  })

  it('has no role of its own, so it takes its landmark from where it is put', () => {
    renderWithTheme(
      <NavTree data-testid="tree">
        <NavLink href="/a/">A</NavLink>
      </NavTree>
    )
    expect(screen.getByTestId('tree')).not.toHaveAttribute('role')
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('is in the server-rendered markup, links and all', () => {
    const html = renderToString(
      <ThemeProvider theme={baseTheme}>
        <NavTree>
          <NavGroup label="Components" isCollapsible isOpen>
            <NavLink href="/a/" isCurrent>
              A
            </NavLink>
          </NavGroup>
        </NavTree>
      </ThemeProvider>
    )
    expect(html).toContain('<details')
    expect(html).toContain('href="/a/"')
    expect(html).toContain('aria-current="page"')
  })
})
