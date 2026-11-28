import { describe, it, expect } from 'vitest'
import { getShapeRadius } from './getShapeRadius'

describe('getShapeRadius', () => {
  it('is none for square, a full round for pill, and the given radius for rounded', () => {
    expect(getShapeRadius('square', '8px')).toBe(0)
    expect(getShapeRadius('pill', '8px')).toBe('9999px')
    expect(getShapeRadius('rounded', '8px')).toBe('8px')
  })
})
