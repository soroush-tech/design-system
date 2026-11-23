/**
 * `theme.breakpoints`: an ascending list, or named breakpoints in their declared order.
 * Each value is where its range starts; the range holds until the next breakpoint. A
 * breakpoint that starts at 0 (`xs: '0px'`) is the base: it applies everywhere until the
 * next one overrides it.
 */
export type Breakpoints = readonly (string | number)[] | Record<string, string | number>

/** A breakpoint name, or a width: a number (px) or any CSS length. */
export type BreakpointInput = string | number

/** `up` / `down` / `only` / `between` / `not` - each returns an at-rule in range syntax. */
export interface QueryHelpers {
  /** From this breakpoint or width up: `@media (width >= 840px)`. */
  up: (from: BreakpointInput) => string
  /** Below this breakpoint or width: `@media (width < 840px)`. */
  down: (to: BreakpointInput) => string
  /** This breakpoint's range, up to the next one: `@media (840px <= width < 1200px)`. */
  only: (key: string) => string
  /** From the first up to the second: `@media (600px <= width < 1200px)`. */
  between: (from: BreakpointInput, to: BreakpointInput) => string
  /** Everywhere but this breakpoint's range: `@media (width < 840px), (width >= 1200px)`. */
  not: (key: string) => string
}

/** Container queries: the helpers unnamed, or `containerQueries('sidebar').up(400)` for a named container. */
export interface ContainerQueries extends QueryHelpers {
  (name: string): QueryHelpers
}

// A width a range can be measured against: a number, a dimension, or a math function.
const isLength = (value: string) => /^[\d.+-]|^(calc|min|max|clamp)\(/.test(value)

const toLength = (value: string | number) => (typeof value === 'number' ? `${value}px` : value)

// A breakpoint that starts at 0 is the base: it needs no query.
const isZero = (value: string | number) =>
  typeof value === 'number' ? value === 0 : isLength(value) && Number.parseFloat(value) === 0

/**
 * The `@media` rule for one breakpoint value, from its start up: a length (a number gets
 * `px`) becomes `@media (width >= <length>)`, and `null` when it starts at 0; a value
 * starting with `@media` is used as written; anything else - a condition such as
 * `(orientation: landscape)`, or a media type - follows `@media `.
 */
export const createMediaQuery = (value: string | number): string | null => {
  if (isZero(value)) return null
  if (typeof value === 'number') return `@media (width >= ${value}px)`
  if (value.startsWith('@media')) return value
  if (isLength(value)) return `@media (width >= ${value})`
  return `@media ${value}`
}

/** Each breakpoint's `@media` rule (`null` for the base), in declared order, keyed by name or index. */
export const breakpointQueries = (breakpoints: Breakpoints): [string, string | null][] =>
  Object.entries(breakpoints).map(([key, value]) => [key, createMediaQuery(value)])

/** `xs` -> `cqXs`: the prop key for a container query from a breakpoint up. */
export const containerKey = (key: string) => `cq${key.charAt(0).toUpperCase()}${key.slice(1)}`

const createQueryHelpers = (breakpoints: Breakpoints, prefix: string): QueryHelpers => {
  const entries = Object.entries(breakpoints)
  const width = (input: BreakpointInput) => {
    if (typeof input === 'number') return `${input}px`
    const entry = entries.find(([key]) => key === input)
    if (entry) {
      const value = String(toLength(entry[1]))
      if (!isLength(value)) throw new Error(`Breakpoint "${input}" is not a width: ${value}`)
      return value
    }
    if (isLength(input)) return input
    throw new Error(`Unknown breakpoint "${input}"`)
  }
  const next = (key: string) => {
    const index = entries.findIndex(([name]) => name === key)
    if (index === -1) throw new Error(`Unknown breakpoint "${key}"`)
    return index + 1 < entries.length ? entries[index + 1][0] : undefined
  }
  const query = (condition: string) => `${prefix} ${condition}`
  // A range from `from` (inclusive) to `to` (exclusive); a 0 start or a missing end drops that side.
  const range = (from: string, to?: string) => {
    if (to === undefined) return `(width >= ${from})`
    return isZero(from) ? `(width < ${to})` : `(${from} <= width < ${to})`
  }
  return {
    up: (from) => query(`(width >= ${width(from)})`),
    down: (to) => query(`(width < ${width(to)})`),
    only: (key) => {
      const end = next(key)
      return query(range(width(key), end === undefined ? undefined : width(end)))
    },
    between: (from, to) => query(range(width(from), width(to))),
    not: (key) => {
      const start = width(key)
      const end = next(key)
      const below = isZero(start) ? [] : [`(width < ${start})`]
      const above = end === undefined ? [] : [`(width >= ${width(end)})`]
      return query([...below, ...above].join(', ') || 'not all')
    },
  }
}

/** `up` / `down` / `only` / `between` / `not` as `@media` rules over a breakpoint scale. */
export const createMediaHelpers = (breakpoints: Breakpoints): QueryHelpers =>
  createQueryHelpers(breakpoints, '@media')

/** The same helpers as `@container` rules; call it with a name for a named container. */
export const createContainerQueries = (breakpoints: Breakpoints): ContainerQueries =>
  Object.assign(
    (name: string) => createQueryHelpers(breakpoints, `@container ${name}`),
    createQueryHelpers(breakpoints, '@container')
  )

/** What a scale's responsive values compile to - shared by the prop parsers and `css()`. */
export interface ResponsiveQueries {
  /** One query per array position; `null` is the base. */
  array: (string | null)[]
  /** Object keys: breakpoint names (`null` for the base) and their `cq<Name>` container keys. */
  keyed: Map<string, string | null>
  /** Every query in cascade order: the media blocks in breakpoint order, then the container blocks. */
  order: string[]
}

export const responsiveQueries = (breakpoints: Breakpoints): ResponsiveQueries => {
  const queries = breakpointQueries(breakpoints)
  const media = queries.map(([, query]) => query)
  const keyed = new Map<string, string | null>(queries)
  const containers: string[] = []
  for (const [key, value] of Object.entries(breakpoints)) {
    const length = String(toLength(value))
    if (!isLength(length)) continue
    const query = `@container (width >= ${length})`
    keyed.set(containerKey(key), query)
    containers.push(query)
  }
  return {
    // A scale whose first breakpoint starts at 0 maps position 0 onto it; otherwise position 0 is the base.
    array: media[0] === null ? media : [null, ...media],
    keyed,
    order: [...media.filter((query): query is string => query !== null), ...containers],
  }
}
