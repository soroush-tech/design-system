import { describe, expect, it } from 'vitest'
import { compareVersions, matchesRange, readRangeMinimum, toDeclaredRange } from './versions'

describe('compareVersions', () => {
  it('orders by major, minor and patch, and finds equal versions equal', () => {
    expect(compareVersions('1.0.0', '2.0.0')).toBe(-1)
    expect(compareVersions('1.3.0', '1.2.9')).toBe(1)
    expect(compareVersions('1.2.3', '1.2.4')).toBe(-1)
    expect(compareVersions('1.2.3', '1.2.3')).toBe(0)
    expect(compareVersions('1.2.3+build', '1.2.3')).toBe(0)
  })

  it('puts a prerelease before its release, and orders prereleases by their parts', () => {
    expect(compareVersions('0.1.0-alpha.1', '0.1.0')).toBe(-1)
    expect(compareVersions('0.1.0', '0.1.0-rc.1')).toBe(1)
    expect(compareVersions('0.1.0-alpha.2', '0.1.0-alpha.10')).toBe(-1)
    expect(compareVersions('0.1.0-alpha.1', '0.1.0-beta.1')).toBe(-1)
    expect(compareVersions('0.1.0-alpha', '0.1.0-alpha.1')).toBe(-1)
    expect(compareVersions('0.1.0-alpha.1', '0.1.0-alpha')).toBe(1)
    expect(compareVersions('0.1.0-1', '0.1.0-alpha')).toBe(-1)
    expect(compareVersions('0.1.0-alpha', '0.1.0-1')).toBe(1)
    expect(compareVersions('0.1.0-rc.1', '0.1.0-rc.1')).toBe(0)
  })

  it('throws on text that is not a version', () => {
    expect(() => compareVersions('one', '1.0.0')).toThrow('migrate cannot read the version one')
  })
})

describe('matchesRange', () => {
  it('matches the numbers a range names, and any where it has x', () => {
    expect(matchesRange('2.2.0', '2.x')).toBe(true)
    expect(matchesRange('3.0.0', '2.x')).toBe(false)
    expect(matchesRange('0.1.4', '0.1.x')).toBe(true)
    expect(matchesRange('0.2.0', '0.1.x')).toBe(false)
    expect(matchesRange('1.2.3', '1.2.3')).toBe(true)
    expect(matchesRange('1.2.4', '1.2.3')).toBe(false)
    expect(matchesRange('9.9.9', 'x')).toBe(true)
    expect(matchesRange('2.0.0-alpha.1', '2.x')).toBe(true)
  })

  it('throws on a range of another shape', () => {
    expect(() => matchesRange('1.0.0', '^1.0.0')).toThrow('migrate cannot read the range ^1.0.0')
  })
})

describe('readRangeMinimum', () => {
  it('reads the first version of a range, in full', () => {
    expect(readRangeMinimum('^2.1.0')).toBe('2.1.0')
    expect(readRangeMinimum('~0.1.0-alpha.2')).toBe('0.1.0-alpha.2')
    expect(readRangeMinimum('>=1 <3')).toBe('1.0.0')
    expect(readRangeMinimum('2.3')).toBe('2.3.0')
    expect(readRangeMinimum('^2-beta')).toBe('2.0.0')
  })

  it('gives undefined for a range with no version', () => {
    expect(readRangeMinimum('latest')).toBeUndefined()
    expect(readRangeMinimum('workspace:*')).toBeUndefined()
  })
})

describe('toDeclaredRange', () => {
  it('declares a release with a caret and a prerelease exactly', () => {
    expect(toDeclaredRange('0.1.0')).toBe('^0.1.0')
    expect(toDeclaredRange('0.1.0-alpha.1')).toBe('0.1.0-alpha.1')
  })
})
