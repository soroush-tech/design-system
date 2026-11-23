import { describe, it, expect, vi, afterEach } from 'vitest'
import { sectionPrerender, sectionRoute } from './sectionRoute'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('in the browser', () => {
  // Client routing serves +route.ts to the browser in dev, where `process` is absent -
  // both helpers must fall back to the live layout instead of crashing hydration.
  it('falls back to the live layout without a process global', () => {
    vi.stubGlobal('process', undefined)
    expect(sectionRoute('react', '/@name')).toBe('/react/@name')
    expect(sectionPrerender('markdown')).toBe(true)
  })
})

describe('sectionRoute', () => {
  it('prefixes the section on the live site', () => {
    vi.stubEnv('DOCS_SECTION', '')
    expect(sectionRoute('react', '/@name')).toBe('/react/@name')
    expect(sectionRoute('markdown', '/')).toBe('/react/markdown')
    expect(sectionRoute('markdown', '/@name')).toBe('/react/markdown/@name')
  })

  it('drops the prefix inside the section snapshot build', () => {
    vi.stubEnv('DOCS_SECTION', 'react')
    expect(sectionRoute('react', '/@name')).toBe('/@name')
    expect(sectionRoute('markdown', '/')).toBe('/react/markdown')
  })
})

describe('sectionPrerender', () => {
  it('prerenders everything on the live site', () => {
    vi.stubEnv('DOCS_SECTION', '')
    expect(sectionPrerender('react')).toBe(true)
    expect(sectionPrerender('markdown')).toBe(true)
  })

  it('prerenders only the snapshot section', () => {
    vi.stubEnv('DOCS_SECTION', 'markdown')
    expect(sectionPrerender('markdown')).toBe(true)
    expect(sectionPrerender('react')).toBe(false)
  })
})
