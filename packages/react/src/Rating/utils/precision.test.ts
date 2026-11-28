import { describe, it, expect } from 'vitest'
import { getHoverValue } from './precision'

describe('getHoverValue', () => {
  const params = { width: 100, max: 5, precision: 1 }

  it('is the item under the pointer, by whole steps', () => {
    expect(getHoverValue({ ...params, offset: 5 })).toBe(1)
    expect(getHoverValue({ ...params, offset: 50 })).toBe(3)
    expect(getHoverValue({ ...params, offset: 95 })).toBe(5)
  })

  it('goes by halves with a finer precision', () => {
    expect(getHoverValue({ ...params, precision: 0.5, offset: 12 })).toBe(1)
    expect(getHoverValue({ ...params, precision: 0.5, offset: 22 })).toBe(1.5)
  })

  it('stays between one step and max', () => {
    expect(getHoverValue({ ...params, offset: -40 })).toBe(1)
    expect(getHoverValue({ ...params, offset: 400 })).toBe(5)
  })
})
