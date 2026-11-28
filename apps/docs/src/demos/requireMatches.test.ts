import { describe, expect, it } from 'vitest'
import { requireMatches } from './requireMatches'

describe('requireMatches', () => {
  it('returns the matches it was given', () => {
    const matches = { 'a.ts': 1 }
    expect(requireMatches('src/*.ts', matches)).toBe(matches)
  })

  it('throws, naming the glob, when nothing matched', () => {
    expect(() => requireMatches('packages/nowhere/src/*.ts', {})).toThrow(
      "import.meta.glob('packages/nowhere/src/*.ts') matched no files"
    )
  })
})
