import { describe, it, expect, vi, afterEach } from 'vitest'
import { componentCategories, designSystemNav, sectionFor } from './nav'

// The registry itself - and its lockstep with the README and MDX files on disk - is
// guarded by @soroush.tech/docs-content's own tests. What matters here is that this
// module turns that registry into a correct sidebar.

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

  it('the sidebar contains the four section groups plus every component category', () => {
    const labels = designSystemNav.map((group) => group.label)
    expect(labels[0]).toBe('Getting started')
    expect(labels).toContain('Component API')
    expect(labels).toContain('Customization')
    for (const category of componentCategories) expect(labels).toContain(category.label)
  })

  it('nav hrefs are unique and end with a trailing slash', () => {
    const hrefs = designSystemNav.flatMap((group) => group.items.map((item) => item.href))
    expect(new Set(hrefs).size).toBe(hrefs.length)
    for (const href of hrefs) expect(href.endsWith('/')).toBe(true)
  })
})
