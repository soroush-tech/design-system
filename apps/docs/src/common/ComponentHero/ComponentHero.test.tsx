import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { allComponents } from 'src/common/nav'
import { ComponentHero, type ComponentHeroProps } from './ComponentHero'

const button = allComponents.find((item) => item.name === 'Button')!

const renderHero = (props: Partial<ComponentHeroProps> = {}) =>
  renderWithTheme(
    <ComponentHero
      item={button}
      lead="A button."
      hasAccessibility={false}
      active="overview"
      {...props}
    />
  )

const tabs = () => within(screen.getByRole('navigation', { name: 'Button pages' }))

describe('ComponentHero', () => {
  it('names the component and says what it is', () => {
    renderHero()
    expect(screen.getByRole('heading', { level: 1, name: 'Button' })).toBeInTheDocument()
    expect(screen.getByText('A button.')).toBeInTheDocument()
  })

  it('draws the component beside its name', () => {
    const { container } = renderHero()
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('leaves the line out when there is none', () => {
    renderHero({ lead: '' })
    expect(screen.queryByText('A button.')).not.toBeInTheDocument()
  })

  it('has an Overview tab and a Specs tab, linked to the component pages', () => {
    renderHero()
    expect(tabs().getByRole('link', { name: 'Overview' })).toHaveAttribute(
      'href',
      '/design-system/components/button/'
    )
    expect(tabs().getByRole('link', { name: 'Specs' })).toHaveAttribute(
      'href',
      '/design-system/api/button/'
    )
  })

  it('has an Accessibility tab only when the component has notes', () => {
    const { unmount } = renderHero()
    expect(tabs().queryByRole('link', { name: 'Accessibility' })).not.toBeInTheDocument()
    unmount()
    renderHero({ hasAccessibility: true })
    expect(tabs().getByRole('link', { name: 'Accessibility' })).toHaveAttribute(
      'href',
      '/design-system/components/button/accessibility/'
    )
  })

  it.each([
    ['overview', 'Overview'],
    ['specs', 'Specs'],
    ['accessibility', 'Accessibility'],
  ] as const)('marks the %s tab as the current page', (active, name) => {
    renderHero({ active, hasAccessibility: true })
    const links = tabs().getAllByRole('link')
    const current = links.filter((link) => link.getAttribute('aria-current') === 'page')
    expect(current).toHaveLength(1)
    expect(current[0]).toHaveTextContent(name)
  })

  it('has no tabs for a page that has none of its own', () => {
    renderHero({ active: undefined })
    expect(screen.queryByRole('navigation', { name: 'Button pages' })).not.toBeInTheDocument()
  })
})
