import { describe, it, expect } from 'vitest'
import { allComponents } from 'src/common/nav'
import { PACKAGES, sourceUrlOf } from './packages'

describe('PACKAGES', () => {
  it('lists the three documented packages first, then the two that are not', () => {
    expect(PACKAGES.map((entry) => entry.id)).toEqual([
      'design-system',
      'markdown',
      'styled-system',
      'mcp',
      'ui-spec',
    ])
    expect(PACKAGES.filter((entry) => entry.docs).map((entry) => entry.docs)).toEqual([
      'design-system',
      'markdown',
      'styled-system',
    ])
  })

  it('gives each package its version, npm page and source folder', () => {
    for (const entry of PACKAGES) {
      expect(entry.version).toMatch(/^\d+\.\d+\.\d+$/)
      expect(entry.npm).toBe(`https://www.npmjs.com/package/@soroush.tech/${entry.id}`)
      expect(entry.github).toBe(
        `https://github.com/soroush-tech/design-system/tree/main/packages/${entry.id}`
      )
      expect(entry.description.length).toBeGreaterThan(20)
    }
  })
})

describe('sourceUrlOf', () => {
  const find = (name: string) => allComponents.find((item) => item.name === name)!

  it("is the component's folder on GitHub", () => {
    expect(sourceUrlOf(find('Button'))).toBe(
      'https://github.com/soroush-tech/design-system/tree/main/packages/design-system/src/Button'
    )
  })

  it('is the inner folder of a component that is a family', () => {
    expect(sourceUrlOf(find('Table'))).toBe(
      'https://github.com/soroush-tech/design-system/tree/main/packages/design-system/src/Table/Table'
    )
  })
})
