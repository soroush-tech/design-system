import { get, type Parser, type Props, type StyleObject } from '@soroush.tech/styled-system/core'
import { responsiveQueries, type Breakpoints } from '../core/media'

/** The content grid at one breakpoint - the `content` part of a `theme.layout` entry. */
export interface ContentGridEntry {
  /** Equal column tracks. */
  columns?: number
  /** Inline padding - a `theme.space` key or a CSS length. */
  margin?: string | number
  /** Gap between columns - a `theme.space` key or a CSS length. */
  gutter?: string | number
  /** `fluid` spans the space; `fixed` is a container centred at `maxWidth`. */
  mode?: 'fluid' | 'fixed'
  maxWidth?: string | number
}

/** `true` for the theme's own grid, or per-breakpoint entries merged over it. */
export type ContentGridValue = boolean | Record<string, ContentGridEntry>

const spaceValue = (theme: unknown, value: string | number) => {
  const resolved = get(theme, `space.${value}`, value) as string | number
  return typeof resolved === 'number' ? `${resolved}px` : resolved
}

const declarations = (theme: unknown, entry: ContentGridEntry): StyleObject => {
  const { columns, margin, gutter, mode, maxWidth } = entry
  const isFixed = mode === 'fixed'
  const styles: StyleObject = {
    gridTemplateColumns: columns === undefined ? undefined : `repeat(${columns}, minmax(0, 1fr))`,
    columnGap: gutter === undefined ? undefined : spaceValue(theme, gutter),
    paddingInline: margin === undefined ? undefined : spaceValue(theme, margin),
    maxWidth: isFixed && maxWidth !== undefined ? spaceValue(theme, maxWidth) : 'none',
    marginInline: isFixed ? 'auto' : 0,
  }
  return Object.fromEntries(Object.entries(styles).filter(([, value]) => value !== undefined))
}

/**
 * The content grid from `theme.layout`, per breakpoint and mobile-first: each breakpoint's
 * `content` (columns, margin, gutter, fluid or fixed), with `value`'s entries merged over it.
 * Every breakpoint with an entry writes the full set, so a later block never inherits a
 * stale `max-width`.
 */
export const contentGridStyles = (theme: unknown, value: ContentGridValue | undefined) => {
  if (!value) return {}
  const breakpoints = get(theme, 'breakpoints', {}) as Breakpoints
  const layout = get(theme, 'layout', {}) as Record<string, { content?: ContentGridEntry }>
  const overrides = typeof value === 'object' ? value : {}
  const { keyed } = responsiveQueries(breakpoints)
  const styles: StyleObject = { display: 'grid' }
  let entry: ContentGridEntry = {}
  for (const key of Object.keys(breakpoints)) {
    const layer = { ...layout[key]?.content, ...overrides[key] }
    if (Object.keys(layer).length === 0) continue
    entry = { ...entry, ...layer }
    const media = keyed.get(key)
    if (media) styles[media] = declarations(theme, entry)
    else Object.assign(styles, declarations(theme, entry))
  }
  return styles
}

/** The `contentGrid` prop - see {@link contentGridStyles}. */
export const contentGrid = Object.assign(
  (props: Props) => contentGridStyles(props.theme, props.contentGrid as ContentGridValue),
  { config: {}, propNames: ['contentGrid'], cache: {} }
) as unknown as Parser
