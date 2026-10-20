import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import type { TabValue } from '../TabsContext'
import { fitTabs } from '../utils/fitTabs'

const px = (value: string) => Number.parseFloat(value) || 0

/**
 * The tabs of a row that don't fit whole in its list, for the row's menu - none unless
 * `isEnabled`. Each drawn tab is measured along the row (its `data-tab-value` root) and its size
 * kept, so a tab put in the menu comes back when the room grows. The room is the list's size less
 * its padding, and the gap its own, so the row's own content and the menu's button take their
 * room first. Measured after every render - a tab added, closed or renamed changes the answer -
 * and on every resize of the list; a measurement that changes nothing renders nothing, so the
 * button appearing can't make the row go back and forth. `update` measures again on demand.
 */
export function useTabsOverflow(
  listRef: RefObject<HTMLElement | null>,
  isEnabled: boolean,
  isVertical: boolean,
  values: readonly TabValue[],
  selected: TabValue | null
): { hidden: TabValue[]; update: () => void } {
  const sizes = useRef(new Map<TabValue, number>())
  const [hidden, setHidden] = useState<TabValue[]>([])

  const measure = () => {
    const list = listRef.current
    let out: TabValue[] = []
    if (isEnabled && list) {
      // Every drawn tab is one of `values` - both come from the same children.
      const valueOf = new Map(values.map((value) => [String(value), value]))
      for (const tab of list.querySelectorAll<HTMLElement>('[data-tab-value]')) {
        const box = tab.getBoundingClientRect()
        sizes.current.set(valueOf.get(tab.dataset.tabValue!)!, isVertical ? box.height : box.width)
      }
      const style = getComputedStyle(list)
      const room = isVertical
        ? list.clientHeight - px(style.paddingTop) - px(style.paddingBottom)
        : list.clientWidth - px(style.paddingLeft) - px(style.paddingRight)
      const gap = px(isVertical ? style.rowGap : style.columnGap)
      out = fitTabs(values, selected, sizes.current, room, gap)
    }
    setHidden((before) =>
      before.length === out.length && before.every((value, at) => value === out[at]) ? before : out
    )
  }
  // The observer calls the latest measurement, so it needn't be re-made on every render.
  const measureRef = useRef(measure)
  useLayoutEffect(() => {
    measureRef.current = measure
    measure()
  })

  useLayoutEffect(() => {
    const list = listRef.current
    if (!isEnabled || !list || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => measureRef.current())
    observer.observe(list)
    return () => observer.disconnect()
  }, [listRef, isEnabled])

  const update = useCallback(() => measureRef.current(), [])
  return { hidden, update }
}
