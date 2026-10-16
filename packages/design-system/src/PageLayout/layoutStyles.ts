import { createMediaQuery } from '../index'
import type {
  CSSObject,
  LayoutEntry,
  LayoutLength,
  LayoutPanel,
  Theme,
  ThemeBreakpoints,
  ThemeLayout,
} from '../theme'

type LayoutOverride = NonNullable<ThemeLayout[keyof ThemeBreakpoints]>

const mergePanel = (panel?: LayoutPanel, override?: Partial<LayoutPanel>) =>
  panel || override ? ({ ...panel, ...override } as LayoutPanel) : undefined

const mergeEntry = (entry: LayoutEntry, { bars, panels, content }: LayoutOverride) => ({
  bars: { ...entry.bars, ...bars },
  panels: {
    start: mergePanel(entry.panels.start, panels?.start),
    end: mergePanel(entry.panels.end, panels?.end),
  },
  content: { ...entry.content, ...content },
})

/**
 * `theme.layout` resolved mobile-first: the base entry, then one entry per
 * breakpoint that has one, merged over the entries before it, with its `@media` rule.
 */
export const layoutEntries = ({ breakpoints, layout }: Theme) => {
  let entry: LayoutEntry = layout.base
  const entries: [string | null, LayoutEntry][] = [[null, entry]]
  for (const [key, value] of Object.entries(breakpoints)) {
    const override = layout[key as keyof ThemeBreakpoints]
    if (!override) continue
    entry = mergeEntry(entry, override)
    entries.push([createMediaQuery(value), entry])
  }
  return entries
}

/** A layout length as CSS: a `theme.space` key resolves through the scale, a length stays as written. */
export const layoutLength = (theme: Theme, value: LayoutLength = 0) => {
  const length = (theme.space as Record<LayoutLength, number | string>)[value] ?? value
  return typeof length === 'number' ? `${length}px` : length
}

/** Styles per layout entry: the base entry's at the top level, each breakpoint's in its `@media` block. */
export const layoutStyles = (theme: Theme, style: (entry: LayoutEntry) => CSSObject) => {
  const styles: CSSObject = {}
  for (const [media, entry] of layoutEntries(theme)) {
    if (media) styles[media] = style(entry)
    else Object.assign(styles, style(entry))
  }
  return styles
}
