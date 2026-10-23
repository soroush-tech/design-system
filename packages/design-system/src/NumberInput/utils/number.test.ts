import { describe, it, expect } from 'vitest'
import { formatNumber, getNumberSyntax, parseNumber } from './number'

describe('formatNumber', () => {
  it('writes every digit, ungrouped, by default', () => {
    expect(formatNumber(1234567.891, 'en-US')).toBe('1234567.891')
    expect(formatNumber(0.0001, 'en-US')).toBe('0.0001')
  })

  it("follows its locale's decimal mark and digits", () => {
    expect(formatNumber(1.5, 'de-DE')).toBe('1,5')
    expect(formatNumber(12, 'ar-EG')).toBe('١٢')
  })

  it('takes a format of its own over the default', () => {
    expect(formatNumber(1234.5, 'en-US', { useGrouping: true })).toBe('1,234.5')
    expect(formatNumber(0.5, 'en-US', { style: 'percent' })).toBe('50%')
    expect(formatNumber(2, 'en-US', { minimumFractionDigits: 2 })).toBe('2.00')
  })
})

describe('parseNumber', () => {
  const english = getNumberSyntax('en-US')

  it('reads whole and fractional numbers, signed', () => {
    expect(parseNumber('12', english)).toBe(12)
    expect(parseNumber('12.5', english)).toBe(12.5)
    expect(parseNumber('-3.25', english)).toBe(-3.25)
    expect(parseNumber('.5', english)).toBe(0.5)
    expect(parseNumber('7.', english)).toBe(7)
  })

  it('reads a minus the way a keyboard or a locale writes it', () => {
    expect(parseNumber(`${String.fromCodePoint(0x2212)}3`, english)).toBe(-3)
  })

  it('ignores group marks, spaces and symbols', () => {
    expect(parseNumber('1,234.5', english)).toBe(1234.5)
    expect(parseNumber('$ 1 200', english)).toBe(1200)
  })

  it("reads a locale's decimal mark and digits", () => {
    expect(parseNumber('1,5', getNumberSyntax('de-DE'))).toBe(1.5)
    expect(parseNumber('١٢٫٥', getNumberSyntax('ar-EG'))).toBe(12.5)
  })

  it('reads a percent as its fraction', () => {
    const percent = getNumberSyntax('en-US', { style: 'percent' })
    expect(parseNumber('50%', percent)).toBe(0.5)
    expect(parseNumber('12.5', percent)).toBe(0.125)
  })

  it('has no number for text with no digits', () => {
    expect(parseNumber('', english)).toBeNull()
    expect(parseNumber('-', english)).toBeNull()
    expect(parseNumber('abc', english)).toBeNull()
    expect(parseNumber('.', english)).toBeNull()
  })
})

describe('getNumberSyntax', () => {
  it('names the decimal mark, the digits and whether it is a percent', () => {
    expect(getNumberSyntax('en-US')).toMatchObject({ decimal: '.', isPercent: false })
    expect(getNumberSyntax('de-DE').decimal).toBe(',')
    expect(getNumberSyntax('en-US').digits).toEqual([
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ])
    expect(getNumberSyntax('en-US', { style: 'percent' }).isPercent).toBe(true)
  })

  it('is the same for a format with no fraction, which must not break it', () => {
    expect(getNumberSyntax('de-DE', { maximumFractionDigits: 0 }).decimal).toBe(',')
  })
})
