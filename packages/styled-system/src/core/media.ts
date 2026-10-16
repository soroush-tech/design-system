/** `theme.breakpoints`: an ascending list, or named breakpoints in their declared order. */
export type Breakpoints = readonly (string | number)[] | Record<string, string | number>

// A min-width length: a number, a dimension, or a math function over lengths.
const isLength = (value: string) => /^[\d.+-]|^(calc|min|max|clamp)\(/.test(value)

/**
 * The `@media` rule for one breakpoint value. A length is a min-width (a number
 * gets `px`); a string starting with `@media` is used as written; anything else
 * is a media query list - a condition like `(600px <= width < 1200px)` or
 * `(orientation: landscape)`, or a media type - and follows `@media `.
 */
export const createMediaQuery = (value: string | number): string => {
  if (typeof value === 'number') return `@media screen and (min-width: ${value}px)`
  if (value.startsWith('@media')) return value
  if (isLength(value)) return `@media screen and (min-width: ${value})`
  return `@media ${value}`
}

/** Each breakpoint's `@media` rule, in declared order, keyed by its name (or array index). */
export const breakpointQueries = (breakpoints: Breakpoints): [string, string][] =>
  Object.entries(breakpoints).map(([key, value]) => [key, createMediaQuery(value)])
