import { describe, expect, it } from 'vitest'
import { APP_PACKAGE, APP_PACKAGE_VERSION, PACKAGE_VERSIONS } from './packageVersions'

describe('packageVersions', () => {
  it('names the umbrella an app installs and imports from, with its own version', () => {
    expect(APP_PACKAGE).toBe('@soroush.design/react')
    expect(APP_PACKAGE_VERSION).toMatch(/^\d+\.\d+\.\d+/)
  })

  it('keeps the component library as the version of the design-system section', () => {
    expect(PACKAGE_VERSIONS.react).toMatch(/^\d+\.\d+\.\d+/)
  })
})
