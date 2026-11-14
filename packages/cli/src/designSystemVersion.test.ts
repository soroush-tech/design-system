// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { getDesignSystemVersion } from './designSystemVersion'

describe('getDesignSystemVersion', () => {
  it('keeps the version a stable cli was built next to', () => {
    expect(getDesignSystemVersion('2.3.0', '0.2.0')).toBe('2.3.0')
  })

  it("asks a prerelease cli's own channel of the design system", () => {
    expect(getDesignSystemVersion('2.3.0', '0.2.0-alpha.0')).toBe('2.3.0-alpha.0')
    expect(getDesignSystemVersion('2.3.0', '0.2.0-rc.4')).toBe('2.3.0-rc.0')
  })

  it('keeps a design system version that is a prerelease already', () => {
    expect(getDesignSystemVersion('2.3.0-alpha.2', '0.2.0-alpha.1')).toBe('2.3.0-alpha.2')
  })
})
