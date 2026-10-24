import { describe, it, expect } from 'vitest'
import { sectionFor } from 'src/common/nav'
import { importantLinksFor } from './importantLinks'

const hrefs = (path: string) => importantLinksFor(sectionFor(path)).map((entry) => entry.href)

describe('importantLinksFor', () => {
  it('starts the design system with how to install it, then how to use it', () => {
    const links = hrefs('/design-system/')
    expect(links.slice(0, 3)).toEqual([
      '/design-system/getting-started/installation/',
      '/design-system/getting-started/usage/',
      '/design-system/components/',
    ])
  })

  it('names the design-system pages that matter, and no specs page', () => {
    const labels = importantLinksFor(sectionFor('/design-system/')).map((entry) => entry.label)
    expect(labels).toEqual(
      expect.arrayContaining(['Theming', 'How to customize', 'Button', 'TextInput', 'Tabs'])
    )
    expect(importantLinksFor(sectionFor('/design-system/')).some((e) => e.group === 'Specs')).toBe(
      false
    )
  })

  it('has links for the markdown and the styled-system sections, from their own pages', () => {
    expect(hrefs('/markdown/')[0]).toBe('/markdown/')
    expect(hrefs('/markdown/')).toContain('/markdown/components/preview/')
    expect(hrefs('/styled-system/')[0]).toBe('/styled-system/')
    for (const href of hrefs('/styled-system/'))
      expect(href.startsWith('/styled-system/')).toBe(true)
  })

  it('skips a page the section does not list', () => {
    const section = { ...sectionFor('/markdown/'), groups: [] }
    expect(importantLinksFor(section)).toEqual([])
  })

  it('lists each page once, every one a page the section has', () => {
    for (const path of ['/design-system/', '/markdown/', '/styled-system/']) {
      const links = hrefs(path)
      expect(new Set(links).size).toBe(links.length)
      expect(links.length).toBeGreaterThan(3)
    }
  })
})
