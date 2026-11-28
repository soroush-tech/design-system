import { describe, expect, it } from 'vitest'
import {
  APP_PACKAGE,
  APP_PACKAGE_VERSION,
  CORE_PACKAGE,
  CORE_PACKAGE_VERSION,
  PACKAGE_VERSIONS,
} from './packageVersions'

describe('packageVersions', () => {
  it('names the package an app installs and imports from, with its own version', () => {
    expect(APP_PACKAGE).toBe('@gild-ui/react')
    expect(APP_PACKAGE_VERSION).toMatch(/^\d+\.\d+\.\d+/)
    expect(CORE_PACKAGE).toBe('@gild-ui/core')
    expect(CORE_PACKAGE_VERSION).toMatch(/^\d+\.\d+\.\d+/)
  })

  it('keeps the React package as the version of the design-system section', () => {
    expect(PACKAGE_VERSIONS.react).toMatch(/^\d+\.\d+\.\d+/)
  })
})
