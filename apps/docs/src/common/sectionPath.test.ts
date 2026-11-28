import { describe, it, expect, vi, afterEach } from 'vitest'
import { sectionPath } from './sectionPath'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('sectionPath', () => {
  it('prefixes the package on the live site', () => {
    vi.stubEnv('PUBLIC_ENV__DOCS_SECTION', '')
    expect(sectionPath('react', '/Button/')).toBe('/react/Button/')
    expect(sectionPath('markdown', '/')).toBe('/react/markdown/')
  })

  it('rides the vite base inside the section snapshot build', () => {
    vi.stubEnv('PUBLIC_ENV__DOCS_SECTION', 'react')
    vi.stubEnv('BASE_URL', '/react/1.3.3/')
    expect(sectionPath('react', '/Button/')).toBe('/react/1.3.3/Button/')
    // Cross-section links escape the snapshot to the live site.
    expect(sectionPath('markdown', '/')).toBe('/react/markdown/')
  })
})
