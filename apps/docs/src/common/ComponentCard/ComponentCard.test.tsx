import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { allComponents, componentCategories } from 'src/common/nav'
import { ThemeProvider } from '@soroush.tech/design-system/theme'
import { light } from 'src/theme/themes'
import { illustrationInk } from 'src/theme/illustrationInk'
import { illustrations } from './illustrations'
import { ComponentCard } from './ComponentCard'
import { ComponentIllustration } from './ComponentIllustration'
import { render } from '@testing-library/react'

const button = allComponents.find((item) => item.name === 'Button')!

describe('ComponentCard', () => {
  it('links to the component page and names it', () => {
    renderWithTheme(<ComponentCard item={button} />)
    expect(screen.getByRole('link', { name: 'Button' })).toHaveAttribute(
      'href',
      '/design-system/components/button/'
    )
  })

  it('draws the component, hidden from assistive technology', () => {
    const { container } = renderWithTheme(<ComponentCard item={button} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.querySelectorAll('rect').length).toBeGreaterThan(0)
  })
})

describe('ComponentIllustration', () => {
  it('has a drawing for every component of the components page', () => {
    const missing = componentCategories
      .flatMap((category) => category.items.map((item) => item.name))
      .filter((name) => !(name in illustrations))
    expect(missing).toEqual([])
  })

  it('has no drawing for a component the page does not list', () => {
    const listed = new Set(componentCategories.flatMap((c) => c.items.map((item) => item.name)))
    expect(Object.keys(illustrations).filter((name) => !listed.has(name))).toEqual([])
  })

  it('draws each one with its own shapes', () => {
    for (const name of Object.keys(illustrations)) {
      const { container, unmount } = renderWithTheme(<ComponentIllustration name={name} />)
      expect(container.querySelectorAll('svg > *').length, name).toBeGreaterThan(0)
      unmount()
    }
  })

  it('shows an empty frame for a component without a drawing', () => {
    const { container } = renderWithTheme(<ComponentIllustration name="NoSuchComponent" />)
    expect(container.querySelector('rect[stroke-dasharray]')).toBeInTheDocument()
  })

  it('paints from the dark blues in the dark mode', () => {
    const { container } = renderWithTheme(<ComponentIllustration name="Button" />)
    expect(container.querySelector('svg')).toHaveStyle({
      '--ink-strong': illustrationInk.dark.strong,
    })
  })

  it('paints from the light blues in the light mode', () => {
    const { container } = render(
      <ThemeProvider theme={light}>
        <ComponentIllustration name="Button" />
      </ThemeProvider>
    )
    expect(container.querySelector('svg')).toHaveStyle({
      '--ink-strong': illustrationInk.light.strong,
    })
  })
})
