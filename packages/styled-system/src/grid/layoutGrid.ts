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
  /** Gap between columns - a `theme.space` key or a CSS length. */
  gutter?: string | number
  /** `fluid` spans the space; `fixed` is a container centred at `maxWidth`. */
  mode?: 'fluid' | 'fixed'
  maxWidth?: string | number
}

/**
 * `true` for the theme's layout grid, or an entry: its fields replace the theme's at every
 * breakpoint, and entries under breakpoint names replace it at that breakpoint only.
 */
export type LayoutGridValue =
  | boolean
  | Record<string, LayoutGridEntry | LayoutGridEntry[keyof LayoutGridEntry]>

/** The container a layout grid is drawn on: column tracks, or a wrapping flex row. */
export type LayoutGridDisplay = 'grid' | 'flex'

// What one parser writes: the page frame (margin, max width), or the columns on top of it.
type LayoutPart = 'frame' | LayoutGridDisplay

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

const columnDeclarations = (
  theme: unknown,
  display: LayoutGridDisplay,
  { columns, gutter }: LayoutGridEntry
) => {
  const gap = gutter === undefined ? undefined : spaceValue(theme, gutter)
  return {
    // Children size themselves from these: `span` on a flex child, or any custom style.
    '--layout-columns': columns,
    '--layout-gutter': gap,
    gridTemplateColumns:
      display === 'grid' && columns !== undefined
        ? `repeat(${columns}, minmax(0, 1fr))`
        : undefined,
    columnGap: gap,
  }
}

const declarations = (theme: unknown, parts: LayoutPart[], entry: LayoutGridEntry) => {
  const styles: StyleObject = Object.assign(
    {},
    ...parts.map((part) =>
      part === 'frame' ? frameDeclarations(theme, entry) : columnDeclarations(theme, part, entry)
    )
  )
  return Object.fromEntries(Object.entries(styles).filter(([, value]) => value !== undefined))
}

const DISPLAY: Record<LayoutPart, StyleObject> = {
  frame: {},
  grid: { display: 'grid' },
  flex: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
}

const layoutStyles = (theme: unknown, value: LayoutGridValue | undefined, parts: LayoutPart[]) => {
  if (!value) return {}
  const breakpoints = get(theme, 'breakpoints', {}) as Breakpoints
  const layout = get(theme, 'layout', {}) as Record<string, { content?: LayoutGridEntry }>
  // Numbers and strings are fields for every breakpoint; objects are entries for the one they name.
  const fields = typeof value === 'object' ? Object.entries(value) : []
  const everywhere = Object.fromEntries(fields.filter(([, field]) => typeof field !== 'object'))
  const overrides = Object.fromEntries(
    fields.filter(([, field]) => typeof field === 'object')
  ) as Record<string, LayoutGridEntry>
  const hasEverywhere = Object.keys(everywhere).length > 0
  const { keyed } = responsiveQueries(breakpoints)
  const styles: StyleObject = Object.assign({}, ...parts.map((part) => DISPLAY[part]))
  let themed: LayoutGridEntry = {}
  let overridden = false
  for (const key of Object.keys(breakpoints)) {
    const layer = layout[key]?.content
    const named = Object.hasOwn(overrides, key) ? overrides[key] : undefined
    const override = hasEverywhere || named ? { ...everywhere, ...named } : undefined
    themed = { ...themed, ...layer }
    // A block where the theme changes, where an override starts, or where one just ended.
    if (layer || override || overridden) {
      const block = declarations(theme, parts, { ...themed, ...override })
      const media = keyed.get(key)
      if (media) styles[media] = block
      else Object.assign(styles, block)
    }
    overridden = override !== undefined
  }
  return styles
}

/**
 * The layout grid from `theme.layout`, per breakpoint: each breakpoint's `content` (columns,
 * margin, gutter, fluid or fixed), inherited mobile-first. A field in `value` replaces the
 * theme's at every breakpoint (`{ gutter: 8 }`); an entry under a breakpoint name replaces it
 * there only, on top of those fields (`{ gutter: 8, md: { columns: 6 } }`), and the next
 * breakpoint is back to the theme. Every written block carries the full set, so no block
 * inherits a stale `max-width`. The layout owns what it writes - an explicit `gap`, padding or
 * `maxWidth` on the same element does not override it; rows take `rowGap`.
 */
export const layoutGridStyles = (
  theme: unknown,
  value: LayoutGridValue | undefined,
  display: LayoutGridDisplay = 'grid'
) => layoutStyles(theme, value, [display, 'frame'])

const layoutParser = (part: LayoutPart) =>
  Object.assign(
    (props: Props) => layoutStyles(props.theme, props.layout as LayoutGridValue, [part]),
    { config: {}, propNames: ['layout'], cache: {} }
  ) as unknown as Parser

/**
 * The `layout` prop as the page frame alone: the margin and, in fixed mode, the centred max
 * width per breakpoint - no columns, and `display` is left alone. Compose it with `layoutGrid`
 * or `layoutFlex` for the columns; {@link layoutGridStyles} writes both in a style function.
 */
export const layoutFrame = layoutParser('frame')

/** The `layout` prop's columns on a grid container: tracks, gutter, `--layout-*` variables. */
export const layoutGrid = layoutParser('grid')

/** The `layout` prop's columns on a flex container: a wrapping row with the same gutter. */
export const layoutFlex = layoutParser('flex')

// A child's width in a layout-grid flex row: N columns and the N - 1 gutters between them. No
// fallbacks: outside a layout grid the variables are missing, so the declaration is invalid and
// the browser ignores it - the item stays a plain flex item.
const flexSpan = (n: number) => {
  const columns = 'var(--layout-columns)'
  const gutter = 'var(--layout-gutter)'
  return `0 0 calc((100% - (${columns} - 1) * ${gutter}) / ${columns} * ${n} + ${n - 1} * ${gutter})`
}

/**
 * The `span` prop: how many layout-grid columns an element takes. It writes both
 * `grid-column: span N` (read by a Grid parent) and a flex basis from the parent's
 * `--layout-columns` / `--layout-gutter` (read by a Flex parent); each container ignores the
 * other's property. `span="full"` takes the whole row whatever the column count - in any grid,
 * layout grid or not. Responsive like any prop: `span={{ xs: 'full', md: 6 }}`.
 */
export const span = system({
  span: (n: number | 'full') =>
    n === 'full'
      ? { gridColumn: '1 / -1', flex: '0 0 100%' }
      : { gridColumn: `span ${n}`, flex: flexSpan(n) },
})
