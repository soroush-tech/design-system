import { describe, it, expect } from 'vitest'
import { sections } from '@soroush.tech/docs-content'
import { allComponents } from 'src/common/nav'
import { PACKAGES, sourceUrlOf } from './packages'

// The MCP server and the command line are published under their own scope.
const NPM_NAMES = {
  react: '@soroush.design/react-components',
  markdown: '@soroush.design/react-markdown',
  'styled-system': '@soroush.design/styled-system',
  mcp: '@soroush.design/mcp',
  'ui-spec': '@soroush.tech/ui-spec',
  cli: '@soroush.design/cli',
}

describe('PACKAGES', () => {
  it('lists every package, each with a docs section of its own', () => {
    expect(PACKAGES.map((entry) => entry.id)).toEqual([
      'react',
      'markdown',
      'styled-system',
      'mcp',
      'ui-spec',
      'cli',
    ])
    expect(PACKAGES.map((entry) => entry.docs)).toEqual(PACKAGES.map((entry) => entry.id))
  })

  it('gives each package its version, npm page and source folder', () => {
    for (const entry of PACKAGES) {
      expect(entry.version).toMatch(/^\d+\.\d+\.\d+$/)
      expect(entry.npm).toBe(`https://www.npmjs.com/package/${NPM_NAMES[entry.id]}`)
      expect(entry.github).toBe(
        `https://github.com/soroush-tech/design-system/tree/main/packages/${sections[entry.id].dir}`
      )
      expect(entry.description.length).toBeGreaterThan(20)
    }
  })
})

describe('sourceUrlOf', () => {
  const find = (name: string) => allComponents.find((item) => item.name === name)!

  it("is the component's folder on GitHub", () => {
    expect(sourceUrlOf(find('Button'))).toBe(
      'https://github.com/soroush-tech/design-system/tree/main/packages/react-components/src/Button'
    )
  })

  it('is the inner folder of a component that is a family', () => {
    expect(sourceUrlOf(find('Table'))).toBe(
      'https://github.com/soroush-tech/design-system/tree/main/packages/react-components/src/Table/Table'
    )
  })
})
