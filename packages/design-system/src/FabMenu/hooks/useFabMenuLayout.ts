import { useLayoutEffect, useState, type RefObject } from 'react'
import { useTheme } from '../../theme'
import { isRtl } from '../../utils/isRtl'
import type { FabMenuAlign, FabMenuDirection } from '../FabMenu/FabMenu'

/** Where the actions go once they have been measured against the window. */
export interface FabMenuLayout {
  /** The direction they go - the one asked for, unless a row would not fit. */
  direction: FabMenuDirection
  /** The widest a column may be, in pixels, so a long label is cut and not the screen. */
  maxWidth?: number
  /** The tallest a column may be, in pixels, so a long column scrolls and is not cut. */
  maxHeight?: number
}

const px = (length: string | number) => Number.parseFloat(String(length))

const isSame = (first: FabMenuLayout, second: FabMenuLayout) =>
  first.direction === second.direction &&
  first.maxWidth === second.maxWidth &&
  first.maxHeight === second.maxHeight

/**
 * Measures the actions against the window as the menu opens, and as the window or the page
 * moves under it: a row that is wider than the room beside the trigger becomes a column - above it
 * where there is more room above, else below - and a column is no wider or taller than the room it
 * has, so a long label is cut with an ellipsis and a long column scrolls. Nothing is measured while
 * the menu is closed, and the layout is the one asked for until it opens. The room kept from the
 * window's edge is `theme.space[2]`, the step between the actions `theme.space[1]`.
 */
export function useFabMenuLayout({
  isOpen,
  direction,
  align,
  listRef,
  triggerRef,
  itemCount,
}: {
  isOpen: boolean
  direction: FabMenuDirection
  align: FabMenuAlign
  listRef: RefObject<HTMLElement | null>
  triggerRef: RefObject<HTMLElement | null>
  /** Measured again when the actions change in number. */
  itemCount: number
}): FabMenuLayout {
  const theme = useTheme()
  const margin = px(theme.space[2])
  const gap = px(theme.space[1])
  const [layout, setLayout] = useState<FabMenuLayout>({ direction })

  useLayoutEffect(() => {
    if (!isOpen) return undefined
    const asked: FabMenuLayout = { direction }
    const settle = (next: FabMenuLayout) =>
      setLayout((current) => (isSame(current, next) ? current : next))
    const measure = () => {
      const list = listRef.current!
      const trigger = triggerRef.current!
      const rect = trigger.getBoundingClientRect()
      const rtl = isRtl(trigger)
      const room = {
        top: rect.top - margin,
        bottom: window.innerHeight - rect.bottom - margin,
        left: rect.left - margin,
        right: window.innerWidth - rect.right - margin,
      }
      let column = direction
      if (direction === 'left' || direction === 'right') {
        // A row's own width: each action as wide as its label, whether or not it is cut now.
        const items = [...list.querySelectorAll<HTMLElement>('[data-fab-menu-item]')]
        const natural = items.reduce((sum, item) => {
          // The label is cut when the action is: its full width is the text's, less what is shown.
          const text = item.querySelector<HTMLElement>('[data-fab-label]')!
          return sum + item.offsetWidth + (text.scrollWidth - text.clientWidth)
        }, 0)
        const width = natural + gap * items.length
        // The window's left or right, from the page's start or end side of the trigger.
        const side = (direction === 'left') !== rtl ? room.left : room.right
        if (width <= side) return settle(asked)
        column = room.top >= room.bottom ? 'up' : 'down'
      }
      // A column goes up or down from the trigger, along its start or end edge.
      const height = (column === 'up' ? room.top : room.bottom) - gap
      const width =
        (align === 'end') !== rtl ? rect.right - margin : window.innerWidth - rect.left - margin
      return settle({
        direction: column,
        maxWidth: Math.max(0, width),
        // The whole height the actions want, kept while they scroll.
        maxHeight: list.scrollHeight > height ? Math.max(0, height) : undefined,
      })
    }
    measure()
    window.addEventListener('resize', measure)
    // The trigger moves under a page that scrolls, unless it is fixed.
    window.addEventListener('scroll', measure, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [isOpen, direction, align, itemCount, margin, gap, listRef, triggerRef])

  // Closed, it is as it is asked to be; opening measures again, before it is painted.
  return isOpen ? layout : { direction }
}
