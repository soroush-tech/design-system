import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { ThemeProvider } from '../theme'
import { Breadcrumbs, type BreadcrumbsProps } from './Breadcrumbs'

const nine = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']

const trail = (names: string[], props: Partial<BreadcrumbsProps> = {}) =>
  renderWithTheme(
    <Breadcrumbs aria-label="Breadcrumb" expandLabel="Show path" {...props}>
      {names.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </Breadcrumbs>
  )

// The separators are aria-hidden, so the list items assistive technology sees are the crumbs.
const crumbs = () => screen.getAllByRole('listitem')
const list = () => screen.getByRole('list')
const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

describe('Breadcrumbs', () => {
  it('is a navigation landmark of crumbs, an aria-hidden separator between two', () => {
    trail(['first', 'second'])
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' }).tagName).toBe('NAV')
    expect(list().tagName).toBe('OL')
    expect(crumbs()).toHaveLength(2)
    expect(list()).toHaveTextContent('first/second')
    expect(list().querySelectorAll('li[aria-hidden]')).toHaveLength(1)
  })

  it('collapses past maxItems to its first and last crumbs and a button between them', () => {
    trail(nine)
    expect(crumbs()).toHaveLength(3)
    expect(list()).toHaveTextContent('first//ninth')
    const button = screen.getByRole('button', { name: 'Show path' })
    expect(button).toHaveAttribute('type', 'button')
    expect(button.querySelector('svg')).not.toBeNull()
  })

  it('shows the whole trail when the button is pressed, focus moving to its first link', () => {
    renderWithTheme(
      <Breadcrumbs aria-label="Breadcrumb" expandLabel="Show path">
        <span tabIndex={-1}>first</span>
        {nine.slice(1).map((name) => (
          <span key={name}>{name}</span>
        ))}
      </Breadcrumbs>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Show path' }))
    expect(crumbs()).toHaveLength(9)
    expect(screen.getByText('first')).toHaveFocus()
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('shows every crumb when the crumbs before and after the button would cover them all', () => {
    trail(['first', 'second', 'third', 'fourth'], {
      maxItems: 3,
      itemsBeforeCollapse: 2,
      itemsAfterCollapse: 2,
    })
    expect(crumbs()).toHaveLength(4)
    expect(list()).toHaveTextContent('first/second/third/fourth')
  })

  it('keeps as many crumbs before and after the button as it is told', () => {
    trail(nine, { maxItems: 4, itemsBeforeCollapse: 2, itemsAfterCollapse: 2 })
    expect(list()).toHaveTextContent('first/second//eighth/ninth')
  })

  it('takes a separator of its own, and mirrors an icon separator right to left', () => {
    trail(['first', 'second'], { separator: <svg data-testid="chevron" /> })
    const separator = screen.getByTestId('chevron').parentElement!
    expect(separator).toHaveAttribute('aria-hidden', 'true')
    expect(list()).toHaveTextContent('firstsecond')
  })

  it('puts an icon of its own in the button, and the props it is given on the icon', () => {
    function FirstPage(props: { 'data-testid'?: string }) {
      return <svg data-testid={props['data-testid'] ?? 'first-page'} />
    }
    const { unmount } = trail(['first', 'second', 'third'], {
      maxItems: 2,
      slots: { collapsedIcon: FirstPage },
    })
    expect(screen.getByTestId('first-page')).toBeInTheDocument()
    unmount()
    trail(['first', 'second', 'third'], {
      maxItems: 2,
      slotProps: { collapsedIcon: { 'data-testid': 'collapsed-icon' } },
    })
    expect(screen.getByTestId('collapsed-icon').tagName.toLowerCase()).toBe('svg')
  })

  it('is a Typography: its color and variant reach the root, and as changes the element', () => {
    trail(['first', 'second'], { as: 'div', color: 'error', variant: 'caption' })
    const root = list().parentElement!
    expect(root.tagName).toBe('DIV')
    expect(root).toHaveStyle({
      color: baseTheme.text.error,
      fontSize: `${baseTheme.fontSizes[0]}px`,
    })
  })

  it("is in the secondary text color by default, and skips children that aren't elements", () => {
    renderWithTheme(
      <Breadcrumbs aria-label="Breadcrumb">
        <span>first</span>
        {null}
        text
        <span>second</span>
      </Breadcrumbs>
    )
    expect(crumbs()).toHaveLength(2)
    expect(list().parentElement).toHaveStyle({ color: baseTheme.text.secondary })
  })

  it("takes the theme's defaults - its separator, collapse, label and color - and its own props win", () => {
    const theme = createTheme(baseTheme, {
      components: {
        Breadcrumbs: {
          defaultProps: {
            separator: '›',
            maxItems: 2,
            itemsBeforeCollapse: 1,
            itemsAfterCollapse: 1,
            expandLabel: 'Afficher le chemin',
            color: 'primary',
          },
        },
      },
    })
    const { unmount } = render(
      <Breadcrumbs aria-label="Fil">
        <span>first</span>
        <span>second</span>
        <span>third</span>
      </Breadcrumbs>,
      { wrapper: withTheme(theme) }
    )
    expect(screen.getByRole('button', { name: 'Afficher le chemin' })).toBeInTheDocument()
    expect(list()).toHaveTextContent('first››third')
    expect(list().parentElement).toHaveStyle({ color: baseTheme.text.primary })
    unmount()
    render(
      <Breadcrumbs aria-label="Fil" separator="-" maxItems={8} color="secondary">
        <span>first</span>
        <span>second</span>
        <span>third</span>
      </Breadcrumbs>,
      { wrapper: withTheme(theme) }
    )
    expect(list()).toHaveTextContent('first-second-third')
    expect(list().parentElement).toHaveStyle({ color: baseTheme.text.secondary })
  })
})
