import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  allDocComponents,
  componentCategories,
  designSystemNav,
  isVersioned,
  railItemFor,
  searchEntriesFor,
  sectionFor,
} from './nav'

// The registry itself - and its lockstep with the README and MDX files on disk - is
// guarded by @soroush.tech/docs-content's own tests. What matters here is that this
// module turns that registry into a correct rail and sidebar.

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('section navigation', () => {
  it('resolves the section for a pathname, with build-section and default fallbacks', () => {
    expect(sectionFor('/markdown/components/preview/').pkg).toBe('markdown')
    expect(sectionFor('/styled-system').pkg).toBe('styled-system')
    expect(sectionFor('/').pkg).toBe('design-system')
    vi.stubEnv('PUBLIC_ENV__DOCS_SECTION', 'markdown')
    expect(sectionFor('/components/preview/').pkg).toBe('markdown')
  })

  it('has Components as its own group, All components first, then every category', () => {
    const components = sectionFor('/design-system/').rail.find((item) => item.id === 'components')!
    expect(components.groups[0].items[0]).toEqual({
      label: 'All components',
      href: '/design-system/components/',
    })
    const labels = components.groups.map((group) => group.label)
    for (const category of componentCategories) expect(labels).toContain(category.label)
    expect(components.groups.slice(1).every((group) => group.isCollapsible)).toBe(true)
  })

  it('opens each section with home, then the packages, then the get started item', () => {
    for (const pkg of ['design-system', 'markdown', 'styled-system', 'mcp', 'ui-spec']) {
      const rail = sectionFor(`/${pkg}/`).rail
      expect(rail[0].id).toBe('home')
      expect(rail[0].groups).toEqual([])
      expect(rail[1].id).toBe('packages')
      expect(rail[2].id).toBe('get-started')
    }
  })

  it("has no API group in the sidebar - a component's specs are its page's second tab", () => {
    const labels = designSystemNav.map((group) => group.label)
    expect(labels).not.toContain('Component API')
  })

  it('nav hrefs are unique within a part and end with a trailing slash', () => {
    for (const section of ['design-system', 'markdown', 'styled-system']) {
      for (const item of sectionFor(`/${section}/`).rail) {
        // A page outside the docs - a package's source - is the site's to name.
        const hrefs = item.groups.flatMap((group) =>
          group.items.filter((entry) => !entry.isExternal).map((entry) => entry.href)
        )
        expect(new Set(hrefs).size).toBe(hrefs.length)
        for (const href of hrefs) expect(href.endsWith('/')).toBe(true)
      }
    }
  })
})

describe('the packages in the rail', () => {
  it('is a part of every section, with its own sidebar', () => {
    for (const pkg of ['design-system', 'markdown', 'styled-system']) {
      const item = sectionFor(`/${pkg}/`).rail.find((entry) => entry.id === 'packages')
      expect(item?.href).toBe('/packages/')
      expect(item?.groups.map((group) => group.label)).toEqual(['Packages'])
    }
  })

  it('lists all packages first, then each package with docs, with its version', () => {
    const item = sectionFor('/design-system/').rail.find((entry) => entry.id === 'packages')!
    const [all, ...docs] = item.groups[0].items
    expect(all).toEqual({ label: 'All packages', href: '/packages/' })
    expect(docs.map((entry) => [entry.label, entry.href])).toEqual([
      ['Design System', '/design-system/'],
      ['Markdown', '/markdown/'],
      ['Styled System', '/styled-system/'],
      ['MCP server', '/mcp/'],
      ['UI spec', '/ui-spec/'],
    ])
    for (const entry of docs) expect(entry.note).toMatch(/^v\d+\.\d+\.\d+$/)
  })

  it('has a section of its own for the packages that are not versioned', () => {
    for (const [pkg, label] of [
      ['mcp', 'MCP server documentation'],
      ['ui-spec', 'UI spec documentation'],
    ]) {
      const section = sectionFor(`/${pkg}/`)
      expect(section.pkg).toBe(pkg)
      expect(section.label).toBe(label)
      expect(section.rail.map((item) => item.id)).toEqual(['home', 'packages', 'get-started'])
      expect(section.rail[2].groups[0].items.map((item) => item.href)).toEqual([
        `/${pkg}/`,
        `/${pkg}/releases/`,
      ])
      expect(railItemFor(section, `/${pkg}/releases/`).id).toBe('get-started')
      expect(isVersioned(section.pkg)).toBe(false)
    }
    expect(isVersioned('markdown')).toBe(true)
  })

  it('is the part the packages page belongs to', () => {
    const section = sectionFor('/packages/')
    expect(railItemFor(section, '/packages/').id).toBe('packages')
  })
})

describe('railItemFor', () => {
  const section = sectionFor('/design-system/')

  it('is the item whose sidebar lists the page', () => {
    expect(railItemFor(section, '/design-system/components/button/').id).toBe('components')
    expect(railItemFor(section, '/design-system/customization/theming/').id).toBe('styles')
    expect(railItemFor(section, '/design-system/').id).toBe('get-started')
  })

  it("is the item whose prefix covers a page no sidebar lists - a component's specs", () => {
    expect(railItemFor(section, '/design-system/api/button/').id).toBe('components')
    expect(railItemFor(section, '/design-system/getting-started/other/').id).toBe('get-started')
  })

  it('falls back to the first part after home', () => {
    expect(railItemFor(section, '/design-system/elsewhere/').id).toBe('get-started')
  })

  it('tells the styled-system docs from its guides', () => {
    const styled = sectionFor('/styled-system/')
    expect(railItemFor(styled, '/styled-system/docs/responsive-styles/').id).toBe('docs')
    const guide = styled.rail.find((item) => item.id === 'guides')!.groups[0].items[0].href
    expect(railItemFor(styled, guide).id).toBe('guides')
  })
})

describe('searchEntriesFor', () => {
  it('lists every sidebar page of the section', () => {
    const entries = searchEntriesFor(sectionFor('/design-system/'))
    expect(entries.find((entry) => entry.label === 'Installation')?.group).toBe('Get started')
    expect(entries.find((entry) => entry.label === 'Button')?.href).toBe(
      '/design-system/components/button/'
    )
  })

  it('adds the specs page of every design-system component', () => {
    const entries = searchEntriesFor(sectionFor('/design-system/'))
    const specs = entries.filter((entry) => entry.group === 'Specs')
    expect(specs).toHaveLength(
      allDocComponents.filter((item) => item.pkg === 'design-system').length
    )
    expect(specs.find((entry) => entry.label === 'Button specs')?.href).toBe(
      '/design-system/api/button/'
    )
  })

  it('lists only the sidebar pages of the other sections', () => {
    const entries = searchEntriesFor(sectionFor('/markdown/'))
    expect(entries.some((entry) => entry.group === 'Specs')).toBe(false)
    expect(entries.some((entry) => entry.label === 'Preview')).toBe(true)
  })
})
