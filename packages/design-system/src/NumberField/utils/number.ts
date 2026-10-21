import { getDecimalPrecision } from '../../utils/precision'

/** What a number is shown as unless told otherwise: all its digits, ungrouped, so typing round-trips. */
export const DEFAULT_FORMAT: Intl.NumberFormatOptions = {
  useGrouping: false,
  maximumFractionDigits: 20,
}

export interface NumberSyntax {
  /** The character a locale puts between the whole and the fraction. */
  decimal: string
  /** Its digits, 0 to 9 - which are not always 0 to 9. */
  digits: string[]
  /** Whether the format reads as a percent: `50%` is `0.5`. */
  isPercent: boolean
}

/** The syntax a locale and format write a number in. */
export function getNumberSyntax(locale?: string, format?: Intl.NumberFormatOptions): NumberSyntax {
  // The marks are the locale's, whatever the format - so a format with no fraction can't break the probe.
  const probe = new Intl.NumberFormat(locale, {
    useGrouping: false,
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
  const digitFormat = new Intl.NumberFormat(locale, { useGrouping: false })
  return {
    decimal: probe.formatToParts(1.1).find((part) => part.type === 'decimal')!.value,
    digits: Array.from({ length: 10 }, (_, digit) => digitFormat.format(digit)),
    isPercent: format?.style === 'percent',
  }
}

/** The number as its locale and format write it. */
export function formatNumber(value: number, locale?: string, format?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, { ...DEFAULT_FORMAT, ...format }).format(value)
}

// A minus the way a locale or a keyboard writes it: the true minus sign, a figure dash, an en and an em dash.
const MINUS = new RegExp(
  `[${[0x2212, 0x2012, 0x2013, 0x2014].map((code) => String.fromCodePoint(code)).join('')}]`,
  'g'
)

/**
 * The number a text stands for - `null` when it stands for none: its locale's digits and decimal
 * mark, a leading minus, a percent's `%` (so `50%` is `0.5`). Group marks, spaces and symbols
 * round it are ignored.
 */
export function parseNumber(text: string, syntax: NumberSyntax): number | null {
  let normalized = text.replace(MINUS, '-')
  syntax.digits.forEach((digit, index) => {
    normalized = normalized.split(digit).join(String(index))
  })
  const isNegative = normalized.includes('-')
  const [whole = '', ...fraction] = normalized.split(syntax.decimal)
  const digits = (text: string) => text.replaceAll(/\D/g, '')
  const wholeDigits = digits(whole)
  const fractionDigits = fraction.map(digits).join('')
  if (wholeDigits === '' && fractionDigits === '') return null
  const parsed = Number(`${wholeDigits || '0'}.${fractionDigits || '0'}`)
  const signed = isNegative ? -parsed : parsed
  return syntax.isPercent ? Number((signed / 100).toFixed(getDecimalPrecision(parsed) + 2)) : signed
}

/** The number moved by `delta`, with no float noise - `0.1 + 0.2` is `0.3`. */
export function addExact(value: number, delta: number): number {
  const decimals = Math.max(getDecimalPrecision(value), getDecimalPrecision(delta))
  return Number((value + delta).toFixed(decimals))
}

/** The nearest number on the grid of `step`, counted from `origin`. */
export function snapToStep(value: number, step: number, origin: number): number {
  const decimals = Math.max(getDecimalPrecision(step), getDecimalPrecision(origin))
  return Number((Math.round((value - origin) / step) * step + origin).toFixed(decimals))
}
