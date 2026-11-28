import { describe, it, expect } from 'vitest'
import { allComponents } from 'src/common/nav'
import { componentOfRoute, componentPageParts } from './componentPage'

describe('componentPageParts', () => {
  it('gives the README, what is left of it, and the line under the name', () => {
    const { source, rest, lead } = componentPageParts('button')
    expect(source.startsWith('# Button')).toBe(true)
    expect(rest.length).toBeLessThanOrEqual(source.length)
    expect(lead.length).toBeGreaterThan(10)
    expect(lead).not.toMatch(/[`*[\]]/)
  })

  it("moves a component's accessibility notes out of its README", () => {
    const withNotes = allComponents
      .map((item) => ({ item, parts: componentPageParts(item.slug) }))
      .filter(({ parts }) => parts.accessibility !== '')
    expect(withNotes.length).toBeGreaterThan(5)
    for (const { parts } of withNotes) {
      expect(parts.accessibility).toMatch(/^#{2,3} (Accessibility|Keyboard|Focus|ARIA)/)
      expect(parts.rest).not.toContain(parts.accessibility)
    }
  })

  it('has a lead for every component of the components page', () => {
    for (const item of allComponents) {
      expect(componentPageParts(item.slug).lead, item.name).not.toBe('')
    }
  })
})

describe('componentOfRoute', () => {
  it('finds a component by its name, and a member by the entry it is imported from', () => {
    expect(componentOfRoute({ name: 'Button' }).name).toBe('Button')
    expect(componentOfRoute({ name: 'Table', member: 'TableCell' }).name).toBe('TableCell')
  })

  it('fails for a name that is none, or a member under an entry it is not exported from', () => {
    expect(() => componentOfRoute({ name: 'button' })).toThrow(
      'No component for the route "button"'
    )
    expect(() => componentOfRoute({ name: 'Menu', member: 'TableCell' })).toThrow(
      'No component for the route "Menu/TableCell"'
    )
  })
})
