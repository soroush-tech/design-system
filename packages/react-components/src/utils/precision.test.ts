import { describe, it, expect } from 'vitest'
import { addExact, getDecimalPrecision, roundToPrecision, snapToStep } from './precision'

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

describe('addExact', () => {
  it('adds without float noise', () => {
    expect(addExact(0.1, 0.2)).toBe(0.3)
    expect(addExact(1, -0.1)).toBe(0.9)
    expect(addExact(10, 1)).toBe(11)
  })
})

describe('snapToStep', () => {
  it('lands on the grid of the step, counted from the origin', () => {
    expect(snapToStep(7, 5, 0)).toBe(5)
    expect(snapToStep(8, 5, 0)).toBe(10)
    expect(snapToStep(7, 5, 2)).toBe(7)
    expect(snapToStep(0.34, 0.1, 0)).toBe(0.3)
  })
})
