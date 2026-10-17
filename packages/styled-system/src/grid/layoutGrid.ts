import {
  get,
  system,
  type Parser,
  type Props,
  type StyleObject,
} from '@soroush.tech/styled-system/core'
import { responsiveQueries, type Breakpoints } from '../core/media'

/** The layout grid at one breakpoint - the `content` part of a `theme.layout` entry. */
export interface LayoutGridEntry {
  /** Equal columns. */
  columns?: number
  /** Inline padding - a `theme.space` key or a CSS length. */
  margin?: string | number
  /** Gap between columns - a `theme.space` key or a CSS length. Set per element with `gap`. */
  gutter?: string | number
  /** `fluid` spans the space; `fixed` is a container centred at `maxWidth`. */
  mode?: 'fluid' | 'fixed'
  maxWidth?: string | number
}

/**
 * `true` for the theme's layout grid, or an entry: its fields replace the theme's at every
 * breakpoint, and entries under breakpoint names replace it from that breakpoint up.
 */
export type LayoutGridValue =
  | boolean
  | Record<string, LayoutGridEntry | LayoutGridEntry[keyof LayoutGridEntry]>

/** A `gap` / `columnGap` value: one value, an array by breakpoint position, or an object by name. */
export type LayoutGridGap =
  | string
  | number
  | null
  | undefined
  | Array<string | number | null>
  | Record<string, string | number | null>

// What one parser writes: the page frame (margin, max width), or the column grid on top of it.
type LayoutPart = 'frame' | 'grid'

const spaceValue = (theme: unknown, value: string | number) => {
  const resolved = get(theme, `space.${value}`, value) as string | number
  return typeof resolved === 'number' ? `${resolved}px` : resolved
}

// The frame: inline margin, and in fixed mode a centred max width. The centring margin is
// computed rather than `auto`, so a fixed frame that is a grid or flex item still stretches -
// auto margins would shrink it to its content.
const frameDeclarations = (theme: unknown, { margin, mode, maxWidth }: LayoutGridEntry) => {
  const width = mode === 'fixed' && maxWidth !== undefined ? spaceValue(theme, maxWidth) : undefined
  return {
    paddingInline: margin === undefined ? undefined : spaceValue(theme, margin),
    maxWidth: width ?? 'none',
    marginInline: width === undefined ? 0 : `max(0px, calc((100% - ${width}) / 2))`,
  }
}

const gridDeclarations = (theme: unknown, { columns, gutter }: LayoutGridEntry) => ({
  gridTemplateColumns: columns === undefined ? undefined : `repeat(${columns}, minmax(0, 1fr))`,
  columnGap: gutter === undefined ? undefined : spaceValue(theme, gutter),
})

const declarations = (theme: unknown, part: LayoutPart, entry: LayoutGridEntry) => {
  const styles: StyleObject =
    part === 'frame' ? frameDeclarations(theme, entry) : gridDeclarations(theme, entry)
  return Object.fromEntries(Object.entries(styles).filter(([, value]) => value !== undefined))
}

// The element's own `gap` as the gutter: one value is a field for every breakpoint; an array
// (by position) or an object (by name) gives entries, each from its breakpoint up.
const gapAsGutter = (
  breakpoints: Breakpoints,
  gap: LayoutGridGap
): { field: LayoutGridEntry; entries: Record<string, LayoutGridEntry> } => {
  if (gap === undefined || gap === null) return { field: {}, entries: {} }
  if (typeof gap !== 'object') return { field: { gutter: gap }, entries: {} }
  const names = Object.keys(breakpoints)
  const pairs = Array.isArray(gap)
    ? gap.map((value, index) => [names[index], value] as const)
    : Object.entries(gap)
  const entries: Record<string, LayoutGridEntry> = {}
  for (const [name, value] of pairs) {
    if (name !== undefined && value !== null) entries[name] = { gutter: value }
  }
  return { field: {}, entries }
}

