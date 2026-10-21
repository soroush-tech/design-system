/** How many decimals a step has - `1e-8` has eight, `0.5` one, `1` none. */
export function getDecimalPrecision(step: number): number {
  const [mantissa, exponent] = step.toExponential().split('e')
  const decimals = (mantissa.split('.')[1] ?? '').length
  // A step below 1 has decimals from its exponent as well; a larger one has none from it.
  return Math.max(0, decimals - Number(exponent))
}

/** The value rounded to the nearest step of `precision` - `null` stays `null`. */
export function roundToPrecision(value: number | null, precision: number): number | null {
  if (value === null) return null
  const nearest = Math.round(value / precision) * precision
  return Number(nearest.toFixed(getDecimalPrecision(precision)))
}
