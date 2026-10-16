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

/** `true` for the theme's layout grid, or entries for named breakpoints that replace it there. */
export type LayoutGridValue = boolean | Record<string, LayoutGridEntry>

/** The container a layout grid is drawn on: column tracks, or a wrapping flex row. */
export type LayoutGridDisplay = 'grid' | 'flex'

const spaceValue = (theme: unknown, value: string | number) => {
  const resolved = get(theme, `space.${value}`, value) as string | number
  return typeof resolved === 'number' ? `${resolved}px` : resolved
}

const declarations = (theme: unknown, display: LayoutGridDisplay, entry: LayoutGridEntry) => {
  const { columns, margin, gutter, mode, maxWidth } = entry
  const isFixed = mode === 'fixed'
  const gap = gutter === undefined ? undefined : spaceValue(theme, gutter)
  const styles: StyleObject = {
    // Children size themselves from these: `span` on a flex child, or any custom style.
    '--layout-columns': columns,
    '--layout-gutter': gap,
    gridTemplateColumns:
      display === 'grid' && columns !== undefined
        ? `repeat(${columns}, minmax(0, 1fr))`
        : undefined,
    columnGap: gap,
    paddingInline: margin === undefined ? undefined : spaceValue(theme, margin),
    maxWidth: isFixed && maxWidth !== undefined ? spaceValue(theme, maxWidth) : 'none',
    marginInline: isFixed ? 'auto' : 0,
  }
  return Object.fromEntries(Object.entries(styles).filter(([, value]) => value !== undefined))
}

/**
 * The layout grid from `theme.layout`, per breakpoint: each breakpoint's `content` (columns,
 * margin, gutter, fluid or fixed), inherited mobile-first. An entry in `value` replaces the
 * theme's at the breakpoint it names only; the next breakpoint is back to the theme. Every
 * written block carries the full set, so no block inherits a stale `max-width`.
 */
export const layoutGridStyles = (
  theme: unknown,
  value: LayoutGridValue | undefined,
  display: LayoutGridDisplay = 'grid'
) => {
  if (!value) return {}
  const breakpoints = get(theme, 'breakpoints', {}) as Breakpoints
  const layout = get(theme, 'layout', {}) as Record<string, { content?: LayoutGridEntry }>
  const overrides = typeof value === 'object' ? value : {}
  const { keyed } = responsiveQueries(breakpoints)
  const styles: StyleObject =
    display === 'grid'
      ? { display: 'grid' }
      : { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }
  let themed: LayoutGridEntry = {}
  let overridden = false
  for (const key of Object.keys(breakpoints)) {
    const layer = layout[key]?.content
    const override = Object.hasOwn(overrides, key) ? overrides[key] : undefined
    themed = { ...themed, ...layer }
    // A block where the theme changes, where an override starts, or where one just ended.
    if (layer || override || overridden) {
      const block = declarations(theme, display, { ...themed, ...override })
      const media = keyed.get(key)
      if (media) styles[media] = block
      else Object.assign(styles, block)
    }
    overridden = override !== undefined
  }
  return styles
}

const layoutParser = (display: LayoutGridDisplay) =>
  Object.assign(
    (props: Props) => layoutGridStyles(props.theme, props.layout as LayoutGridValue, display),
    { config: {}, propNames: ['layout'], cache: {} }
  ) as unknown as Parser

/** The `layout` prop on a grid container - see {@link layoutGridStyles}. */
export const layoutGrid = layoutParser('grid')

/** The `layout` prop on a flex container: a wrapping row with the same gutter and margin. */
export const layoutFlex = layoutParser('flex')

// A child's width in a layout-grid flex row: N columns and the N - 1 gutters between them. The
// fallbacks keep it a plain auto item outside a layout grid.
const flexSpan = (n: number) => {
  const columns = 'var(--layout-columns, 1)'
  const gutter = 'var(--layout-gutter, 0px)'
  return `0 0 calc((100% - (${columns} - 1) * ${gutter}) / ${columns} * ${n} + ${n - 1} * ${gutter})`
}

/**
 * The `span` prop: how many layout-grid columns an element takes. It writes both
 * `grid-column: span N` (read by a Grid parent) and a flex basis from the parent's
 * `--layout-columns` / `--layout-gutter` (read by a Flex parent); each container ignores the
 * other's property. Responsive like any prop: `span={{ xs: 4, md: 6 }}`.
 */
export const span = system({
  span: (n: number) => ({ gridColumn: `span ${n}`, flex: flexSpan(n) }),
})
