import { describe, it, expect } from 'vitest'
import { getDecimalPrecision, getHoverValue, roundToPrecision } from './precision'

describe('getDecimalPrecision', () => {
  it.each([
    [1, 0],
    [10, 0],
    [0.5, 1],
    [0.25, 2],
    [1.5, 1],
    [1e-8, 8],
    [2.5e-8, 9],
  ])('counts the decimals of %s as %s', (step, decimals) => {
    expect(getDecimalPrecision(step)).toBe(decimals)
  })
})

describe('roundToPrecision', () => {
  it('rounds to the nearest step, without float noise', () => {
    expect(roundToPrecision(2.3, 0.5)).toBe(2.5)
    expect(roundToPrecision(2.2, 0.5)).toBe(2)
    expect(roundToPrecision(0.3, 0.1)).toBe(0.3)
    expect(roundToPrecision(4.6, 1)).toBe(5)
  })

  it('leaves no value as none', () => {
    expect(roundToPrecision(null, 0.5)).toBeNull()
  })
})

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
