import { describe, it, expect } from 'vitest'
import { spacing } from './spacing'

describe('spacing', () => {
  it('should return correct spacing in px', () => {
    expect(spacing(0)).toBe('0px')
    expect(spacing(0.125)).toBe('1px')
    expect(spacing(0.25)).toBe('2px')
    expect(spacing(0.5)).toBe('4px')
    expect(spacing(0.75)).toBe('6px')
    expect(spacing(1)).toBe('8px')
    expect(spacing(1.25)).toBe('10px')
    expect(spacing(1.5)).toBe('12px')
    expect(spacing(1.75)).toBe('14px')
    expect(spacing(2)).toBe('16px')
    expect(spacing(3)).toBe('24px')
    expect(spacing(4)).toBe('32px')
    expect(spacing(5)).toBe('40px')
    expect(spacing(6)).toBe('48px')
    expect(spacing(7)).toBe('56px')
    expect(spacing(8)).toBe('64px')
  })

  it('rounds to whole pixels, with a 1px floor for a non-zero step', () => {
    expect(spacing(0.3)).toBe('2px')
    expect(spacing(1.3)).toBe('10px')
    expect(spacing(0.01)).toBe('1px')
  })
})
