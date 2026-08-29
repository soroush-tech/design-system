import { describe, it, expect } from 'vitest'
import { tokenPath } from './tokenPath'

describe('tokenPath', () => {
  it('joins a scale and a leaf path with a dot', () => {
    expect(tokenPath('space', 'sm')).toBe('space.sm')
    expect(tokenPath('palette', 'primary.main')).toBe('palette.primary.main')
  })

  it('drops the empty path a scalar scale carries, leaving no trailing dot', () => {
    expect(tokenPath('blur', '')).toBe('blur')
    expect(tokenPath('logoFilter', '')).toBe('logoFilter')
  })

  it('is empty when nothing is left to join', () => {
    expect(tokenPath('', '')).toBe('')
  })
})
