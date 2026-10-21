import { useState } from 'react'
import { useControlled } from '../../utils/useControlled'

export type TransferListValue = string | number

export interface TransferListItem {
  /** What `value` holds for it - unique among the items. */
  value: TransferListValue
  /** What the row says, and what names its checkbox. */
  label: string
  /** Stays where it is and can't be checked. */
  disabled?: boolean
}

export interface UseTransferListParams {
  items: readonly TransferListItem[]
  /** The values on the right - `undefined` leaves it uncontrolled. */
  value?: readonly TransferListValue[]
  defaultValue?: readonly TransferListValue[]
  onChange?: (value: TransferListValue[]) => void
}

export type TransferSide = 'left' | 'right'

const isEnabled = (item: TransferListItem) => !item.disabled

/**
 * A transfer list's state: which items are on the right (controlled or not), which are checked,
 * and the moves between the sides. A move takes the checked, enabled items of its source - or all
 * the enabled ones, which its button is off without - and unchecks what it moves; the items keep their own order on each side.
 */
export function useTransferList({
  items,
  value,
  defaultValue,
  onChange,
}: Readonly<UseTransferListParams>) {
  const [rightValues, setRightValues] = useControlled<readonly TransferListValue[]>({
    controlled: value,
    default: defaultValue ?? [],
  })
  const [checked, setChecked] = useState<readonly TransferListValue[]>([])

  const isRight = (item: TransferListItem) => rightValues.includes(item.value)
  const left = items.filter((item) => !isRight(item))
  const right = items.filter(isRight)
  const sides = { left, right }

  const isChecked = (item: TransferListItem) => !item.disabled && checked.includes(item.value)
  const getChecked = (side: TransferSide) => sides[side].filter(isChecked)
  const getEnabled = (side: TransferSide) => sides[side].filter(isEnabled)

  const commit = (next: TransferListValue[]) => {
    setRightValues(next)
    onChange?.(next)
  }

  const toggle = (item: TransferListItem) => {
    setChecked((current) =>
      current.includes(item.value)
        ? current.filter((entry) => entry !== item.value)
        : [...current, item.value]
    )
  }

  // All of a side's enabled items are checked, or - when they all are already - none.
  const toggleAll = (side: TransferSide) => {
    const enabled = getEnabled(side).map((item) => item.value)
    setChecked((current) => {
      const isAll = enabled.every((entry) => current.includes(entry))
      const rest = current.filter((entry) => !enabled.includes(entry))
      return isAll ? rest : [...rest, ...enabled]
    })
  }

  const move = (to: TransferSide, moving: TransferListItem[]) => {
    const moved = moving.map((item) => item.value)
    setChecked((current) => current.filter((entry) => !moved.includes(entry)))
    commit(
      to === 'right'
        ? [...rightValues, ...moved]
        : rightValues.filter((entry) => !moved.includes(entry))
    )
  }

  return {
    items,
    left,
    right,
    isChecked,
    getChecked,
    getEnabled,
    toggle,
    toggleAll,
    moveRight: () => move('right', getChecked('left')),
    moveLeft: () => move('left', getChecked('right')),
    moveAllRight: () => move('right', getEnabled('left')),
    moveAllLeft: () => move('left', getEnabled('right')),
  }
}
