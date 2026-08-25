import { describe, it, expect } from 'vitest'
import { compareSemver } from './compareSemver'

describe('compareSemver', () => {
  it('orders by major, minor, then patch', () => {
    expect(compareSemver('2.0.0', '1.9.9')).toBeGreaterThan(0)
    expect(compareSemver('1.3.0', '1.2.9')).toBeGreaterThan(0)
    expect(compareSemver('1.3.2', '1.3.3')).toBeLessThan(0)
    expect(compareSemver('1.3.3', '1.3.3')).toBe(0)
  })
})
