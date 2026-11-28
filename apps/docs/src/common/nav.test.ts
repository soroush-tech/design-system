import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  allDocComponents,
  componentCategories,
  reactNav,
  sitePath,
  railItemFor,
  reactHooks,
  searchEntriesFor,
  sectionFor,
} from './nav'

// The registry itself - and its lockstep with the README and MDX files on disk - is
// guarded by @gild-ui/docs-content's own tests. What matters here is that this
// module turns that registry into a correct rail and sidebar.

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('section navigation', () => {
  it('resolves the section for a pathname, with build-section and default fallbacks', () => {
    expect(sectionFor('/react/markdown/Preview/').pkg).toBe('markdown')
    expect(sectionFor('/react/markdown').pkg).toBe('markdown')
    expect(sectionFor('/react/Button/').pkg).toBe('react')
    expect(sectionFor('/styled-system').pkg).toBe('styled-system')
    expect(sectionFor('/').pkg).toBe('react')
    vi.stubEnv('PUBLIC_ENV__DOCS_SECTION', 'markdown')
    expect(sectionFor('/Preview/').pkg).toBe('markdown')
  })

  it('has Hooks as its own part: All hooks first, then a page for each hook', () => {
    const hooks = sectionFor('/react/').rail.find((item) => item.id === 'hooks')!
    expect(hooks.groups[0].items[0]).toEqual({ label: 'All hooks', href: '/react/hooks/' })
    expect(hooks.groups[0].items.slice(1).map((item) => item.href)).toEqual(
      reactHooks.map((hook) => `/react/hooks/${hook}/`)
    )
    expect(searchEntriesFor(sectionFor('/react/')).map((entry) => entry.href)).toContain(
      '/react/hooks/useDebounce/'
    )
  })

  it('has Components as its own group, All components first, then every category', () => {
    const components = sectionFor('/react/').rail.find((item) => item.id === 'components')!
    expect(components.groups[0].items[0]).toEqual({
      label: 'All components',
      href: '/react/components/',
    })
    const labels = components.groups.map((group) => group.label)
    for (const category of componentCategories) expect(labels).toContain(category.label)
    expect(components.groups.slice(1).every((group) => group.isCollapsible)).toBe(true)
  })

  it('opens each section with home, then the packages, then the get started item', () => {
    for (const pkg of ['react', 'markdown', 'styled-system', 'mcp', 'ui-spec', 'cli'] as const) {
      const rail = sectionFor(sitePath(pkg, '/')).rail
      expect(rail[0].id).toBe('home')
      expect(rail[0].groups).toEqual([])
      expect(rail[1].id).toBe('packages')
      expect(rail[2].id).toBe('get-started')
    }
  })

  it("has no API group in the sidebar - a component's specs are its page's second tab", () => {
    const labels = reactNav.map((group) => group.label)
    expect(labels).not.toContain('Component API')
  })

  it('nav hrefs are unique within a part and end with a trailing slash', () => {
    for (const section of ['react', 'markdown', 'styled-system'] as const) {
      for (const item of sectionFor(sitePath(section, '/')).rail) {
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
    for (const pkg of ['react', 'markdown', 'styled-system'] as const) {
      const item = sectionFor(sitePath(pkg, '/')).rail.find((entry) => entry.id === 'packages')
      expect(item?.href).toBe('/packages/')
      expect(item?.groups.map((group) => group.label)).toEqual(['Packages'])
    }
  })

  it('lists all packages first, then each package with docs, with its version', () => {
    const item = sectionFor('/react/').rail.find((entry) => entry.id === 'packages')!
    const [all, ...docs] = item.groups[0].items
    expect(all).toEqual({ label: 'All packages', href: '/packages/' })
    expect(docs.map((entry) => [entry.label, entry.href])).toEqual([
      ['Gild UI for React', '/react/'],
      ['Markdown', '/react/markdown/'],
      ['Styled System', '/styled-system/'],
      ['MCP server', '/mcp/'],
      ['UI spec', '/ui-spec/'],
      ['Command line', '/cli/'],
    ])
    for (const entry of docs) expect(entry.note).toMatch(/^v\d+\.\d+\.\d+$/)
  })

  it('has a section of its own for the MCP server, the UI spec and the command line', () => {
    for (const [pkg, label] of [
      ['mcp', 'MCP server documentation'],
      ['ui-spec', 'UI spec documentation'],
      ['cli', 'Command line documentation'],
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
    }
  })

  it('is the part the packages page belongs to', () => {
    const section = sectionFor('/packages/')
    expect(railItemFor(section, '/packages/').id).toBe('packages')
  })
})

describe('railItemFor', () => {
  const section = sectionFor('/react/')

  it('is the item whose sidebar lists the page', () => {
    expect(railItemFor(section, '/react/Button/').id).toBe('components')
    expect(railItemFor(section, '/react/theme/').id).toBe('styles')
    expect(railItemFor(section, '/react/engine/').id).toBe('entry-points')
    expect(railItemFor(section, '/react/').id).toBe('get-started')
  })

  it("is the item whose prefix covers a page no sidebar lists - a component's specs and members", () => {
    expect(railItemFor(section, '/react/Button/specs/').id).toBe('components')
    expect(railItemFor(section, '/react/Table/TableCell/').id).toBe('components')
    expect(railItemFor(section, '/react/releases/other/').id).toBe('get-started')
  })

  it('falls back to the first part after home', () => {
    expect(railItemFor(section, '/react/elsewhere/').id).toBe('get-started')
  })

  it('gives the styled-system section one page, its package living in its own repository', () => {
    const styled = sectionFor('/styled-system/')
    const started = styled.rail.find((item) => item.id === 'get-started')!
    expect(started.groups[0].items.map((item) => item.href)).toEqual(['/styled-system/'])
    expect(railItemFor(styled, '/styled-system/').id).toBe('get-started')
  })
})

describe('searchEntriesFor', () => {
  it('lists every sidebar page of the section', () => {
    const entries = searchEntriesFor(sectionFor('/react/'))
    expect(entries.find((entry) => entry.label === 'Installation')?.group).toBe('Get started')
    expect(entries.find((entry) => entry.label === 'Button')?.href).toBe('/react/Button/')
  })

  it('adds the specs page of every design-system component', () => {
    const entries = searchEntriesFor(sectionFor('/react/'))
    const specs = entries.filter((entry) => entry.group === 'Specs')
    expect(specs).toHaveLength(allDocComponents.filter((item) => item.pkg === 'react').length)
    expect(specs.find((entry) => entry.label === 'Button specs')?.href).toBe('/react/Button/specs/')
    expect(specs.find((entry) => entry.label === 'TableCell specs')?.href).toBe(
      '/react/Table/TableCell/'
    )
  })

  it('lists only the sidebar pages of the other sections', () => {
    const entries = searchEntriesFor(sectionFor('/react/markdown/'))
    expect(entries.some((entry) => entry.group === 'Specs')).toBe(false)
    expect(entries.some((entry) => entry.label === 'Preview')).toBe(true)
  })
})
