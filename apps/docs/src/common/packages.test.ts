import { describe, it, expect } from 'vitest'
import { sections } from '@gild-ui/docs-content'
import { allComponents } from 'src/common/nav'
import { PACKAGES, sourceUrlOf } from './packages'

// The MCP server and the command line are published under their own scope.
const NPM_NAMES = {
  react: '@gild-ui/react',
  markdown: '@gild-ui/react-markdown',
  'styled-system': '@soroush.tech/styled-system',
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
      const { dir, repo } = sections[entry.id]
      expect(entry.github).toBe(
        dir === null
          ? repo
          : `https://github.com/soroush-tech/design-system/tree/main/packages/${dir}`
      )
      expect(entry.description.length).toBeGreaterThan(20)
    }
  })
})

describe('sourceUrlOf', () => {
  const find = (name: string) => allComponents.find((item) => item.name === name)!

  it("is the component's folder on GitHub", () => {
    expect(sourceUrlOf(find('Button'))).toBe(
      'https://github.com/soroush-tech/design-system/tree/main/packages/react/src/Button'
    )
  })

  it('is the inner folder of a component that is a family', () => {
    expect(sourceUrlOf(find('Table'))).toBe(
      'https://github.com/soroush-tech/design-system/tree/main/packages/react/src/Table/Table'
    )
  })
})