const layoutStyles = (
  theme: unknown,
  value: LayoutGridValue | undefined,
  part: LayoutPart,
  gap?: LayoutGridGap
) => {
  if (!value) return {}
  const breakpoints = get(theme, 'breakpoints', {}) as Breakpoints
  const layout = get(theme, 'layout', {}) as Record<string, { content?: LayoutGridEntry }>
  // Numbers and strings are fields for every breakpoint; objects are entries for the one they name.
  const fields = typeof value === 'object' ? Object.entries(value) : []
  const named = Object.fromEntries(
    fields.filter(([, field]) => typeof field === 'object')
  ) as Record<string, LayoutGridEntry>
  const fromGap = gapAsGutter(breakpoints, gap)
  const everywhere: LayoutGridEntry = {
    ...Object.fromEntries(fields.filter(([, field]) => typeof field !== 'object')),
    ...fromGap.field,
  }
  const hasEverywhere = Object.keys(everywhere).length > 0
  const { keyed } = responsiveQueries(breakpoints)
  const styles: StyleObject = part === 'grid' ? { display: 'grid' } : {}
  let themed: LayoutGridEntry = {}
  let carried: LayoutGridEntry = {}
  Object.keys(breakpoints).forEach((key, index) => {
    const layer = layout[key]?.content
    const entry = Object.hasOwn(named, key) ? named[key] : undefined
    const gapEntry = Object.hasOwn(fromGap.entries, key) ? fromGap.entries[key] : undefined
    themed = { ...themed, ...layer }
    // Mobile-first: an entry holds from its breakpoint up, until a later one replaces it.
    carried = { ...carried, ...entry, ...gapEntry }
    // A block wherever something changes - the min-width query carries it up to the next one.
    if (layer || entry || gapEntry || (index === 0 && hasEverywhere)) {
      const block = declarations(theme, part, { ...themed, ...everywhere, ...carried })
      const media = keyed.get(key)
      if (media) styles[media] = block
      else Object.assign(styles, block)
    }
  })
  return styles
}

/**
 * The layout grid from `theme.layout`, per breakpoint: each breakpoint's `content` (columns,
 * margin, gutter, fluid or fixed), mobile-first. A field in `value` replaces the theme's at
 * every breakpoint (`{ maxWidth: '1280px' }`); an entry under a breakpoint name replaces it
 * from that breakpoint up, on top of those fields (`{ lg: { columns: 16 } }`). `gap` - the
 * element's own `gap` / `columnGap` - sets the gutter the same way, single or responsive; where
 * it is not set, the theme's gutter applies. Every written block carries the full set, so no
 * block inherits a stale `max-width`. Rows take `rowGap` (or `gap`'s row half), never the layout.
 */
export const layoutGridStyles = (
  theme: unknown,
  value: LayoutGridValue | undefined,
  gap?: LayoutGridGap
) => {
  const grid = layoutStyles(theme, value, 'grid', gap)
  const frame = layoutStyles(theme, value, 'frame')
  for (const [key, block] of Object.entries(frame)) {
    grid[key] = key.startsWith('@') ? { ...(grid[key] as StyleObject), ...block } : block
  }
  return grid
}

/**
 * The `layout` prop as the page frame alone: the margin and, in fixed mode, the centred max
 * width per breakpoint - no columns, and `display` is left alone. Every View-based component
 * takes it; compose it with `layoutGrid` for the columns.
 */
export const layoutFrame = Object.assign(
  (props: Props) => layoutStyles(props.theme, props.layout as LayoutGridValue, 'frame'),
  { config: {}, propNames: ['layout'], cache: {} }
) as unknown as Parser

/**
 * The `layout` prop's columns on a grid container: the tracks and the gutter. The gutter is the
 * element's own `columnGap` or `gap` where it sets one, the theme's elsewhere - so `column-gap`
 * has a single source and an explicit gap is never silently replaced.
 */
export const layoutGrid = Object.assign(
  (props: Props) =>
    layoutStyles(
      props.theme,
      props.layout as LayoutGridValue,
      'grid',
      (props.columnGap ?? props.gap) as LayoutGridGap
    ),
  { config: {}, propNames: ['layout'], cache: {} }
) as unknown as Parser

/**
 * The `span` prop: how many columns of a grid an element takes - `grid-column: span N` - or
 * `span="full"` for the whole row whatever the column count. Responsive like any prop:
 * `span={{ xs: 'full', md: 6 }}`.
 */
export const span = system({
  span: (n: number | 'full') => ({ gridColumn: n === 'full' ? '1 / -1' : `span ${n}` }),
})
