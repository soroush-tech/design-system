const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Merges `overrides` onto `base`, recursing only where both sides are plain objects; arrays and
 * functions replace wholesale and `undefined` values are ignored. Neither argument is mutated.
 */
export const deepMerge = (
  base: Record<string, unknown>,
  overrides: Record<string, unknown>
): Record<string, unknown> => {
  const merged: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) {
      continue
    }
    const baseValue = merged[key]
    merged[key] =
      isPlainObject(baseValue) && isPlainObject(value) ? deepMerge(baseValue, value) : value
  }
  return merged
}
