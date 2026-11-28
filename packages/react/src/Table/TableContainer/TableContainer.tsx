'use client'

import type { ElementType } from 'react'
import { styled } from '../../style/styled'
import { mergeOverrides, type SlotProps } from '../../style/overrides'
import { View, type ViewProps } from '../../View'
import type { TableContainerSlot } from './TableContainer.types'

export interface TableContainerProps extends ViewProps {
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<TableContainerSlot>
  as?: ElementType
}

const TableContainerRoot = styled(View, {
  name: 'TableContainer',
  label: 'TableContainer',
})({
  overflowX: 'auto',
})

/**
 * Scroll wrapper for `Table` - wide tables scroll horizontally inside it
 * instead of breaking the page layout. Give it a bounded height to make
 * `Table`'s `hasStickyHeader` stick.
 */
export function TableContainer({
  style,
  className,
  slotProps,
  ...rest
}: Readonly<TableContainerProps>) {
  return <TableContainerRoot {...mergeOverrides(slotProps?.root, { style, className })} {...rest} />
}
