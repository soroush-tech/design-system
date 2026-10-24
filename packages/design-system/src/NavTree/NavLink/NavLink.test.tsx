import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@soroush.tech/design-system/utils/test/renderWithTheme'
import { NavTree } from '../NavTree'
import { NavLink } from './NavLink'

// What jsdom answers for a `transparent` background.
const CLEAR = 'rgba(0, 0, 0, 0)'
const fill = (name: string) => getComputedStyle(screen.getByRole('link', { name })).backgroundColor

describe('NavLink', () => {
  it('is an anchor to its page, named by its children', () => {
    renderWithTheme(<NavLink href="/components/button/">Button</NavLink>)
    const link = screen.getByRole('link', { name: 'Button' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/components/button/')
    expect(link).not.toHaveAttribute('aria-current')
    expect(link).not.toHaveAttribute('target')
  })

  it('marks the current page with aria-current, and fills it', () => {
    renderWithTheme(
      <>
        <NavLink href="/a/" isCurrent>
          Here
        </NavLink>
        <NavLink href="/b/">There</NavLink>
      </>
    )
    expect(screen.getByRole('link', { name: 'Here' })).toHaveAttribute('aria-current', 'page')
    expect(fill('Here')).not.toBe(CLEAR)
    expect(fill('There')).toBe(CLEAR)
    expect(screen.getByRole('link', { name: 'Here' })).toHaveStyle({ fontWeight: '600' })
  })

  it('shows a note beside its name', () => {
    renderWithTheme(
      <NavLink href="/m/" note="v1.2.3">
        Markdown
      </NavLink>
    )
    expect(screen.getByRole('link', { name: /Markdown/ })).toHaveTextContent('v1.2.3')
  })

  it('has no note without one', () => {
    renderWithTheme(<NavLink href="/m/">Markdown</NavLink>)
    expect(screen.getByRole('link', { name: 'Markdown' }).children).toHaveLength(1)
  })

  it('opens an external page in a tab of its own, with an arrow after its name', () => {
    renderWithTheme(
      <NavLink href="https://example.com/" isExternal>
        Source
      </NavLink>
    )
    const link = screen.getByRole('link', { name: 'Source' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('takes the anchor attributes of its own over what isExternal sets', () => {
    renderWithTheme(
      <NavLink href="https://example.com/" isExternal target="_self" rel="author">
        Source
      </NavLink>
    )
    const link = screen.getByRole('link', { name: 'Source' })
    expect(link).toHaveAttribute('target', '_self')
    expect(link).toHaveAttribute('rel', 'author')
  })

  it('takes its color from its NavTree, or its own', () => {
    renderWithTheme(
      <NavTree color="secondary">
        <NavLink href="/a/" isCurrent>
          Tree color
        </NavLink>
        <NavLink href="/b/" isCurrent color="error">
          Own color
        </NavLink>
      </NavTree>
    )
    expect(fill('Tree color')).not.toBe(fill('Own color'))
  })

  it('is the primary color outside a NavTree, as a NavTree with no color is', () => {
    renderWithTheme(
      <>
        <NavLink href="/a/" isCurrent>
          Alone
        </NavLink>
        <NavTree>
          <NavLink href="/b/" isCurrent>
            In a tree
          </NavLink>
        </NavTree>
      </>
    )
    expect(fill('Alone')).toBe(fill('In a tree'))
  })
})
