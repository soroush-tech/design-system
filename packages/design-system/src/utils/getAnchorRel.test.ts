import { describe, it, expect } from 'vitest'
import { getAnchorRel } from './getAnchorRel'

describe('getAnchorRel', () => {
  it('is noopener noreferrer for a new tab with no rel given', () => {
    expect(getAnchorRel('_blank', undefined)).toBe('noopener noreferrer')
  })

  it('keeps the rel given for a new tab', () => {
    expect(getAnchorRel('_blank', 'noopener')).toBe('noopener')
  })

  it('adds nothing when the anchor opens in the same tab', () => {
    expect(getAnchorRel('_self', undefined)).toBeUndefined()
    expect(getAnchorRel(undefined, undefined)).toBeUndefined()
  })
})
