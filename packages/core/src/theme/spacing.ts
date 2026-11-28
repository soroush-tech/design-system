/** The default `theme.space` steps. Kept for back-compat; `spacing()` accepts any
 * number so values can be built for consumer-augmented space keys. */
export type SpaceUnits =
  | 0
  | 0.125
  | 0.25
  | 0.5
  | 0.75
  | 1
  | 1.25
  | 1.5
  | 1.75
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10

// Whole pixels, so no step renders as a sub-pixel or vanishing line, and never below 1px for a
// non-zero step. Every default step is exact on the 8px unit; the rounding only matters for
// steps built for other values.
export const spacing = (units: number) =>
  units === 0 ? '0px' : `${Math.max(1, Math.round(8 * units))}px`
