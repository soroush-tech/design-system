import { describe, it, expect, vi, afterEach } from 'vitest'
import { sectionPath } from './sectionPath'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('sectionPath', () => {
  it('prefixes the package on the live site', () => {
    vi.stubEnv('PUBLIC_ENV__DOCS_SECTION', '')
    expect(sectionPath('design-system', '/components/button/')).toBe(
      '/design-system/components/button/'
    )
    expect(sectionPath('markdown', '/')).toBe('/markdown/')
  })

  it('rides the vite base inside the section snapshot build', () => {
    vi.stubEnv('PUBLIC_ENV__DOCS_SECTION', 'design-system')
    vi.stubEnv('BASE_URL', '/design-system/1.3.3/')
    expect(sectionPath('design-system', '/components/button/')).toBe(
      '/design-system/1.3.3/components/button/'
    )
    // Cross-section links escape the snapshot to the live site.
    expect(sectionPath('markdown', '/')).toBe('/markdown/')
  })
})
