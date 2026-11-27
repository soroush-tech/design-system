import { describe, it, expect } from 'vitest'
import { sectionFor } from 'src/common/nav'
import { importantLinksFor } from './importantLinks'

const hrefs = (path: string) => importantLinksFor(sectionFor(path)).map((entry) => entry.href)

describe('importantLinksFor', () => {
  it('starts the design system with how to install it, then how to use it', () => {
    const links = hrefs('/react/')
    expect(links.slice(0, 3)).toEqual([
      '/react/installation/',
      '/react/usage/',
      '/react/components/',
    ])
  })

  it('names the design-system pages that matter, and no specs page', () => {
    const labels = importantLinksFor(sectionFor('/react/')).map((entry) => entry.label)
    expect(labels).toEqual(
      expect.arrayContaining(['Theme', 'How to customize', 'Button', 'TextInput', 'Tabs'])
    )
    expect(importantLinksFor(sectionFor('/react/')).some((e) => e.group === 'Specs')).toBe(false)
  })

  it('has links for the markdown and the styled-system sections, from their own pages', () => {
    expect(hrefs('/react/markdown/')[0]).toBe('/react/markdown/')
    expect(hrefs('/react/markdown/')).toContain('/react/markdown/Preview/')
    expect(hrefs('/styled-system/')).toEqual(['/styled-system/'])
  })

  it('skips a page the section does not list', () => {
    const section = { ...sectionFor('/react/markdown/'), groups: [] }
    expect(importantLinksFor(section)).toEqual([])
  })

  it('lists each page once, every one a page the section has', () => {
    for (const path of ['/react/', '/react/markdown/']) {
      const links = hrefs(path)
      expect(new Set(links).size).toBe(links.length)
      expect(links.length).toBeGreaterThan(3)
    }
  })
})
