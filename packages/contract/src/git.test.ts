import { describe, expect, it } from 'vitest'
import { findGit, GIT_LOCATIONS } from './git'

describe('findGit', () => {
  it('is the first location that exists', () => {
    expect(findGit(['/a', '/b', '/c'], (path) => path !== '/a')).toBe('/b')
  })

  it('throws, naming the locations, when git is in none of them', () => {
    expect(() => findGit(['/a', '/b'], () => false)).toThrow('not installed in /a, /b')
  })

  it('finds the git of this machine in the fixed locations', () => {
    expect(GIT_LOCATIONS).toContain(findGit())
  })
})
