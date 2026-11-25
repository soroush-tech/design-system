import type { TabValue } from '../TabsContext'

/**
 * The tabs that don't fit **whole** in `room` pixels along the row, with `gap` between them -
 * the ones its menu lists. The selected tab counts first, then the others in order while the
 * next still fits; the first that doesn't ends the row, and every one after it goes too, even a
 * later short one, so the row never reads out of order. A tab not measured yet counts as nothing,
 * so it is drawn and measured. With no room measured - nothing laid out - every tab fits.
 */
export const fitTabs = (
  values: readonly TabValue[],
  selected: TabValue | null,
  sizes: ReadonlyMap<TabValue, number>,
  room: number,
  gap: number
): TabValue[] => {
  if (room <= 0) return []
  const sizeOf = (value: TabValue) => sizes.get(value) ?? 0
  const shown = new Set<TabValue>()
  let used = 0
  if (selected !== null && values.includes(selected)) {
    shown.add(selected)
    used = sizeOf(selected)
  }
  for (const value of values) {
    if (value === selected) continue
    const next = used + (shown.size > 0 ? gap : 0) + sizeOf(value)
    if (next > room) break
    shown.add(value)
    used = next
  }
  return values.filter((value) => !shown.has(value))
}
